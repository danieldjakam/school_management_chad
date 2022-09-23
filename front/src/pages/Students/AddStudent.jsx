import React from 'react'
import { useEffect, useState } from "react";
import {useNavigate, useParams } from "react-router-dom";
import { studentTraductions } from '../../local/student';
import { host } from '../../utils/fetch';
import { getLang } from '../../utils/lang';

const AddStudent = ({setIsAddStudent, error, setError}) => {
  const params = useParams();
  const {id} = params;
  const [data, setData] = useState({
    name: '',
    subname: '',
    birthday: '',
    sex: 'm',
    email: '',
    phone_number: '',
    status: 'new',
    fatherName: '',
    profession: '',
    birthday_place: ''
  })
  const [classs, setClass] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
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

  const handleAdd = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(host+'/students/add/'+id, {method: 'POST', body: JSON.stringify(data), headers: {'Content-Type': 'application/json', 'Authorization': sessionStorage.user}})
		.then((res) => res.json())
		.then(res => {
			if (res.success) {
				if (sessionStorage.stat === 'ad') {
					window.location.reload();
				} else {
					navigate(`/reduct-fees/${res.id}`)
				}
			}else{
				setError(res.message)
			}
		})
		setLoading(false)
  }
  
  const handleCancel = () => {
    setIsAddStudent(false)
    setError('')
  }
  return <div className="card login-card">
        <div className="card-head">
          <h1>{studentTraductions[getLang()].addStudent} {classs.name}</h1>
        </div>
        <form onSubmit={(e) => {handleAdd(e)}}>
          <div className="card-content">
            <div className="field">
                <div className="label">{studentTraductions[getLang()].studentName} <span className="text-danger">*</span> </div>
                <input type="text" value={data.name} onChange={(e) => {setData(val => {return {...val, name: e.target.value}})}} placeholder={studentTraductions[getLang()].studentName}/>
            </div>
            <div className="field">
                <div className="label">{studentTraductions[getLang()].studentSubname}</div>
                <input type="text" value={data.subname} onChange={(e) => {setData(val => {return {...val, subname: e.target.value}})}} placeholder={studentTraductions[getLang()].studentSubname} />
            </div>
            <div className="field">
                <div className="label">{studentTraductions[getLang()].birthday}</div>
                <input type="date" value={data.birthday} onChange={(e) => {setData(val => {return {...val, birthday: e.target.value}})}} placeholder={studentTraductions[getLang()].birthday} />
            </div>
            <div className="field">
                <div className="label">{studentTraductions[getLang()].birthday_place}</div>
                <input type="text" value={data.birthday_place} onChange={(e) => {setData(val => {return {...val, birthday_place: e.target.value}})}} placeholder={studentTraductions[getLang()].birthday_place} />
            </div>
            <div className="field">
                <div className="label">{studentTraductions[getLang()].sex}</div>
                <select value={data.sex} onChange={(e) => {setData(val => {return {...val, sex: e.target.value}})}} className="form-control form-control-lg">
                        <option value={''}>{studentTraductions[getLang()].selectSex}</option>
                        <option value="m">{studentTraductions[getLang()].m}</option>
                        <option value="f">{studentTraductions[getLang()].f}</option>
                    </select>
            </div>
            <div className="field">
                <div className="label">{studentTraductions[getLang()].fatherName} <span className="text-danger">*</span> </div>
                <input type="tel" value={data.fatherName} onChange={(e) => {setData(val => {return {...val, fatherName: e.target.value}})}} placeholder={studentTraductions[getLang()].fatherName} />
            </div>
            <div className="field">
                <div className="label">{studentTraductions[getLang()].fatherNumber}</div>
                <input type="tel" value={data.phone_number} onChange={(e) => {setData(val => {return {...val, phone_number: e.target.value}})}} placeholder={studentTraductions[getLang()].fatherNumber} />
            </div>
            <div className="field">
                <div className="label">{studentTraductions[getLang()].fatherEmail}</div>
                <input type="email" value={data.email} onChange={(e) => {setData(val => {return {...val, email: e.target.value}})}} placeholder={studentTraductions[getLang()].fatherEmail} />
            </div>
            <div className="field">
                <div className="label">{studentTraductions[getLang()].fatherProfession}</div>
                <input type="tel" value={data.profession} onChange={(e) => {setData(val => {return {...val, profession: e.target.value}})}} placeholder={studentTraductions[getLang()].fatherProfession} />
            </div>
            <div className="field check " style={{display:'flex'}}>
                <label className={`label ${data.status === 'new' ? 'checked' : ''}`} htmlFor='check'>{studentTraductions[getLang()].newStudent}</label>
                <input type="checkbox" checked={data.status === 'new' ? true : false} onChange={(e) => {setData(val => {return{...val, status: data.status === 'new' ? 'old' : 'new'}})}} id="check" />
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

export default AddStudent;