import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import { teacherTraductions } from '../../local/teacher';
import { host } from '../../utils/fetch';
import { getLang } from '../../utils/lang';

const AddTeacher = ({ error, setError, setIsAddTeacher}) => {

  const [data, setData] = useState({
    name: '',
    subname: '',
    classId: '',

    phone_number: '',
    sex: 'm',
    birthday: ''
  })
  const [classs, setClasss] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      (
          async () => {
              setLoading(true)
              const resp = await fetch(host+'/class/getAll', {headers: {
                  'Authorization': sessionStorage.user
              }})
              const data = await resp.json();
              setClasss(data);
              setLoading(false);
          }
      )()
  }, [])

  const handleAdd = (e) => {
      e.preventDefault();
      setLoading(true);
      fetch(host+'/teachers/add', {method: 'POST', body: JSON.stringify(data), headers: {'Content-Type': 'application/json', 'Authorization': sessionStorage.user}})
      .then((res) => res.json())
      .then(res => {
          if (res.success) {
            setIsAddTeacher(v => !v)
            window.location.reload()
          }else{
            setError(res.message)
          }
      })
      setLoading(false)
  }

  const handleCancel = () => {
    setIsAddTeacher(v => !v)
    setError('')
  }
  
  return <div className="card login-card">
    <div className="card-head">
      <h1>{teacherTraductions[getLang()].addTeacher}</h1>
    </div>
    <form onSubmit={(e) => {handleAdd(e)}}>
      <div className="card-content">
        <div className="field">
            <div className="label">{teacherTraductions[getLang()].teacherName} <span className="text-danger">*</span> </div>
            <input type="text" value={data.name} onChange={(e) => {setData(val => {return {...val, name: e.target.value}})}} placeholder={teacherTraductions[getLang()].teacherName} />
        </div> 
        <div className="field">
            <div className="label">{teacherTraductions[getLang()].teacherSubname}</div>
            <input type="text" value={data.subname} onChange={(e) => {setData(val => {return {...val, subname: e.target.value}})}} placeholder={teacherTraductions[getLang()].teacherSubname} />
        </div> 
        <div className="field">
            <div className="label">{teacherTraductions[getLang()].teacherClassname} <span className="text-danger">*</span> </div>
            <select value={data.classId} onChange={(e) => {setData(val => {return {...val, classId: e.target.value}})}} className="form-control"
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
            <input type="tel" value={data.phone_number} onChange={(e) => {setData(val => {return {...val, phone_number: e.target.value}})}} placeholder={teacherTraductions[getLang()].number} />
        </div>
        <div className="field">
            <div className="label">{teacherTraductions[getLang()].birthday}</div>
            <input type="date" value={data.birthday} onChange={(e) => {setData(val => {return {...val, birthday: e.target.value}})}} placeholder={teacherTraductions[getLang()].birthday} />
        </div>
        <div className="field">
            <div className="label">{teacherTraductions[getLang()].sex}</div>
            <select value={data.sex} onChange={(e) => {setData(val => {return {...val, sex: e.target.value}})}} className="form-control">
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

export default AddTeacher;