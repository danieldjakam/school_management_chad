import React from 'react'
import { useEffect, useRef } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { studentTraductions } from '../../local/student';
import { host } from '../../utils/fetch';
import { getLang } from '../../utils/lang';
import ReactLoading from 'react-loading';

const Promotion = () => {
    const [students, setStudents ] = useState([]);
    const [subjects, setSubjects ] = useState([]);
    const [ActualClass, setActualClass ] = useState({});
    const [actualExam, setActualExam ] = useState({});
    const [loading, setLoading ] = useState(false);
    const {exam_id, class_id, type} = useParams();
    const [notes, setNotes] = useState({});
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
                
                setStudents(dat);
                setActualExam(data);
                setActualClass(data2);
                setSubjects(data4);
                setNotes(data5);
                setLoading(false);
            }
        )()
    }, []);
    return <div className="container">
        <h4 style={{ display: 'flex' }}>
            Bienvenue dans la promotion des eleves de {ActualClass.name}
            <div className="help" style={{ background: '#0c56ac', color: '#fff', marginLeft: '10px',
                                            height: '30px', width: '30px', borderRadius: '50%',
                                            display: 'flex', justifyContent: 'center', alignItems: 'center'
                                        }}
            > i </div>
        </h4>


        <table className="table table-dark table-bordered table-striped">
            <thead>
                <tr>
                    <td>{studentTraductions[getLang()].n} </td>
                    <th>{studentTraductions[getLang()].name}</th>
                    <th>{studentTraductions[getLang()].subname}</th>
                    <th>{studentTraductions[getLang()].sex}</th>
                    <th>Moyenne annuelle</th>
                </tr>
            </thead>
            <tbody>
                {
                    loading ? <tr>
                                <td colSpan={5} style={{justifyItems: 'center', paddingLeft: '50%'}}>
                                    <ReactLoading color="#fff" type="cylon"/>
                                </td>
                            </tr> : students.length > 0 ? students.map((student, id) => {
                                        let total = 0;
                                        const herNotes = notes.filter(n => n.student_id == student.id);
                                        herNotes.forEach(no => {
                                            total += parseInt(no.value);
                                        })
                                        return <tr key={id}>
                                            <td>{id + 1}</td>
                                            <td>{student.name}</td>
                                            <td>{student.subname}</td>
                                            <td>{student.sex === 'm' ? studentTraductions[getLang()].m : studentTraductions[getLang()].f}</td>
                                            <td>
                                                {
                                                    
                                                }
                                            </td>
                                        </tr> 
                                    }) : <tr> 
                                        <td colSpan={7} style={{textAlign: 'center'}}>
                                            {` ${studentTraductions[getLang()].noStudent} ${ActualClass.name}`}
                                        </td>
                                    </tr>
                }
            </tbody>
        </table>
    </div>
}

export default Promotion;