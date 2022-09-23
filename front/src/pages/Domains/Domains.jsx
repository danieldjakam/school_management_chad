import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import ReactLoading from 'react-loading';
import { Link, useNavigate } from "react-router-dom";
import * as Swal from 'sweetalert2';
import {
    Modal
} from "reactstrap"
import AddDomain from "./AddDomain";
import EditDomain from "./EditDomain";
import { host } from '../../utils/fetch';
import { getLang } from '../../utils/lang';
import { domainsTraductions } from '../../local/domains';

const Domains = () => {
    const navigate = useNavigate()
    
    if (sessionStorage.stat !== 'ad') {
        navigate('/students/'+sessionStorage.classId)
    }
    const [domains, setDomains] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [loadingDel, setLoadingDel] = useState(false);
    const [isAddMatier, setIsAddMatiere] = useState(false);
    const [id, setId] = useState('');
    const [isEditMatier, setIsEditMatiere] = useState(false);

    useEffect(() => {
        (
            async () => {
                setLoading(true)
                const resp = await fetch(host+'/domains/all', {headers: {
                    'Authorization': sessionStorage.user
                  }})
                const data = await resp.json();
                setDomains(data);
                setLoading(false);
            }
        )()
    }, [])

    const deleteMatiere = (id) => {
        Swal.fire({
            title: 'Confirmez la suppression !',
            icon: 'question',
            text: 'Cette action est irreversible !!'
        }).then(res => {
            if (res.value) {
                setLoadingDel(true);
                fetch(host+'/domains/'+id, {method: 'DELETE', headers: {'Authorization': sessionStorage.user}})
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
            <button onClick={() => {setIsAddMatiere(v => !v)}} className="btn btn-blue">{domainsTraductions[getLang()].addDomain}</button>
        </div>
        <table className="table table-dark table-bordered table-striped">
            <thead>
                <tr>
                    <th>{domainsTraductions[getLang()].name}</th>
                    <th>{domainsTraductions[getLang()].section}</th>
                    <th>Nombre d'activites</th>
                    <th>{domainsTraductions[getLang()].action}</th>
                </tr>
            </thead>
            <tbody>
                {
                    loading ? <tr ><td colSpan={4} style={{justifyItems: 'center', paddingLeft: '50%'}}> <div className="error" style={{ position: 'absolute', top: '39%', left: '53%' }}><ReactLoading color="#fff" type="spin"/></div></td></tr> : domains.length > 0 ? domains.map((domain, id) => {
                        return <tr key={id}>
                            <td>{domain.name}</td>
                            <td>
                                {
                                    domain.section_name
                                }
                            </td>
                            <td>
                                {
                                    domain.total_activities
                                }
                            </td>
                            <td style={{display: 'flex', justifyContent: 'space-between'}}>
                                <Link className='btn btn-primary' to={`${domain.id}`}> {domainsTraductions[getLang()].seeActivities} </Link>
                                <button onClick = { () => {setId(domain.id); setIsEditMatiere(v => !v  )}} className="btn btn-warning"> {domainsTraductions[getLang()].edit} </button>
                                <button className="btn btn-danger" onClick={() => {deleteMatiere(domain.id)}}> {loadingDel ? 'Suppression..' : 'Supprimer'} </button>
                            </td>
                        </tr> }) : <tr> <td colSpan={3} align='center'> {domainsTraductions[getLang()].noDomain + ' ' +domainsTraductions[getLang()].doYou} <button onClick={() => {setIsAddMatiere(v => !v)}} className="btn btn-blue"> {domainsTraductions[getLang()].add} </button> </td> </tr>
                }
            </tbody>
        </table>
        <Modal isOpen={isAddMatier}>
            <AddDomain error={error} setError={setError} setIsSeq={setIsAddMatiere}/>
        </Modal>
        <Modal isOpen={isEditMatier}>
            <EditDomain  error={error} setError={setError} setIsSeq={setIsEditMatiere} id={id}/>
        </Modal>
    </div>
}
export default Domains;