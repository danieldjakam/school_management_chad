import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import { subjectTraductions } from '../../local/subject';
import { host } from '../../utils/fetch';
import { getLang } from '../../utils/lang';

const AddMatiere = ({error, setError, setIsSeq}) => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: '',
    over: 10,
    section: parseInt(sessionStorage.getItem('section_id')),
  })

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
      fetch(host+'/subjects/add', {method: 'POST', body: JSON.stringify(data), headers: {'Content-Type': 'application/json', 'Authorization': sessionStorage.user}})
      .then((res) => res.json())
      .then(res => {
          if (res.success) {
              window.location.reload();
          }else{
              setError(res.message)
          }
      })
      .catch(err => setError(`Erreur: ${err}`))
      setLoading(false)
  } 
  const handleCancel = () => {
    setIsSeq(false)
    setError('')
  }
  return <div className="card login-card">
    <div className="card-head">
      <h1>{ subjectTraductions[getLang()].addSubject }</h1>
    </div>
    <form onSubmit={(e) => {handleAdd(e)}}>
      <div className="card-content">
        <div className="field">
          <div className="label">{ subjectTraductions[getLang()].subjectName }</div>
          <input type="text" value={data.name} onChange={(e) => {setData(val => {return {...val, name: e.target.value}})}} placeholder={ subjectTraductions[getLang()].subjectName } />
        </div> 
        <div className="field">
          <div className="label">{ subjectTraductions[getLang()].over }</div>
          <input type="number" min={0} value={data.over} onChange={(e) => {setData(val => {return {...val, over: e.target.value}})}} placeholder={ subjectTraductions[getLang()].subjectOver } />
        </div> 
        <div className="field">
            <div className="label">{ subjectTraductions[getLang()].section }</div>
            <select value={data.section}  className="form-control form-control-lg" onChange={(e) => {setData(val => {return {...val, section: e.target.value}})}}
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
        <button className="btn btn-blue" type="submit">{loading ? subjectTraductions[getLang()].saving : subjectTraductions[getLang()].save}</button>
        <button onClick={() => {handleCancel()}} type="reset"> {subjectTraductions[getLang()].close} </button>
      </div>
      
    </form>
  </div>
}

export default AddMatiere;