import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { studentTraductions } from '../../local/student';
import { host } from '../../utils/fetch';
import { getLang } from '../../utils/lang';

function SelectClass({error, setIsExport, studentIds, setError}) {
    const [loading, setLoading] = useState(true);
    const [Classes, setClass] = useState([]);
    const [results, setResults] = useState([]);
    const handleCancel = () => {
        setError('');
        setIsExport(false);
    }

    useEffect(() => {
        (
            async () => {
                setLoading(true)
                const resp = await fetch(host+'/class/getAll', {headers: {
                    'Authorization': sessionStorage.user
                  }})
                const data = await resp.json();
                setClass(data);
                setResults(data);
                setLoading(false);
            }
        )()
    }, [])
    const search = ( value ) => {
        setClass(results.filter(clas => clas.name.toLowerCase().includes(value.toLowerCase())));
    }
    const select = (class_id) => {
        fetch(host+'/students/transfert-to', {  
            method: 'PUT', body: JSON.stringify(
                {
                    ids: studentIds,
                    class_id
                }
            ), 
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': sessionStorage.user
            }
        })
            .then((res) => res.json())
            .then(res => {
                if (res.success) {
                    window.location.reload()
                }else{
                    setError(res.message)
                }
            })
    }
    return ( <div className="card login-card">
        <div className="card-head">
            <h1>
                Choisissez la classe destinataire
            </h1>
        </div>
        <div className="card-content">
            <input type="search" className='form-control' placeholder='search' onChange={(e) => {search(e.target.value)}} style={{ marginBottom: '10px' }}/>
            <table className='table table-bordered'>
                <thead className='table-dark'>
                    <tr>
                        <td>
                            Nom de la classe
                        </td>
                        <td>
                            Action
                        </td>
                    </tr>
                </thead>
                <tbody className='table-ligth table-striped'>
                    {
                        Classes.length > 0 ? 
                                            Classes.map((classe, i) => {
                                                return <tr key={i}>
                                                            <td>
                                                                {
                                                                    classe.name
                                                                }
                                                            </td>
                                                            <td>
                                                                <button onClick={(e) => {select(classe.id)}} className="btn btn-info">
                                                                    Choisir
                                                                </button>
                                                            </td>
                                                        </tr>
                                            })
                                            : 
                                            <tr>
                                                <td colSpan={2}>
                                                    Aucune classe
                                                </td>
                                            </tr> 
                    }
                </tbody>
            </table>
            {
                error !== '' ? <div className="error">{error}</div> : ''
            } 
        </div>
        <div className="card-footer">
            <p>
                {
                    loading ? 'En cours d\'exportation' : ''
                }
            </p>
            <button onClick={() => {handleCancel()}} type="reset"> {studentTraductions[getLang()].close}</button>
        </div>
    </div>
    )
}

export default SelectClass