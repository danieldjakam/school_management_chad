import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import ReactLoading from 'react-loading';
import { useNavigate, useParams } from "react-router-dom";
import * as Swal from 'sweetalert2';
import {
    Modal
} from "reactstrap"
import { host } from '../../utils/fetch';
import { subjectTraductions } from '../../local/subject';
import { getLang } from '../../utils/lang';
import AddSubComp from './AddSubComp';
import EditSubComp from './EditSubComp';

const SubComp = () => {
    const navigate = useNavigate()
    
    if (sessionStorage.stat !== 'ad') {
        navigate('/students/'+sessionStorage.classId)
    }
    const [subComp, setSubComp] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const {id} = useParams();
    const [loadingDel, setLoadingDel] = useState(false);
    const [isAddMatier, setIsAddMatiere] = useState(false);
    // const [idSubComp, setIdSubConp] = useState('');
    const [isEditMatier, setIsEditMatiere] = useState(false);
    const [com, setComp] = useState({});
    const comInfo = {
        id: com.id,
        section: com.section
    };

    useEffect(() => {
        (
            async () => {
                setLoading(true)
                const resp = await fetch(host+'/sub_comp/all/'+id, {headers: {
                    'Authorization': sessionStorage.user
                  }})
                const data = await resp.json();
                setSubComp(data);
                setLoading(false);
            }
        )()
    }, [])

    useEffect(() => {
        (
            async () => {
                setLoading(true)
                const resp = await fetch(host+'/com/'+id, {headers: {
                    'Authorization': sessionStorage.user
                  }})
                const data = await resp.json();
                setComp(data);
                setLoading(false);
            }
        )()
    }, [])

    const deleteSubCom = (id) => {
        Swal.fire({
            title: 'Confirmez la suppression !',
            icon: 'question',
            text: 'Cette action est irreversible !!'
        }).then(res => {
            if (res.value) {
                setLoadingDel(true);
                fetch(host+'/sub_comp/'+id, {method: 'DELETE', headers: {'Authorization': sessionStorage.user}})
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
            <h1>Sous competences de : {com.name} </h1>
            <button onClick={() => {setIsAddMatiere(v => !v)}} className="btn btn-blue">{subjectTraductions[getLang()].addSubCom}</button>
        </div>
        <table className="table table-dark table-bordered table-striped">
            <thead>
                <tr>
                    <th>{subjectTraductions[getLang()].name}</th>
                    <th>{subjectTraductions[getLang()].action}</th>
                </tr>
            </thead>
            <tbody>
                {
                    loading ? <tr ><td colSpan={4} style={{justifyItems: 'center', paddingLeft: '50%'}}> <div className="error" style={{ position: 'absolute', top: '39%', left: '53%' }}><ReactLoading color="#fff" type="spin"/></div></td></tr> : subComp.length > 0 ? subComp.map((matiere, id) => {
                        return <tr key={id}>
                            <td>{matiere.name}</td>
                            <td style={{display: 'flex', justifyContent: 'space-between'}}>
                                {/* <button onClick = { () => {setIdSubConp(matiere.id); setIsEditMatiere(v => !v  )}} className="btn btn-warning"> {subjectTraductions[getLang()].edit} </button> */}
                                <button className="btn btn-danger" onClick={() => {deleteSubCom(matiere.id)}}> {loadingDel ? 'Suppression..' : 'Supprimer'} </button>
                            </td>
                        </tr> }) : <tr> <td colSpan={2} align='center'> {subjectTraductions[getLang()].nohavesbject + ' ' +subjectTraductions[getLang()].doyou} <button onClick={() => {setIsAddMatiere(v => !v)}} className="btn btn-blue"> {subjectTraductions[getLang()].add} </button></td> </tr>
                }
            </tbody>
        </table>
        <Modal isOpen={isAddMatier}>
            <AddSubComp  error={error} comInfo={comInfo} setError={setError} setIsSeq={setIsAddMatiere}/>
        </Modal>
        <Modal isOpen={isEditMatier}>
            <EditSubComp  error={error} setError={setError} setIsSeq={setIsEditMatiere} id={id}/>
        </Modal>
    </div>
}
export default SubComp;