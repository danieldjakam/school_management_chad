import React from 'react'
import { useState } from "react";
import { sectionTraductions } from '../../local/section';
import { host } from '../../utils/fetch';
import { getLang } from '../../utils/lang';

const AddSection = ({error, setError, setIsAddSection}) => {

    const [data, setData] = useState({
        name: '',
        type: 1
    })
    const types = [
        {
            id: 1,
            indication: 'maternelle'
        },
        {
            id: 2,
            indication: 'Primaire'
        },
    ];
    const [loading, setLoading] = useState(false);

    const handleAdd = (e) => {
        e.preventDefault();
        setLoading(true);
        fetch(host+'/sections/store', {method: 'POST', body: JSON.stringify(data), headers: {'Content-Type': 'application/json', 'Authorization': sessionStorage.user}})
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
      setIsAddSection(false)
      setError('')
    }

    return <div className="card login-card">
        <div className="card-head">
        <h1>{sectionTraductions[getLang()].addSection}</h1>
        </div>
        <form onSubmit={(e) => {handleAdd(e)}}>
            <div className="card-content">
                <div className="field">
                    <div className="label">{sectionTraductions[getLang()].secName}</div>
                    <input type="text" value={data.name} onChange={(e) => {setData(val => {return {...val, name: e.target.value}})}} placeholder={sectionTraductions[getLang()].seqName} />
                </div>
                <div className="field">
                    <label className="label">{sectionTraductions[getLang()].type}</label>
                    <select value={data.type} onChange={(e) => {setData(val => {return{...val, type: e.target.value}})}} className="form-control form-control-lg">
                        {
                                types.map(type => {
                                    return <option key={type.id} value={type.id}>
                                        {type.id} - {type.indication}
                                    </option>
                                })
                        }
                    </select>
                </div> 
                {
                    error !== '' ? <div className="error">{error}</div> : ''
                } 
            </div>
            <div className="card-footer">
                <button className="btn btn-blue" type="submit">{loading ? sectionTraductions[getLang()].saving : sectionTraductions[getLang()].save}</button>
                <span onClick={() => {handleCancel()}} type="reset"> {sectionTraductions[getLang()].close}</span>
            </div>
        
        </form>
    </div>
}

export default AddSection;