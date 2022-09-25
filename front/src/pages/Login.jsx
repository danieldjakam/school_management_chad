import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authTraductions } from '../local/login';
import { host } from '../utils/fetch';
import { getLang } from '../utils/lang';

const Login = ({setUser}) => {

	const [data, setData] = useState({
		username: '',
		password: '',
		remember: false
	})
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	
	const handleLogin = (e) => {
		setLoading(true);
		e.preventDefault();
		fetch(host+'/users/login', {method: 'POST', body: JSON.stringify(data), headers: {'Content-Type': 'application/json'}})
			.then((res) => res.json())
			.then(res => {
				if (res.success) {
				setUser(true);
				sessionStorage.user = res.token
				sessionStorage.stat = res.status
				if (res.status === 'ad') {
					navigate('/class');
				}
				else if(res.status === 'comp'){
					navigate('/class-comp');
				}
				else{
					sessionStorage.classId = res.classId
					sessionStorage.classType = res.type;
					navigate(`/students/${res.classId}`);
				}
				}else{
					setError(res.message)
				}
			})
		.catch((e) => {
			setError('Une erreur est survenue lors de la connexion a la base de donnee.')
		})
		setLoading(false)
	}
	return <>
		<div className="login-view login">
		<div className="card login-card">
			<div className="card-head">
			<h1>{authTraductions[getLang()].login}</h1>
			</div>
			<form onSubmit={(e) => {handleLogin(e)}}>
			<div className="card-content">
				<div className="field">
					<div className="label">{authTraductions[getLang()].emailOrPseudo}</div>
					<input type="text" value={data.username} onChange={(e) => {setData(val => {return {...val, username: e.target.value}})}} placeholder={authTraductions[getLang()].emailOrPseudo} />
				</div> 
				<div className="field">
					<div className="label">{authTraductions[getLang()].password}</div>
					<input type="password" value={data.password} onChange={(e) => {setData(val => {return {...val, password: e.target.value}})}}
					placeholder={authTraductions[getLang()].password} />
				</div> 

				{
				error !== '' ? <div className="error">{error}</div> : ''
				} 
			</div>
			<div className="card-footer">
				<button type="submit">
				{
					loading ? authTraductions[getLang()].logining : authTraductions[getLang()].login
				}
				</button>
			</div>
			</form>
		</div>
		</div>
	</>
}

export default Login;