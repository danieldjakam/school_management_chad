import React, { useEffect, useState } from 'react';
import { host } from '../../utils/fetch';
import EditLanguage from '../Profile/EditLanguage';
import EditProfile from '../Profile/EditProfile';
import Profile from '../Profile/Profile';
function ParamsCompt() {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [userInfos, setUserInfos] = useState([]);

	const [isEditInfos, setIsEditInfos] = useState(false);
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
	return (
		<div className='container proCon'>
		{
			error !== '' ? <div className="alert alert-danger">{error}</div> : <></>
		}
		{
		isEditInfos ? <EditProfile setIsEditInfos={setIsEditInfos} setError={setError}/> : <Profile userInfos={userInfos} setIsEditInfos={setIsEditInfos}/>
    }
    <EditLanguage setError={setError}/>
	{
		loading ? '' : ''
	}
  </div>)
}

export default ParamsCompt