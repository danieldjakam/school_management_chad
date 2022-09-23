import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import ReactLoading from 'react-loading';
import { Link, useNavigate } from "react-router-dom";
import * as Swal from 'sweetalert2';
import {
    Modal
} from "reactstrap"
import AddCom from "./AddCom";
import EditCom from "./EditCom";
import { host } from '../../utils/fetch';
import { comTraductions } from '../../local/com';
import { getLang } from '../../utils/lang';

const Comp = () => {
    const navigate = useNavigate()
    
    if (sessionStorage.stat !== 'ad') {
        navigate('/students/'+sessionStorage.classId)
    }
    const [trims, setTrims] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [loadingDel, setLoadingDel] = useState(false);
    const [compToEditId, setCompToEditId] = useState('')
    const [isAddComp, setIsAddComp] = useState(false);
    const [isEditComp, setIsEditComp] = useState(false);

    useEffect(() => {
        (
            async () => {
                setLoading(true)
                const resp = await fetch(host+'/com/getAll', {headers: {
                    'Authorization': sessionStorage.user
                  }})
                const data = await resp.json();
                setTrims(data);
                setLoading(false);
            }
        )()
    }, [])

    const deleteClass = (id) => {
        Swal.fire({
            title: 'Confirmez la suppression !',
            icon: 'question',
            text: 'Cette action est irreversible !!'
        }).then(res => {
            if (res.value) {
                setLoadingDel(true);
                fetch(host+'/com/'+id, {method: 'DELETE', headers: {'Authorization': sessionStorage.user}})
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
                setLoadingDel(false)
            }
        })
    }
    return <div style={{padding: '10px 10px'}} className='container'>
        <div style={{marginBottom: '10px'}}>
            <button onClick={() => {setIsAddComp(v => !v)}} className="btn btn-blue">{comTraductions[getLang()].addCom}</button>
        </div>
        <table className="table table-dark table-bordered table-striped">
            <thead>
                <tr>
                    <th>{comTraductions[getLang()].name}</th>
                    <th>{comTraductions[getLang()].section}</th>
                    <th>Nombre</th>
                    <th>{comTraductions[getLang()].action}</th>
                </tr>
            </thead>
            <tbody>
                {
                    loading ? <tr ><td colSpan={4} style={{justifyItems: 'center', paddingLeft: '50%'}}> <div className="error" style={{ position: 'absolute', top: '39%', left: '53%' }}><ReactLoading color="#fff" type="spin"/></div></td></tr> : trims.length > 0 ? trims.map((com, id) => {
                        return <tr key={id}>
                            <td>{com.name}</td>
                            <td>
                                {
                                    com.section_name
                                }
                            </td>
                            <td>
                                {
                                    com.total_sub_com
                                }
                            </td>
                            <td style={{display: 'flex', justifyContent: 'space-between'}}>
                                <Link to={'/competences/'+com.id} className="btn btn-primary">Sous competences </Link>
                                <button onClick = { () => {setCompToEditId(com.id); setIsEditComp(v => !v  )}} className="btn btn-warning"> {comTraductions[getLang()].edit} </button>
                                <button className="btn btn-danger" onClick={() => {deleteClass(com.id)}}> {loadingDel ? 'Suppression..' : 'Supprimer'} </button>
                            </td>
                        </tr> }) : <tr> <td colSpan={4} align='center'>{comTraductions[getLang()].nohavecom + ' ' +comTraductions[getLang()].doyou} <button onClick={() => {setIsAddComp(v => !v)}} className="btn btn-blue"> {comTraductions[getLang()].add} </button></td> </tr>
                }
            </tbody>
        </table>

        
        
        <Modal isOpen={isAddComp}>
            <AddCom error={error} setError={setError} setIsAddComp={setIsAddComp}/>
        </Modal>

        <Modal isOpen={isEditComp}>
            <EditCom     error={error} setError={setError} setIsEditComp={setIsEditComp} compToEditId={compToEditId}/>
        </Modal>
    </div>
}
export default Comp;