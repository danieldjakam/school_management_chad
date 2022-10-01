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

module.exports.downloadBulletin = (req, res) => {
    const { exam_id, student_id, class_id, year } = req.params;
    const html = downloadFs.readFileSync('src/templates/Bulletin.html', 'utf-8');
    let totalPoint: number = 0;
    let totalNote: number;
    let diviser: number = 0;
    let badCompetences = [];

    req.connection.query('SELECT * FROM trims WHERE id = ?', [exam_id], (t, exam) => {
        req.connection.query('SELECT * FROM students WHERE class_id = ? AND students.school_year = ?', [class_id, year], (errr, allStudents: []) => {
            req.connection.query(`SELECT students.name, teachers.name as tName, teachers.subname as tSubname, 
                                    students.subname, students.birthday, students.sex, class.name as cName  
                                    FROM students LEFT JOIN class ON class.id = students.class_id 
                                    LEFT JOIN teachers ON teachers.class_id = class.id WHERE students.id = ? AND students.school_year = ?`, [student_id, year], 
                                    function (err, student, fields) {
                if (err) console.log(err);
                const stud: {
                    name: string,
                    subname: string,
                    cName: string,
                    tName: string,
                    tSubname: string,
                    sex: string,
                    birthday: string,
                } = student[0];
                let info: {
                    className: string,
                    teacherName: string
                    teacherSubname: string
                } = {
                    className: stud.cName,
                    teacherName: stud.tName,
                    teacherSubname: stud.tSubname,
                }
                stud.sex = stud.sex === 'm' ? 'Masculin' : 'Feminin';
                const date = new Date(stud.birthday).getDate() + ' ' + months[new Date(stud.birthday).getMonth()] + " " + new Date(stud.birthday).getUTCFullYear()
                stud.birthday = date;
    
                req.connection.query('SELECT * FROM notes WHERE exam_id = ? AND class_id = ? AND student_id = ?', [exam_id, class_id, student_id], (err2, notes) => {
                    if (err2) console.log(err2);
                    notes.forEach(note => {
                        totalPoint += parseInt(note.value);
                    });
                    req.connection.query(`SELECT subjects.name, subjects.id, subjects.over 
                                            FROM subjects JOIN sections
                                            ON sections.id = subjects.section 
                                            WHERE sections.type = 1`, (err3, subjects) => {
                        subjects.forEach((subject) => {
                            const note = notes.filter(n => n.subject_id === subject.id.toString()).length > 0 ? 
                                                        parseFloat(notes.filter(n => n.subject_id === subject.id.toString())[0].value) 
                                                    : 0;
                            subject.mi_over = subject.over / 2
                            subject.value = note;
                            diviser += subject.over;
                            if (note < 5) {
                                badCompetences.push(subject.name);
                            }
                        })
                        req.connection.query('SELECT * FROM stats WHERE class_id = ? AND exam_id = ? ', [class_id, exam_id], (errrt, stats) => {
                            const rangedArray = stats.sort((a, b) => b.totalPoints - a.totalPoints);
                            const g = stats.sort((a, b) => b.totalPoints - a.totalPoints);
                            let lastPoints: number = 0;
                            g.forEach((ey: {
                                totalPoints: number
                            }) => {
                                lastPoints = ey.totalPoints;
                            })
                            let rang = 0;
                            rangedArray.forEach((s: {
                                student_id: string
                            }, c) => {
                                if (s.student_id === student_id) {
                                    rang = c + 1
                                }
                            })
                            const document = {
                                html: html,
                                data: {
                                    student: stud,
                                    info: info,
                                    diviser: diviser,
                                    totalPoints: totalPoint,
                                    rank: rang,
                                    average: Math.round(((totalPoint / diviser) * 20) * 100) / 100,
                                    totalNote: totalNote,
                                    subjects,
                                    badCompetences,
                                    exam: exam[0],
                                    totalStudent: allStudents.length,
                                    notes: notes
                                },
                                path: `docs/${stud.name}-${exam[0].name}.pdf`
                            };
                            pdf.create(document, optionsPdf)
                                .then(resp => {
                                    res.download(resp.filename)
                                })
                                .catch(err => {
                                    console.log(err);
                                    res.status(201).json({ err, f: document.data.subjects })
                                })
                        })
                    })
                })
            });
        })
    })
}
module.exports.downloadBulletinByClass = (req, res) => {
    const zip = new admZip();
    const { exam_id, class_id, year } = req.params;
    const html = downloadFs.readFileSync('src/templates/Bulletin.html', 'utf-8');
    req.connection.query('SELECT * FROM trims WHERE id = ?', [exam_id], (t, exam) => {
        req.connection.query(`SELECT students.id, students.name, teachers.name as tName, teachers.subname as tSubname, students.subname, 
                                students.birthday, students.sex, class.name as cName  FROM students 
                                LEFT JOIN class ON class.id = students.class_id 
                                LEFT JOIN teachers ON teachers.class_id = class.id WHERE students.class_id = ? AND students.school_year = ?`, 
            [class_id, year], function (err, students) {
            if (err) console.log(err);
            else{
                const dirPath = `docs/${students[0].cName}-${exam[0].name}`;
                if (!downloadFs.existsSync(dirPath)) downloadFs.mkdirSync(dirPath);
                students.forEach(student => {
                    let totalPoint: number = 0;
                    let totalNote: number;
                    let badCompetences = [];
                    let diviser: number = 0;
                    const student_id = student.id;
                    const stud: {
                        name: string,
                        subname: string,
                        cName: string,
                        tName: string,
                        tSubname: string,
                        sex: string,
                        birthday: string,
                    } = students.find(s => s.id == student.id);
                    let info: {
                        className: string,
                        teacherName: string
                        teacherSubname: string
                    } = {
                        className: stud.cName,
                        teacherName: stud.tName,
                        teacherSubname: stud.tSubname,
                    }
                    stud.sex = stud.sex === 'm' ? 'Masculin' : 'Feminin';
                    const date = new Date(stud.birthday).getDate() + ' ' + months[new Date(stud.birthday).getMonth()] + " " + new Date(stud.birthday).getUTCFullYear()
                    stud.birthday = date;
        
                    req.connection.query('SELECT * FROM notes WHERE exam_id = ? AND class_id = ? AND student_id = ?', [exam_id, class_id, student_id], (err2, notes) => {
                        if (err2) console.log(err2);
                        notes.forEach(note => {
                            totalPoint += parseInt(note.value);
                        });
                        req.connection.query(`SELECT subjects.name, subjects.id, subjects.over 
                                                FROM subjects JOIN sections
                                                ON sections.id = subjects.section 
                                                WHERE sections.type = 1`, (err3, subjects) => {
                            subjects.forEach((subject) => {
                                const note = notes.filter(n => n.subject_id === subject.id.toString()).length > 0 ? 
                                                            parseFloat(notes.filter(n => n.subject_id === subject.id.toString())[0].value) 
                                                        : 0;
                                subject.mi_over = subject.over / 2
                                subject.value = note;
                                diviser += subject.over
                                if (note < 5) {
                                    badCompetences.push(subject.name);
                                }
                            })
                            req.connection.query('SELECT * FROM stats WHERE class_id = ? AND exam_id = ? ', [class_id, exam_id], (errrt, stats) => {
                                const rangedArray = stats.sort((a, b) => b.totalPoints - a.totalPoints);
                                let rang = 0;
                                rangedArray.forEach((s: {
                                    student_id: string
                                }, c) => {
                                    if (s.student_id == student_id) {
                                        rang = c + 1
                                    }
                                })
                                const document = {
                                    html: html,
                                    data: {
                                        student: stud,
                                        info: info,
                                        diviser: diviser,
                                        totalPoints: totalPoint,
                                        rank: rang,
                                        average: Math.round(((totalPoint / diviser) * 20) * 100) / 100,
                                        totalNote: totalNote,
                                        subjects,
                                        exam: exam[0],
                                        badCompetences,
                                        totalStudent: students.length,
                                        notes: notes
                                    },
                                    path: `${dirPath}/${(stud.name + ' ' + stud.subname).replaceAll(' ', '_')}.pdf`
                                };
                                pdf.create(document, optionsPdf)
                                        .then(resp => {
                                            zip.addLocalFile(`${dirPath}/${(student.name + ' ' + student.subname).replaceAll(' ', '_')}.pdf`);
                                            return resp;
                                        })
                                        .catch(err => {
                                            console.log(err);
                                            res.status(201).json({ err, f: document.data.subjects })
                                        })
                            })
                        })
                    })
                })
            }
        });
    })
}
module.exports.downloadBulletin2 = (req, res) => {
    const { exam_id, student_id, class_id, year } = req.params;
    const html = downloadFs.readFileSync('src/templates/Bulletin2.html', 'utf-8');
    let totalPoint: number = 0;
    let totalNote: number;
    let badCompetences = [];
    let diviser: number = 0;

    req.connection.query('SELECT * FROM trims WHERE id = ?', [exam_id], (e, exam) => {
        req.connection.query('SELECT * FROM students WHERE class_id = ? AND  students.school_year = ?', [class_id, year], (errr, allStudents: []) => {
            req.connection.query(`SELECT students.name, teachers.name as tName, teachers.subname as tSubname, 
                                students.subname, students.birthday, students.sex, class.name as cName  FROM students 
                                LEFT JOIN class ON class.id = students.class_id 
                                LEFT JOIN teachers ON teachers.class_id = class.id WHERE students.id = ?`, [student_id], function (err, student, fields) {
                if (err) console.log(err);
                const stud: {
                    name: string,
                    subname: string,
                    cName: string,
                    tName: string,
                    tSubname: string,
                    sex: string,
                    birthday: string,
                } = student[0];
                let info: {
                    className: string,
                    teacherName: string
                    teacherSubname: string
                } = {
                    className: stud.cName,
                    teacherName: stud.tName,
                    teacherSubname: stud.tSubname,
                }
                stud.sex = stud.sex === 'm' ? 'Masculin' : 'Feminin';
                const date = new Date(stud.birthday).getDate() + ' ' + months[new Date(stud.birthday).getMonth()] + " " + new Date(stud.birthday).getUTCFullYear()
                stud.birthday = date;
    
                req.connection.query('SELECT * FROM notes_primary WHERE exam_id = ? AND class_id = ? AND student_id = ?', 
                                    [exam_id, class_id, student_id], (err2, notes) => {
                    if (err2) console.log(err2);
                    notes.forEach(note => {
                        totalPoint += parseInt(note.value);
                    });
                    req.connection.query(`SELECT subjects.name, subjects.id, subjects.over 
                                            FROM subjects JOIN sections
                                            ON sections.id = subjects.section 
                                            WHERE sections.type = 2`, (err3, subjects) => {
                        subjects.forEach((subject) => {
                            
                            const note1 = notes.filter(n => n.subject_id === subject.id.toString() 
                                            && n.subject_type === 'devoir').length > 0 
                                                ? 
                                                    parseFloat(notes.filter(n => n.subject_id === subject.id.toString() 
                                                    && n.subject_type === 'devoir')[0].value) 
                                                : 0
                            const note2 = notes.filter(n => n.subject_id === subject.id.toString() 
                                && n.subject_type === 'compo').length > 0 
                                    ? 
                                        parseFloat(notes.filter(n => n.subject_id === subject.id.toString() 
                                        && n.subject_type === 'compo')[0].value) 
                                    : 0
                            subject.note1 = note1
                            subject.note2 = note2;
                            subject.avera = (note1 + note2) / 2
                            diviser += subject.over
                            
                            if ((note1 + note2) < 5) {
                                badCompetences.push(subject.name);
                            }
                        })
                        req.connection.query('SELECT * FROM stats WHERE class_id = ? AND exam_id = ? ', [class_id, exam_id], (errrt, stats) => {
                            const rangedArray = stats.sort((a, b) => b.totalPoints - a.totalPoints);
                            const g = stats.sort((a, b) => b.totalPoints - a.totalPoints);
                            let lastPoints: number = 0;
                            g.forEach((ey: {
                                totalPoints: number
                            }) => {
                                lastPoints = ey.totalPoints;
                            })
                            let rang = 0;
                            rangedArray.forEach((s: {
                                student_id: string
                            }, c) => {
                                if (s.student_id === student_id) {
                                    rang = c + 1
                                }
                            })
                            const document = {
                                html: html,
                                data: {
                                    student: stud,
                                    info: info,
                                    diviser: diviser,
                                    totalPoints: totalPoint,
                                    rank: rang,
                                    average: Math.round(((totalPoint / (diviser * 2)) * 20) * 100) / 100,
                                    totalNote: totalNote,
                                    subjects,
                                    exam: exam[0],
                                    totalStudent: allStudents.length,
                                    notes: notes,
                                    badCompetences
                                },
                                path: `docs/${stud.name}-${exam[0].name}.pdf`
                            };
                            
                            pdf.create(document, optionsPdf)
                                .then(resp => {
                                    res.download(resp.filename)
                                })
                                .catch(err => {
                                    console.log(err);
                                    res.status(201).json({ err, f: document.data.subjects })
                                })
                        })
                    })
                })
            });
        })
    })
}

