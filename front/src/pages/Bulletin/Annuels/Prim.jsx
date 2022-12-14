import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import BulletinEntete from '../../../components/BulletinEntete';
import { downloadTraductions } from '../../../local/bulletin';
import { host } from '../../../utils/fetch';
import { getLang } from '../../../utils/lang';

const PrimAB = ({type}) => {
    const [student, setStudent ] = useState([]);
    const [subjects, setSubjects ] = useState([]);
    const [ActualClass, setActualClass ] = useState({});
    const [actualExam, setActualExam ] = useState({});
    const [totalPoints, setTotalPoints] = useState(0);
    const [rank, setRank] = useState(1);
    const [loading, setLoading ] = useState(false);
    const {exam_id, student_id, class_id} = useParams();
    const [notes, setNotes] = useState([]);
    const [trims, setTrims] = useState([]);
    const [badCompetences, setBadCompetences] = useState({});
    const [totalPoints1, setTotalPoints1] = useState(0);
    const [rank1, setRank1] = useState(1);
    const [totalPoints2, setTotalPoints2] = useState(0);
    const [rank2, setRank2] = useState(1);
    const [totalPoints3, setTotalPoints3] = useState(0);
    const [rank3, setRank3] = useState(1);
    const [average, setAverage] = useState(0);

    useEffect(() => {
        (
            async () => {
                setLoading(true)
                const re = await fetch(host+'/students/one/'+student_id, {headers: {
                    'Authorization': sessionStorage.user
                }})
                const dat = await re.json();
                const resp = await fetch(host+'/annuals/'+exam_id, {headers: {
                    'Authorization': sessionStorage.user
                  }})
                const data = await resp.json();
                const resp2 = await fetch(host+'/class/'+class_id, {headers: {
                    'Authorization': sessionStorage.user
                  }})
                const data2 = await resp2.json();
                const resp4 = await fetch(host+'/subjects/all2/'+type, {headers: {
                    'Authorization': sessionStorage.user
                }})
                const data4 = await resp4.json();
                const resp5 = await fetch(host+'/notes/all-class2/'+class_id, {headers: {
                    'Authorization': sessionStorage.user
                }})
                let data5 = await resp5.json();
                data5 = data5.filter(d => d.student_id === student_id)
                const r = data5;
                const resp7 = await fetch(host+'/trim/getAll', {headers: {
                    'Authorization': sessionStorage.user
                  }})
                const data7 = await resp7.json();
                const resp6 = await fetch(host+'/notes/gt/'+exam_id+'/'+class_id, {headers: {
                    'Authorization': sessionStorage.user
                  }})
                const data6 = await resp6.json();
                data5 = data5.filter(d => d.student_id === student_id && d.exam_id === exam_id.toString());
                // console.log(data5);
                let tot = 0;
                let g = 0;
                let bc = [];
                data4.forEach(subject => {
                    tot += 10;
                    
                        
                    const note1d = r.filter(n => n.subject_id === subject.id.toString() 
                                    && n.exam_id === data7[0].id
                                    && n.subject_type === 'devoir').length > 0 
                                        ? 
                                        r.filter(n => n.subject_id === subject.id.toString() 
                                            && n.exam_id === data7[0].id
                                            && n.subject_type === 'devoir')[0].value
                                        : 0

                    const note1c = r.filter(n => n.subject_id === subject.id.toString() 
                                    && n.exam_id === data7[0].id
                                    && n.subject_type === 'compo').length > 0 
                                        ? 
                                        r.filter(n => n.subject_id === subject.id.toString() 
                                            && n.exam_id === data7[0].id
                                            && n.subject_type === 'compo')[0].value
                                        : 0
                    
                    const note2d = r.filter(n => n.subject_id === subject.id.toString() 
                                && n.exam_id === data7[1].id
                                && n.subject_type === 'devoir').length > 0 
                                    ? 
                                    r.filter(n => n.subject_id === subject.id.toString() 
                                        && n.exam_id === data7[1].id
                                        && n.subject_type === 'devoir')[0].value
                                    : 0

                    const note2c = r.filter(n => n.subject_id === subject.id.toString() 
                                    && n.exam_id === data7[1].id
                                    && n.subject_type === 'compo').length > 0 
                                        ? 
                                        r.filter(n => n.subject_id === subject.id.toString() 
                                            && n.exam_id === data7[1].id
                                            && n.subject_type === 'compo')[0].value
                                        : 0

                    const note3d = r.filter(n => n.subject_id === subject.id.toString() 
                                    && n.exam_id === data7[2].id
                                    && n.subject_type === 'devoir').length > 0 
                                        ? 
                                        r.filter(n => n.subject_id === subject.id.toString() 
                                            && n.exam_id === data7[2].id
                                            && n.subject_type === 'devoir')[0].value
                                        : 0

                    const note3c = r.filter(n => n.subject_id === subject.id.toString() 
                                    && n.exam_id === data7[2].id
                                    && n.subject_type === 'compo').length > 0 
                                        ? 
                                        r.filter(n => n.subject_id === subject.id.toString() 
                                            && n.exam_id === data7[2].id
                                            && n.subject_type === 'compo')[0].value
                                        : 0

                    const note1 = (parseInt(note1c) + parseInt(note1d)) / 2;
                    const note2 = (parseInt(note2c) + parseInt(note2d)) / 2;
                    const note3 = (parseInt(note3c) + parseInt(note3d)) / 2;
                    let t2 = (parseInt(note1) + parseInt(note2) + parseInt(note3)) / 3;
                    g += Math.round(t2 * 100) / 100;    
                    if ((t2) < 5) {
                        bc.push(subject.name)
                    }
                });
                data6.arr.forEach((s, c) => {
                    if (s.student_id === student_id) {
                        setRank(c + 1)
                    }
                })

                setAverage((Math.round(((g / tot) * 20) /2 * 100) / 100));
                setBadCompetences(bc);
                setTotalPoints(g);
                setStudent(dat);
                setActualExam(data);
                setActualClass(data2);
                setSubjects(data4);
                setNotes(r);
                setLoading(false);
                setTrims(data7);
            }
        )()
    }, []);
    useEffect(() => {
        (
            async () => {
                setLoading(true);

                const resp7 = await fetch(host+'/trim/getAll', {headers: {
                    'Authorization': sessionStorage.user
                  }})
                const data7 = await resp7.json();

                // First trim
                const resp = await fetch(host+'/notes/all2/'+class_id+'/'+data7[0].id, {headers: {
                    'Authorization': sessionStorage.user
                }})
                let data = await resp.json();
                const resp6 = await fetch(host+'/notes/gt/'+data7[0].id+'/'+class_id, {headers: {
                    'Authorization': sessionStorage.user
                  }})
                const data6 = await resp6.json();

                let g1 = 0;
                data.filter(d => d.student_id === student_id).forEach(u => {
                    let b = parseFloat(u.value);
                    g1 += b;
                });
                data6.arr.forEach((s, c) => {
                    if (s.student_id === student_id) {
                        setRank1(c + 1)
                    }
                })
                setTotalPoints1(g1 / 2);



                // Second trim
                const resp1 = await fetch(host+'/notes/all2/'+class_id+'/'+data7[1].id, {headers: {
                    'Authorization': sessionStorage.user
                }})
                let data1 = await resp1.json();
                const resp61 = await fetch(host+'/notes/gt/'+data7[1].id+'/'+class_id, {headers: {
                    'Authorization': sessionStorage.user
                  }})
                const data61 = await resp61.json();

                let g2 = 0;
                data1.filter(d => d.student_id === student_id).forEach(u => {
                    let b = parseFloat(u.value);
                    g2 += b;
                });
                data61.arr.forEach((s, c) => {
                    if (s.student_id === student_id) {
                        setRank2(c + 1)
                    }
                })
                setTotalPoints2(g2 / 2);


                // Third trimestre


                const resp2 = await fetch(host+'/notes/all2/'+class_id+'/'+data7[2].id, {headers: {
                    'Authorization': sessionStorage.user
                }})
                let data2 = await resp2.json();
                const resp62 = await fetch(host+'/notes/gt/'+data7[2].id+'/'+class_id, {headers: {
                    'Authorization': sessionStorage.user
                  }})
                const data62 = await resp62.json();

                let g3 = 0;
                data2.filter(d => d.student_id === student_id).forEach(u => {
                    let b = parseFloat(u.value);
                    g3 += b;
                });
                data62.arr.forEach((s, c) => {
                    if (s.student_id === student_id) {
                        setRank3(c + 1)
                    }
                })
                setTotalPoints3(g3 / 2);

                setLoading(false);
            }
        )()
    }, []);
    const makeAverage = (totalp) => {
        return (Math.round(((totalp / (subjects.length * 10)) * 20) /2 * 100) / 100)
    }
    return <div className="container">
    <nav className="navbar navbar-expand-lg" style={{padding: '10px 10px'}}>
        <a target={'_blank'} href={`${host}/download/pdf/bul-an2/${ActualClass.year}/${class_id}/${student_id}/${exam_id}`} className="btn btn-success">T??l??charger le bulletin</a>
    </nav>  
        <BulletinEntete currentClass={ActualClass} actualExam={actualExam} student={student} />
        
        <table className='table table-bordered table-light table-striped'>
            <thead>
                <tr>
                    <th align='center' rowSpan={2}>MATIERES</th>
                    {
                        trims.map(trim => {
                            return <th colSpan={3}>
                                {trim.name}
                            </th>
                        })
                    }
                </tr>
                <tr>
                    {
                        trims.map(() => {
                            return <>
                                <th>Devoir</th>
                                <th>Compo</th>
                                <th>Moyenne</th>
                            </>
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {
                    subjects.map((subject, id) => {
                        
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
                        
                        return <tr key={id}>
                            <td>{subject.name}</td>
                            <td>{note1d}</td>
                            <td>{note1c}</td>
                            <td>{note1 / 2}</td>
                            <td>{note2d}</td>
                            <td>{note2c}</td>
                            <td>{note2 / 2}</td>
                            <td>{note3d}</td>
                            <td>{note3c}</td>
                            <td>{note3 / 2}</td>
                        </tr>
                    })
                }
                <tr>
                    <td>
                        Total des points:
                    </td>
                    <td colSpan={3}>
                        {totalPoints1} / {subjects.length * 10}
                    </td>
                    <td colSpan={3}>
                        {totalPoints2} / {subjects.length * 10}
                    </td>
                    <td colSpan={3}>
                        {totalPoints3} / {subjects.length * 10}
                    </td>
                </tr>
                <tr>
                    <td>
                        Moyenne:
                    </td>
                    <td colSpan={3}>
                        {makeAverage(totalPoints1)} / 10
                    </td>
                    <td colSpan={3}>
                        {makeAverage(totalPoints2)} / 10
                    </td>
                    <td colSpan={3}>
                        {makeAverage(totalPoints3)} / 10
                    </td>
                </tr>
                <tr>
                    <td>
                        Rang:
                    </td>
                    <td colSpan={3}>
                        {rank1} / {ActualClass.total_students}
                    </td>
                    <td colSpan={3}>
                        {rank2} / {ActualClass.total_students}
                    </td>
                    <td colSpan={3}>
                        {rank3} / {ActualClass.total_students}
                    </td>
                </tr>
            </tbody>
        </table>

        <table className="table table-bordered table-light table-striped">
            <tbody>
                <tr>
                    <td>{downloadTraductions[getLang()].totalPoints}</td>
                    <td>{totalPoints} / {subjects.length * 10}</td>
                    <td>Encouragement :</td>
                    <td>{average > 6 ? 'oui' : 'non'}</td>
                </tr>
                <tr>
                    <td>{downloadTraductions[getLang()].average}</td>
                    <td>{average} / 10</td> 
                    <td>Tableau d'honneur :</td>
                    <td>{average > 7.5 ? 'oui' : 'non'}</td>
                </tr>
                <tr>
                    <td colSpan={2}>{downloadTraductions[getLang()].rank}</td>
                    <td colSpan={2}> {rank} / {ActualClass.total_students}</td>
                </tr>
                <tr>
                    <td>Des efforts s'imposent en:</td>
                    <td>Visa du parent</td>
                    <td colSpan={2}>Visa du chef d'etablissement</td>
                </tr>
                <tr style={{ height: '100px' }}>
                    <td>
                        {
                            badCompetences.length > 0 ? 
                                    badCompetences.map(bc => <li key={bc}>{bc}</li> )
                                : <li>RAS</li>
                        }
                    </td>
                    <td></td>
                    <td colSpan={2}></td>
                </tr>
            </tbody>
        </table>
    {
        loading ? 'studentsPoints' : ''
    }
    </div>
}

export default PrimAB;