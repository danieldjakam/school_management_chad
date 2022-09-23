import React, { useState } from 'react'
import * as Swal from 'sweetalert2'
import { teacherTraductions } from '../../local/teacher'
import { host } from '../../utils/fetch'
import { getLang } from '../../utils/lang'


function OneTeacher({teacher, key}) {
    const [loadingDel, setLoadingDel] = useState(false)
    const deleteTeacher = (id) => {
        Swal.fire({
            title: 'Confirmez la suppression !',
            icon: 'question',
            text: 'Cette action est irreversible !!'
        }).then(res => {
            if (res.value) {
                setLoadingDel(true);
                fetch(host+'/teachers/'+id, {method: 'DELETE', headers: {'Authorization': sessionStorage.user}})
                    .then((res) => res.json())
                    .then((res) => { 
                        console.log(res);
                        if (res.success) {
                            window.location.reload();
                        }else{
                            console.log(res.message);
                        }
                    })
                setLoadingDel(false)
            }
        })
    }
    return <div className="clas" key={key}>
            <div className="top">
                <div className="classAbs">
                    {teacher.name}
                </div>
                <div className="qq">
                    <span className="q">
                        {teacherTraductions[getLang()].name}: 
                    </span>
                    <span className="r">
                        {teacher.name}
                    </span>
                </div>
                <div className="qq">
                    <span className="q">
                    {teacherTraductions[getLang()].subname}: 
                    </span>
                    <span className="r">
                        {teacher.subname}
                    </span>
                </div>  
                <div className="qq">
                    <span className="q">
                        {teacherTraductions[getLang()].class}: 
                    </span>
                    <span className="r">
                        {teacher.className}
                    </span>
                </div>
                <div className="qq">
                    <span className="q">
                        {teacherTraductions[getLang()].section}:
                    </span>
                    <span className="r">
                        {
                            teacher.section_name
                        }    
                    </span>
                </div>
                <div className="qq">
                    <span className="q">
                    {teacherTraductions[getLang()].mr}: 
                    </span>
                    <span className="r">
                        {teacher.matricule}
                    </span>
                </div>  
            </div>
            <div className="bottom">
                <button className="btn btn-danger" onClick={() => {deleteTeacher(teacher.id)}}> {loadingDel ? teacherTraductions[getLang()].deleting : teacherTraductions[getLang()].delete } </button>
            </div>  
            </div>
}

export default OneTeacher