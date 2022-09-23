import React, { useEffect } from 'react';
import { useState } from "react";
import { studentTraductions } from '../../local/student';
import { host } from '../../utils/fetch';
import { getLang } from '../../utils/lang';

const EditAnnualExam = ({error, setError, setIsEditAnnualExam, id}) => {

    const [annual_exam, setAnnualExam] = useState({});
    const [loading, setLoading] = useState(false);
    
    const handleAdd = (e) => {
        e.preventDefault();
        setLoading(true);
        fetch(host+'/annuals/'+id, {method: 'PUT', body: JSON.stringify(annual_exam), headers: {'Content-Type': 'application/json', 'Authorization': sessionStorage.user}})
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
    useEffect(() => {
        (
            async () => {
                setLoading(true)
                const resp = await fetch(host+'/annuals/'+id, {headers: {
                    'Authorization': sessionStorage.user
                  }})
                const data = await resp.json();
                setAnnualExam(data);
                setLoading(false);
            }
        )()
    }, [])
    const handleCancel = () => {
      setIsEditAnnualExam(false)
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
                <input type="text" value={annual_exam.name} onChange={(e) => {setAnnualExam(val => {return {...val, name: e.target.value}})}} placeholder={studentTraductions[getLang()].addTrim} />
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

export default EditAnnualExam;