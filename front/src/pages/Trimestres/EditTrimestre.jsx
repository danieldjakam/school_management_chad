import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import { trimTraductions } from '../../local/trim';
import { host } from '../../utils/fetch';
import { getLang } from '../../utils/lang';

const EditTrimestre = ({error, setError, setIsEditTrim, id}) => {
	const [trim, setTrim] = useState({})
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		(
			async () => {
				setLoading(true)
				const resp = await fetch(host+'/trim/'+id, {headers: {
					'Authorization': sessionStorage.user
					}})
				const data = await resp.json();
				setTrim(data);
				setLoading(false);
			}
		)()
	}, [])
	const handleAdd = (e) => {
		e.preventDefault();
		setLoading(true);
		fetch(host+'/trim/'+id, {method: 'PUT', body: JSON.stringify(trim), headers: {'Content-Type': 'application/json', 'Authorization': sessionStorage.user}})
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
		setIsEditTrim(false)
		setError('')
	}
	return <div className="card login-card">
        <div className="card-head">
          <h1>{trimTraductions[getLang()].addTrim}</h1>
        </div>
        <form onSubmit={(e) => {handleAdd(e)}}>
			<div className="card-content">
				<div className="field">
					<div className="label">{trimTraductions[getLang()].trimName}</div>
					<input type="text" value={trim.name} onChange={(e) => {setTrim(val => {return {...val, name: e.target.value}})}} placeholder={trimTraductions[getLang()].addTrim} />
				</div>
				{
				error !== '' ? <div className="error">{error}</div> : ''
				} 
			</div>
			<div className="card-footer">
				<button className="btn btn-blue" type="submit">{loading ? trimTraductions[getLang()].saving : trimTraductions[getLang()].save}</button>
				<button onClick={() => {handleCancel()}} type="reset"> {trimTraductions[getLang()].close} </button>
			</div>
        </form>
      </div>
}

export default EditTrimestre;