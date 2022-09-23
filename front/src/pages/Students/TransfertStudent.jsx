import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import ReactLoading from 'react-loading';
import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "reactstrap";
import { host } from '../../utils/fetch';
import { studentTraductions } from '../../local/student';
import { getLang } from '../../utils/lang';
import SelectClass from './SelectClass';
  

const TransfertStudent = () => {
    const params = useParams();
    const navigate = useNavigate();

    const {id} = params;
    const [classs, setClass] = useState({});
    const [students, setStudents] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [studentIds, setStudentIds] = useState([]);
    const [isExport, setIsExport] = useState(false);

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
    useEffect(() => {
        (
            async () => {
                setLoading(true)
                const resp = await fetch(host+'/class/'+id, {headers: {
                    'Authorization': sessionStorage.user
                  }})
                const data = await resp.json();
                setClass(data);
                setLoading(false);
            }
        )()
    }, [id])

    useEffect(() => {
        (
            async () => {
                setLoading(true)
                const resp = await fetch(host+'/students/'+id, {headers: {
                    'Authorization': sessionStorage.user
                  }})
                const data = await resp.json();
                setStudents(data);
                setLoading(false);
            }
        )()
    }, [id])

    const handleCancel = () => {
        navigate(-1);
    }

    const select = (studentId) => {
        if (studentIds.includes(studentId)) {
            setStudentIds(studentIds.filter(id => id !== studentId));
        }else{
            setStudentIds([...studentIds, studentId]);
        }
    }
    
    return <div className='container'>

        <div style={{margin: '10px 0'}}>
            <button onClick={() => {setIsExport(v => !v)}} className="btn btn-blue">
                Valider    
            </button>
            <button className="btn btn-danger" onClick={() => {handleCancel()}} style={{ marginLeft: '10px' }}>
                Annuler
            </button>
        </div>
        <table className="table table-dark table-bordered table-striped">
            <thead>
                <tr>
                    <td>Sélectionner</td>
                    <td>{studentTraductions[getLang()].n} </td>
                    <th>{studentTraductions[getLang()].name}</th>
                    <th>{studentTraductions[getLang()].subname}</th>
                    <th>{studentTraductions[getLang()].s}</th>
                    <th>{studentTraductions[getLang()].b}</th>
                    <th>{studentTraductions[getLang()].class}</th>
                </tr>
            </thead>
            <tbody>
                {
                    loading ? <tr>
                                <td colSpan={5} style={{justifyItems: 'center', paddingLeft: '50%'}}>
                                    <ReactLoading color="#fff" type="cylon"/>
                                </td>
                            </tr> : students.length > 0 ? students.map((student, id) => {
                                    let date;
                                    if (student.birthday) {
                                        date = new Date(student.birthday).getDate() + ' '+ months[new Date(student.birthday).getMonth()] + " " + new Date(student.birthday).getUTCFullYear()
                                    }else{
                                        date = 'Aucune date de naissance';
                                    }
                                    return <tr key={id}>
                                                <td>
                                                    <input type="checkbox" checked={studentIds.includes(student.id)} onChange={(e) => {select(student.id)}} />
                                                </td>
                                                <td>{id + 1}</td>
                                                <td>{student.name}</td>
                                                <td>{student.subname}</td>
                                                <td>{student.sex === 'm' ? studentTraductions[getLang()].m : studentTraductions[getLang()].f}</td>
                                                <td>{date}</td>
                                                <td>{classs.name}</td>
                                            </tr> }) : <tr> 
                                                <td colSpan={7} style={{textAlign: 'center'}}>
                                                    {` ${studentTraductions[getLang()].noStudent} ${classs.name} ${studentTraductions[getLang()].now} `}
                                                </td>
                                            </tr>
                }
            </tbody>
        </table>

        <Modal isOpen={isExport}>
            <SelectClass error={error} setError={setError} setIsExport={setIsExport} studentIds={studentIds}/>
        </Modal>
    </div>
}

export default TransfertStudent;