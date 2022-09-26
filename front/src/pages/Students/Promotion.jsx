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
        // console.log(arr);
        setClassesIds(arr);
        // console.log(classeIds);
    }

    const check = (stId, clId) => {
        const val = classeIds[clId].includes(stId);
        return val;
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
                                                            <input checked={check(student.id, classd.id)} 
                                                                onChange={() => {checkClasse(student.id, classd.id); select(classd.id, student.id)}} 
                                                                type="checkbox"/>
                                                    </td>
                                                })
                                            }
                                            <td>
                                                <input checked={check(student.id, class_id)} 
                                                    onChange={() => {checkClasse(student.id, class_id); select(class_id, student.id)}} 
                                                    type="checkbox"/>
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