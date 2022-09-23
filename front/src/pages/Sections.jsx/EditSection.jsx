import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import { sectionTraductions } from '../../local/section';
import { host } from '../../utils/fetch';
import { getLang } from '../../utils/lang';

const EditSection = ({error, id, setError, setIsEditSection}) => {
    const [section, setSection] = useState({});
    const [loading, setLoading] = useState(false);
    const types = [1, 2];
    useEffect(() => {
        (
            async () => {
                setLoading(true)
                const resp = await fetch(host+'/sections/'+id, {headers: {
                    'Authorization': sessionStorage.user
                }})
                const data = await resp.json();
                setSection(data);
                setLoading(false);
            }
        )()
    }, [])
    const handleCancel = () => {
      setIsEditSection(false)
      setError('')
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        setLoading(true);
        fetch(host+'/sections/'+id, {method: 'PUT', body: JSON.stringify(section), headers: {'Content-Type': 'application/json', 'Authorization': sessionStorage.user}})
        .then((res) => res.json())
        .then(res => {
          console.log(res);
            if (res.success) {
                window.location.reload()
            }else{
              setError(res.message)
            }
        })
        setLoading(false)
    }
    return <div className="card login-card">
    <div className="card-head">
      <h1>{sectionTraductions[getLang()].editdSection}</h1>
    </div>
    <form onSubmit={(e) => {handleUpdate(e)}}>
        <div className="card-content">
            <div className="field">
                <div className="label">{sectionTraductions[getLang()].seqName}</div>
                <input type="text" value={section.name} onChange={(e) => {setSection(val => {return {...val, name: e.target.value}})}} placeholder={sectionTraductions[getLang()].seqName} />
            </div>
            <div className="field" style={{display: 'flex'}}>
                    <label className="label">{sectionTraductions[getLang()].type}</label>
                    <select value={section.type} className="form-control" onChange={(e) => {setSection(val => {return{...val, type: e.target.value}})}}>
                        {
                                types.map(type => {
                                    return <option key={type} value={type}>
                                        {type}
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
            <button onClick={() => {handleCancel()}} type="reset"> {sectionTraductions[getLang()].close}</button>
        </div>
      
    </form>
</div>
}

export default EditSection;