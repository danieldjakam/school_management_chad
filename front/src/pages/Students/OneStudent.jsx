import React, { useState } from 'react'
import * as Swal from 'sweetalert2'
import { studentTraductions } from '../../local/student'
import { host } from '../../utils/fetch'
import { getLang } from '../../utils/lang';
import { Modal } from "reactstrap";
import EditStudent from './EditStudent'
import { Link } from 'react-router-dom';


function Onestudent({student, key}) {
    const [loadingDel, setLoadingDel] = useState(false)
    const [studentToEditId, setStudentToEditId] = useState('')
    const [isEditStudent, setIsEditStudent] = useState(false);
    // const months = [
    //     'Incorrect',
    //     'Janvier',
    //     'Fevrier',
    //     'Mars',
    //     'Avril',
    //     'Mai',
    //     'Juin',
    //     'Juillet',
    //     'Aout',
    //     'Septembre',
    //     'Octobre',
    //     'Novembre',
    //     'Decembre'
    // ]
    const [error, setError] = useState('');
    const deleteStudent = sessionStorage.stat === 'ad' ? (id) => {
        Swal.fire({
            title: 'Confirmez la suppression !',
            icon: 'question',
            text: 'Cette action est irreversible !!'
        }).then(res => {
            if (res.value) {
                setLoadingDel(true);
                fetch(host+'/students/'+id, {method: 'DELETE', headers: {'Authorization': sessionStorage.user}})
                    .then((res) => res.json())
                    .then((res) => {
                        if (res.success) {
                            window.location.reload();
                        }else{
                            setError(res.message)
                        }
                    })
                    .catch(e => setError(e))
                setLoadingDel(false)
            }
        })
    } : (id) => {
		Swal.fire({
			title: 'Entrer le mot de passe de l\'admin',
			input: 'password',
			inputLabel: 'Mot de passe de l\'admin',
			showCancelButton: true
		}).then(({value}) => {
			fetch(host+'/users/confirmAdminPassword', 
					{	
						method: 'POST', 
						body: JSON.stringify({password: value}), 
						headers: {	
									'Content-Type': 'application/json', 
									'Authorization': sessionStorage.user
								}
					}
				)
				.then((res) => res.json())
				.then(res => {
					console.log(res, value);
					if (res.success) {
						
                        Swal.fire({
                            title: 'Confirmez la suppression !',
                            icon: 'question',
                            text: 'Cette action est irreversible !!'
                        }).then(res => {
                            if (res.value) {
                                setLoadingDel(true);
                                fetch(host+'/students/'+id, {method: 'DELETE', headers: {'Authorization': sessionStorage.user}})
                                    .then((res) => res.json())
                                    .then((res) => {
                                        if (res.success) {
                                            window.location.reload();
                                        }else{
                                            setError(res.message)
                                        }
                                    })
                                    .catch(e => setError(e))
                                setLoadingDel(false)
                            }
                        })
					}else{
						setError(res.message)
					}
				})
			
		})
    }
    return <div className="clas" key={key}>
            {error ? '' : ''}
            <div className="top">
                <div className="classAbs">
                    {student.name}
                </div>
                <div className="qq">
                    <span className="q">
                        {studentTraductions[getLang()].name}: 
                    </span>
                    <span className="r">
                        {student.name}
                    </span>
                </div>
                <div className="qq">
                    <span className="q">
                    {studentTraductions[getLang()].subname}: 
                    </span>
                    <span className="r">
                        {student.subname}
                    </span>
                </div> 
                <div className="qq">
                    <span className="q">
                    {studentTraductions[getLang()].s}:
                    </span>
                    <span className="r">
                        {student.section === 'm' ? 'Masculin' : 'Feminin'}  
                    </span>
                </div>  
                {/* <div className="qq">
                    <span className="q">
                    {studentTraductions[getLang()].b}: 
                    </span>
                    <span className="r">
                        {date}
                    </span>
                </div> */}
                <div className="qq">
                    <span className="q">
                    {studentTraductions[getLang()].class}: 
                    </span>
                    <span className="r">
                        {student.class_name}
                    </span>
                </div>
            </div>
            <div className="bottom">
                <Link to={'/reduct-fees/'+student.id} className="btn btn-secondary">Payer</Link>
                <button onClick={() => {setStudentToEditId(student.id); setIsEditStudent(v => !v)}} to={`/students/edit/${student.id}`} className="btn btn-warning"> {studentTraductions[getLang()].edit} </button>
                <button className="btn btn-danger" onClick={() => {deleteStudent(student.id)}}> {loadingDel ? studentTraductions[getLang()].deleting : studentTraductions[getLang()].delete} </button>
            </div>  
        <Modal isOpen={isEditStudent}>
            <EditStudent error={''} setError={() => {}} studentToEditId={studentToEditId} setIsEditStudent={setIsEditStudent}/>
        </Modal>
    </div>
}

export default Onestudent