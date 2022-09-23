import React from 'react'
import { useState } from "react";
import { sequenceTraductions } from '../../local/sequence';
import { host } from '../../utils/fetch';
import { getLang } from '../../utils/lang';

const AddSequence = ({error, setError, setIsSeq}) => {

    const [data, setData] = useState({
        name: '',
    })
    const [loading, setLoading] = useState(false);

    const handleAdd = (e) => {
        e.preventDefault();
        setLoading(true);
        fetch(host+'/seq/add', {method: 'POST', body: JSON.stringify(data), headers: {'Content-Type': 'application/json', 'Authorization': sessionStorage.user}})
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
      <h1>{sequenceTraductions[getLang()].addSeq}</h1>
    </div>
    <form onSubmit={(e) => {handleAdd(e)}}>
      <div className="card-content">
        <div className="field">
            <div className="label">{sequenceTraductions[getLang()].seqName}</div>
            <input type="text" value={data.name} onChange={(e) => {setData(val => {return {...val, name: e.target.value}})}} placeholder={sequenceTraductions[getLang()].seqName} />
        </div>
        {
          error !== '' ? <div className="error">{error}</div> : ''
        } 
      </div>
      <div className="card-footer">
        <button className="btn btn-blue" type="submit">{loading ? sequenceTraductions[getLang()].saving : sequenceTraductions[getLang()].save}</button>
        <button onClick={() => {handleCancel()}} type="reset"> {sequenceTraductions[getLang()].close}</button>
      </div>
      
    </form>
</div>
}

export default AddSequence;