import React from 'react'
import { useEffect, useRef } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { sequenceTraductions } from '../../../local/sequence';
import { host } from '../../../utils/fetch';

const PrimA = ({type}) => {
    const [students, setStudents ] = useState([]);
    const [subjects, setSubjects ] = useState([]);
    const [ActualClass, setActualClass ] = useState({});
    const [actualExam, setActualExam ] = useState({});
    const [totalPoints, setTotalPoints] = useState(0);
    const [loading, setLoading ] = useState(false);
    const {exam_id, class_id} = useParams();
    const [notes, setNotes] = useState({});
    const [error, setError] = useState("");
    const bulRef = useRef();
    useEffect(() => {
        (
            async () => {
                setLoading(true)
                const re = await fetch(host+'/students/'+class_id, {headers: {
                    'Authorization': sessionStorage.user
                }})
                const dat = await re.json();
                const resp = await fetch(host+'/annuals/'+exam_id, {headers: {
                    'Authorization': sessionStorage.user
                }})
                const data = await resp.json();
                console.log(data);
                const resp2 = await fetch(host+'/class/'+class_id, {headers: {
                    'Authorization': sessionStorage.user
                  }})
                const data2 = await resp2.json();
                const resp4 = await fetch(host+'/subjects/all2/'+type, {headers: {
                    'Authorization': sessionStorage.user
                }})
                const data4 = await resp4.json();
                const resp5 = await fetch(host+'/notes/all/'+class_id+'/'+exam_id, {headers: {
                    'Authorization': sessionStorage.user
                }})
                const data5 = await resp5.json();
                
                let tot = 0;
                data4.forEach(sub => {
                    tot += sub.over
                })

                setTotalPoints(tot);
                setStudents(dat);
                setActualExam(data);
                setActualClass(data2);
                setSubjects(data4);
                setNotes(data5);
                setLoading(false);
            }
        )()
    }, []);

    const calc = () => {
        const data = {
            exam_id,
            class_id
        }
        fetch(host+'/notes/calTrimNotes', {method: 'POST', body: JSON.stringify(data), headers: {'Content-Type': 'application/json', 'Authorization': sessionStorage.user}})
            .then((res) => res.json())
            .then(res => {
                if (!res.success) {
                    setError(res.message)
                }else{
                    window.location.reload()
                }
            })
    }
    return <div className="container">
        <nav className="navbar navbar-expand-lg" style={{padding: '10px'}}>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav" style={{fontSize: '1.3rem', display:"flex", justifyContent:'space-between'}}>
                    <h2 style={{marginLeft  : '40px'}}>{actualExam.name} : {ActualClass.name}</h2>
                    <a href={host+`/download/pdf/bul-an/${ActualClass.year}/`+class_id+'/'+exam_id} target={'_blank'} className="btn btn-success">{sequenceTraductions['fr'].downloadBuls}</a>
                    <button onClick={() => {calc()}} style={{marginLeft: '10px'}} className="btn btn-primary">Calculer les notes</button>
                    {/* <label htmlFor='csvFile' style={{marginLeft: '10px'}} className="btn btn-success">{sequenceTraductions['fr'].importNotes}</label>
                    <input type="file" accept='.csv' id='csvFile' style={{display: 'none'}} onChange={(e) => {handleChangeCsvFile(e, '/upload/notes/csv', setError)}} /> */}
                    <Link to={`/promotion/${exam_id}/${class_id}/${type}`} className='btn btn-primary' style={{ marginLeft: '10px' }}>
                        Promotion
                    </Link>
                </ul>
            </div>
        </nav>
        
        {
            error === '' ? <></> : <div style={{marginTop: '30px'}} className="alert alert-danger">{error}</div>
        }
        <table style={{textAlign: 'center'}} ref={bulRef} id="bulT" className="table table-bordered table-striped table-light text-align-center">
        <thead style={{color: '#000', fontSize :'1rem', fontWeight: '500'}}>
            <tr className="table-dark">
                <th rowSpan={3} width='20' >
                    N
                </th>
                <th rowSpan={3}>
                {sequenceTraductions['fr'].name}
                </th>
                <th colSpan={subjects.length}>
                  Matieres
                </th>
                <th colSpan={2} >
                    {sequenceTraductions['fr'].essential}
                </th>
                <th colSpan={1} rowSpan={2}>
                    {sequenceTraductions['fr'].action}
                </th>
            </tr>   
            <tr>
				{
					subjects.length > 0 ? subjects.map((subject, id) => {
						return <th key={id}>{subject.name} / {subject.over}</th>
					}) : <>{sequenceTraductions['fr'].noCom}</>
				}
				<th>{sequenceTraductions['fr'].totalOfPoints}</th>
				<th>{sequenceTraductions['fr'].average}</th>
				{/* <th>{sequenceTraductions['fr'].rank}</th> */}
            </tr>
        </thead>
        <tbody>
            {
                notes.length > 0 ? 
                    students.length > 0 ? students.map((student, index) => {
                        const notesForStudent = loading ? {} : notes.filter(n => n.student_id === student.id.toString());
                        let to = 0;
                        return <tr key={index}>
                            <td>
                                {index + 1}
                            </td>
                            <td>
                                {student.name} {student.subname}
                            </td>     
                            {
                                subjects.map((subject, id) => {
                                    const note = notesForStudent.filter(n => n.subject_id === subject.id.toString()).length > 0 ? parseFloat(notesForStudent.filter(n => n.subject_id === subject.id.toString())[0].value) : 0
                                    to += note;
                                    return <td key={id}>
                                        <span>{note}</span>
                                    </td> 
                                })
                            }
                            <td>
                                {
                                    ` ${to} / ${totalPoints}`
                                }
                            </td>
                            <td>
                                {
                                    (
                                        loading ? '0' : `${Math.round(to / totalPoints * 20 * 100) / 100} / 20`
                                    )
                                }
                            </td>
                            <td>
                                <Link to={`${student.id}`} className="btn btn-primary">
                                    {sequenceTraductions['fr'].seeBul}
                                </Link>
                                <a target={'_blank'} href={`${host}/download/pdf/bul-an/${ActualClass.year}/${class_id}/${student.id}/${exam_id}`} 
                                className="btn btn-success" style={{ marginLeft: '10px' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-arrow-down-fill" viewBox="0 0 16 16">
                                        <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zm-1 4v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 11.293V7.5a.5.5 0 0 1 1 0z"/>
                                    </svg>
                                </a>
                            </td>
                        </tr>
                    }) : <tr className={'table-light'}>
                        <td colSpan={144}>
                        {sequenceTraductions['fr'].noStudent}                
                        </td>
                    </tr>
                :  <tr>
                    
                    <td colSpan={40}>
                        Veuillez calculer les notes avant de continuer.
                    </td>
                </tr>
            }
        </tbody>
        </table>
    {
        loading ? 'studentsPoints' : ''
    }
    </div>
}

export default PrimA;