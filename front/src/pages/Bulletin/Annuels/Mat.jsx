import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import BulletinEntete from '../../../components/BulletinEntete';
import { downloadTraductions } from '../../../local/bulletin';
import { host } from '../../../utils/fetch';
import { getLang } from '../../../utils/lang';
import check from '../../../images/check.png'

const MatB = ({type}) => {
    const [student, setStudent ] = useState([]);
    const [subjects, setSubjects ] = useState([]);
    const [ActualClass, setActualClass ] = useState({});
    const [actualExam, setActualExam ] = useState({});
    const [diviser, setDiviser] = useState(0);
    const [totalPoints, setTotalPoints] = useState(0);
    const [rank, setRank] = useState(1);
    const [loading, setLoading ] = useState(false);
    const {exam_id, student_id, class_id} = useParams();
    const [notes, setNotes] = useState([]);
    const [trims, setTrims] = useState([]);
    const [toAn, setTotalAnnual] = useState([]);
    const [totalPoints1, setTotalPoints1] = useState(0);
    const [rank1, setRank1] = useState(1);
    const [totalPoints2, setTotalPoints2] = useState(0);
    const [rank2, setRank2] = useState(1);
    const [totalPoints3, setTotalPoints3] = useState(0);
    const [rank3, setRank3] = useState(1);

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
                const resp5 = await fetch(host+'/notes/all-class/'+class_id, {headers: {
                    'Authorization': sessionStorage.user
                }})
                let data5 = await resp5.json();
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
                let na = data5.filter(d => d.student_id === student_id && d.exam_id === exam_id.toString());
                // console.log(data5);
                let tot = 0;
                let g = 0;
                let k = 0;
                data4.forEach(sub => {
                    tot += sub.over
                })
                data5.forEach(u => {
                    let b = parseFloat(u.value);
                    g += b;
                })
                na.forEach(u => {
                    let b = parseFloat(u.value);
                    k += b;
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
                setNotes(r);
                setLoading(false);
                setTrims(data7);
                setTotalAnnual(k);
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
                const resp = await fetch(host+'/notes/all/'+class_id+'/'+data7[0].id, {headers: {
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
                setTotalPoints1(g1);



                // Second trim
                const resp1 = await fetch(host+'/notes/all/'+class_id+'/'+data7[1].id, {headers: {
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
                setTotalPoints2(g2);


                // Third trimestre


                const resp2 = await fetch(host+'/notes/all/'+class_id+'/'+data7[2].id, {headers: {
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
                        console.log(s);
                        setRank3(c + 1)
                    }
                })
                setTotalPoints3(g3);

                setLoading(false);
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
                    <th align='center'>MATIERES</th>
                    {
                        trims.map(trim => {
                            return <th>
                                {trim.name}
                            </th>
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {
                    subjects.map((subject, id) => {

                        const note1 = notes.filter(n => n.subject_id === subject.id.toString() 
                                            && n.exam_id === trims[0].id).length > 0 
                                        ? 
                                            parseFloat(notes.filter(n => n.subject_id === subject.id.toString() 
                                            && n.subject_id === subject.id.toString())[0].value) 
                                        : 0
                        console.log(notes);

                        const note2 = notes.filter(n => n.subject_id === subject.id.toString() 
                                            && n.exam_id === trims[1].id).length > 0 
                                        ? 
                                            parseFloat(notes.filter(n => n.subject_id === subject.id.toString() 
                                            && n.subject_id === subject.id.toString())[1].value) 
                                        : 0

                        const note3 = notes.filter(n => n.subject_id === subject.id.toString() 
                                            && n.exam_id === trims[2].id).length > 0 
                                        ? 
                                            parseFloat(notes.filter(n => n.subject_id === subject.id.toString() 
                                            && n.subject_id === subject.id.toString())[2].value) 
                                        : 0
                        
                        return <tr>
                            <td>{subject.name}</td>

                            <td align='center'>
                                {   
                                    note1 > 5 ? 
                                            <img src={check} width='20px' alt="" />
                                        : ''
                                }
                            </td>
                            <td align='center'>
                                {   
                                    note2 > 5 ? 
                                            <img src={check} width='20px' alt="" />
                                        : ''
                                }
                            </td>
                            <td align='center'>
                                {   
                                    note3 > 5 ? 
                                            <img src={check} width='20px' alt="" />
                                        : ''
                                }
                            </td>
                        </tr>
                    })
                }
                <tr>
                    <td>
                        Total des points:
                    </td>
                    <td>
                        {totalPoints1} / {subjects.length * 10}
                    </td>
                    <td>
                        {totalPoints2} / {subjects.length * 10}
                    </td>
                    <td>
                        {totalPoints3} / {subjects.length * 10}
                    </td>
                </tr>
                <tr>
                    <td>
                        Moyenne:
                    </td>
                    <td>
                        {Math.round((totalPoints1 / diviser) * 20 * 100) / 100} / 20
                    </td>
                    <td>
                        {Math.round((totalPoints2 / diviser) * 20 * 100) / 100} / 20
                    </td>
                    <td>
                        {Math.round((totalPoints3 / diviser) * 20 * 100) / 100} / 20
                    </td>
                </tr>
                <tr>
                    <td>
                        Rang:
                    </td>
                    <td>
                        {rank1} / {ActualClass.total_students}
                    </td>
                    <td>
                        {rank2} / {ActualClass.total_students}
                    </td>
                    <td>
                        {rank3} / {ActualClass.total_students}
                    </td>
                </tr>
            </tbody>
        </table>

        <table className="table table-bordered table-light table-striped">
            <tbody>
                <tr>
                    <td>{downloadTraductions[getLang()].totalPoints}</td>
                    <td>{toAn} / {subjects.length * 10}</td>
                </tr>
                <tr>
                    <td>{downloadTraductions[getLang()].average}</td>
                    <td>{Math.round((totalPoints / diviser) * 20 * 100) / 100} / 20</td>
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

export default MatB;