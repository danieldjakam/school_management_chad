import React from 'react';
import { useState } from "react";
import { domainsTraductions } from '../../local/domains';
import { host } from '../../utils/fetch';
import { getLang } from '../../utils/lang';

const AddActivitie = ({error, setError, setIsSeq, domainInfos}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: '',
    section: domainInfos.section,
    domainId: domainInfos.id,
    appreciationsNber: 3,
  })
  const handleAdd = (e) => {
      e.preventDefault();
      setLoading(true);
      fetch(host+'/activities/add', {method: 'POST', body: JSON.stringify(data), headers: {'Content-Type': 'application/json', 'Authorization': sessionStorage.user}})
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
      <h1>{ domainsTraductions[getLang()].addActivitie}</h1>
    </div>
    <form onSubmit={(e) => {handleAdd(e)}}>
      <div className="card-content">
        <div className="field">
          <div className="label">{ domainsTraductions[getLang()].activitieName }</div>
          <input type="text" value={data.name} onChange={(e) => {setData(val => {return {...val, name: e.target.value}})}} placeholder={ domainsTraductions[getLang()].activitieName } />
        </div> 
        <div className="field">
          <div className="label">{ domainsTraductions[getLang()].nber }</div>
          <input type="number" value={data.appreciationsNber} onChange={(e) => {setData(val => {return {...val, appreciationsNber: e.target.value}})}} placeholder={ domainsTraductions[getLang()].nber } />
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

export default AddActivitie;