import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import ReactLoading from 'react-loading';
import { Link } from "react-router-dom";
import * as Swal from 'sweetalert2';
import AddClass from "./AddClass";
import EditClass from "./EditClass";
import {
    Modal
} from "reactstrap"
import { useNavigate } from "react-router-dom";
import { host } from '../../utils/fetch';
import { handleChangeCsvFile } from '../../utils/functions';
import { getLang } from '../../utils/lang';
import { classTraductions } from '../../local/class';

const Class = () => {
    const navigate = useNavigate()
    
    if (sessionStorage.stat !== 'ad') {
        navigate('/students/'+sessionStorage.classId)
    }
    const [Classes, setClass] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [classToEditId, setClassToEditId] = useState('')
    const [loadingDel, setLoadingDel] = useState(false);
    const [isAddClass, setIsAddClass] = useState(false);
    const [isEditClass, setIsEditClass] = useState(false);

    useEffect(() => {
        (
            async () => {
                setLoading(true)
                const resp = await fetch(host+'/class/getAll', {headers: {
                    'Authorization': sessionStorage.user
                  }})
                const data = await resp.json();
                setClass(data);
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
                fetch(host+'/class/'+id, {method: 'DELETE', headers: {'Authorization': sessionStorage.user}})
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
            <button onClick={() => {setIsAddClass(v => !v)}} className="btn btn-blue">Ajouter une classe</button>
                                <label htmlFor='csvFile' style={{marginLeft: '10px'}} className="btn btn-success">Importer les classes</label>
                                <input type="file" accept='.csv' id='csvFile' style={{display: 'none'}} onChange={(e) => {handleChangeCsvFile(e, '/upload/class/csv', setError)}} />
        </div>
        <div className="allClas">
            {
                loading ? <div className="error" style={{ position: 'absolute', top: '39%', left: '53%' }}><ReactLoading color="#fff" type="spin"/></div> : Classes.length > 0? Classes.map((classs, id) => {
                    return <div className="clas" key={id}>
                        <div className="top">
                            <div className="classAbs">
                                {classs.name.slice(0, 8)}
                            </div>
                            <div className="qq">
                                <span className="q">
                                {classTraductions[getLang()].class}:
                                </span>
                                <span className="r">
                                    {classs.name}
                                </span>
                            </div>
                            <div className="qq">
                                <span className="q">
                                {classTraductions[getLang()].section}:
                                </span>
                                <span className="r">
                                    {classs.sName}
                                </span>
                            </div>
                            <div className="qq">
                                <span className="q">
                                    {classTraductions[getLang()].level}:
                                </span>
                                <span className="r">
                                    {classs.level}
                                </span>
                            </div>
                            <div className="qq">
                                <span className="q">
                                    {classs.total_students}
                                </span>
                                <span className="r">
                                    élève{classs.total_students > 1 ? 's' : ''}
                                </span>
                            </div>
                        </div>
                        <div className="bottom">
                            <Link to={`/students/${classs.id}`} className="btn btn-primary"> {classTraductions[getLang()].visite} </Link>
                            <button onClick={() => { setClassToEditId(classs.id); setIsEditClass(v => !v)}} className="btn btn-warning"> {classTraductions[getLang()].edit} </button>
                <button className="btn btn-danger" onClick={() => {deleteClass(classs.id)}}> {loadingDel ? classTraductions[getLang()].deleting : classTraductions[getLang()].delete} </button>
                        </div>  
                    </div>
                }) : <div className="i">
                        <div className="empty monINfos">
                            {classTraductions[getLang()].nohaveclass} <br />
                            {classTraductions[getLang()].doyou} <button onClick={() => {setIsAddClass(v => !v)}} className="btn btn-blue"> {classTraductions[getLang()].add} </button>
                        </div>
                    </div>
        }
        </div>
        
        <Modal isOpen={isAddClass}>
            <AddClass error={error} setError={setError} setIsAddClass={setIsAddClass}/>
        </Modal>

        <Modal isOpen={isEditClass}>
            <EditClass error={error} setError={setError} setIsEditClass={setIsEditClass} classToEditId={classToEditId}/>        </Modal>
    </div>
}
export default Class;