module.exports.downloadBulletinByClass2 = (req, res) => {
    const { exam_id, class_id, year } = req.params;
    const html = downloadFs.readFileSync('src/templates/Bulletin2.html', 'utf-8');

    req.connection.query('SELECT * FROM trims WHERE id = ?', [exam_id], (t, exam) => {
        req.connection.query(`SELECT students.id, students.name, teachers.name as tName, teachers.subname as tSubname, students.subname, 
                                students.birthday, students.sex, class.name as cName  FROM students 
                                LEFT JOIN class ON class.id = students.class_id 
                                LEFT JOIN teachers ON teachers.class_id = class.id WHERE students.class_id = ? AND students.school_year = ?`, 
            [class_id, year], function (err, students, fields) {
            if (err) console.log(err);
            else{
                const dirPath = `docs/${students[0].cName}-${exam[0].name}`;
                if (!downloadFs.existsSync(dirPath)) downloadFs.mkdirSync(dirPath);
                students.forEach(student => {
                    let totalPoint: number = 0;
                    let totalNote: number
                    let diviser: number = 0;
                    let badCompetences = [];
                    const student_id = student.id;
                    const stud: {
                        name: string,
                        subname: string,
                        cName: string,
                        tName: string,
                        tSubname: string,
                        sex: string,
                        birthday: string,
                    } = students.find(s => s.id == student.id);
                    let info: {
                        className: string,
                        teacherName: string
                        teacherSubname: string
                    } = {
                        className: stud.cName,
                        teacherName: stud.tName,
                        teacherSubname: stud.tSubname,
                    }
                    stud.sex = stud.sex === 'm' ? 'Masculin' : 'Feminin';
                    const date = new Date(stud.birthday).getDate() + ' ' + months[new Date(stud.birthday).getMonth()] + " " + new Date(stud.birthday).getUTCFullYear()
                    stud.birthday = date;
        
                    
                    req.connection.query('SELECT * FROM notes_primary WHERE exam_id = ? AND class_id = ? AND student_id = ?', 
                                        [exam_id, class_id, student_id], (err2, notes) => {
                        if (err2) console.log(err2);
                        notes.forEach(note => {
                            totalPoint += parseInt(note.value);
                        });
                        req.connection.query(`SELECT subjects.name, subjects.id, subjects.over 
                                                FROM subjects JOIN sections
                                                ON sections.id = subjects.section 
                                                WHERE sections.type = 2`, (err3, subjects) => {
                            subjects.forEach((subject) => {
                                
                                const note1 = notes.filter(n => n.subject_id === subject.id.toString() 
                                                && n.subject_type === 'devoir').length > 0 
                                                    ? 
                                                        parseFloat(notes.filter(n => n.subject_id === subject.id.toString() 
                                                        && n.subject_type === 'devoir')[0].value) 
                                                    : 0
                                const note2 = notes.filter(n => n.subject_id === subject.id.toString() 
                                    && n.subject_type === 'compo').length > 0 
                                        ? 
                                            parseFloat(notes.filter(n => n.subject_id === subject.id.toString() 
                                            && n.subject_type === 'compo')[0].value) 
                                        : 0
                                subject.note1 = note1
                                subject.note2 = note2;
                                subject.avera = (note1 + note2) / 2
                                diviser += subject.over
                                if ((note1 + note2) < 5) {
                                    badCompetences.push(subject.name);
                                }
                            })
                            req.connection.query('SELECT * FROM stats WHERE class_id = ? AND exam_id = ? ', [class_id, exam_id], (errrt, stats) => {
                                const rangedArray = stats.sort((a, b) => b.totalPoints - a.totalPoints);
                                const g = stats.sort((a, b) => b.totalPoints - a.totalPoints);
                                let lastPoints: number = 0;
                                g.forEach((ey: {
                                    totalPoints: number
                                }) => {
                                    lastPoints = ey.totalPoints;
                                })
                                let rang = 0;
                                rangedArray.forEach((s: {
                                    student_id: string
                                }, c) => {
                                    if (s.student_id == student_id) {
                                        rang = c + 1
                                    }
                                })
                                const document = {
                                    html: html,
                                    data: {
                                        student: stud,
                                        info: info,
                                        diviser: diviser,
                                        totalPoints: totalPoint,
                                        rank: rang,
                                        average: Math.round(((totalPoint / (diviser * 2)) * 20) * 100) / 100,
                                        totalNote: totalNote,
                                        subjects,
                                        exam: exam[0],
                                        totalStudent: students.length,
                                        notes: notes,
                                        badCompetences
                                    },
                                    path: `${dirPath}/${stud.name}-${exam[0].name}.pdf`
                                };
                                
                                pdf.create(document, optionsPdf)
                                    .then(resp => {
                                        // res.download(resp.filename)
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        res.status(201).json({ err, f: document.data.subjects })
                                    })
                            })
                        })
                    })
                })
            }
        });
    })
}






