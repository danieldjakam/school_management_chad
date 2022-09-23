import React, { useEffect, useState } from 'react';
import * as Swal from 'sweetalert2'
import { paramsTraductions } from '../../local/params';
import { host } from '../../utils/fetch';
import { getLang } from '../../utils/lang';
import { roles } from '../../utils/role';
import EditLanguage from './EditLanguage';
import EditProfile from './EditProfile';
import Profile from './Profile';
function Params() {
  
	const [data, setData] = useState({
		username: '',
		email: '',
		password: '',
		confirm: '',
		role: 'ad',	
	})
	const [admins, setAdmins] = useState([]);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('')
	const [loading, setLoading] = useState(false);
	const [userInfos, setUserInfos] = useState([]);

	const [isEditInfos, setIsEditInfos] = useState(false);
	
	useEffect(() => {
		(
			async () => {
			if (sessionStorage.stat === 'ad') {
				setLoading(true)
				const resp = await fetch(host+'/users/all', {headers: {
				'Authorization': sessionStorage.user
				}})
				const data = await resp.json();
				setAdmins(data);
				setLoading(false);
			}
			}
		)()
	}, [])
	useEffect(() => {
		(
			async () => {
				setLoading(true)
				const resp = await fetch(host+'/users/getTeacherOrAdmin/', {headers: {
					'Authorization': sessionStorage.user
				}})
				const data = await resp.json();
				setUserInfos(data);
				setLoading(false);
			}
		)()
	}, [])

	const handleRegister = (e) => {
		setLoading(true);
		e.preventDefault();
		fetch(host+'/users/register', {method: 'POST', body: JSON.stringify(data), headers: {'Content-Type': 'application/json', 'Authorization': sessionStorage.user}})
		.then((res) => res.json())
		.then(res => {
			if (res.success) {
			setSuccess('Nouvel administrateur enregistre')
			setTimeout(() => {
				setSuccess('')
			}, 5000)
			window.location.reload()
			}else{
			console.log(res.message);
			setError(res.message)
			}
		})
		setLoading(false)
	}
	const deleteAdmin = (id) => {
		Swal.fire({
			title: 'Confirmez la suppression !',
			icon: 'question',
			text: 'Cette action est irreversible !!'
		}).then(res => {
			if (res.value) {
				fetch(host+'/users/'+id, {method: 'DELETE', headers: {'Authorization': sessionStorage.user}})
					.then((res) => res.json())
					.then((res) => { 
						console.log(res);
						if (res.success) {
							window.location.reload();
						}else{
							console.log(res.message);
							setError(res.message)
						}
					})
			}
		})
	}
	return (
		<div className='container proCon'>
		{
			success !== '' ? <div className="alert alert-success">{success}</div> : <></>
		}
		{
			sessionStorage.stat === 'ad' ? <div className="profile">
			<div className="addAdmin">
			<div className="card ">
				<div className="card-head">
				<h1>{paramsTraductions[getLang()].addAdmin}</h1>
				</div>
				<form onSubmit={(e) => {handleRegister(e)}}>
				<div className="card-content">
					<div className="field">
						<div className="label">{paramsTraductions[getLang()].username}</div>
						<input type="text" value={data.username} onChange={(e) => {setData(val => {return {...val, username: e.target.value}})}} placeholder={paramsTraductions[getLang()].username} />
					</div> 
					<div className="field">
						<div className="label">Noms et Prenoms</div>
						<input type="text" value={data.email} onChange={(e) => {setData(val => {return {...val, email: e.target.value}})}} placeholder={paramsTraductions[getLang()].email} />
					</div> 
					<div className="field">
						<div className="label">{paramsTraductions[getLang()].role}</div>
						<select value={data.role} className='form-control' onChange={(e) => {setData(val => {return {...val, role: e.target.value}})}}>
							<option value="">{paramsTraductions[getLang()].selectRole}</option>
							{
								roles.map(role => <option key={role.key} value={role.key} >{role.name}</option> )
							}
						</select>
					</div> 
					<div className="field">
						<div className="label">{paramsTraductions[getLang()].password} </div>
						<input type="password" value={data.password} onChange={(e) => {setData(val => {return {...val, password: e.target.value}})}}
						placeholder={paramsTraductions[getLang()].password} />
					</div> 
					<div className="field">
						<div className="label">{paramsTraductions[getLang()].confirm}</div>
						<input type="password" value={data.confirm} onChange={(e) => {setData(val => {return {...val, confirm: e.target.value}})}}
						placeholder={paramsTraductions[getLang()].confirm}/>
					</div> 

					{
					error !== '' ? <div className="error">{error}</div> : ''
					} 
				</div>
				<div className="card-footer">
					<button type="submit">{loading ? paramsTraductions[getLang()].addind : paramsTraductions[getLang()].add}</button>
				</div>
				</form>
			</div>
			</div>
			<div className="profileBox">
			
				{
					isEditInfos ? <EditProfile setIsEditInfos={setIsEditInfos} setError={setError}/> : <Profile userInfos={userInfos} setIsEditInfos={setIsEditInfos}/>
				}

				<div className="card d" style={{marginTop: '20px'}}>
					<div className="card-head">
						<h1>{paramsTraductions[getLang()].allAdmin}</h1>
					</div>

					<div className="card-content">
						{
							admins.filter(ad => ad.role === 'ad').length > 0 ? admins.filter(ad => ad.role === 'ad').map((admin, id) => {
							return <div className="adminCard" key={id}>
									<div className="left">
										<div className="img">
										<img src="assets/1.png" alt="" />
										</div>
										<div className="about">
										<h1>
											{admin.username}
										</h1>
										</div>
									</div>
					
									<div className="rigth">
										<button onClick={() => {deleteAdmin(admin.id)}} type="submit"> {paramsTraductions[getLang()].delete}</button>
									</div>
									</div>
							}) : <div className="adminCard">
								<h3>{paramsTraductions[getLang()].noAdmin}</h3>
								</div>
						}
					</div>
				</div>


				<div className="card d" style={{marginTop: '20px'}}>
					<div className="card-head">
						<h1>{paramsTraductions[getLang()].allComp}</h1>
					</div>

					<div className="card-content">
						{
							admins.filter(ad => ad.role === 'comp').length > 0 ? admins.filter(ad => ad.role === 'comp').map((admin, id) => {
							return <div className="adminCard" key={id}>
									<div className="left">
										<div className="img">
										<img src="assets/1.png" alt="" />
										</div>
										<div className="about">
										<h1>
											{admin.username}
										</h1>
										</div>
									</div>
					
									<div className="rigth">
										<button onClick={() => {deleteAdmin(admin.id)}} type="submit"> {paramsTraductions[getLang()].delete}</button>
									</div>
									</div>
							}) : <div className="adminCard">
								<h3>{paramsTraductions[getLang()].noComp}</h3>
								</div>
						}
					</div>
				</div>
			</div>
		</div>
			:  isEditInfos ?<EditProfile setIsEditInfos={setIsEditInfos} setError={setError}/> : <Profile userInfos={userInfos} setIsEditInfos={setIsEditInfos}/>
		}
		<EditLanguage setError={setError}/>
		</div>
	)
}

export default Params