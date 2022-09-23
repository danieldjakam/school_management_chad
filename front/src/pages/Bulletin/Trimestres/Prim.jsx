import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import BulletinEntete from '../../../components/BulletinEntete';
import { downloadTraductions } from '../../../local/bulletin';
import { host } from '../../../utils/fetch';
import { getLang } from '../../../utils/lang';

const PrimB = ({type}) => {
    const [student, setStudent ] = useState([]);
    const [subjects, setSubjects ] = useState([]);
    const [ActualClass, setActualClass ] = useState({});
    const [actualExam, setActualExam ] = useState({});
    const [diviser, setDiviser] = useState(0);
    const [totalPoints, setTotalPoints] = useState(0);
    const [rank, setRank] = useState(1);
    const [loading, setLoading ] = useState(false);
    const {exam_id, student_id, class_id} = useParams();
    const [notes, setNotes] = useState({});
    const [tp, setTP] = useState({});

    useEffect(() => {
        (
            async () => {
                setLoading(true)
                const re = await fetch(host+'/students/one/'+student_id, {headers: {
                    'Authorization': sessionStorage.user
                  }})
                const dat = await re.json();
                const resp = await fetch(host+'/trim/'+exam_id, {headers: {
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
                console.log(data4);
                const resp5 = await fetch(host+'/notes/all2/'+class_id+'/'+exam_id, {headers: {
                    'Authorization': sessionStorage.user
                }})
                let data5 = await resp5.json();
                const resp6 = await fetch(host+'/notes/gt/'+exam_id+'/'+class_id, {headers: {
                    'Authorization': sessionStorage.user
                  }})
                const data6 = await resp6.json();

                data5 = data5.filter(d => d.student_id === student_id)
                let tot = 0;
                let g = 0;
                data4.forEach(sub => {
                    tot += sub.over
                })
                data5.forEach(u => {
                    let b = parseFloat(u.value);
                    g += b;
                })
                data6.arr.forEach((s, c) => {
                    if (s.student_id === student_id) {
                        setRank(c + 1)
                    }
                })

                setTotalPoints(g)
                setDiviser(tot);
                setStudent(dat);
                setActualExam(data);
                setActualClass(data2);
                setSubjects(data4);
                setNotes(data5);
                setLoading(false);
                setTP(data6);
            }
        )()
    }, []);

    return <div className="container">
    <nav className="navbar navbar-expand-lg" style={{padding: '10px 10px'}}>
        <a target={'_blank'} href={`${host}/download/pdf/bul/${class_id}/${student_id}/${exam_id}`} className="btn btn-success">Télécharger le bulletin</a>
    </nav>  
        <BulletinEntete currentClass={ActualClass} actualExam={actualExam} student={student} />
        
        <table className='table table-bordered table-light table-striped'>
            <thead>
                <tr>
                    <th rowSpan={2} align='center'>MATIERES</th>
                    <th colSpan={3}>{actualExam.name}</th>
                </tr>
                <tr>
                    <th>
                        Devoir
                    </th>
                    <th>
                        Compo
                    </th>
                    <th>
                        Moyenne
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    subjects.map((subject, id) => {
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
                        let t2 = note1 + note2;
                        return <tr key={id}>
                            <td>
                                {subject.name}
                            </td>
                            <td>
                                {note1} / 10
                            </td> 
                            <td>
                                {note2} / 10
                            </td> 
                            <td>
                                {
                                    t2 / 2
                                } / 10
                            </td>
                        </tr>
                    })
                }
            </tbody>
        </table>

        <table className="table table-bordered table-light table-striped">
            <tbody>
                <tr>
                    <td>{downloadTraductions[getLang()].totalPoints}</td>
                    <td>{totalPoints} / {subjects.length * 20}</td>
                </tr>
                <tr>
                    <td>{downloadTraductions[getLang()].average}</td>
                    <td>{Math.round((totalPoints / (diviser * 2)) * 20 * 100) / 100} / 20</td>
                </tr>
                <tr>
                    <td>{downloadTraductions[getLang()].rank}</td>
                    <td> {rank} / {ActualClass.total_students}</td>
                </tr>
                <tr>
                    <td>Visa du parent</td>
                    <td>Visa du chef d'etablissement</td>
                </tr>
                <tr style={{ height: '100px' }}>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    {
        loading ? 'studentsPoints' : ''
    }
    </div>
}

export default PrimB;