module.exports.downloadAnnualBulletin = (req, res) => {
    const { exam_id, student_id, class_id, year } = req.params;
    const html = downloadFs.readFileSync('src/templates/BulletinAnnual.html', 'utf-8');
    let totalPoint: number = 0;
    let totalPoint1: number = 0;
    let totalPoint2: number = 0;
    let totalPoint3: number = 0;
    let totalNote: number
    let diviser: number = 0;
    let badCompetences = [];

    req.connection.query('SELECT * FROM annual_exams WHERE id = ?', [exam_id], (t, exam) => {
        req.connection.query('SELECT * FROM trims', (e, trims) => {
            req.connection.query('SELECT * FROM students WHERE class_id = ? AND students.school_year = ?', [class_id, year], (errr, allStudents: []) => {
                req.connection.query(`SELECT students.name, teachers.name as tName, teachers.subname as tSubname, students.subname, 
                                        students.birthday, students.sex, class.name as cName  FROM students 
                                        LEFT JOIN class ON class.id = students.class_id 
                                        LEFT JOIN teachers ON teachers.class_id = class.id WHERE students.id = ? AND students.school_year = ?`, 
                                        [student_id, year], function (err, student, fields) {
                    if (err) console.log(err);
                    const stud: {
                        name: string,
                        subname: string,
                        cName: string,
                        tName: string,
                        tSubname: string,
                        sex: string,
                        birthday: string,
                    } = student[0];
                    let info: {
                        className: string,
                        teacherName: string
                        teacherSubname: string
                    } = {
                        className: stud.cName,
                        teacherName: stud.tName,
                        teacherSubname: stud.tSubname,
                    }
                    stud.sex = stud.sex === 'm' ? 'Masculin' : 'Feminin';
                    const date = new Date(stud.birthday).getDate() + ' ' + months[new Date(stud.birthday).getMonth()] + " " + new Date(stud.birthday).getUTCFullYear()
                    stud.birthday = date;
        
                    req.connection.query('SELECT * FROM notes WHERE class_id = ? AND student_id = ?', [class_id, student_id], (err2, notes) => {
                        if (err2) console.log(err2);
                        notes.filter(n => n.exam_id == exam_id).forEach(note => {
                            totalPoint += parseInt(note.value);
                        });
                        notes.filter(n => n.exam_id == trims[0].id).forEach(note => {
                            totalPoint1 += parseInt(note.value);
                        });
                        notes.filter(n => n.exam_id == trims[1].id).forEach(note => {
                            totalPoint2 += parseInt(note.value);
                        });
                        notes.filter(n => n.exam_id == trims[2].id).forEach(note => {
                            totalPoint3 += parseInt(note.value);
                        });
                        req.connection.query(`SELECT subjects.name, subjects.id, subjects.over 
                                                FROM subjects JOIN sections
                                                ON sections.id = subjects.section 
                                                WHERE sections.type = 1`, (err3, subjects) => {
                            subjects.forEach((subject) => {
                                
                                
                                
                                const note1     = notes.filter(n => n.subject_id === subject.id.toString() 
                                                    && n.exam_id === trims[0].id).length > 0 
                                                ? 
                                                    parseFloat(notes.filter(n => n.subject_id === subject.id.toString() 
                                                    && n.exam_id === trims[0].id)[0].value)
                                                : 0

                                const note2     = notes.filter(n => n.subject_id === subject.id.toString() 
                                                    && n.exam_id === trims[1].id).length > 0 
                                                ? 
                                                    parseFloat(notes.filter(n => n.subject_id === subject.id.toString() 
                                                    && n.exam_id === trims[1].id)[0].value) 
                                                : 0

                                const note3     = notes.filter(n => n.subject_id === subject.id.toString() 
                                                    && n.exam_id === trims[2].id).length > 0 
                                                ? 
                                                    parseFloat(notes.filter(n => n.subject_id === subject.id.toString() 
                                                    && n.exam_id === trims[2].id)[0].value)
                                                : 0

                                subject.mi_over = subject.over / 2
                                subject.note1 = note1;
                                subject.note2 = note2;
                                subject.note3 = note3;
                                diviser += subject.over
                                
                                if ((note1 + note2 + note3) / 3 < 5) {
                                    badCompetences.push(subject.name);
                                }
                            })
                            req.connection.query('SELECT * FROM stats WHERE class_id = ?', [class_id], (errrt, stats) => {
                                let rang = 0;
                                let rank1 = 0;
                                let rank2 = 0;
                                let rank3 = 0;
                                
                                const rangedArray = stats.filter(st => st.exam_id == exam_id).sort((a, b) => b.totalPoints - a.totalPoints);
                                const rangedArray1 = stats.filter(st => st.exam_id == trims[0].id).sort((a, b) => b.totalPoints - a.totalPoints);
                                const rangedArray2 = stats.filter(st => st.exam_id == trims[1].id).sort((a, b) => b.totalPoints - a.totalPoints);
                                const rangedArray3 = stats.filter(st => st.exam_id == trims[2].id).sort((a, b) => b.totalPoints - a.totalPoints);

                                let ids = [];
                                let ids1 = [];
                                let ids2 = [];
                                let ids3 = [];
                                
                                let gAr = [];
                                let gAr1 = [];
                                let gAr2 = [];
                                let gAr3 = [];

                                rangedArray.forEach(r => {
                                    if (!ids.includes(r.student_id)) {
                                        ids.push(r.student_id);
                                        gAr.push(r);
                                    }
                                })

                                rangedArray1.forEach(r => {
                                    if (!ids1.includes(r.student_id)) {
                                        ids1.push(r.student_id);
                                        gAr1.push(r);
                                    }
                                })
                                rangedArray2.forEach(r => {
                                    if (!ids2.includes(r.student_id)) {
                                        ids2.push(r.student_id);
                                        gAr2.push(r);
                                    }
                                })
                                rangedArray3.forEach(r => {
                                    if (!ids3.includes(r.student_id)) {
                                        ids3.push(r.student_id);
                                        gAr3.push(r);
                                    }
                                })

                                gAr.forEach((s: {student_id: string}, c: number) => {
                                    if (s.student_id === student_id) {
                                        rang = c + 1
                                        return;
                                    }
                                })



                                gAr1.forEach((s: {student_id: string}, c: number) => {
                                    if (s.student_id === student_id) {
                                        rank1 = c + 1
                                        return;
                                    }
                                })

                                gAr2.forEach((s: {student_id: string}, c: number) => {
                                    if (s.student_id === student_id) {
                                        rank2 = c + 1
                                        return;
                                    }
                                })

                                gAr3.forEach((s: {student_id: string}, c: number) => {
                                    if (s.student_id === student_id) {
                                        rank3 = c + 1
                                        return;
                                    }
                                })

                                const document = {
                                    html: html,
                                    data: {
                                        student: stud,
                                        info: info,
                                        diviser: diviser,
                                        totalPoints: totalPoint,
                                        totalPoints1: totalPoint1,
                                        totalPoints2: totalPoint2,
                                        totalPoints3: totalPoint3,
                                        rank: rang,
                                        rank1,
                                        rank2,
                                        rank3,
                                        trims,
                                        average: Math.round((totalPoint / diviser) * 20 * 100) / 100,
                                        average1: Math.round((totalPoint1 / diviser) * 20 * 100) / 100,
                                        average2: Math.round((totalPoint2 / diviser) * 20 * 100) / 100,
                                        average3: Math.round((totalPoint3 / diviser) * 20 * 100) / 100,
                                        totalNote: totalNote,
                                        subjects,
                                        exam: exam[0],
                                        totalStudent: allStudents.length,
                                        notes: notes,
                                        badCompetences
                                    },
                                    path: `docs/${stud.name}-${exam[0].name}.pdf`
                                };
                                pdf.create(document, optionsPdf)
                                    .then(resp => {
                                        res.download(resp.filename)
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        res.status(201).json({ err, f: document.data.subjects })
                                    })
                            })
                        })
                    })
                });
            })
        })
    })
}

