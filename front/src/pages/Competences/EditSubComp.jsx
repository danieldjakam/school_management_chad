import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import { subjectTraductions } from '../../local/subject';
import { host } from '../../utils/fetch';
import { getLang } from '../../utils/lang';

const EditSubComp = ({error, setError, setIsSeq, id}) => {
    
    const [matiere, setMatiere] = useState({});
    const [loading, setLoading] = useState(false);
    const [coms, setComs] = useState({});
    const [sections, setSections] = useState([]);
    useEffect(() => {
        (
            async () => {
                setLoading(true)
                const resp = await fetch(host+'/com/getAll', {headers: {
                    'Authorization': sessionStorage.user
                  }})
                const data = await resp.json();
                setComs(data);
                setLoading(false);
            }
        )()
    }, [])
    useEffect(() => {
        (
            async () => {
                setLoading(true)
                const resp = await fetch(host+'/matiere/'+id, {headers: {
                    'Authorization': sessionStorage.user
                  }})
                let matiere = await resp.json();
                let t = JSON.parse(matiere.tags);
                matiere = {...matiere, ...t}
                console.log(matiere)
                setMatiere(matiere);
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
        fetch(host+'/matiere/'+id, {method: 'PUT', body: JSON.stringify(matiere), headers: {'Content-Type': 'application/json', 'Authorization': sessionStorage.user}})
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
          <input type="text" value={matiere.name} onChange={(e) => {setMatiere(val => {return {...val, name: e.target.value}})}} placeholder={ subjectTraductions[getLang()].subjectName } />
        </div> 
        <div className="field">
          <div className="label">{ subjectTraductions[getLang()].slug }</div>
          <input type="text" value={matiere.slug} onChange={(e) => {setMatiere(val => {return {...val, slug: e.target.value}})}} placeholder={ subjectTraductions[getLang()].slugName } />
        </div> 
        <div className="field">
            <div className="label">{ subjectTraductions[getLang()].section }</div>
            <select value={matiere.section}  className="form-control form-control-lg" onChange={(e) => {setMatiere(val => {return {...val, section: e.target.value}})}}
            placeholder="Enter password">
              <option value={''}>--- Selectionner la section ----</option>
                {
                  sections.map(section => <option value={section.id} key={section.id}>{section.name}</option>)
                }
            </select>
        </div>
        <div className="field">
          <div className="label">{ subjectTraductions[getLang()].competence } </div>
          <select value={matiere.comId}  className="form-control form-control-lg" onChange={(e) => {setMatiere(val => {return {...val, comId: e.target.value}})}}>
                  <option value={''}>{ subjectTraductions[getLang()].selectCompetence }</option>
                  {
                    coms.length > 0 ? coms.map(coms => {
                                          return <option value={coms.id}>{coms.name}</option>                    
                                        })
                                  : <option value={''}>{ subjectTraductions[getLang()].addCom }</option>
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

export default EditSubComp;