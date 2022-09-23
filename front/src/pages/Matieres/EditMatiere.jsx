import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import { subjectTraductions } from '../../local/subject';
import { host } from '../../utils/fetch';
import { getLang } from '../../utils/lang';

const EditMatiere = ({error, setError, setIsSeq, id}) => {
    
    const [subject, setSubject] = useState({});
    const [loading, setLoading] = useState(false);
    const [sections, setSections] = useState([]);
    useEffect(() => {
        (
            async () => {
                setLoading(true)
                const resp = await fetch(host+'/subjects/'+id, {headers: {
                    'Authorization': sessionStorage.user
                  }})
                const data = await resp.json();
                setSubject(data);
                setLoading(false);
            }
        )()
    }, [])
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
    const handleUpdate = (e) => {
        e.preventDefault();
        setLoading(true);
        fetch(host+'/subjects/'+id, {method: 'PUT', body: JSON.stringify(subject), headers: {'Content-Type': 'application/json', 'Authorization': sessionStorage.user}})
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
    <form onSubmit={(e) => {handleUpdate(e)}}>
      <div className="card-content">
        <div className="field">
          <div className="label">{ subjectTraductions[getLang()].subjectName }</div>
          <input type="text" value={subject.name} onChange={(e) => {setSubject(val => {return {...val, name: e.target.value}})}} placeholder={ subjectTraductions[getLang()].subjectName } />
        </div> 
        <div className="field">
          <div className="label">{ subjectTraductions[getLang()].over }</div>
          <input type="text" value={subject.over} onChange={(e) => {setSubject(val => {return {...val, over: e.target.value}})}} placeholder={ subjectTraductions[getLang()].subjectOver } />
        </div> 
        <div className="field">
            <div className="label">{ subjectTraductions[getLang()].section }</div>
            <select value={subject.section}  className="form-control form-control-lg" onChange={(e) => {setSubject(val => {return {...val, section: e.target.value}})}}
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

export default EditMatiere;