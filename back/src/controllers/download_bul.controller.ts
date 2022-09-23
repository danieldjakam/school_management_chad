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
    const { exam_id, student_id, class_id } = req.params;
    const html = downloadFs.readFileSync('src/templates/Bulletin.html', 'utf-8');
    let totalPoint: number = 0;
    let totalNote: number
    let diviser: number = 0;

    req.connection.query('SELECT * FROM trims WHERE id = ?', [exam_id], (t, exam) => {
        req.connection.query('SELECT * FROM students WHERE class_id = ?', [class_id], (errr, allStudents: []) => {
            req.connection.query("SELECT students.name, teachers.name as tName, teachers.subname as tSubname, students.subname, students.birthday, students.sex, class.name as cName  FROM students LEFT JOIN class ON class.id = students.class_id LEFT JOIN teachers ON teachers.class_id = class.id WHERE students.id = ?", [student_id], function (err, student, fields) {
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
                            diviser += subject.over
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
                                    exam: exam[0],
                                    totalStudent: allStudents.length,
                                    notes: notes
                                },
                                path: `docs/${stud.name}.pdf`
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
    const { exam_id, student_id, class_id } = req.params;
    const html = downloadFs.readFileSync('src/templates/Bulletin.html', 'utf-8');
    let Promises = [];

    req.connection.query('SELECT * FROM trims WHERE id = ?', [exam_id], (t, exam) => {
        req.connection.query(`SELECT students.name, teachers.name as tName, teachers.subname as tSubname, students.subname, 
                                students.birthday, students.sex, class.name as cName  FROM students 
                                LEFT JOIN class ON class.id = students.class_id 
                                LEFT JOIN teachers ON teachers.class_id = class.id WHERE students.class_id = ?`, 
            [class_id], function (err, students, fields) {
            if (err) console.log(err);
            else{
                const dirPath = `docs/${students[0].cName}`;
                if (!downloadFs.existsSync(dirPath)) downloadFs.mkdirSync(dirPath);
                students.forEach(student => {
                    let totalPoint: number = 0;
                    let totalNote: number
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
                                        exam: exam[0],
                                        totalStudent: students.length,
                                        notes: notes
                                    },
                                    path: `${dirPath}/${(stud.name + ' ' + stud.subname).replaceAll(' ', '_')}.pdf`
                                };
                                Promises.push(
                                    pdf.create(document, optionsPdf)
                                    .then(resp => {
                                        zip.addLocalFile(`${dirPath}/${(student.name + ' ' + student.subname).replaceAll(' ', '_')}.pdf`);
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        res.status(201).json({ err, f: document.data.subjects })
                                    })
                                )
                            })
                        })
                    })
                })

                // Promise.all(Promises).then(() => {
                //     students.forEach(student => {
                //         const zipPath = `${dirPath}/Bulletins en ${students[0].cName}.zip`;
                //         downloadFs.writeFileSync(zipPath, zip.toBuffer());
                //         res.download(zipPath);
                //     })
                // }).catch((e) => {
                //     console.log(e);
                // })
                console.log(Promises);
                

            }
        });
    })
}
module.exports.downloadBulletin2 = (req, res) => {
    const { exam_id, student_id, class_id } = req.params;
    const html = downloadFs.readFileSync('src/templates/Bulletin2.html', 'utf-8');
    let totalPoint: number = 0;
    let totalNote: number
    let diviser: number = 0;

    req.connection.query('SELECT * FROM trims WHERE id = ?', [exam_id], (e, exam) => {
        req.connection.query('SELECT * FROM students WHERE class_id = ?', [class_id], (errr, allStudents: []) => {
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
                                    notes: notes
                                },
                                path: `docs/${stud.name}.pdf`
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


module.exports.downloadAnnualBulletin = (req, res) => {
    const { exam_id, student_id, class_id } = req.params;
    const html = downloadFs.readFileSync('src/templates/Bulletin2.html', 'utf-8');
    let badCompetence: string[] = [];
    let totalNote: number;
    let to = 0;

    req.connection.query('SELECT * FROM students WHERE class_id = ?', [class_id], (errr, allStudents: []) => {
        req.connection.query("SELECT students.name, teachers.name as tName, teachers.subname as tSubname, students.subname, students.birthday, students.sex, class.name as cName  FROM students LEFT JOIN class ON class.id = students.class_id LEFT JOIN teachers ON teachers.class_id = class.id WHERE students.id = ?", [student_id], function (err, student, fields) {
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

            req.connection.query('SELECT * FROM notesByDomain WHERE exam_id = ? AND class_id = ? AND student_id = ?', [exam_id, class_id, student_id], (err2, notes) => {
                if (err2) console.log(err2);
                req.connection.query('SELECT domains.name, domains.id, (SELECT COUNT(id) FROM activities WHERE activities.domainId = domains.id) as total_activities FROM domains JOIN sections ON sections.id = domains.section WHERE sections.type = 2', (err3, domains) => {
                    req.connection.query('SELECT activities.name, activities.appreciationsNber, activities.id, activities.domainId, activities.appreciationsNber as nber, sections.name as section_name FROM activities JOIN sections ON sections.id = activities.section', [], (a, activities) => {
                        domains.forEach(d => {
                            const act = activities.filter(acr => acr.domainId == d.id);
                            act.forEach(activitie => {
                                to += activitie.over;
                                const note: number = notes.filter(n => n.activitieId == activitie.id).length > 0 ? parseFloat(notes.filter(n => n.activitieId == activitie.id)[0].value) : 0
                                if (activitie.appreciationsNber == 4 && note != 2 || note != 1) {
                                    badCompetence.push(activitie.name)
                                }
                                else if (activitie.appreciationsNber == 3 && note !== 1) {
                                    badCompetence.push(activitie.name)
                                }
                                activitie.note = note;
                            });
                            d.total_activities = d.total_activities + 1;
                            d.activities = act;
                        })

                        const document = {
                            html: html,
                            data: {
                                student: stud,
                                info: info,
                                totalNote: totalNote,
                                badCompetence: badCompetence,
                                domains: domains,
                                totalStudent: allStudents.length,
                                notes: notes
                            },
                            path: `docs/${stud.name}.pdf`
                        };
                        pdf.create(document, optionsPdf)
                            .then(resp => {
                                res.download(resp.filename)
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(201).json({ err, f: document.data })
                            })
                    })
                })
            })
        })
    })
}
module.exports.downloadAnnualBulletin2 = (req, res) => {
    const { exam_id, student_id, class_id } = req.params;
    const html = downloadFs.readFileSync('src/templates/Bulletin2.html', 'utf-8');
    let badCompetence: string[] = [];
    let totalNote: number;
    let to = 0;

    req.connection.query('SELECT * FROM students WHERE class_id = ?', [class_id], (errr, allStudents: []) => {
        req.connection.query("SELECT students.name, teachers.name as tName, teachers.subname as tSubname, students.subname, students.birthday, students.sex, class.name as cName  FROM students LEFT JOIN class ON class.id = students.class_id LEFT JOIN teachers ON teachers.class_id = class.id WHERE students.id = ?", [student_id], function (err, student, fields) {
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

            req.connection.query('SELECT * FROM notesByDomain WHERE exam_id = ? AND class_id = ? AND student_id = ?', [exam_id, class_id, student_id], (err2, notes) => {
                if (err2) console.log(err2);
                req.connection.query('SELECT domains.name, domains.id, (SELECT COUNT(id) FROM activities WHERE activities.domainId = domains.id) as total_activities FROM domains JOIN sections ON sections.id = domains.section WHERE sections.type = 1', (err3, domains) => {
                    req.connection.query('SELECT activities.name, activities.appreciationsNber, activities.id, activities.domainId, activities.appreciationsNber as nber, sections.name as section_name FROM activities JOIN sections ON sections.id = activities.section', [], (a, activities) => {
                        domains.forEach(d => {
                            const act = activities.filter(acr => acr.domainId == d.id);
                            act.forEach(activitie => {
                                to += activitie.over;
                                const note: number = notes.filter(n => n.activitieId == activitie.id).length > 0 ? parseFloat(notes.filter(n => n.activitieId == activitie.id)[0].value) : 0
                                if (activitie.appreciationsNber == 4 && note != 2 || note != 1) {
                                    badCompetence.push(activitie.name)
                                }
                                else if (activitie.appreciationsNber == 3 && note !== 1) {
                                    badCompetence.push(activitie.name)
                                }
                                activitie.note = note;
                            });
                            d.total_activities = d.total_activities + 1;
                            d.activities = act;
                        })

                        const document = {
                            html: html,
                            data: {
                                student: stud,
                                info: info,
                                totalNote: totalNote,
                                badCompetence: badCompetence,
                                domains: domains,
                                totalStudent: allStudents.length,
                                notes: notes
                            },
                            path: `docs/${stud.name}.pdf`
                        };
                        pdf.create(document, optionsPdf)
                            .then(resp => {
                                res.download(resp.filename)
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(201).json({ err, f: document.data })
                            })
                    })
                })
            })
        })
    })
}

module.exports.downloadBulletinByClassCo = async (req, res) => {
    const zip = new admZip();
    const { class_id } = req.params;
    req.connection.query('SELECT students.id, students.name, teachers.name as tName, teachers.subname as tSubname, students.subname, students.birthday, students.sex, class.name as cName  FROM students LEFT JOIN class ON class.id = students.class_id LEFT JOIN teachers ON teachers.class_id = class.id WHERE students.class_id = ?', [class_id], async (err, students) => {
        const dirPath = `docs/${students[0].cName}`;
        if (!downloadFs.existsSync(dirPath)) downloadFs.mkdirSync(dirPath);
        await new Promise((resolve, reject) => {
            students.forEach(tt => {
                const { exam_id, class_id } = req.params;
                const html = downloadFs.readFileSync('src/templates/Bulletin.html', 'utf-8');
                let badCompetence: string[] = [];
                let totalPoint = 0;
                let totalNote: number
                let diviser: number = 0;
                const stud = tt;
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

                req.connection.query('SELECT * FROM notes WHERE exam_id = ? AND class_id = ? AND student_id = ?', [exam_id, class_id, stud.id], (err2, notes) => {
                    if (err2) console.log(err2);
                    notes.forEach((note: {
                        value: string
                    }) => {
                        totalPoint += parseInt(note.value);
                    });
                    req.connection.query('SELECT * FROM matiere', (err3, mat: Matiere[]) => {
                        mat.forEach(m => {
                            const tags = JSON.parse(m.tags);
                            const notesForThisMatiere = notes.filter(h => h.matiere_id === m.id);
                            const t: number = JSON.parse(m.tags).length + 2;
                            totalNote = 0;
                            let total = 0;
                            tags.map(tag => {
                                const notesForThisTag = notesForThisMatiere.filter(h => h.tag_name === tag.name)[0];
                                const note = notesForThisTag && notesForThisTag !== undefined ? parseInt(notesForThisTag.value) : 0;
                                totalNote += note;
                                total += parseInt(tag.over);
                            })
                            if (totalNote < (total / 2)) {
                                badCompetence.push(m.name);
                            }
                        })

                        mat.forEach(m => {
                            const tags = JSON.parse(m.tags);
                            tags.forEach(tag => {
                                diviser += parseInt(tag.over);
                            })
                        })

                        req.connection.query('SELECT * FROM com', (err5, competences) => {
                            mat.map((m) => {
                                let t = 0;
                                const tags = JSON.parse(m.tags);
                                m.tags = tags;
                                const notesForThisMatiere = notes.filter(h => h.matiere_id === m.id);
                                tags.forEach(tag => {
                                    const notesForThisTag = notesForThisMatiere.filter(h => h.tag_name === tag.name)[0];
                                    const note = notesForThisTag && notesForThisTag !== undefined ? parseInt(notesForThisTag.value) : 0;
                                    t += note;
                                    tag.value = note
                                })
                                m.t = tags.length + 2;
                                let o = 0;
                                tags.forEach(t => {
                                    o += parseInt(t.over)
                                })
                                m.totalNote = o;
                                m.total = t;
                            })
                            competences.forEach(com => {
                                let to = 0;
                                com.sub = mat.filter(m => m.comId === com.id)
                                mat.filter(m => m.comId === com.id).forEach(m => {
                                    const tags = m.tags;
                                    to += tags.length + 2;
                                })
                                com.total = to + 1;
                            })
                            req.connection.query('SELECT * FROM stats WHERE class_id = ? AND exam_id = ? ', [class_id, exam_id], (errrt, stats) => {
                                const rangedArray = stats.sort((a, b) => b.totalPoints - a.totalPoints);
                                const g = stats.sort((a, b) => b.totalPoints - a.totalPoints);
                                let firstPoints: number = g[0].totalPoints;
                                let lastPoints: number = 0;
                                g.forEach(ey => {
                                    lastPoints = ey.totalPoints;
                                })
                                let rang = 0;
                                rangedArray.forEach((s: {
                                    student_id: string
                                }, c) => {
                                    if (s.student_id === stud.id) {
                                        rang = c + 1
                                    }
                                })
                                const document = {
                                    html: html,
                                    data: {
                                        student: stud,
                                        info: info,
                                        diviser: diviser,
                                        totalPoint,
                                        firstAverage: Math.round(((firstPoints / diviser) * 20) * 100) / 100,
                                        lastAverage: Math.round(((lastPoints / diviser) * 20) * 100) / 100,
                                        rang: rang,
                                        av: ((totalPoint / diviser) * 20) < 10 ? 'Oui' : 'Non',
                                        en: ((totalPoint / diviser) * 20) > 15 ? 'Oui' : 'Non',
                                        ho: ((totalPoint / diviser) * 20) > 18 ? 'Oui' : 'Non',
                                        moyenne: Math.round(((totalPoint / diviser) * 20) * 100) / 100,
                                        totalNote: totalNote,
                                        badCompetence: badCompetence,
                                        mat: mat,
                                        competences: competences,
                                        totalStudent: students.length,
                                        notes: notes
                                    },
                                    path: `${dirPath}/${(stud.name + ' ' + stud.subname).replaceAll(' ', '_')}.pdf`
                                };
                                pdf.create(document, optionsPdf)
                                    .then(resp => {

                                    })
                                    .catch(err => {
                                        console.log(err);
                                        res.status(201).json({ err, f: document.data.competences })
                                    })
                            })
                        })
                    })
                })
            });

            resolve({})
        })

        setTimeout(() => {
            students.forEach(student => {
                zip.addLocalFile(`${dirPath}/${(student.name + ' ' + student.subname).replaceAll(' ', '_')}.pdf`);
                const zipPath = `${dirPath}/Bulletins en ${students[0].cName}.zip`;
                downloadFs.writeFileSync(zipPath, zip.toBuffer());
                res.download(zipPath);
            })
        }, 3000)
    })
}