module.exports.downloadAnnualBulletinByClass = (req, res) => {
    // const zip = new admZip();
    const { exam_id, class_id, year } = req.params;
    const html = downloadFs.readFileSync('src/templates/BulletinAnnual.html', 'utf-8');
    req.connection.query('SELECT * FROM annual_exams WHERE id = ?', [exam_id], (t, exam) => {
        req.connection.query(`SELECT students.id, students.name, teachers.name as tName, teachers.subname as tSubname, students.subname, 
                                students.birthday, students.sex, class.name as cName  FROM students 
                                LEFT JOIN class ON class.id = students.class_id 
                                LEFT JOIN teachers ON teachers.class_id = class.id WHERE students.class_id = ? AND students.school_year = ?`, 
        
            [class_id, year], function (err, students) {
                if (err) console.log(err);
                else{
                    req.connection.query('SELECT * FROM trims', (e, trims) => {
                            const dirPath = `docs/${students[0].cName}-${exam[0].name}`;
                            if (!downloadFs.existsSync(dirPath)) downloadFs.mkdirSync(dirPath);
                            students.forEach(student => {
                                let totalPoint: number = 0;
                                let totalPoint1: number = 0;
                                let totalPoint2: number = 0;
                                let totalPoint3: number = 0;
                                let totalNote: number
                                let diviser: number = 0;
                                let badCompetences = [];
                                const student_id = student.id;
                                const stud: {
                                    name: string,
                                    subname: string,
                                    cName: string,
                                    tName: string,
                                    tSubname: string,
                                    sex: string,
                                    birthday: string,
                                } = students.find(s => s.id == student.id);
                                let info: {
                                    className: string,
                                    teacherName: string
                                    teacherSubname: string
                                } = {
                                    className: stud.cName,
                                    teacherName: stud.tName,
                                    teacherSubname: stud.tSubname,
                                }
                                stud.sex = stud.sex === 'm' ? 'Masculin' : 'Feminin';
                                const date = new Date(stud.birthday).getDate() + ' ' + months[new Date(stud.birthday).getMonth()] + " " + new Date(stud.birthday).getUTCFullYear()
                                stud.birthday = date;
                    
                                req.connection.query('SELECT * FROM notes WHERE class_id = ? AND student_id = ?', [class_id, student_id], (err2, notes) => {
                                    if (err2) console.log(err2);
                                    notes.filter(n => n.exam_id == exam_id).forEach(note => {
                                        totalPoint += parseInt(note.value);
                                    });
                                    notes.filter(n => n.exam_id == trims[0].id).forEach(note => {
                                        totalPoint1 += parseInt(note.value);
                                    });
                                    notes.filter(n => n.exam_id == trims[1].id).forEach(note => {
                                        totalPoint2 += parseInt(note.value);
                                    });
                                    notes.filter(n => n.exam_id == trims[2].id).forEach(note => {
                                        totalPoint3 += parseInt(note.value);
                                    });
                                    req.connection.query(`SELECT subjects.name, subjects.id, subjects.over 
                                                            FROM subjects JOIN sections
                                                            ON sections.id = subjects.section 
                                                            WHERE sections.type = 1`, (err3, subjects) => {
                                        subjects.forEach((subject) => {
                                
                                            const note1     = notes.filter(n => n.subject_id === subject.id.toString() 
                                                                && n.exam_id === trims[0].id).length > 0 
                                                            ? 
                                                                parseFloat(notes.filter(n => n.subject_id === subject.id.toString() 
                                                                && n.exam_id === trims[0].id)[0].value)
                                                            : 0
            
                                            const note2     = notes.filter(n => n.subject_id === subject.id.toString() 
                                                                && n.exam_id === trims[1].id).length > 0 
                                                            ? 
                                                                parseFloat(notes.filter(n => n.subject_id === subject.id.toString() 
                                                                && n.exam_id === trims[1].id)[0].value) 
                                                            : 0
            
                                            const note3     = notes.filter(n => n.subject_id === subject.id.toString() 
                                                                && n.exam_id === trims[2].id).length > 0 
                                                            ? 
                                                                parseFloat(notes.filter(n => n.subject_id === subject.id.toString() 
                                                                && n.exam_id === trims[2].id)[0].value)
                                                            : 0
            
                                            subject.mi_over = subject.over / 2
                                            subject.note1 = note1;
                                            subject.note2 = note2;
                                            subject.note3 = note3;
                                            diviser += subject.over
                                                            
                                            if ((note1 + note2 + note3) / 3 < 5) {
                                                badCompetences.push(subject.name);
                                            }
                                        })
                                        req.connection.query('SELECT * FROM stats WHERE class_id = ?', [class_id], (errrt, stats) => {
                                            let rang = 0;
                                            let rank1 = 0;
                                            let rank2 = 0;
                                            let rank3 = 0;
                                            
                                            const rangedArray = stats.filter(st => st.exam_id == exam_id).sort((a, b) => b.totalPoints - a.totalPoints);
                                            const rangedArray1 = stats.filter(st => st.exam_id == trims[0].id).sort((a, b) => b.totalPoints - a.totalPoints);
                                            const rangedArray2 = stats.filter(st => st.exam_id == trims[1].id).sort((a, b) => b.totalPoints - a.totalPoints);
                                            const rangedArray3 = stats.filter(st => st.exam_id == trims[2].id).sort((a, b) => b.totalPoints - a.totalPoints);

                                            let ids  = [];
                                            let ids1 = [];
                                            let ids2 = [];
                                            let ids3 = [];
                                            
                                            let gAr  = [];
                                            let gAr1 = [];
                                            let gAr2 = [];
                                            let gAr3 = [];

                                            rangedArray.forEach(r => {
                                                if (!ids.includes(r.student_id)) {
                                                    ids.push(r.student_id);
                                                    gAr.push(r);
                                                }
                                            })

                                            rangedArray1.forEach(r => {
                                                if (!ids1.includes(r.student_id)) {
                                                    ids1.push(r.student_id);
                                                    gAr1.push(r);
                                                }
                                            })
                                            rangedArray2.forEach(r => {
                                                if (!ids2.includes(r.student_id)) {
                                                    ids2.push(r.student_id);
                                                    gAr2.push(r);
                                                }
                                            })
                                            rangedArray3.forEach(r => {
                                                if (!ids3.includes(r.student_id)) {
                                                    ids3.push(r.student_id);
                                                    gAr3.push(r);
                                                }
                                            })

                                            gAr.forEach((s: {student_id: string}, c: number) => {
                                                if (s.student_id == student_id) {
                                                    rang = c + 1
                                                    return;
                                                }
                                            })

                                            gAr1.forEach((s: {student_id: string}, c: number) => {
                                                if (s.student_id == student_id) {
                                                    rank1 = c + 1
                                                    return;
                                                }
                                            })

                                            gAr2.forEach((s: {student_id: string}, c: number) => {
                                                if (s.student_id == student_id) {
                                                    rank2 = c + 1
                                                    return;
                                                }
                                            })

                                            gAr3.forEach((s: {student_id: string}, c: number) => {
                                                if (s.student_id == student_id) {
                                                    rank3 = c + 1
                                                    return;
                                                }
                                            })
                                            // diviser = subjects.length * 20;
                                            const document = {
                                                html: html,
                                                data: {
                                                    student: stud,
                                                    info: info,
                                                    diviser: diviser,
                                                    totalPoints: totalPoint,
                                                    totalPoints1: totalPoint1,
                                                    totalPoints2: totalPoint2,
                                                    totalPoints3: totalPoint3,
                                                    rank: rang,
                                                    rank1,
                                                    rank2,
                                                    rank3,
                                                    trims,
                                                    average: Math.round((totalPoint / diviser) * 20 * 100) / 100,
                                                    average1: Math.round((totalPoint1 / diviser) * 20 * 100) / 100,
                                                    average2: Math.round((totalPoint2 / diviser) * 20 * 100) / 100,
                                                    average3: Math.round((totalPoint3 / diviser) * 20 * 100) / 100,
                                                    totalNote: totalNote,
                                                    subjects,
                                                    exam: exam[0],
                                                    totalStudent: students.length,
                                                    notes: notes,
                                                    badCompetences
                                                },
                                                path: `${dirPath}/${stud.name}-${exam[0].name}.pdf`
                                            };
                                            pdf.create(document, optionsPdf)
                                                .then(resp => {
                                                    // res.download(resp.filename)
                                                })
                                                .catch(err => {
                                                    console.log(err);
                                                    res.status(201).json({ err, f: document.data.subjects })
                                                })
                                        })
                                    })
                                })
                            })
                    
                })
            }
        });
    })
}
module.exports.downloadAnnualBulletin2 = (req, res) => {
    const { exam_id, student_id, class_id, year } = req.params;
    const html = downloadFs.readFileSync('src/templates/BulletinAnnual2.html', 'utf-8');

    let totalPoint: number = 0;
    let totalPoint1: number = 0;
    let totalPoint2: number = 0;
    let totalPoint3: number = 0;
    let totalNote: number
    let diviser: number = 0;
    let badCompetences = [];

    req.connection.query('SELECT * FROM annual_exams WHERE id = ?', [exam_id], (t, exam) => {
        req.connection.query('SELECT * FROM trims', (e, trims) => {
            req.connection.query('SELECT * FROM students WHERE class_id = ?', [class_id], (errr, allStudents: []) => {
                req.connection.query(`SELECT students.name, teachers.name as tName, teachers.subname as tSubname, students.subname,
                                        students.birthday, students.sex, class.name as cName  FROM students 
                                        LEFT JOIN class ON class.id = students.class_id 
                                        LEFT JOIN teachers ON teachers.class_id = class.id WHERE students.id = ? AND students.school_year = ?`, 
                                        [student_id, year], function (err, student, fields) {
                    if (err) console.log(err);
                    const stud: {
                        name: string,
                        subname: string,
                        cName: string,
                        tName: string,
                        tSubname: string,
                        sex: string,
                        birthday: string,
                    } = student[0];
                    let info: {
                        className: string,
                        teacherName: string
                        teacherSubname: string
                    } = {
                        className: stud.cName,
                        teacherName: stud.tName,
                        teacherSubname: stud.tSubname,
                    }
                    stud.sex = stud.sex === 'm' ? 'Masculin' : 'Feminin';
                    const date = new Date(stud.birthday).getDate() + ' ' + months[new Date(stud.birthday).getMonth()] + " " + new Date(stud.birthday).getUTCFullYear()
                    stud.birthday = date;
        
                    req.connection.query('SELECT * FROM notes_primary WHERE class_id = ? AND student_id = ?', [class_id, student_id], (err2, notes) => {
                        if (err2) console.log(err2);
                        notes.filter(n => n.exam_id == exam_id).forEach(note => {
                            totalPoint += parseInt(note.value);
                        });
                        notes.filter(n => n.exam_id == trims[0].id).forEach(note => {
                            totalPoint1 += parseInt(note.value);
                        });
                        notes.filter(n => n.exam_id == trims[1].id).forEach(note => {
                            totalPoint2 += parseInt(note.value);
                        });
                        notes.filter(n => n.exam_id == trims[2].id).forEach(note => {
                            totalPoint3 += parseInt(note.value);
                        });
                        req.connection.query(`SELECT subjects.name, subjects.id, subjects.over 
                                                FROM subjects JOIN sections
                                                ON sections.id = subjects.section 
                                                WHERE sections.type = 2`, (err3, subjects) => {
                            subjects.forEach((subject) => {
                                
                                
                        
                            const note1d = notes.filter(n => n.subject_id === subject.id.toString() 
                                            && n.exam_id === trims[0].id
                                            && n.subject_type === 'devoir').length > 0 
                                                ? 
                                                notes.filter(n => n.subject_id === subject.id.toString() 
                                                    && n.exam_id === trims[0].id
                                                    && n.subject_type === 'devoir')[0].value
                                                : 0

                            const note1c = notes.filter(n => n.subject_id === subject.id.toString() 
                                            && n.exam_id === trims[0].id
                                            && n.subject_type === 'compo').length > 0 
                                                ? 
                                                notes.filter(n => n.subject_id === subject.id.toString() 
                                                    && n.exam_id === trims[0].id
                                                    && n.subject_type === 'compo')[0].value
                                                : 0
                            
                            const note2d = notes.filter(n => n.subject_id === subject.id.toString() 
                                            && n.exam_id === trims[1].id
                                            && n.subject_type === 'devoir').length > 0 
                                                ? 
                                                notes.filter(n => n.subject_id === subject.id.toString() 
                                                    && n.exam_id === trims[1].id
                                                    && n.subject_type === 'devoir')[0].value
                                                : 0
        
                                const note2c = notes.filter(n => n.subject_id === subject.id.toString() 
                                                && n.exam_id === trims[1].id
                                                && n.subject_type === 'compo').length > 0 
                                                    ? 
                                                    notes.filter(n => n.subject_id === subject.id.toString() 
                                                        && n.exam_id === trims[1].id
                                                        && n.subject_type === 'compo')[0].value
                                                    : 0

                                const note3d = notes.filter(n => n.subject_id === subject.id.toString() 
                                                && n.exam_id === trims[2].id
                                                && n.subject_type === 'devoir').length > 0 
                                                    ? 
                                                    notes.filter(n => n.subject_id === subject.id.toString() 
                                                        && n.exam_id === trims[2].id
                                                        && n.subject_type === 'devoir')[0].value
                                                    : 0
        
                                const note3c = notes.filter(n => n.subject_id === subject.id.toString() 
                                                && n.exam_id === trims[2].id
                                                && n.subject_type === 'compo').length > 0 
                                                    ? 
                                                    notes.filter(n => n.subject_id === subject.id.toString() 
                                                        && n.exam_id === trims[2].id
                                                        && n.subject_type === 'compo')[0].value
                                                    : 0

                                const note1 = parseInt(note1c) + parseInt(note1d);
                                const note2 = parseInt(note2c) + parseInt(note2d);
                                const note3 = parseInt(note3c) + parseInt(note3d);

                                subject.note1d = note1d;
                                subject.note1c = note1c;

                                subject.note2d = note2d;
                                subject.note2c = note2c;
                                
                                subject.note3d = note3d;
                                subject.note3c = note3c;

                                subject.note1 = note1 / 2;
                                subject.note2 = note2 / 2;
                                subject.note3 = note3 / 2;

                                diviser += subject.over * 2;

                                
                                if ((note1 + note2 + note3) / 3 < 5) {
                                    badCompetences.push(subject.name);
                                }
                            })
                            req.connection.query('SELECT * FROM stats WHERE class_id = ?', [class_id], (errrt, stats) => {
                                let rang = 0;
                                let rank1 = 0;
                                let rank2 = 0;
                                let rank3 = 0;
                                
                                const rangedArray = stats.filter(st => st.exam_id == exam_id).sort((a, b) => b.totalPoints - a.totalPoints);
                                const rangedArray1 = stats.filter(st => st.exam_id == trims[0].id).sort((a, b) => b.totalPoints - a.totalPoints);
                                const rangedArray2 = stats.filter(st => st.exam_id == trims[1].id).sort((a, b) => b.totalPoints - a.totalPoints);
                                const rangedArray3 = stats.filter(st => st.exam_id == trims[2].id).sort((a, b) => b.totalPoints - a.totalPoints);

                                let ids = [];
                                let ids1 = [];
                                let ids2 = [];
                                let ids3 = [];
                                
                                let gAr = [];
                                let gAr1 = [];
                                let gAr2 = [];
                                let gAr3 = [];

                                rangedArray.forEach(r => {
                                    if (!ids.includes(r.student_id)) {
                                        ids.push(r.student_id);
                                        gAr.push(r);
                                    }
                                })

                                rangedArray1.forEach(r => {
                                    if (!ids1.includes(r.student_id)) {
                                        ids1.push(r.student_id);
                                        gAr1.push(r);
                                    }
                                })
                                rangedArray2.forEach(r => {
                                    if (!ids2.includes(r.student_id)) {
                                        ids2.push(r.student_id);
                                        gAr2.push(r);
                                    }
                                })
                                rangedArray3.forEach(r => {
                                    if (!ids3.includes(r.student_id)) {
                                        ids3.push(r.student_id);
                                        gAr3.push(r);
                                    }
                                })

                                gAr.forEach((s: {student_id: string}, c: number) => {
                                    if (s.student_id === student_id) {
                                        rang = c + 1
                                        return;
                                    }
                                })



                                gAr1.forEach((s: {student_id: string}, c: number) => {
                                    if (s.student_id === student_id) {
                                        rank1 = c + 1
                                        return;
                                    }
                                })

                                gAr2.forEach((s: {student_id: string}, c: number) => {
                                    if (s.student_id === student_id) {
                                        rank2 = c + 1
                                        return;
                                    }
                                })

                                gAr3.forEach((s: {student_id: string}, c: number) => {
                                    if (s.student_id === student_id) {
                                        rank3 = c + 1
                                        return;
                                    }
                                })
                                // diviser = subjects.length * 20;
                                const document = {
                                    html: html,
                                    data: {
                                        student: stud,
                                        info: info,
                                        diviser: diviser,
                                        totalPoints: totalPoint,
                                        totalPoints1: totalPoint1,
                                        totalPoints2: totalPoint2,
                                        totalPoints3: totalPoint3,
                                        rank: rang,
                                        rank1,
                                        rank2,
                                        rank3,
                                        trims,
                                        average: Math.round((totalPoint / diviser) * 20 * 100) / 100,
                                        average1: Math.round((totalPoint1 / diviser) * 20 * 100) / 100,
                                        average2: Math.round((totalPoint2 / diviser) * 20 * 100) / 100,
                                        average3: Math.round((totalPoint3 / diviser) * 20 * 100) / 100,
                                        totalNote: totalNote,
                                        subjects,
                                        exam: exam[0],
                                        totalStudent: allStudents.length,
                                        notes: notes,
                                        badCompetences
                                    },
                                    path: `docs/${stud.name}-${exam[0].name}.pdf`
                                };
                                pdf.create(document, optionsPdf)
                                    .then(resp => {
                                        res.download(resp.filename)
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        res.status(201).json({ err, f: document.data.subjects })
                                    })
                            })
                        })
                    })
                });
            })
        })
    })
}

