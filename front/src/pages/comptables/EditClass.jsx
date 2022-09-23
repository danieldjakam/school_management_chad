import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import { classTraductions } from '../../local/class';
import { host } from '../../utils/fetch';
import { getLang } from '../../utils/lang';

const EditClass = ({error, setError, setIsEditClass, classToEditId}) => {
    const [classs, setClasss] = useState({});
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        (
            async () => {
                setLoading(true)
                const resp = await fetch(host+'/class/'+classToEditId, {headers: {
                    'Authorization': sessionStorage.user
                }})
                const data = await resp.json();
                setClasss(data);
                setLoading(false);
            }
        )()
    }, [])

    const handleUpdate = (e) => {
        e.preventDefault();
        setLoading(true);
        fetch(host+'/class/'+classToEditId, {method: 'PUT', body: JSON.stringify(classs), headers: {'Content-Type': 'application/json', 'Authorization': sessionStorage.user}})
        .then((res) => res.json())
        .then(res => {
          console.log(res);
            if (res.success) {
              window.location.reload()
            }else{
              setError(res.message)
            }
        })
        setLoading(false)
    }

    const handleCancel = () => {
      setIsEditClass(v => !v)
      setError('')
    }
    return <div className="card login-card">
        <div className="card-head">
            <h1>
                {classTraductions[getLang()].editClass} ({classs.name})
            </h1>
        </div>
        <form onSubmit={(e) => {handleUpdate(e)}}>
            <div className="card-content">
                <table className='table table-bordered'>
                    <thead className=' table-dark'>
                        <tr>
                            <th>Noms</th>
                            <th>Nouveau</th>
                            <th>Ancien</th>
                        </tr>
                    </thead>
                    <tbody className='table-light'>
                        <tr>
                            <td>Inscriptions</td>
                            <td>
                                <input type="number" readOnly={true} className='form-control' style={{ width: '150px' }} value={classs.inscriptions_news_students}  onChange={(e) => {setClasss(val => {return {...val, inscriptions_news_students: e.target.value}})}} />
                            </td>
                            <td>
                                <input type="number" readOnly={true} className='form-control' style={{ width: '150px' }} value={classs.inscriptions_olds_students} onChange={(e) => {setClasss(val => {return {...val, inscriptions_olds_students: e.target.value}})}}/>
                            </td>
                        </tr>
                        <tr>
                            <td>1ere Tranche</td>
                            <td>
                                <input type="number" readOnly={true} className='form-control' style={{ width: '150px' }} value={classs.first_tranch_news_students} onChange={(e) => {setClasss(val => {return {...val, first_tranch_news_students: e.target.value}})}}/>
                            </td>
                            <td>
                                <input type="number" readOnly={true} className='form-control' style={{ width: '150px' }} value={classs.first_tranch_olds_students} onChange={(e) => {setClasss(val => {return {...val, first_tranch_olds_students: e.target.value}})}}/>
                            </td>
                        </tr>
                        <tr>
                            <td>2eme Tranche</td>
                            <td>
                                <input type="number" readOnly={true} className='form-control' style={{ width: '150px' }} value={classs.second_tranch_news_students} onChange={(e) => {setClasss(val => {return {...val, second_tranch_news_students: e.target.value}})}}/>
                            </td>
                            <td>
                                <input type="number" readOnly={true} className='form-control' style={{ width: '150px' }} value={classs.second_tranch_olds_students} onChange={(e) => {setClasss(val => {return {...val, second_tranch_olds_students: e.target.value}})}}/>
                            </td>
                        </tr>
                        <tr>
                            <td>3eme Tranche</td>
                            <td>
                                <input type="number" readOnly={true} className='form-control' style={{ width: '150px' }} value={classs.third_tranch_news_students} onChange={(e) => {setClasss(val => {return {...val, third_tranch_news_students: e.target.value}})}}/>
                            </td>
                            <td>
                                <input type="number" readOnly={true} className='form-control' style={{ width: '150px' }} value={classs.third_tranch_olds_students} onChange={(e) => {setClasss(val => {return {...val, third_tranch_olds_students: e.target.value}})}}/>
                            </td>
                        </tr>
                        {
                            classs.graduation ? 
                                <tr>
                                    <td colSpan={2}>Graduation</td>
                                    <td>
                                        <input type="number" readOnly={true} className='form-control' style={{ width: '150px' }} value={classs.graduation} onChange={(e) => {setClasss(val => {return {...val, graduation: e.target.value}})}}/>
                                    </td>
                                </tr>
                            : <></>
                        }
                    </tbody>
                </table>
                {
                    error ? <div className="alert alert-danger">{error}</div> : <></>
                }
            </div>
            <div className="card-footer">
                {
                    loading ? 'Chargement...' : ''
                }
                {/* <button className="btn btn-blue" type="submit">{loading ? classTraductions[getLang()].saving : classTraductions[getLang()].save}</button> */}
                <button onClick={() => {handleCancel()}} type="reset"> {classTraductions[getLang()].close} </button>
            </div>
            
        </form>
    </div>
}

export default EditClass;