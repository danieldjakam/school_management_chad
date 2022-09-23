import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import ReactLoading from 'react-loading';
import { useNavigate, useParams } from "react-router-dom";
import * as Swal from 'sweetalert2';
import {
    Modal
} from "reactstrap"
import AddActivitie from "./AddActivitie";
import EditActivitie from "./EditActivitie";
import { host } from '../../utils/fetch';
import { getLang } from '../../utils/lang';
import { domainsTraductions } from '../../local/domains';

const Activities = () => {
    const navigate = useNavigate()
    
    if (sessionStorage.stat !== 'ad') {
        navigate('/students/'+sessionStorage.classId)
    }
    const [activities, setActivities] = useState({});
    const [domain, setDomain] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [loadingDel, setLoadingDel] = useState(false);
    const [isAddMatier, setIsAddMatiere] = useState(false);
    const [id, setId] = useState('');
    const [isEditMatier, setIsEditMatiere] = useState(false);
    const comId = useParams().id;

    useEffect(() => {
        (
            async () => {
                setLoading(true)
                const resp = await fetch(host+'/activities/some/'+comId, {headers: {
                    'Authorization': sessionStorage.user
                  }})
                const data = await resp.json();
                setActivities(data);
                setLoading(false);
            }
        )()
    }, [])

    useEffect(() => {
        (
            async () => {
                setLoading(true)
                const resp = await fetch(host+'/domains/'+comId, {headers: {
                    'Authorization': sessionStorage.user
                  }})
                const data = await resp.json();
                setDomain(data);
                setLoading(false);
            }
        )()
    }, [])

    const deleteActivitie = (id) => {
        Swal.fire({
            title: 'Confirmez la suppression !',
            icon: 'question',
            text: 'Cette action est irreversible !!'
        }).then(res => {
            if (res.value) {
                setLoadingDel(true);
                fetch(host+'/activities/'+id, {method: 'DELETE', headers: {'Authorization': sessionStorage.user}})
                    .then((res) => res.json())
                    .then((res) => { 
                        console.log(res);
                        if (res.success) {
                            window.location.reload();
                        }else{
                            setError(res.message)
                        }
                    })
                setLoadingDel(false)
            }
        })
    }
    return <div style={{padding: '10px 10px'}} className='container'>
        
        <div style={{marginBottom: '10px'}}>
            <h1>{domainsTraductions[getLang()].actDomain + domain.name}</h1>
            <button onClick={() => {setIsAddMatiere(v => !v)}} className="btn btn-blue">{domainsTraductions[getLang()].addActivitie}</button>
        </div>
        <table className="table table-dark table-bordered table-striped">
            <thead>
                <tr>
                    <th>{domainsTraductions[getLang()].name}</th>
                    <th>{domainsTraductions[getLang()].nber}</th>
                    <th>{domainsTraductions[getLang()].action}</th>
                </tr>
            </thead>
            <tbody>
                {
                    loading ? <tr ><td colSpan={4} style={{justifyItems: 'center', paddingLeft: '50%'}}> <div className="error" style={{ position: 'absolute', top: '39%', left: '53%' }}><ReactLoading color="#fff" type="spin"/></div></td></tr> : activities.length > 0 ? activities.map((activitie, id) => {
                        return <tr key={id}>
                            <td>{activitie.name}</td>
                            <td>
                                {
                                    activitie.nber
                                }
                            </td>
                            <td style={{display: 'flex', justifyContent: 'space-between'}}>
                                <button onClick = { () => {setId(activitie.id); setIsEditMatiere(v => !v  )}} className="btn btn-warning"> {domainsTraductions[getLang()].edit} </button>
                                <button className="btn btn-danger" onClick={() => {deleteActivitie(activitie.id)}}> {loadingDel ? 'Suppression..' : 'Supprimer'} </button>
                            </td>
                        </tr> }) : <tr> <td colSpan={3} align='center'> {domainsTraductions[getLang()].noAct + ' ' +domainsTraductions[getLang()].doYou} <button onClick={() => {setIsAddMatiere(v => !v)}} className="btn btn-blue"> {domainsTraductions[getLang()].add} </button> </td> </tr>
                }
            </tbody>
        </table>
        <Modal isOpen={isAddMatier}>
            <AddActivitie  error={error} domainInfos={domain} setError={setError} setIsSeq={setIsAddMatiere}/>
        </Modal>
        <Modal isOpen={isEditMatier}>
            <EditActivitie  error={error} setError={setError} setIsSeq={setIsEditMatiere} id={id}/>
        </Modal>
    </div>
}
export default Activities;