module.exports.downloadAnnualBulletinByClass2 = (req, res) => {
    const zip = new admZip();
    const { exam_id, class_id, year } = req.params;
    const html = downloadFs.readFileSync('src/templates/BulletinAnnual2.html', 'utf-8');
    req.connection.query('SELECT * FROM annual_exams WHERE id = ?', [exam_id], (t, exam) => {
        req.connection.query(`SELECT students.id, students.name, teachers.name as tName, teachers.subname as tSubname, students.subname, 
                                students.birthday, students.sex, class.name as cName  FROM students 
                                LEFT JOIN class ON class.id = students.class_id 
                                LEFT JOIN teachers ON teachers.class_id = class.id WHERE students.class_id = ? AND students.school_year = `, 
        
            [class_id, year], function (err, students) {
                if (err) console.log(err);
                else{
                    req.connection.query('SELECT * FROM trims', (e, trims) => {
                            const dirPath = `docs/${students[0].cName}-${exam[0].name}`;
                            if (!downloadFs.existsSync(dirPath)) downloadFs.mkdirSync(dirPath);
                            students.forEach(student => {
                                let totalPoint: number = 0;
                                let totalPoint1: number = 0;
                                let totalPoint2: number = 0;
                                let totalPoint3: number = 0;
                                let totalNote: number
                                let diviser: number = 0;
                                let badCompetences = [];
                                const student_id = student.id;
                                const stud: {
                                    name: string,
                                    subname: string,
                                    cName: string,
                                    tName: string,
                                    tSubname: string,
                                    sex: string,
                                    birthday: string,
                                } = students.find(s => s.id == student.id);
                                let info: {
                                    className: string,
                                    teacherName: string
                                    teacherSubname: string
                                } = {
                                    className: stud.cName,
                                    teacherName: stud.tName,
                                    teacherSubname: stud.tSubname,
                                }
                                stud.sex = stud.sex === 'm' ? 'Masculin' : 'Feminin';
                                const date = new Date(stud.birthday).getDate() + ' ' + months[new Date(stud.birthday).getMonth()] + " " + new Date(stud.birthday).getUTCFullYear()
                                stud.birthday = date;
                    
                                req.connection.query('SELECT * FROM notes_primary WHERE class_id = ? AND student_id = ?', [class_id, student_id], (err2, notes) => {
                                    if (err2) console.log(err2);
                                    notes.filter(n => n.exam_id == exam_id).forEach(note => {
                                        totalPoint += parseInt(note.value);
                                    });
                                    notes.filter(n => n.exam_id == trims[0].id).forEach(note => {
                                        totalPoint1 += parseInt(note.value);
                                    });
                                    notes.filter(n => n.exam_id == trims[1].id).forEach(note => {
                                        totalPoint2 += parseInt(note.value);
                                    });
                                    notes.filter(n => n.exam_id == trims[2].id).forEach(note => {
                                        totalPoint3 += parseInt(note.value);
                                    });
                                    req.connection.query(`SELECT subjects.name, subjects.id, subjects.over 
                                                            FROM subjects JOIN sections
                                                            ON sections.id = subjects.section 
                                                            WHERE sections.type = 2`, (err3, subjects) => {
                                        subjects.forEach((subject) => {
                                            
                                            
                                    
                                        const note1d = notes.filter(n => n.subject_id === subject.id.toString() 
                                                        && n.exam_id === trims[0].id
                                                        && n.subject_type === 'devoir').length > 0 
                                                            ? 
                                                            notes.filter(n => n.subject_id === subject.id.toString() 
                                                                && n.exam_id === trims[0].id
                                                                && n.subject_type === 'devoir')[0].value
                                                            : 0

                                        const note1c = notes.filter(n => n.subject_id === subject.id.toString() 
                                                        && n.exam_id === trims[0].id
                                                        && n.subject_type === 'compo').length > 0 
                                                            ? 
                                                            notes.filter(n => n.subject_id === subject.id.toString() 
                                                                && n.exam_id === trims[0].id
                                                                && n.subject_type === 'compo')[0].value
                                                            : 0
                                        
                                        const note2d = notes.filter(n => n.subject_id === subject.id.toString() 
                                                        && n.exam_id === trims[1].id
                                                        && n.subject_type === 'devoir').length > 0 
                                                            ? 
                                                            notes.filter(n => n.subject_id === subject.id.toString() 
                                                                && n.exam_id === trims[1].id
                                                                && n.subject_type === 'devoir')[0].value
                                                            : 0
                    
                                            const note2c = notes.filter(n => n.subject_id === subject.id.toString() 
                                                            && n.exam_id === trims[1].id
                                                            && n.subject_type === 'compo').length > 0 
                                                                ? 
                                                                notes.filter(n => n.subject_id === subject.id.toString() 
                                                                    && n.exam_id === trims[1].id
                                                                    && n.subject_type === 'compo')[0].value
                                                                : 0

                                            const note3d = notes.filter(n => n.subject_id === subject.id.toString() 
                                                            && n.exam_id === trims[2].id
                                                            && n.subject_type === 'devoir').length > 0 
                                                                ? 
                                                                notes.filter(n => n.subject_id === subject.id.toString() 
                                                                    && n.exam_id === trims[2].id
                                                                    && n.subject_type === 'devoir')[0].value
                                                                : 0
                    
                                            const note3c = notes.filter(n => n.subject_id === subject.id.toString() 
                                                            && n.exam_id === trims[2].id
                                                            && n.subject_type === 'compo').length > 0 
                                                                ? 
                                                                notes.filter(n => n.subject_id === subject.id.toString() 
                                                                    && n.exam_id === trims[2].id
                                                                    && n.subject_type === 'compo')[0].value
                                                                : 0

                                            const note1 = parseInt(note1c) + parseInt(note1d);
                                            const note2 = parseInt(note2c) + parseInt(note2d);
                                            const note3 = parseInt(note3c) + parseInt(note3d);

                                            subject.note1d = note1d;
                                            subject.note1c = note1c;

                                            subject.note2d = note2d;
                                            subject.note2c = note2c;
                                            
                                            subject.note3d = note3d;
                                            subject.note3c = note3c;

                                            subject.note1 = note1 / 2;
                                            subject.note2 = note2 / 2;
                                            subject.note3 = note3 / 2;

                                            diviser += subject.over * 2;

                                            
                                
                                            if ((note1 + note2 + note3) / 3 < 5) {
                                                badCompetences.push(subject.name);
                                            }
                                        })
                                        req.connection.query('SELECT * FROM stats WHERE class_id = ?', [class_id], (errrt, stats) => {
                                            let rang = 0;
                                            let rank1 = 0;
                                            let rank2 = 0;
                                            let rank3 = 0;
                                            
                                            const rangedArray = stats.filter(st => st.exam_id == exam_id).sort((a, b) => b.totalPoints - a.totalPoints);
                                            const rangedArray1 = stats.filter(st => st.exam_id == trims[0].id).sort((a, b) => b.totalPoints - a.totalPoints);
                                            const rangedArray2 = stats.filter(st => st.exam_id == trims[1].id).sort((a, b) => b.totalPoints - a.totalPoints);
                                            const rangedArray3 = stats.filter(st => st.exam_id == trims[2].id).sort((a, b) => b.totalPoints - a.totalPoints);

                                            let ids  = [];
                                            let ids1 = [];
                                            let ids2 = [];
                                            let ids3 = [];
                                            
                                            let gAr  = [];
                                            let gAr1 = [];
                                            let gAr2 = [];
                                            let gAr3 = [];

                                            rangedArray.forEach(r => {
                                                if (!ids.includes(r.student_id)) {
                                                    ids.push(r.student_id);
                                                    gAr.push(r);
                                                }
                                            })

                                            rangedArray1.forEach(r => {
                                                if (!ids1.includes(r.student_id)) {
                                                    ids1.push(r.student_id);
                                                    gAr1.push(r);
                                                }
                                            })
                                            rangedArray2.forEach(r => {
                                                if (!ids2.includes(r.student_id)) {
                                                    ids2.push(r.student_id);
                                                    gAr2.push(r);
                                                }
                                            })
                                            rangedArray3.forEach(r => {
                                                if (!ids3.includes(r.student_id)) {
                                                    ids3.push(r.student_id);
                                                    gAr3.push(r);
                                                }
                                            })

                                            gAr.forEach((s: {student_id: string}, c: number) => {
                                                if (s.student_id == student_id) {
                                                    rang = c + 1
                                                    return;
                                                }
                                            })

                                            gAr1.forEach((s: {student_id: string}, c: number) => {
                                                if (s.student_id == student_id) {
                                                    rank1 = c + 1
                                                    return;
                                                }
                                            })

                                            gAr2.forEach((s: {student_id: string}, c: number) => {
                                                if (s.student_id == student_id) {
                                                    rank2 = c + 1
                                                    return;
                                                }
                                            })

                                            gAr3.forEach((s: {student_id: string}, c: number) => {
                                                if (s.student_id == student_id) {
                                                    rank3 = c + 1
                                                    return;
                                                }
                                            })
                                            // diviser = subjects.length * 20;
                                            const document = {
                                                html: html,
                                                data: {
                                                    student: stud,
                                                    info: info,
                                                    diviser: diviser,
                                                    totalPoints: totalPoint,
                                                    totalPoints1: totalPoint1,
                                                    totalPoints2: totalPoint2,
                                                    totalPoints3: totalPoint3,
                                                    rank: rang,
                                                    rank1,
                                                    rank2,
                                                    rank3,
                                                    trims,
                                                    average: Math.round((totalPoint / diviser) * 20 * 100) / 100,
                                                    average1: Math.round((totalPoint1 / diviser) * 20 * 100) / 100,
                                                    average2: Math.round((totalPoint2 / diviser) * 20 * 100) / 100,
                                                    average3: Math.round((totalPoint3 / diviser) * 20 * 100) / 100,
                                                    totalNote: totalNote,
                                                    subjects,
                                                    exam: exam[0],
                                                    totalStudent: students.length,
                                                    notes: notes,
                                                    badCompetences
                                                },
                                                path: `${dirPath}/${stud.name}-${exam[0].name}.pdf`
                                            };
                                            pdf.create(document, optionsPdf)
                                                .then(resp => {
                                                    // res.download(resp.filename)
                                                })
                                                .catch(err => {
                                                    console.log(err);
                                                    res.status(201).json({ err, f: document.data.subjects })
                                                })
                                        })
                                    })
                                })
                            })
                    
                })
            }
        });
    })
}