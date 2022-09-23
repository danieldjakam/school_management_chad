import React from 'react'
import { useNavigate } from 'react-router-dom'
import { paramsTraductions } from '../../local/params'
import {getLang} from '../../utils/lang'

function Profile({userInfos, setIsEditInfos}) {
    const navigate = useNavigate();
    const logout = () => {
        sessionStorage.removeItem('stat')
        sessionStorage.removeItem('user')
        navigate('/login')
        window.location.reload()
    }
    return (<>
        {
            sessionStorage.stat === 'ad' || sessionStorage.stat === 'comp' ? <div className="profile">
            <div className="profileBox">
                <div className="card">
                    <div className="card-content pro">
                        <div className="d">
                            <div className="img">
                            <img src="assets/1.png" alt="Asset" />
                            </div>
                        </div>
                        <h2>
                            {userInfos.username}
                        </h2>
                        <h5>
                            {userInfos.email}
                        </h5> 
                        <h5>
                            {paramsTraductions[getLang()].admin}
                        </h5>
                    </div>
                    <div className="foot">
                        <button className="btn btn-blue" onClick={() => {setIsEditInfos(v => !v)}}>{paramsTraductions[getLang()].editProfile}</button>
                        <button onClick={() => {logout()}}>{paramsTraductions[getLang()].logout}</button>
                    </div>
                    
                </div>
            </div>
        </div>
        : <div className="pro" style={{width: '50%', marginLeft: '25%'}}>
            <div className="card">
                <div className="card-content pro">
                <div className="d">
                    <div className="img">
                    <img src="assets/1.png" alt="Asset" />
                    </div>
                </div>
                <h2>
                    {userInfos.name + " " + userInfos.subname}
                </h2>
                <h5>
                    {userInfos.matricule}
                </h5>
                <h5>
                    {paramsTraductions[getLang()].teacher}
                </h5> 
                </div>
                <div className="foot">
                    <button className="btn btn-blue" onClick={() => {setIsEditInfos(v => !v)}}>{paramsTraductions[getLang()].editProfile}</button>
                    <button onClick={() => {logout()}}>{paramsTraductions[getLang()].logout}</button>
                </div>
            </div>
            </div>
        }
        </>
    )
}

export default Profile