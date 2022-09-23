import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import { domainsTraductions } from '../../local/domains';
import { host } from '../../utils/fetch';
import { getLang } from '../../utils/lang';

const EditActivitie = ({error, setError, setIsSeq, id, domainInfos}) => {
	const [loading, setLoading] = useState(false);
	const [activitie, setActivitie] = useState({});


    useEffect(() => {
        (
            async () => {
                setLoading(true)
                const resp = await fetch(host+'/activities/'+id, {headers: {
                    'Authorization': sessionStorage.user
                  }})
                const data = await resp.json();
                setActivitie(data);
                setLoading(false);
            }
        )()
    }, [])

	const handleAdd = (e) => {
		e.preventDefault();
		setLoading(true);
		fetch(host+'/activities/'+id, {method: 'PUT', body: JSON.stringify(activitie), headers: {'Content-Type': 'application/json', 'Authorization': sessionStorage.user}})
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
			<input type="text" value={activitie.name} onChange={(e) => {setActivitie(val => {return {...val, name: e.target.value}})}} placeholder={ domainsTraductions[getLang()].activitieName } />
			</div> 
			<div className="field">
			<div className="label">{ domainsTraductions[getLang()].nber }</div>
			<input type="number" value={activitie.appreciationsNber} onChange={(e) => {setActivitie(val => {return {...val, appreciationsNber: e.target.value}})}} placeholder={ domainsTraductions[getLang()].nber } />
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

export default EditActivitie;