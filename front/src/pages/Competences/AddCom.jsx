import React, { useEffect } from 'react'
import { useState } from "react";
import { comTraductions } from '../../local/com';
import { host } from '../../utils/fetch';
import { getLang } from '../../utils/lang';

const AddCom = ({ error, setError, setIsAddComp}) => {

  const [data, setData] = useState({
    name: '',
    section: parseInt(sessionStorage.getItem('section_id')),
  })
  const [loading, setLoading] = useState(false);
  const [sections, setSections] = useState([]);
  useEffect(() => {
    (
        async () => {
            setLoading(true)
            const resp = await fetch(host+'/sections/all', {headers: {
                'Authorization': sessionStorage.user
              }})
            const data = await resp.json();
            setSections(data);
            setLoading(false);
        }
    )()
  }, [])
  const handleAdd = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(host+'/com/add', {method: 'POST', body: JSON.stringify(data), headers: {'Content-Type': 'application/json', 'Authorization': sessionStorage.user}})
      .then((res) => res.json())
      .then(res => {
        if (res.success) {
          window.location.reload()
        }else{
          setError(res.message)
        }
      })
      setLoading(false)
  }
  const handleCancel = () => {
    setIsAddComp(v => !v)
    setError('')
  } 
  return <div className="card login-card">
    <div className="card-head">
      <h1>
        {comTraductions[getLang()].editCom}
      </h1>
    </div>
    <form onSubmit={(e) => {handleAdd(e)}}>
      <div className="card-content">
        <div className="field">
            <div className="label">{comTraductions[getLang()].addCom}</div>
            <input type="text" value={data.name} onChange={(e) => {setData(val => {return {...val, name: e.target.value}})}} placeholder="Entrer un nom de competence valide" />
        </div> 
        <div className="field">
            <div className="label">{ comTraductions[getLang()].section }</div>
            <select value={data.section} onChange={(e) => {setData(val => {return {...val, section: e.target.value}})}} className="form-control form-control-lg"
            placeholder="Enter password">
                <option value={''}>--- Selectionner la section ----</option>
                {
                  sections.map(section => <option value={section.id} key={section.id}>{section.name}</option>)
                }
            </select>
        </div> 

        {
          error !== '' ? <div className="error">{error}</div> : ''
        } 
      </div>
      
      <div className="card-footer">
        <button className="btn btn-blue" type="submit">{loading ? comTraductions[getLang()].saving : comTraductions[getLang()].save}</button>
        <button onClick={() => {handleCancel()}} type="reset"> {comTraductions[getLang()].close} </button>
      </div>
      
    </form>
  </div>
}

export default AddCom;