import React from 'react';
import { useState } from "react";
import { studentTraductions } from '../../local/student';
import { host } from '../../utils/fetch';
import { getLang } from '../../utils/lang';

const AddAnnualExam = ({error, setError, setIsAnnualExam}) => {

    const [data, setData] = useState({
      name: ''
    })
    const [loading, setLoading] = useState(false);
    
    const handleAdd = (e) => {
        e.preventDefault();
        setLoading(true);
        fetch(host+'/annuals/add', {method: 'POST', body: JSON.stringify(data), headers: {'Content-Type': 'application/json', 'Authorization': sessionStorage.user}})
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
      setIsAnnualExam(false)
      setError('')
    }
    return <div className="card login-card">
        <div className="card-head">
          <h1>{studentTraductions[getLang()].addAnnualExam}</h1>
        </div>
        <form onSubmit={(e) => {handleAdd(e)}}>
          <div className="card-content">
            <div className="field">
                <div className="label">{studentTraductions[getLang()].examName}</div>
                <input type="text" value={data.name} 
                      onChange={(e) => {setData(val => {return {...val, name: e.target.value}})}} 
                      placeholder={'Examen annuel'} />
            </div>
            {
              error !== '' ? <div className="error">{error}</div> : ''
            } 
          </div>
          <div className="card-footer">
            <button className="btn btn-blue" type="submit">{loading ? studentTraductions[getLang()].saving : studentTraductions[getLang()].save}</button>
            <button onClick={() => {handleCancel()}} type="reset"> {studentTraductions[getLang()].close} </button>
          </div>
          
        </form>
  </div>
}

export default AddAnnualExam;