import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import * as Swal from 'sweetalert2'
import { classTraductions } from '../../local/class'
import { host } from '../../utils/fetch'
import { getLang } from '../../utils/lang'

function OneClass({clas, key}) {
    const [loadingDel, setLoadingDel] = useState(false)
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
                            // setError(res.message)
                        }
                    })
                setLoadingDel(false)
            }
        })
    }
  return <div className="clas" key={key}>
            <div className="top">
                <div className="classAbs">
                    {clas.name.slice(0, 8)}
                </div>
                <div className="qq">
                    <span className="q">
                        {classTraductions[getLang()].class}:
                    </span>
                    <span className="r">
                        {clas.name}
                    </span>
                </div>
                <div className="qq">
                    <span className="q">
                    {classTraductions[getLang()].section}:
                    </span>
                    <span className="r">
                        {clas.sName}
                    </span>
                </div>
            </div>
            <div className="bottom">
                <Link to={`/students/${clas.id}`} className="btn btn-primary"> {classTraductions[getLang()].class} </Link>
                <button className="btn btn-danger" onClick={() => {deleteClass(clas.id)}}> {loadingDel ? classTraductions[getLang()].deleting : classTraductions[getLang()].delete} </button>
            </div>  
            </div>
}

export default OneClass