import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import BulletinEntete from '../../components/BulletinEntete';
import { downloadTraductions } from '../../local/bulletin';
import { host } from '../../utils/fetch';
import { getLang } from '../../utils/lang';

const BulletinTrim = () => {

    const [students, setStudents ] = useState([]);
    const [coms, setComs ] = useState([]);
    const [mat, setMat ] = useState([]);
    const [ActualClass, setActualClass ] = useState({});
    const [actualExam, setActualExam ] = useState({});
    const [loading, setLoading ] = useState(false);
    const {exam_id, class_id, student_id} = useParams();
    const [notes, setNotes] = useState({});
    const [studentsAll, setStudentsAll] = useState({});
    const [totalPointsClass, setTotalPointsClass] = useState({});
    const [diviser, setDiviser] = useState(1);
    const [totaltPoints, setTotalPoints] = useState(0);
    const [badCompetence, setBadCompetence] = useState([]);
    const [rang, setRang] = useState(0);
    const [firstAverage, setFirstAverage] = useState(0);
    const [lastAverage, setLastAverage] = useState(0);

    useEffect(() => {
        (
            async () => {
                setLoading(true)
                const resp = await fetch(host+'/students/one/'+student_id, {headers: {
                    'Authorization': sessionStorage.user
                  }})
                const data = await resp.json();
                setStudents(data);
                setLoading(false);
            }
        )()
    }, [student_id]);
    useEffect(() => {
        (
            async () => {
                setLoading(true)
                const resp = await fetch(host+'/students/'+class_id, {headers: {
                    'Authorization': sessionStorage.user
                  }})
                const data = await resp.json();
                setStudentsAll(data);
                setLoading(false);
            }
        )()
    }, [class_id]);
    useEffect(() => {
        (
            async () => {
                setLoading(true)
                let total = 0;
                const resp = await fetch(host+'/notes/getByTrimPeople/'+exam_id+'/'+student_id, {headers: {
                    'Authorization': sessionStorage.user
                }}) 
                let data = await resp.json();
                data = data.filter(dl => dl.class_id === class_id);
                data = data.filter(f => f.student_id === student_id);
                setNotes(data);
                data.forEach(t => {
                    total += parseFloat(t.value)
                })
                setTotalPoints(total);
                setLoading(false);
                
                let arr = [];
                mat.map(m => {
                    const tags = JSON.parse(m.tags);
                    const notesForThisMatiere = data.filter(h => h.matiere_id === m.id);
                    let totalNote = 0;
                    let total = 0;
                    tags.forEach(tag => {
                        const notesForThisTag = notesForThisMatiere.filter(h => h.tag_name === tag.name)[0];
                        const note = notesForThisTag !== {} && notesForThisTag !== undefined ? parseFloat(notesForThisTag.value) : 0;
                        totalNote += note;
                        total += parseFloat(tag.over);
                        return ''
                    })
                    if (totalNote < (total / 2)) {
                        arr.push(m.name);
                    }
                    return ''
                })
                setBadCompetence(arr);
            }
        )()
    }, [mat, class_id, exam_id, student_id]);
    useEffect(() => {
        (
            async () => {
                setLoading(true)
                const resp = await fetch(host+'/trim/'+exam_id, {headers: {
                    'Authorization': sessionStorage.user
                  }})
                const data = await resp.json();
                setActualExam(data);
                setLoading(false);
            }
        )()
    }, [exam_id]);
    useEffect(() => {
        (
            async () => {
                setLoading(true)
                const resp = await fetch(host+'/class/special/'+class_id, {headers: {
                    'Authorization': sessionStorage.user
                  }})
                const data = await resp.json();
                setActualClass(data);
                setLoading(false);
            }
        )()
    }, [class_id]);
    useEffect(() => {
        (
            async () => {
                setLoading(true)
                const resp = await fetch(host+'/matiere/getAll', {headers: {
                    'Authorization': sessionStorage.user
                  }})
                const data = await resp.json();
                setMat(data);
                setLoading(false);
                let total = 0;
                data.forEach(m => {
                    const tags = JSON.parse(m.tags);
                    tags.forEach(tag => {
                                total += parseFloat(tag.over);
                            })
                })
                setDiviser(total);
            }
        )()
    }, []);
    useEffect(() => {
        (
            async () => {
                setLoading(true)
                const resp = await fetch(host+'/matiere/getAll', {headers: {
                    'Authorization': sessionStorage.user
                  }})
                const data = await resp.json();
                setMat(data);
                setLoading(false);
                let total = 0;
                data.forEach(m => {
                    const tags = JSON.parse(m.tags);
                    tags.forEach(tag => {
                                total += parseFloat(tag.over);
                            })
                })
                setDiviser(total);
            }
        )()
    }, []);
    useEffect(() => {
        (
            async () => {
                setLoading(true)
                fetch(host+'/com/getAll', {headers: { 'Authorization': sessionStorage.user}})
                    .then(competences => competences.json())
                    .then(competences => {
                        competences.forEach(com => {
                            fetch(host+'/matiere/getAll', {headers: { 'Authorization': sessionStorage.user}})
                                .then(matieres => matieres.json())
                                .then(matieres => {
                                    com.sub = matieres.filter(mat => mat.comId === com.id)
                                })
                        })
                        setComs(competences)
                    })
            }
        )()
    }, []);
    useEffect(() => {
        (
            async () => {
                setLoading(true)
                const resp = await fetch(host+`/notes/getTotalPoints?class_id=${class_id}&exam_id=${exam_id}`, {headers: {
                    'Authorization': sessionStorage.user
                  }})
                const data = await resp.json();
                setTotalPointsClass(data.arr);
                data.arr.forEach((s, c) => {
                    console.log(c);
                    if (s.student_id === student_id) {
                        setRang(c + 1)
                    }
                })
                setFirstAverage(data.first);
                setLastAverage(data.last)
                setLoading(false);
            }
        )()
    }, [class_id, exam_id, student_id]);
    return <div className="container bulView" style={{color: '#000', fontWeight: '600'}}>
        <nav className="navbar navbar-expand-lg" style={{padding: '10px 10px'}}>
            <div className="collapse navbar-collapse" id="navbarNav">
                {/* <button type="submit" onClick={() => {}} style={{marginLeft: '10px'}} className="btn btn-primary">Envoyer le bulletin au parent</button> */}
            </div>
            
            <button onClick={() => {}} className="btn btn-success">{downloadTraductions[getLang()].downloadBul}</button>
        </nav>
        <BulletinEntete student={students} currentClass={ActualClass} actualExam={actualExam}/>

        <table className="table table-bordered table-stiped"  style={{margin: '5px 0', marginLeft: '5vw', width: '90vw', textAlign: 'center'}}>
            <thead className="table-dark" >
                <tr>
                    <th rowSpan={2}>{downloadTraductions[getLang()].com}</th>
                    <th rowSpan={2}>{downloadTraductions[getLang()].subCom}</th>
                    <th>{downloadTraductions[getLang()].unit}</th>
                    <th colSpan={2}>UA1</th>
                </tr>
                <tr>
                    <th>{downloadTraductions[getLang()].eval}</th>
                    <th>{downloadTraductions[getLang()].notes}</th>
                    <th>{downloadTraductions[getLang()].over}</th>
                </tr>
            </thead>
            <tbody>
            {
                coms.length > 0 ? coms.map((com, ID) => {
                    let total = 0;
                    mat.filter(m => m.comId === com.id).forEach(m => {
                        const tags = JSON.parse(m.tags);
                        total += tags.length + 2;
                    })
                    return <> 
                                <tr key={ID}>
                                    <td rowSpan={total + 1} className="table-dark">
                                        {com.name}
                                    </td>
                                </tr>
                                {
                                    mat.length > 0 ? mat.filter(m => m.comId === com.id).map(m => {
                                        const tags = JSON.parse(m.tags);
                                        const notesForThisMatiere = notes.length > 0 ? notes.filter(h => h.matiere_id === m.id) : {}
                                        const t = JSON.parse(m.tags).length + 2;
                                        let totalNote = 0;
                                        let total = 0;
                                        return <>
                                            <tr>
                                                <td rowSpan={t}>{m.name}</td>
                                            </tr>
                                            {
                                                tags.map(tag => {
                                                    const notesForThisTag = notesForThisMatiere !== {} && notes.length > 0 ? notesForThisMatiere.filter(h => h.tag_name === tag.name)[0] : {};
                                                    const note = notesForThisTag !== {} && notesForThisTag !== undefined ? parseFloat(notesForThisTag.value) : 0;
                                                    totalNote += note;
                                                    total += parseFloat(tag.over);

                                                    return <tr>
                                                        <td>{tag.name}</td>
                                                        <td>{note}</td>
                                                        <td>{tag.over}</td>
                                                    </tr>
                                                })
                                            }
                                            <tr>
                                                <td>{downloadTraductions[getLang()].total}</td>
                                                <td colSpan={2}>{totalNote} / {total}</td>
                                            </tr>
                                        </>
                                    }) : <></>

                                }
                            </>
                }) : <>{downloadTraductions[getLang()].noCom}</>
            } 
            </tbody>
        </table>
        <h6 style={{textAlign: 'center'}}>
            {downloadTraductions[getLang()].help}
        </h6>
        
        <table className="table table-bordered table-light table-striped" style={{margin: '5px 0', marginLeft: '5vw', width: '90vw', textAlign: 'center', marginBottom: '50px'}}>
            <tbody>
                <tr>
                    <td>{downloadTraductions[getLang()].totalPoints}</td>
                    <td>{totaltPoints} / {diviser}</td>
                    <td>{downloadTraductions[getLang()].cote}</td>
                    <td colSpan={2}>{downloadTraductions[getLang()].classConseil}</td>
                </tr>
                <tr>
                    <td>{downloadTraductions[getLang()].average}</td>
                    <td>{Math.round((totaltPoints / diviser) * 20 * 100) / 100}</td>
                    <td rowSpan={4}>ECA</td>
                    <td>{downloadTraductions[getLang()].avert}</td>
                    <td style={{display: 'flex', justifyContent: 'space-around'}}>
                        <span><input type="checkbox" />{downloadTraductions[getLang()].yes}</span>
                        <span><input type="checkbox" />{downloadTraductions[getLang()].no}</span>
                    </td>
                </tr>
                <tr>
                    <td>{downloadTraductions[getLang()].rank}</td>
                    <td> {rang} / {studentsAll.length}</td>
                    <td>{downloadTraductions[getLang()].worlAvertissement}l</td>
                    <td>{((totaltPoints / diviser) * 20) < 10 ? 'Oui' : 'Non'}</td>
                </tr>
                <tr>
                    <td>{downloadTraductions[getLang()].firstAverage}</td>
                    <td>{Math.round((firstAverage / diviser) * 20 * 100) / 100}</td>
                    <td>{downloadTraductions[getLang()].encou}</td>
                    <td>{((totaltPoints / diviser) * 20) > 15 ? 'Oui' : 'Non'}</td>
                </tr>
                <tr>
                    <td>{downloadTraductions[getLang()].lastAverage}</td>
                    <td>{Math.round((lastAverage / diviser) * 20 * 100) / 100}</td>
                    <td>{downloadTraductions[getLang()].honorRoll}</td>
                    <td>{((totaltPoints / diviser) * 20) > 18 ? 'Oui' : 'Non'}</td>
                </tr>
                <tr>
                    <td colSpan={2}>{downloadTraductions[getLang()].observation}</td>
                    <td>{downloadTraductions[getLang()].visa}</td>
                    <td colSpan={2}>{downloadTraductions[getLang()].chefVisa}</td>
                </tr>
                <tr>
                    <td colSpan={2}>
                    {downloadTraductions[getLang()].effort} <br /><br />
                        <ul className="list" style={{listStyle: 'none'}}>
                            {
                                badCompetence.length > 0 ? badCompetence.map((bc, f) => <li key={f} className="list-item">{bc}</li> ) : <li>RAS</li>
                            }
                        </ul>
                    </td>
                    <td></td>
                    <td colSpan={2}></td>
                </tr>
            </tbody>
        </table>
        {
            loading ? totalPointsClass : ''
        }
    </div>
}

export default BulletinTrim;