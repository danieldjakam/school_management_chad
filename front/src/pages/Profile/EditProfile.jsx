import React from 'react'
import { useState } from 'react'
import { paramsTraductions } from '../../local/params'
import { getLang } from '../../utils/lang'
import {CameraFill} from 'react-bootstrap-icons'
import { useEffect } from 'react'
import { host } from '../../utils/fetch'

function EditProfile({setIsEditInfos, setError}) {
    const [loading, setLoading] = useState(false);
    const [updating, setUpdating] = useState(false);
    let [infos, setInfos] = useState({});
    const [otherInfos, setOtherInfos] = useState({
        password: '',
        confirm: ''
    })
    const handleUpdate = (e) => {
        e.preventDefault()
        setUpdating(true);
        infos.password = otherInfos.password;
        infos.confirm = otherInfos.confirm;
        fetch(host+'/users/edit', {method: 'PUT', body: JSON.stringify(infos), headers: {'Content-Type': 'application/json', 'Authorization': sessionStorage.user}})
            .then((res) => res.json())
            .then(res => {
                if (res.success) {
                    window.location.reload()
                }else{
                    setError(res.message)
                }
            })
        setUpdating(false);
    }
    useEffect(() => {
        (
            async () => {
                setLoading(true)
                const resp = await fetch(host+'/users/getTeacherOrAdmin', {headers: {
                    'Authorization': sessionStorage.user
                }})
                const data = await resp.json();

                console.log(data);
                setInfos(data);
                setLoading(false);
            }
        )()
    }, [])
    const handleChangeAvatar = (e) => {
        const url = URL.createObjectURL(e.target.files[0]);
        setSrc(url);
    }
    const [src, setSrc] = useState("assets/1.png");
    return (
        <div className="profileBox" style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="card" style={{ width: '500px' }}>
                <form onSubmit={(e) => {handleUpdate(e)}}>
                    {
                        sessionStorage.stat === 'ad' || sessionStorage.stat === 'comp' ? <div className="card-content pro">
                            <div className="d">
                                <div className="img avatar-img">
                                    <img src={src} alt="Asset" />
                                    <label htmlFor='avatar' className="changeAvatar">
                                        <CameraFill/>
                                    </label>
                                    <input type="file" capture={'user'} onChange={(e) => {handleChangeAvatar(e)}} accept='image/*' style={{ display: 'none' }} id='avatar' />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">{paramsTraductions[getLang()].username}</label>
                                <input type="text" value={infos.username} onChange={(e) => {setInfos(val => {return {...val, username: e.target.value}})}} placeholder={paramsTraductions[getLang()].username} />
                            </div> 
                            <div className="field">
                                <label className="label">Noms et Prenoms</label>
                                <input type="text" value={infos.email} onChange={(e) => {setInfos(val => ({...val, email: e.target.value}))}} placeholder={paramsTraductions[getLang()].email} />
                            </div> 
                            <div className="field">
                                <div className="label">{paramsTraductions[getLang()].password} </div>
                                <input type="password" value={otherInfos.password} onChange={(e) => {setOtherInfos(val => {return {...val, password: e.target.value}})}}
                                placeholder={paramsTraductions[getLang()].password} />
                            </div> 
                            <div className="field">
                                <div className="label">{paramsTraductions[getLang()].confirm}</div>
                                <input type="password" value={otherInfos.confirm} onChange={(e) => {setOtherInfos(val => {return {...val, confirm: e.target.value}})}}
                                placeholder={paramsTraductions[getLang()].confirm}/>
                            </div>  
                        </div>
                        :    <div className="card-content pro">
                                <div className="d">
                                    <div className="img avatar-img">
                                        <img src={src} alt="Asset" />
                                        <label htmlFor='avatar' className="changeAvatar">
                                            <CameraFill/>
                                        </label>
                                        <input type="file" capture={'user'} onChange={(e) => {handleChangeAvatar(e)}} accept='image/*' style={{ display: 'none' }} id='avatar' />
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="label">{paramsTraductions[getLang()].teacherName}</div>
                                    <input type="text" value={infos.name} onChange={(e) => {setInfos(val => {return {...val, name: e.target.value}})}} placeholder={paramsTraductions[getLang()].teacherName} />
                                </div> 
                                <div className="field">
                                    <div className="label">{paramsTraductions[getLang()].teacherSubname}</div>
                                    <input type="text" value={infos.subname} onChange={(e) => {setInfos(val => {return {...val, subname: e.target.value}})}} placeholder={paramsTraductions[getLang()].teacherSubname} />
                                </div> 
                                <div className="field">
                                    <div className="label">{paramsTraductions[getLang()].number}</div>
                                    <input type="tel" value={infos.phone_number} onChange={(e) => {setInfos(val => {return {...val, phone_number: e.target.value}})}} placeholder={paramsTraductions[getLang()].number} />
                                </div>
                                <div className="field">
                                    <div className="label">{paramsTraductions[getLang()].sex}</div>
                                    <select value={infos.sex} onChange={(e) => {setInfos(val => {return {...val, sex: e.target.value}})}} className="form-control">
                                            <option value={''}>{paramsTraductions[getLang()].selectSex}</option>
                                            <option value="m">{paramsTraductions[getLang()].m}</option>
                                            <option value="f">{paramsTraductions[getLang()].f}</option>
                                        </select>
                                </div>
                            </div>
                    }
                    <div className="foot">
                        <button className="btn btn-blue" type='submit'>
                            {
                                updating ? paramsTraductions[getLang()].saving : paramsTraductions[getLang()].save
                            }
                        </button>
                        <button onClick={() => {setIsEditInfos(v => !v)}}>
                            {paramsTraductions[getLang()].cancel}
                        </button>
                    </div>       
                </form>     
            </div>
            {
                loading ? 'Chargement' : ''
            }
        </div>
    )
}

export default EditProfile