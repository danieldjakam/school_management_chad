import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import ReactLoading from 'react-loading';
import { useNavigate } from "react-router-dom";

import * as Swal from 'sweetalert2';
import {
    Modal,
} from "reactstrap"
import AddTeacher from "./AddTeachers";
import EditTeacher from "./EditTeacher";
import ShowMdp from './ShowMdp';
import { host } from '../../utils/fetch';
import { handleChangeCsvFile } from '../../utils/functions';
import { teacherTraductions } from '../../local/teacher';
import { getLang } from '../../utils/lang';


const Teachers = () => {
    const navigate = useNavigate()
    
    if (sessionStorage.stat !== 'ad') {
        navigate('/students/'+sessionStorage.classId)
    }
    const [teachers, setTeachers] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [generating, setGenerating] = useState(false);
    const [loadingDel, setLoadingDel] = useState(false);    
    const [teacherToEditId, setTeacherToEditId] = useState('')
    const [isAddteacher, setIsAddTeacher] = useState(false);
    const [isEditteacher, setIsEditTeacher] = useState(false);
    const [isSeeMdp, setIsMdp] = useState(false);
    const [mdp, setMdp] = useState('')

    useEffect(() => {
        (
            async () => {
                setLoading(true)
                const resp = await fetch(host+'/teachers/getAll', {headers: {
                    'Authorization': sessionStorage.user
                  }})
                const data = await resp.json();
                setTeachers(data);
                setLoading(false);
            }
        )()
    }, [])

    const deleteTeacher = (id) => {
        Swal.fire({
            title: 'Confirmez la suppression !',
            icon: 'question',
            text: 'Cette action est irreversible !!'
        }).then(res => {
            if (res.value) {
                setLoadingDel(true);
                fetch(host+'/teachers/'+id, {method: 'DELETE', headers: {'Authorization': sessionStorage.user}})
                    .then((res) => res.json())
                    .then((res) => { 
                        console.log(res);
                        if (res.success) {
                            window.location.reload();
                        }else{
                            console.log(res.message);
                            setError(res.message)
                        }
                    })
                setLoadingDel(false)
            }
        })
    }
    const regeneratePassword = () => {
        setGenerating(true)
        fetch(host+'/teachers/regeneratePassword', {headers: {'Authorization': sessionStorage.user}})
            .then((res) => res.json())
            .then((res) => {
                if (res.success) {
                    window.location.reload();
                }else{
                    setError(res.message)
                }
            })
        setGenerating(false)
    }
    return <div style={{padding: '10px 10px'}} className='container'>
        
        <div style={{marginBottom: '10px'}}>
            <button onClick={() => {setIsAddTeacher(v => !v)}} className="btn btn-blue">{teacherTraductions[getLang()].addTeacher}</button>
            <label htmlFor='csvFile' style={{marginLeft: '10px'}} className="btn btn-success">{teacherTraductions[getLang()].importTeacher}</label>
            <input type="file" accept='.csv' id='csvFile' style={{display: 'none'}} onChange={(e) => {handleChangeCsvFile(e, '/upload/teachers/csv', setError)}} />
            <button onClick={() => {regeneratePassword()}} style={{marginLeft: '10px'}} className="btn btn-blue">{generating ? teacherTraductions[getLang()].loading : teacherTraductions[getLang()].generateNewMdp}</button>
            <a href={host+"/teachers/downloadTeachersPassword/"+sessionStorage.user} target="_blank" rel="noopener noreferrer" style={{marginLeft: '10px'}} className="btn btn-blue">{teacherTraductions[getLang()].downloadTeacherMdp}</a>
        </div>
        <div className="allClas col-md-12">
            {
                    loading ?  <div className="error" style={{ position: 'absolute', top: '39%', left: '53%' }}><ReactLoading color="#fff" type="spin"/></div> : teachers.length > 0 ? teachers.map((teacher, id) => {
                        return <div className="clas" key={id}>
                            <div className="top">
                                <div className="classAbs">
                                    {teacher.name}
                                </div>
                                <div className="qq">
                                    <span className="q">
                                        {teacherTraductions['fr'].name}: 
                                    </span>
                                    <span className="r">
                                        {teacher.name}
                                    </span>
                                </div>
                                <div className="qq">
                                    <span className="q">
                                    {teacherTraductions['fr'].subname}: 
                                    </span>
                                    <span className="r">
                                        {teacher.subname}
                                    </span>
                                </div>  
                                <div className="qq">
                                    <span className="q">
                                        {teacherTraductions['fr'].class}: 
                                    </span>
                                    <span className="r">
                                        {teacher.className}
                                    </span>
                                </div>
                                <div className="qq">
                                    <span className="q">
                                        {teacherTraductions['fr'].section}:
                                    </span>
                                    <span className="r">
                                        {
                                            teacher.section_name
                                        }    
                                    </span>
                                </div>
                                <div className="qq">
                                    <span className="q">
                                    {teacherTraductions['fr'].mr}: 
                                    </span>
                                    <span className="r">
                                        {teacher.matricule}
                                    </span>
                                </div>  
                            </div>
                            <div className="bottom">
                                <button onClick={() => {setMdp(teacher.password); setIsMdp(v => !v);}} className="btn btn-warning"> {teacherTraductions[getLang()].seeMdp} </button>
                                <button onClick={() => {setIsEditTeacher(v => !v); setTeacherToEditId(teacher.id)}} className="btn btn-success"> {teacherTraductions[getLang()].edit}</button>
                                <button className="btn btn-danger" onClick={() => {deleteTeacher(teacher.id)}}> {loadingDel ? teacherTraductions[getLang()].deleting : teacherTraductions[getLang()].delete} </button>
                            </div>  
                        </div> }) : <div className="i">
                                        <div className="empty monINfos">
                                            {teacherTraductions[getLang()].noTeacher} <br />
                                            {teacherTraductions[getLang()].doYou} <button onClick={() => {setIsAddTeacher(v => !v)}} className="btn btn-blue"> {teacherTraductions[getLang()].add} </button>
                                        </div>
                                    </div>
                }
        </div>

        
        
        <Modal isOpen={isAddteacher}>
            <AddTeacher error={error} setError={setError} setIsAddTeacher={setIsAddTeacher}/>
        </Modal>

        <Modal isOpen={isSeeMdp}>
            <ShowMdp setIsMdp={setIsMdp} mdp={mdp}/>
        </Modal>

        <Modal isOpen={isEditteacher}>
            <EditTeacher error={error} setError={setError} setIsEditClass={setIsEditTeacher} teacherToEditId={teacherToEditId}/>
        </Modal>
    </div>
}
export default Teachers;