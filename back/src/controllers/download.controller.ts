import { Matiere } from "../models/Matiere";
var Json2csvParser = require('json2csv').Parser
const admZip = require('adm-zip');
const pdf = require('pdf-creator-node');
const optionsPdf = require('../../helpers/optionsPdf')
const optionsPdfRecu = require('../../helpers/optionsPdfRecu')
const downloadFs = require('fs');

const months = [
    'Incorrect',
    'Janvier',
    'Fevrier',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Aout',
    'Septembre',
    'Octobre',
    'Novembre',
    'Decembre'
]

module.exports.downloadStudentsCsv = (req, res) => {
    req.connection.query(`SELECT students.name, students.subname, 
                            students.birthday, students.sex, fatherName, 
                            email, phone_number,
                            birthday_place, students.school_year, status,
                            class.name as class_name  FROM students 
                            JOIN class ON class.id = students.class_id 
                            WHERE class_id = ?`, 
                            [req.params.id], function (err, users, fields) {
        if (err) throw err;
        const jsonUsers = JSON.parse(JSON.stringify(users));
        const csvFields = ['name', 'subname', 'birthday', 'sex', 'fatherName', 'email', 'phone_number', 'class_name', 'birthday_place', 'school_year', 'status'];
        const json2csvParser = new Json2csvParser({ csvFields });
        const csv = json2csvParser.parse(jsonUsers);
        const csvFile = `docs/eleves de ${jsonUsers[0].class_name}.csv`;
        downloadFs.writeFile(csvFile, csv, function (err, csv) {
            if (err) return console.log(err);
            else res.download(csvFile);
        });
    });
}

module.exports.downloadStudentsPdf = (req, res) => {
    const html = downloadFs.readFileSync('src/templates/studentsList.html', 'utf-8');
    req.connection.query("SELECT students.name, teachers.name as tName, teachers.subname as tSubname, students.subname,  students.email,  students.phone_number, students.birthday, students.sex, class.name as cName  FROM students LEFT JOIN class ON class.id = students.class_id LEFT JOIN teachers ON teachers.class_id = class.id WHERE students.class_id = ?", [req.params.id], function (err, students, fields) {
        if (err) console.log(err);
        const fileName = `Liste des eleves de ${students[0].cName}.pdf`;
        let info: {
            className: string,
            teacherName: string
            teacherSubname: string
        } = {
            className: students[0].cName,
            teacherName: students[0].tName,
            teacherSubname: students[0].tSubname,
        }
        students.forEach(student => {
            const date = new Date(student.birthday).getDate() + ' ' + months[new Date(student.birthday).getMonth()] + " " + new Date(student.birthday).getUTCFullYear()
            student.sex = student.sex === 'm' ? 'Masculin' : 'Feminin';
            student.birthday = date;
        })
        const document = {
            html: html,
            data: {
                students: students,
                info
            },
            path: `docs/${fileName}`
        };
        pdf.create(document, optionsPdf)
            .then(resp => {
                console.log(resp);
                res.download(`docs/${fileName}`)
            })
            .catch(err => {
                console.log(err);
                res.status(201).json(err)
            })
    });
}

