import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { studentTraductions } from '../../local/student';
import { host } from '../../utils/fetch';
import { getLang } from '../../utils/lang';

const EditStudent = ({error, setError, studentToEditId, setIsEditStudent}) => {

  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
      (
          async () => {
              setLoading(true)
              const resp = await fetch(host+'/students/one/'+studentToEditId, {headers: {
                  'Authorization': sessionStorage.user
              }})
              const data = await resp.json();
              setStudent(data);
              setLoading(false);
          }
      )()
  }, [studentToEditId])

  const handleUpdate = (e) => {
        e.preventDefault();
        setLoading(true);
        student.date = `${new Date(student.birthday).getUTCFullYear()}-${new Date(student.birthday).getMonth() < 10 ? '0' + new Date(student.birthday).getMonth() : ''}-0${new Date(student.birthday).getDay()}`;
        fetch(host+'/students/'+studentToEditId, {method: 'PUT', body: JSON.stringify(student), headers: {'Content-Type': 'application/json', 'Authorization': sessionStorage.user}})
            .then((res) => res.json())
            .then(res => {
                if (res.success) {
                    if (sessionStorage.stat === 'ad') {
                        window.location.reload();
                    } else {
                        navigate(`/reduct-fees/${studentToEditId}`)
                    }
                }else{
                    setError(res.message)
                }
            })
      setLoading(false)
  }
  // const date = `${new Date(student.birthday).getUTCFullYear()}-${new Date(student.birthday).getMonth() < 10 ? '0' + new Date(student.birthday).getMonth() : ''}-0${new Date(student.birthday).getDay()}`;
  const handleCancel = () => {
    setIsEditStudent(false)
    setError('')
  }
  return <div className="card login-card">
  <div className="card-head">
    <h1>{studentTraductions[getLang()].editStudent}</h1>
  </div>
  <form onSubmit={(e) => {handleUpdate(e)}}>
    <div className="card-content">
      <div className="field">
          <div className="label">{studentTraductions[getLang()].studentName} <span className="text-danger">*</span> </div>
          <input type="text" value={student.name} onChange={(e) => {setStudent(val => {return {...val, name: e.target.value}})}} placeholder={studentTraductions[getLang()].studentName}/>
      </div>
      <div className="field">
          <div className="label">{studentTraductions[getLang()].studentSubname}</div>
          <input type="text" value={student.subname} onChange={(e) => {setStudent(val => {return {...val, subname: e.target.value}})}} placeholder={studentTraductions[getLang()].subName} />
      </div>
      <div className="field">
          <div className="label">{studentTraductions[getLang()].birthday}</div>
          <input type="date" value={student.birthday} onChange={(e) => {setStudent(val => {return {...val, birthday: e.target.value}})}} placeholder={studentTraductions[getLang()].birthday} />
      </div>
      <div className="field">
          <div className="label">{studentTraductions[getLang()].birthday_place}</div>
          <input type="text" value={student.birthday_place} onChange={(e) => {setStudent(val => {return {...val, birthday_place: e.target.value}})}} placeholder={studentTraductions[getLang()].birthday_place} />
      </div>
      <div className="field">
          <div className="label">{studentTraductions[getLang()].sex}</div>
          <select value={student.sex} onChange={(e) => {setStudent(val => {return {...val, sex: e.target.value}})}} className="form-control form-control-lg">
                  <option value={''}>{studentTraductions[getLang()].selectSex}</option>
                  <option value="m">{studentTraductions[getLang()].m}</option>
                  <option value="f">{studentTraductions[getLang()].f}</option>
              </select>
      </div>
      <div className="field">
          <div className="label">{studentTraductions[getLang()].fatherName} <span className="text-danger">*</span> </div>
          <input type="tel" value={student.fatherName} onChange={(e) => {setStudent(val => {return {...val, fatherName: e.target.value}})}} placeholder={studentTraductions[getLang()].fatherName} />
      </div>
      <div className="field">
          <div className="label">{studentTraductions[getLang()].fatherNumber}</div>
          <input type="tel" value={student.phone_number} onChange={(e) => {setStudent(val => {return {...val, phone_number: e.target.value}})}} placeholder={studentTraductions[getLang()].fatherNumber} />
      </div>
      <div className="field">
          <div className="label">{studentTraductions[getLang()].fatherEmail}</div>
          <input type="email" value={student.email} onChange={(e) => {setStudent(val => {return {...val, email: e.target.value}})}} placeholder={studentTraductions[getLang()].fatherEmail} />
      </div>
      <div className="field">
          <div className="label">{studentTraductions[getLang()].fatherProfession}</div>
          <input type="tel" value={student.profession} onChange={(e) => {setStudent(val => {return {...val, profession: e.target.value}})}} placeholder={studentTraductions[getLang()].fatherProfession} />
      </div>
      <div className="field check " style={{display:'flex'}}>
          <label className={`label ${student.status === 'new' ? 'checked' : ''}`} htmlFor='check'>{studentTraductions[getLang()].newStudent}</label>
          <input type="checkbox" checked={student.status === 'new' ? true : false} onChange={(e) => {setStudent(val => {return{...val, status: student.status === 'new' ? 'old' : 'new'}})}} id="check" />
      </div> 
      {
        error !== '' ? <div className="error">{error}</div> : ''
      } 
    </div>
<div className="card-footer">
  <button className="btn btn-blue" type="submit">{loading ? studentTraductions[getLang()].saving : studentTraductions[getLang()].save}</button>
  <button onClick={() => {handleCancel()}} type="reset"> {studentTraductions[getLang()].close}</button>
</div>
    
  </form>
</div>
}

export default EditStudent;