import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { studentTraductions } from '../../local/student';
import { host } from '../../utils/fetch';
import { getLang } from '../../utils/lang';
import ReactLoading from 'react-loading';
import { Modal } from 'reactstrap';
import InfosPromo from './InfosPromo';

const Promotion = () => {
    const [students, setStudents ] = useState([]);
    const [subjects, setSubjects ] = useState([]);
    const [classes, setClasses] = useState([]);
    const [ActualClass, setActualClass ] = useState({});
    const [loading, setLoading ] = useState(false);
    const {exam_id, class_id, type} = useParams();
    const [notes, setNotes] = useState({});
    const [showInfos, setShowInfos] = useState(true);
    const [classeIds, setClassesIds] = useState([]);
    useEffect(() => {
        (
            async () => {
                setLoading(true)
                const re = await fetch(host+'/students/'+class_id, {headers: {
                    'Authorization': sessionStorage.user
                }})
                const dat = await re.json();

                const resp2 = await fetch(host+'/class/'+class_id, {headers: {
                    'Authorization': sessionStorage.user
                }})
                const data2 = await resp2.json();

                const resp4 = await fetch(host+'/subjects/all2/'+type, {headers: {
                    'Authorization': sessionStorage.user
                }})
                const data4 = await resp4.json();
                
                const resp5 = await fetch(host+`/notes/all${parseInt(type) === 1 ? '' : '2'}/${class_id}/${exam_id}`, {headers: {
                    'Authorization': sessionStorage.user
                }})
                const data5 = await resp5.json();
                
                const resp = await fetch(host+'/class/by-level/'+ (data2.level + 1), {headers: {
                    'Authorization': sessionStorage.user
                }})
                const data = await resp.json();
                
                let arr = [];
                data.forEach(classe => {
                    arr[classe.id] = [];
                });
                arr[class_id] = [];
                setClassesIds(arr);
                setClasses(data);
                setStudents(dat);
                setActualClass(data2);
                setSubjects(data4);
                setNotes(data5);
                setLoading(false);
            }
        )()
    }, []);

    const checkClasse = (studentId, classId) => {
        let arr = classeIds;
        if (arr[classId].includes(studentId)) {
            arr[classId] = arr[classId].filter(r => r !== studentId);
        }else{
            arr[classId].push(studentId);
        }
        setClassesIds(arr);
    }


    const select = (classid, sid) => {
        fetch(host+'/students/promote', {  
            method: 'POST', body: JSON.stringify(
                {
                    student: sid,
                    class_id: classid
                }
            ), 
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': sessionStorage.user
            }
        })
            .then((res) => res.json())
            .then(res => {
                if (res.success) {
                    window.location.reload()
                }
            })
            .catch(e => console.log(e))
    }
    return <div className="container">
        <h4 style={{ display: 'flex' }}>
            Bienvenue dans la promotion des eleves de {ActualClass.name}
            <div className="help" 
                onClick={() => {setShowInfos(v => !v)}}
                style={{ background: '#0c56ac', color: '#fff', marginLeft: '10px',
                            height: '30px', width: '30px', borderRadius: '50%',
                            display: 'flex', justifyContent: 'center', alignItems: 'center',
                            cursor: 'pointer'
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
                    {
                        classes.map(r => {
                            return <th key={r.id}>
                                {r.name}
                            </th>
                        })
                    }
                    <th>Redoublant</th>
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
                                        const herNotes = notes.filter(n => parseInt(n.student_id) === parseInt(student.id));
                                        herNotes.forEach(no => {
                                            total += parseInt(no.value);
                                        })
                                        const diviser = parseInt(type) === 1 ? 
                                                                            subjects.length * 10
                                                                        :  subjects.length * 20;
                                        let average = Math.round((total / diviser) * 20 * 100) / 100;
                                        
                                        return <tr key={id}>
                                            <td>{id + 1}</td>
                                            <td>{student.name}</td>
                                            <td>{student.subname}</td>
                                            <td>{student.sex === 'm' ? studentTraductions[getLang()].m : studentTraductions[getLang()].f}</td>
                                            <td>
                                                {`
                                                    ${average} / 20
                                                `}
                                            </td>
                                            
                                            {
                                                classes.map(classd => {
                                                    return <td key={classd.id}>
                                                        <button className="btn btn-primary">
                                                            <svg onClick={() => {checkClasse(student.id, classd.id); select(classd.id, student.id)}} 
                                                                xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
                                                                class="bi bi-send-check-fill" viewBox="0 0 16 16">
                                                                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 1.59 2.498C8 14 8 13 8 12.5a4.5 4.5 0 0 1 5.026-4.47L15.964.686Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
                                                                    <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z"/>
                                                            </svg>
                                                        </button>
                                                    </td>
                                                })
                                            }
                                            <td>
                                                <button className="btn btn-primary">
                                                    <svg onClick={() => {checkClasse(student.id, class_id); select(class_id, student.id)}} 
                                                        xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
                                                        class="bi bi-send-check-fill" viewBox="0 0 16 16">
                                                            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 1.59 2.498C8 14 8 13 8 12.5a4.5 4.5 0 0 1 5.026-4.47L15.964.686Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
                                                            <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z"/>
                                                    </svg>
                                                </button>
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

        
        <Modal isOpen={showInfos}>
            <InfosPromo setShowInfos={setShowInfos}/>
        </Modal>
    </div>
}

export default Promotion;