module.exports.downloadRecu = (req: any, res: any) => {
    const {student_id, amount, payload} = req.params;
    req.connection.query('SELECT * FROM students WHERE id = ?', [student_id], (err, students) => {
        const student = students[0];
        req.connection.query('SELECT * FROM class WHERE id = ?', [student.class_id], (err2, classes) => {
            
            const t = [];
            for (let i = 0; i < 4; i++) {
              const i = Math.round((Math.random() * 10));
              t.push(i);
            }
            const recu_name = t.join('');
            const trust_payload = req.jwt.verify(payload, req.env.SECRET);
            
            req.connection.query('INSERT INTO payments(amount, recu_name, student_id, operator_id) VALUES(?, ?, ?, ?)', 
                                    [amount, recu_name, student_id, trust_payload.id], 
                                    (err3, comptable) => {
                // console.log(err3);
                
                req.connection.query('SELECT * FROM payments WHERE recu_name = ?', [recu_name], (ee, payments) => {
                    const classe = classes[0];
                    
                    const payment = payments[0];
                    const html = downloadFs.readFileSync('src/templates/Recu.html', 'utf-8');
                    const fileName = `Reçu de ${student.name} ${student.subname} ${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}.pdf`;

                    const inscription = student.status === 'old' ? classe.inscriptions_olds_students : classe.inscriptions_news_students
                    const first_tranch = student.status === 'old' ? classe.first_tranch_olds_students : classe.first_tranch_news_students
                    const second_tranch = student.status === 'old' ? classe.second_tranch_olds_students : classe.second_tranch_news_students;
                    const total = inscription + first_tranch + second_tranch;
                    const totalPayed = student.inscription + student.first_tranch + student.second_tranch + student.third_tranch;

                    const inscription_rest = inscription - student.inscription;
                    const first_tranch_rest = first_tranch - student.first_tranch;
                    const second_tranch_rest = second_tranch - student.second_tranch;

                    req.connection.query('SELECT * FROM users WHERE id = ?', [trust_payload.id], (eee, users) => {
                        const user = users[0];
                        const username = user.email.toUpperCase();                        

                        const document = {
                            html: html,
                            data: {
                                payment,
                                student,
                                classe,
                                amount,
                                inscription,
                                school_year: new Date().getFullYear(),
                                next_school_year: new Date().getFullYear() + 1,
                                date : new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear() 
                                            + ' à ' + new Date().getHours()  + ':' + new Date().getMinutes() ,
                                username,
                                first_tranch,
                                second_tranch,
                                inscription_rest,
                                first_tranch_rest,
                                second_tranch_rest,
                                totalFees: first_tranch + second_tranch,
                                total,
                                totalPayed,
                                difference: total - totalPayed
                            },
                            path: `docs/${fileName}`
                        };
                        pdf.create(document, optionsPdfRecu)
                            .then(resp => {
                                var data = downloadFs.readFileSync('docs/'+fileName);
                                res.contentType("application/pdf");
                                res.send(data);
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(201).json(err)
                            })
                    })
                })
            })
        })
    })
}
module.exports.downloadRecu2 = (req: any, res: any) => {
    const {student_id, amount, payload} = req.params;
    req.connection.query('SELECT * FROM students WHERE id = ?', [student_id], (err, students) => {
        const student = students[0];
        req.connection.query('SELECT * FROM class WHERE id = ?', [student.class_id], (err2, classes) => {
            
            const t = [];
            for (let i = 0; i < 4; i++) {
              const i = Math.round((Math.random() * 10));
              t.push(i);
            }
            const recu_name = t.join('');
            const trust_payload = req.jwt.verify(payload, req.env.SECRET);
            
            req.connection.query('INSERT INTO payments(amount, recu_name, student_id, operator_id) VALUES(?, ?, ?, ?)', 
                                    [amount, recu_name, student_id, trust_payload.id], 
                                    (err3, comptable) => {
                // console.log(err3);
                
                req.connection.query('SELECT * FROM payments WHERE recu_name = ?', [recu_name], (ee, payments) => {
                    const classe = classes[0];
                    
                    const payment = payments[0];
                    const html = downloadFs.readFileSync('src/templates/Recu.html', 'utf-8');
                    const fileName = `Reçu de ${student.name} ${student.subname} ${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}.pdf`;

                    const inscription = student.status === 'old' ? classe.inscriptions_olds_students : classe.inscriptions_news_students
                    const first_tranch = student.status === 'old' ? classe.first_tranch_olds_students : classe.first_tranch_news_students
                    const second_tranch = student.status === 'old' ? classe.second_tranch_olds_students : classe.second_tranch_news_students;
                    const total = inscription + first_tranch + second_tranch;
                    const totalPayed = student.inscription + student.first_tranch + student.second_tranch + student.third_tranch;

                    const inscription_rest = inscription - student.inscription;
                    const first_tranch_rest = first_tranch - student.first_tranch;
                    const second_tranch_rest = second_tranch - student.second_tranch;

                    req.connection.query('SELECT * FROM users WHERE id = ?', [trust_payload.id], (eee, users) => {
                        const user = users[0];
                        const username = user.email.toUpperCase();                        

                        const document = {
                            html: html,
                            data: {
                                payment,
                                student,
                                classe,
                                amount,
                                inscription,
                                school_year: new Date().getFullYear(),
                                next_school_year: new Date().getFullYear() + 1,
                                date : new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear() + ' à ' + new Date().getHours()  + ':' + new Date().getMinutes() ,
                                username,
                                first_tranch,
                                second_tranch,
                                inscription_rest,
                                first_tranch_rest,
                                second_tranch_rest,
                                totalFees: first_tranch + second_tranch,
                                total,
                                totalPayed,
                                difference: total - totalPayed
                            },
                            path: `docs/${fileName}`
                        };
                        pdf.create(document, optionsPdfRecu)
                            .then(resp => {
                                var data = downloadFs.readFileSync('docs/'+fileName);
                                res.contentType("application/pdf");
                                res.send(data);
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(201).json(err)
                            })
                    })
                })
            })
        })
    })
}
module.exports.downloadInsolvablesList = (req, res) => {
    const {type, payload} = req.params;
    let fileToRead = 'insolvables';
    req.connection.query(`SELECT s.status, s.inscription, s.first_tranch,
                            s.second_tranch, s.third_tranch,
                            c.inscriptions_olds_students, c.inscriptions_news_students,
                            c.first_tranch_olds_students , c.first_tranch_news_students,
                            c.second_tranch_olds_students , c.second_tranch_news_students,
                            c.third_tranch_olds_students , c.third_tranch_news_students
                            FROM students s JOIN class c ON s.class_id = c.id`, 
                        [], (e, ss) => {
        req.connection.query(`SELECT DISTINCT * FROM students`, 
                           function (err, students, fields) {
            if (err) console.log(err);
            const trust_payload = req.jwt.verify(payload, req.env.SECRET)
            req.connection.query('SELECT * FROM users WHERE id = ?', [trust_payload.id], (er5, users) => {
                const user = users[0];
                req.connection.query('SELECT * FROM class WHERE id = ?', [req.params.id], (e, classes) => {
                    const classe = classes[0];
                    students = students.filter(s => s.class_id === req.params.id);
                    console.log(req.params.id, classes);
                            
                    let students2 = new Set();
                    let global = {
                        payed: {
                            ins: 0,
                            ftr: 0,
                            str: 0,
                            general: 0
                        },
                        avanced: {
                            ins: 0,
                            ftr: 0,
                            str: 0,
                            general: 0
                        },
                        nothing: {
                            ins: 0,
                            ftr: 0,
                            str: 0,
                            general: 0
                        },
                        total: {
                            inscription: 0,
                            first_tranch: 0,
                            second_tranch: 0,
                            general: 0
                        }
                    };
                    let global_by_class = {
                        payed: {
                            ins: 0,
                            ftr: 0,
                            str: 0,
                            general: 0
                        },
                        avanced: {
                            ins: 0,
                            ftr: 0,
                            str: 0,
                            general: 0
                        },
                        nothing: {
                            ins: 0,
                            ftr: 0,
                            str: 0,
                            general: 0
                        },
                        total: {
                            inscription: 0,
                            first_tranch: 0,
                            second_tranch: 0,
                            general: 0
                        }
                    };
                    ss.forEach(student => {
                        const inscription = student.status === 'old' ? student.inscriptions_olds_students : student.inscriptions_news_students
                        const first_tranch = student.status === 'old' ? student.first_tranch_olds_students : student.first_tranch_news_students
                        const second_tranch = student.status === 'old' ? student.second_tranch_olds_students : student.second_tranch_news_students;

                        const restToPay = (inscription + first_tranch + second_tranch) - (student.inscription + student.first_tranch + student.second_tranch);
                        const totalPayed = (student.inscription + student.first_tranch + student.second_tranch);

                        if (student.inscription == 0) {
                            global.nothing.ins += 1
                        }
                        else if (student.inscription < inscription ) {
                            global.avanced.ins += 1
                        }
                        else {
                            global.payed.ins += 1
                        }

                        if (student.first_tranch == 0) {
                            global.nothing.ftr += 1
                        }
                        else if (student.first_tranch < first_tranch ) {
                            global.avanced.ftr += 1
                        }
                        else {
                            global.payed.ftr += 1
                        }                    
                        
                        if (student.second_tranch == 0) {
                            global.nothing.str += 1
                        }
                        else if (student.second_tranch < second_tranch ) {
                            global.avanced.str += 1
                        }
                        else {
                            global.payed.str += 1
                        }

                        if (totalPayed == 0) {
                            global.nothing.general += 1
                        }
                        else if (restToPay > 0) {
                            global.avanced.general += 1
                        }
                        else {
                            global.payed.general += 1
                        }
                        global.total.inscription += student.inscription;
                        global.total.first_tranch += student.first_tranch;
                        global.total.second_tranch += student.second_tranch;
                    });
                    global.total.general = global.total.inscription + global.total.first_tranch + global.total.second_tranch;
                    let name = '';
                    let info: {
                        className: string,
                        operator: string,
                    } = {
                        className: classe.name,
                        operator: user.email,
                    }
                    let fileName = `Liste des insolvables de ${info.className}.pdf`;
                    const total = {
                        inscription: 0,
                        first_tranch: 0,
                        second_tranch: 0,
                        third_tranch: 0,
                        general: 0
                    }
                    students.filter(s => s.class_id === req.params.id).forEach(student => {
                        const inscription = student.status === 'old' ? classe.inscriptions_olds_students : classe.inscriptions_news_students
                        const first_tranch = student.status === 'old' ? classe.first_tranch_olds_students : classe.first_tranch_news_students
                        const second_tranch = student.status === 'old' ? classe.second_tranch_olds_students : classe.second_tranch_news_students;
        
                        const inscription_rest = inscription - student.inscription;
                        const first_tranch_rest = first_tranch - student.first_tranch;
                        const second_tranch_rest = second_tranch - student.second_tranch;
        
                        const restToPay = (inscription + first_tranch + second_tranch ) - (student.inscription + student.first_tranch + student.second_tranch);
                        const totalToPay = inscription + first_tranch + second_tranch ;
                        const totalPayed = (student.inscription + student.first_tranch + student.second_tranch );
                        total.inscription += student.inscription;
                        total.first_tranch += student.first_tranch;
                        total.second_tranch += student.second_tranch;
                        total.general += totalPayed

                        
                        if (student.inscription == 0) {
                            global_by_class.nothing.ins += 1
                        }
                        else if (student.inscription < inscription ) {
                            global_by_class.avanced.ins += 1
                        }
                        else {
                            global_by_class.payed.ins += 1
                        }

                        if (student.first_tranch == 0) {
                            global_by_class.nothing.ftr += 1
                        }
                        else if (student.first_tranch < first_tranch ) {
                            global_by_class.avanced.ftr += 1
                        }
                        else {
                            global_by_class.payed.ftr += 1
                        }                    
                        
                        if (student.second_tranch == 0) {
                            global_by_class.nothing.str += 1
                        }
                        else if (student.second_tranch < second_tranch ) {
                            global_by_class.avanced.str += 1
                        }
                        else {
                            global_by_class.payed.str += 1
                        }


                        if (totalPayed == 0) {
                            global_by_class.nothing.general += 1
                        }
                        else if (restToPay > 0) {
                            global_by_class.avanced.general += 1
                        }
                        else {
                            global_by_class.payed.general += 1
                        }
                        switch (type) {
                            case '1':
                                if (inscription_rest >= 0) {
                                    student.rest = inscription_rest;
                                    students2.add(student);
                                    fileName = `Inscriptions en ${info.className}.pdf`;
                                }
                                name = 'l\'inscription';
                                break;
                        
                            case '2':
                                if (first_tranch_rest >= 0) {
                                    student.rest = first_tranch_rest;
                                    students2.add(student);
                                    fileName = `Premiere tranche en ${info.className}.pdf`;
                                }
                                name = 'la première tranche';
                                break;
        
                            case '3':
                                if (second_tranch_rest >= 0) {
                                    student.rest = second_tranch_rest;
                                    students2.add(student);
                                    fileName = `Seconde tranche en ${info.className}.pdf`;
                                }
                                name = 'la deuxième tranche';
                                break;
        
                            case '6':
                                fileToRead = 'insolvablesTotal';
                                student.inscription_rest = inscription_rest;
                                student.first_tranch_rest = first_tranch_rest;
                                student.second_tranch_rest = second_tranch_rest;
                                student.restToPay = restToPay;
                                
                                student.inscription_scolarity = inscription;
                                student.first_tranch_scolarity = first_tranch;
                                student.second_tranch_scolarity = second_tranch;
                                student.totalToPay = totalToPay;
        
                                students2 = students;
                                fileName = `Insolvables en ${info.className}.pdf`;
                                name = 'tout';
                                break;
        
                            case '7':
                                fileToRead = 'insolvablesTotal2';
                                student.totalPayed = totalPayed;
                                student.inscription_scolarity = inscription;
                                student.first_tranch_scolarity = first_tranch;
                                student.second_tranch_scolarity = second_tranch;
                                student.totalToPay = totalToPay;
        
                                students2 = students;
                                fileName = `Etat de la scolarite en ${info.className}.pdf`;
                                name = 'tout';
                                break;
                            default:
                                break;
                        }
                    });
                    const html = downloadFs.readFileSync(`src/templates/${fileToRead}.html`, 'utf-8');
                    const document = {
                        html: html,
                        data: {
                            students: [...new Set(students2)],
                            info,
                            name,
                            classe,
                            total,
                            global,
                            global_by_class
                        },
                        path: `docs/${fileName}`
                    };
                    pdf.create(document, optionsPdf)
                        .then(() => {
                            res.download(`docs/${fileName}`)
                        })
                        .catch(err => {
                            console.log(err);
                            
                            res.status(201).json(err)
                        })
                })
            })
        });
    })
}
module.exports.downloadRecette = (req, res) => {
    let global = {
        payed: {
            ins: 0,
            ftr: 0,
            str: 0,
            ttr: 0,
            general: 0
        },
        avanced: {
            ins: 0,
            ftr: 0,
            str: 0,
            ttr: 0,
            general: 0
        },
        nothing: {
            ins: 0,
            ftr: 0,
            str: 0,
            ttr: 0,
            general: 0
        },
        total: {
            inscription: 0,
            first_tranch: 0,
            second_tranch: 0,
            third_tranch: 0,
            general: 0
        }
    };
    req.connection.query(`SELECT s.status, s.inscription, s.first_tranch,
                            s.second_tranch, s.third_tranch,
                            c.inscriptions_olds_students, c.inscriptions_news_students,
                            c.first_tranch_olds_students , c.first_tranch_news_students,
                            c.second_tranch_olds_students , c.second_tranch_news_students,
                            c.third_tranch_olds_students , c.third_tranch_news_students
                            FROM students s JOIN class c ON s.class_id = c.id`, [], (e, stu) => {
        if (e) console.log(e);
        

        stu.forEach(student => {

            const inscription = student.status === 'old' ? student.inscriptions_olds_students : student.inscriptions_news_students
            const first_tranch = student.status === 'old' ? student.first_tranch_olds_students : student.first_tranch_news_students
            const second_tranch = student.status === 'old' ? student.second_tranch_olds_students : student.second_tranch_news_students;

            const restToPay = (inscription + first_tranch + second_tranch ) - (student.inscription + student.first_tranch + student.second_tranch);
            const totalPayed = (student.inscription + student.first_tranch + student.second_tranch);

            if (student.inscription == 0) {
                global.nothing.ins += 1
            }
            else if (student.inscription < inscription ) {
                global.avanced.ins += 1
            }
            else {
                global.payed.ins += 1
            }

            if (student.first_tranch == 0) {
                global.nothing.ftr += 1
            }
            else if (student.first_tranch < first_tranch ) {
                global.avanced.ftr += 1
            }
            else {
                global.payed.ftr += 1
            }                    
            
            if (student.second_tranch == 0) {
                global.nothing.str += 1
            }
            else if (student.second_tranch < second_tranch ) {
                global.avanced.str += 1
            }
            else {
                global.payed.str += 1
            }
            

            if (totalPayed == 0) {
                global.nothing.general += 1
            }
            else if (restToPay > 0) {
                global.avanced.general += 1
            }
            else {
                global.payed.general += 1
            }
            global.total.inscription += student.inscription;
            global.total.first_tranch += student.first_tranch;
            global.total.second_tranch += student.second_tranch;
        })
        
        global.total.general = global.total.inscription + global.total.first_tranch + global.total.second_tranch;
        req.connection.query(`SELECT p.amount, p.recu_name, p.student_id, p.id, c.name as class_name, s.name, p.created_at
                            FROM payments p 
                            JOIN students s ON s.id = p.student_id 
                            JOIN class c ON c.id = s.class_id`, 
                            [], (err, payments) => {
            if(err) console.log(err);
            
            const html = downloadFs.readFileSync('src/templates/recettes.html', 'utf-8');
            let name = '';
            let error = 'Aucun payement effectue';
            if (req.params.type === '1') { 
                let date = new Date(req.params.date).getDate() + '/' + ( new Date(req.params.date).getMonth() + 1) + '/' + new Date(req.params.date).getFullYear()
                name = 'Recette Journaliere (' + date + ')';
                payments = payments.length > 0 ? payments.filter(p => {
                    let payment_date = new Date(p.created_at).getDate() + '/' + ( new Date(req.params.date).getMonth() + 1) +  '/' + new Date(p.created_at).getFullYear();
                    // console.log(payment_date);
                    
                    if (date === payment_date) {
                        
                        return p;
                    }
                }) : [];
                error += ` le ${date}`;
            }
            else if (req.params.type === '3') {
                let date = new Date(req.params.date).getDate() + '/' + ( new Date(req.params.date).getMonth() + 1) + '/' + new Date(req.params.date).getFullYear()
                let to = new Date(req.params.to).getDate() + '/' + ( new Date(req.params.to).getMonth() + 1) + '/' + new Date(req.params.to).getFullYear()
                name = `Recette periodique du ${date} au ${to}`;
                payments = payments.length > 0 ? payments.filter(p => {
                    let d1 = new Date(req.params.date).getTime();
                    let d2 = new Date(req.params.to).getTime();
                    let r = new Date(p.created_at).getFullYear() + '-' +( new Date(p.created_at).getMonth() + 1) + '-' + new Date(p.created_at).getDate();
                    console.log(r);
                    
                    let check = new Date(r).getTime();
                    if((check <= d2 && check >= d1)){
                        return p;
                    }
                }) : [];
                error += ` du ${date} au ${to}`;
            }
            else{
                name = 'Recette Globale'
            }
            let total = 0;
            let student_nber = 0;
            let stuIds = [];
            payments.forEach(p => {
                let payment_date = new Date(p.created_at).getDate() + '/' +( new Date(p.created_at).getMonth() + 1) + '/' + new Date(p.created_at).getFullYear();
                p.payment_date = payment_date
                total += p.amount;
                if (!stuIds.includes(p.student_id)) {
                    stuIds.push(p.student_id)
                    stuIds.forEach(i => {
                        console.log(p.student_id, i);
                        
                    });
                    
                }
            });
            student_nber = stuIds.length;
            const fileName = `${name}.pdf`;
            const document = {
                html: html,
                data: {
                    payments,
                    name,
                    total,
                    global,
                    error,
                    student_nber,
                    isOverZero: payments.length > 0
                },
                path: `docs/${fileName}`
            };
            pdf.create(document, optionsPdf)
                .then(resp => {
                    console.log(resp);
                    res.download(`docs/${fileName}`)
                })
                .catch(err => {
                    console.log(err);
                    res.status(201).json(err)
                })
        })
    })
}
module.exports.etat = (req, res) => {
    req.connection.query('SELECT * FROM class', [], (e, classes) => {
        req.connection.query('SELECT * FROM students', [], (ee, students) => {

            let global = {
                payed: {
                    ins: 0,
                    ftr: 0,
                    str: 0,
                    general: 0
                },
                avanced: {
                    ins: 0,
                    ftr: 0,
                    str: 0,
                    general: 0
                },
                nothing: {
                    ins: 0,
                    ftr: 0,
                    str: 0,
                    general: 0
                },
                total: {
                    inscription: 0,
                    first_tranch: 0,
                    second_tranch: 0,
                    general: 0
                }
            };
            students.forEach(student => {
                const classe = classes.filter(c => c.id === student.class_id);
                
                const inscription = student.status === 'old' ? classe.inscriptions_olds_students : classe.inscriptions_news_students
                const first_tranch = student.status === 'old' ? classe.first_tranch_olds_students : classe.first_tranch_news_students
                const second_tranch = student.status === 'old' ? classe.second_tranch_olds_students : classe.second_tranch_news_students;

                const restToPay = (inscription + first_tranch + second_tranch ) - (student.inscription + student.first_tranch + student.second_tranch );
                const totalToPay = inscription + first_tranch + second_tranch ;
                const totalPayed = (student.inscription + student.first_tranch + student.second_tranch );

                student.totalPayed = totalPayed;
                student.inscription_scolarity = inscription;
                student.first_tranch_scolarity = first_tranch;
                student.second_tranch_scolarity = second_tranch;
                student.totalToPay = totalToPay;

                if (student.inscription == 0) {
                    global.nothing.ins += 1
                }
                else if (student.inscription < inscription ) {
                    global.avanced.ins += 1
                }
                else {
                    global.payed.ins += 1
                }

                if (student.first_tranch == 0) {
                    global.nothing.ftr += 1
                }
                else if (student.first_tranch < first_tranch ) {
                    global.avanced.ftr += 1
                }
                else {
                    global.payed.ftr += 1
                }                    
                
                if (student.second_tranch == 0) {
                    global.nothing.str += 1
                }
                else if (student.second_tranch < second_tranch ) {
                    global.avanced.str += 1
                }
                else {
                    global.payed.str += 1
                }

                if (totalPayed == 0) {
                    global.nothing.general += 1
                }
                else if (restToPay > 0) {
                    global.avanced.general += 1
                }
                else {
                    global.payed.general += 1
                }
                global.total.inscription += student.inscription;
                global.total.first_tranch += student.first_tranch;
                global.total.second_tranch += student.second_tranch;


            })
            global.total.general =  global.total.inscription + global.total.first_tranch + global.total.second_tranch;
            classes.forEach(classe => {
                const total = {
                    inscription: 0,
                    first_tranch: 0,
                    second_tranch: 0,
                    general: 0
                }
                let global_by_class = {
                    payed: {
                        ins: 0,
                        ftr: 0,
                        str: 0,
                        general: 0
                    },
                    avanced: {
                        ins: 0,
                        ftr: 0,
                        str: 0,
                        general: 0
                    },
                    nothing: {
                        ins: 0,
                        ftr: 0,
                        str: 0,
                        general: 0
                    },
                    total: {
                        inscription: 0,
                        first_tranch: 0,
                        second_tranch: 0,
                        general: 0
                    }
                };
                const st = students.filter(s => s.class_id == classe.id).forEach(student => {
                    const inscription = student.status === 'old' ? classe.inscriptions_olds_students : classe.inscriptions_news_students
                    const first_tranch = student.status === 'old' ? classe.first_tranch_olds_students : classe.first_tranch_news_students
                    const second_tranch = student.status === 'old' ? classe.second_tranch_olds_students : classe.second_tranch_news_students;
    
                    const restToPay = (inscription + first_tranch + second_tranch ) - (student.inscription + student.first_tranch + student.second_tranch );
                    const totalPayed = (student.inscription + student.first_tranch + student.second_tranch);
                    total.inscription += student.inscription;
                    total.first_tranch += student.first_tranch;
                    total.second_tranch += student.second_tranch;
                    total.general += totalPayed

                    
                    if (student.inscription == 0) {
                        global_by_class.nothing.ins += 1
                    }
                    else if (student.inscription < inscription ) {
                        global_by_class.avanced.ins += 1
                    }
                    else {
                        global_by_class.payed.ins += 1
                    }

                    if (student.first_tranch == 0) {
                        global_by_class.nothing.ftr += 1
                    }
                    else if (student.first_tranch < first_tranch ) {
                        global_by_class.avanced.ftr += 1
                    }
                    else {
                        global_by_class.payed.ftr += 1
                    }                    
                    
                    if (student.second_tranch == 0) {
                        global_by_class.nothing.str += 1
                    }
                    else if (student.second_tranch < second_tranch ) {
                        global_by_class.avanced.str += 1
                    }
                    else {
                        global_by_class.payed.str += 1
                    }

                    if (totalPayed == 0) {
                        global_by_class.nothing.general += 1
                    }
                    else if (restToPay > 0) {
                        global_by_class.avanced.general += 1
                    }
                    else {
                        global_by_class.payed.general += 1
                    }
                })
                classe.global_by_class = global_by_class;
                classe.total = total
                classe.students = st
                return classe
            })
            // console.log(classes);
            
            const html = downloadFs.readFileSync(`src/templates/rec_glob.html`, 'utf-8');
            const document = {
                html: html,
                data: {
                    classes,
                    global
                },
                path: `docs/recette_globale.pdf`
            };
            pdf.create(document, optionsPdf)
                .then(() => {
                    res.download(`docs/recette_globale.pdf`)
                })
                .catch(err => {
                    console.log(err);
                    
                    res.status(201).json(err)
                })
        })
    })
}