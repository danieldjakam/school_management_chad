import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import { domainsTraductions } from '../../local/domains';
import { host } from '../../utils/fetch';
import { getLang } from '../../utils/lang';

const EditDomain = ({error, setError, setIsSeq, id}) => {
    
    const [domain, setDomain] = useState({});
    const [loading, setLoading] = useState(false);
    const [sections, setSections] = useState([]);
    useEffect(() => {
        (
            async () => {
                setLoading(true)
                const resp = await fetch(host+'/domains/'+id, {headers: {
                    'Authorization': sessionStorage.user
                  }})
                const data = await resp.json();
                setDomain(data);
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
        fetch(host+'/domains/'+id, {method: 'PUT', body: JSON.stringify(domain), headers: {'Content-Type': 'application/json', 'Authorization': sessionStorage.user}})
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
      <h1>{ domainsTraductions[getLang()].editDomain }</h1>
    </div>
    <form onSubmit={(e) => {handleUpdate(e)}}>
      <div className="card-content">
        <div className="field">
          <div className="label">{ domainsTraductions[getLang()].domainName }</div>
          <input type="text" value={domain.name} onChange={(e) => {setDomain(val => {return {...val, name: e.target.value}})}} placeholder={ domainsTraductions[getLang()].subjectName } />
        </div> 
        <div className="field">
            <div className="label">{ domainsTraductions[getLang()].section }</div>
            <select value={domain.section}  className="form-control form-control-lg" onChange={(e) => {setDomain(val => {return {...val, section: e.target.value}})}}
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
        <button className="btn btn-blue" type="submit">{loading ? domainsTraductions[getLang()].saving : domainsTraductions[getLang()].save}</button>
        <button onClick={() => {handleCancel()}} type="reset"> {domainsTraductions[getLang()].close} </button>
      </div>
      
    </form>
  </div>
}

export default EditDomain;