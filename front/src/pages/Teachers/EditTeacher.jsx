import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import { teacherTraductions } from '../../local/teacher';
import { host } from '../../utils/fetch';
import { getLang } from '../../utils/lang';

const EditTeacher = ({error, setError, setIsEditClass, teacherToEditId}) => {
    const [oldC, setOldC] = useState('')
    const [classs, setClasss] = useState({});
    const [teacher, setTeacher] = useState({});
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        (
            async () => {
                setLoading(true)
                const resp = await fetch(host+'/class/getAll', {headers: {
                    'Authorization': sessionStorage.user
                }}).catch(e => setError(e))
                const data = await resp.json();
                setClasss(data);
                setLoading(false);
            }
        )()
    }, [])
    useEffect(() => {
        (
            async () => {
                setLoading(true)
                const resp = await fetch(host+'/teachers/'+teacherToEditId, {headers: {
                  'Authorization': sessionStorage.user
                }}).catch(e => setError(e))
                const data = await resp.json();
                setOldC(data.class_id)
                setTeacher(data);
                setLoading(false);
            }
        )()
    }, [])

    const handleUpdate = (e) => {
        e.preventDefault();
        setLoading(true);
        teacher.OldclassId = oldC;
        fetch(host+'/teachers/'+teacherToEditId, {method: 'PUT', body: JSON.stringify(teacher), headers: {'Content-Type': 'application/json', 'Authorization': sessionStorage.user}})
        .then((res) => res.json())
        .then(res => {
            if (res.success) {
                window.location.reload()
            }else{
                setError(res.message)
            }
        }).catch(e => setError(e))
        setLoading(false)
    }
    const handleCancel = () => {
      setIsEditClass(v => !v)
      setError('')
    }
    
    return <div className="card login-card">
      <div className="card-head">
      <h1>{teacherTraductions[getLang()].editTeacher}</h1>
    </div>
    <form onSubmit={(e) => {handleUpdate(e)}}>
      <div className="card-content">
        <div className="field">
            <div className="label">{teacherTraductions[getLang()].teacherName} <span className="text-danger">*</span> </div>
            <input type="text" value={teacher.name} onChange={(e) => {setTeacher(val => {return {...val, name: e.target.value}})}} placeholder={teacherTraductions[getLang()].teacherName} />
        </div> 
        <div className="field">
            <div className="label">{teacherTraductions[getLang()].teacherSubname}</div>
            <input type="text" value={teacher.subname} onChange={(e) => {setTeacher(val => {return {...val, subname: e.target.value}})}} placeholder={teacherTraductions[getLang()].teacherSubname} />
        </div> 
        <div className="field">
            <div className="label">{teacherTraductions[getLang()].teacherClassname} <span className="text-danger">*</span> </div>
            <select value={teacher.class_id} onChange={(e) => {setTeacher(val => {return {...val, class_id: e.target.value}})}} className="form-control"
                placeholder={teacherTraductions[getLang()].teacherClassname}>
                    <option value={''}>{teacherTraductions[getLang()].selectClass}</option>
                    {
                        classs.length > 0 ? classs.map((classG) => {
                            return <option value={classG.id}>{classG.name}</option>
                        }) : <option value={''}>{teacherTraductions[getLang()].noClass}</option>
                    }
                </select>
        </div> 
        <div className="field">
            <div className="label">{teacherTraductions[getLang()].number}</div>
            <input type="tel" value={teacher.phone_number} onChange={(e) => {setTeacher(val => {return {...val, phone_number: e.target.value}})}} placeholder={teacherTraductions[getLang()].number} />
        </div>
        <div className="field">
            <div className="label">{teacherTraductions[getLang()].sex} <span className="text-danger">*</span> </div>
            <select value={teacher.sex} onChange={(e) => {setTeacher(val => {return {...val, sex: e.target.value}})}} className="form-control">
                    <option value={''}>{teacherTraductions[getLang()].selectSex}</option>
                    <option value="m">{teacherTraductions[getLang()].m}</option>
                    <option value="f">{teacherTraductions[getLang()].f}</option>
                </select>
        </div>

        {
          error !== '' ? <div className="error">{error}</div> : ''
        } 
      </div>
      <div className="card-footer">
        <button className="btn btn-blue" type="submit">{loading ? teacherTraductions[getLang()].saving : teacherTraductions[getLang()].save}</button>
        <button onClick={() => {handleCancel()}} type="reset"> {teacherTraductions[getLang()].close} </button>
      </div>
      
    </form>
    </div>
}

export default EditTeacher;