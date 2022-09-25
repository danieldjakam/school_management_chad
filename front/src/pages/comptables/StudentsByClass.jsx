import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { studentTraductions } from '../../local/student';
import { host } from '../../utils/fetch';
import ReactLoading from 'react-loading';
import { getLang } from '../../utils/lang';
import { Modal } from "reactstrap";
import EditStudent from '../Students/EditStudent';
import AddStudent from '../Students/AddStudent';
import * as Swal from 'sweetalert2'

function StudentsByClass() {
    const params = useParams();
    const {id} = params;
    const [classs, setClass] = useState({});
    const [students, setStudents] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [loadingDel, setLoadingDel] = useState(false);
    const [isAddStudent, setIsAddStudent] = useState(false);
    const [isEditStudent, setIsEditStudent] = useState(false);
    const [studentToEditId, setStudentToEditId] = useState('')

    const deleteStudent = (id) => {
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
    useEffect(() => {
        (
            async () => {
                setLoading(true)
                const resp = await fetch(host+'/class/'+id, {headers: {
                    'Authorization': sessionStorage.user
                  }})
                const data = await resp.json();
                const resp2 = await fetch(host+'/students/'+id, {headers: {
                    'Authorization': sessionStorage.user
                  }})
                const data2 = await resp2.json();
                setClass(data);
                setStudents(data2);
                setLoading(false);
            }
        )()
    }, [id])
    return (
        <div className='container'>
            <nav className="navbar navbar-expand-lg" style={{padding: '10px 10px', display:"flex", justifyContent:'space-between'}}>
                <h2 style={{marginLeft  : '40px'}}>{studentTraductions[getLang()].studentList} {classs.name}</h2><button onClick={() => {setIsAddStudent(v => !v)}} className="btn btn-blue">{studentTraductions[getLang()].addStudent}</button>
                <Link to={`/transfert/${id}`} className="btn btn-primary" style={{ marginBottom: '10px', marginLeft: '10px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-airplane-engines-fill" viewBox="0 0 16 16">
                        <path d="M8 0c-.787 0-1.292.592-1.572 1.151A4.347 4.347 0 0 0 6 3v3.691l-2 1V7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.191l-1.17.585A1.5 1.5 0 0 0 0 10.618V12a.5.5 0 0 0 .582.493l1.631-.272.313.937a.5.5 0 0 0 .948 0l.405-1.214 2.21-.369.375 2.253-1.318 1.318A.5.5 0 0 0 5.5 16h5a.5.5 0 0 0 .354-.854l-1.318-1.318.375-2.253 2.21.369.405 1.214a.5.5 0 0 0 .948 0l.313-.937 1.63.272A.5.5 0 0 0 16 12v-1.382a1.5 1.5 0 0 0-.83-1.342L14 8.691V7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v.191l-2-1V3c0-.568-.14-1.271-.428-1.849C9.292.591 8.787 0 8 0Z"/>
                    </svg>
                    Transfert
                </Link>
            </nav>
            <nav className=" " style={{padding: '10px 10px'}}>
                <div className="colla" id="navbarNav" style={{padding: '10px 10px', display:"flex", justifyContent:'space-between'}}>
                    <a target={'_blank'} rel='noreferrer' style={{marginLeft: '30px'}} href={host+'/download/pdf/students/'+id} className="btn btn-secondary">{studentTraductions[getLang()].downloadPdf}</a>
                </div>
            </nav>
            {
                error ? <div className="alert alert-danger"> {error} </div> : ''
            }
            <table className="table table-dark table-bordered table-striped">
            <thead>
                <tr>
                    <td>{studentTraductions[getLang()].n} </td>
                    <th>{studentTraductions[getLang()].name}s et Prenoms</th>
                    <th align='center' style={{ textAlign: 'center' }}>
                        Inscription <br />
                        <a target={'_blank'} rel='noreferrer' 
                        href={host+'/download/pdf/insolvables/'+id+'/1/'+sessionStorage.user} className="btn btn-secondary">
                            Insolvables</a>
                    </th>
                    <th align='center' style={{ textAlign: 'center' }}>
                        1ere tranche<br />
                        <a target={'_blank'} rel='noreferrer' 
                        href={host+'/download/pdf/insolvables/'+id+'/2/'+sessionStorage.user} className="btn btn-secondary">
                            Insolvables</a>
                    </th>
                    <th align='center' style={{ textAlign: 'center' }}>
                        2eme tranche<br />
                        <a target={'_blank'} rel='noreferrer'
                         href={host+'/download/pdf/insolvables/'+id+'/3/'+sessionStorage.user} className="btn btn-secondary">
                            Insolvables</a>
                    </th>
                    <th align='center' style={{ textAlign: 'center' }}>
                        3eme tranche<br />
                        <a target={'_blank'} rel='noreferrer' 
                        href={host+'/download/pdf/insolvables/'+id+'/4/'+sessionStorage.user} className="btn btn-secondary">
                            Insolvables</a>
                    </th>
                    <th align='center' style={{ textAlign: 'center' }}>
                        Total <br />
                        <a target={'_blank'} rel='noreferrer' 
                        href={host+'/download/pdf/insolvables/'+id+'/6/'+sessionStorage.user} className="btn btn-secondary">
                            Insolvables</a> <br />

                        <a target={'_blank'} rel='noreferrer' 
                        href={host+'/download/pdf/insolvables/'+id+'/7/'+sessionStorage.user} 
                        style={{ marginTop: '10px' }}
                        className="btn btn-secondary">
                            Etat</a>
                    </th>
                    <th>{studentTraductions[getLang()].action}</th>
                </tr>
            </thead>
            <tbody>
                {
                    loading ? 
                                <tr>
                                    <td colSpan={5} style={{justifyItems: 'center', paddingLeft: '50%'}}>
                                        <ReactLoading color="#fff" type="cylon"/>
                                    </td>
                                </tr> 
                            : 
                            students.length > 0 ? students.map((student, id) => {
                                const inscription = student.status === 'old' ? classs.inscriptions_olds_students : classs.inscriptions_news_students
                                const first_tranch = student.status === 'old' ? classs.first_tranch_olds_students : classs.first_tranch_news_students
                                const second_tranch = student.status === 'old' ? classs.second_tranch_olds_students : classs.second_tranch_news_students;
                                const third_tranch = student.status === 'old' ? classs.third_tranch_olds_students : classs.third_tranch_news_students;
                                
                                return <tr key={id}>
                                    <td>{id + 1}</td>
                                    <td>{student.name} {student.subname}</td> 
                                    <td>
                                        {student.inscription} / {inscription}
                                    </td>
                                    <td>
                                        {student.first_tranch} / {first_tranch}
                                    </td>
                                    <td>
                                        {student.second_tranch} / {second_tranch}
                                    </td>
                                    <td>
                                        {student.third_tranch} / {third_tranch}
                                    </td>
                                    <td>
                                        {
                                            student.inscription + student.first_tranch + student.second_tranch + student.third_tranch
                                        } /
                                        {
                                            inscription + first_tranch + second_tranch + third_tranch
                                        }
                                    </td>
                                    <td style={{display: 'flex', flexDirection:'column', alignItems:'center', justifyContent: 'space-between'}}>
                                        <Link to={'/reduct-fees/'+student.id}  
                                            style={{ marginBottom: '10px' }} className="btn btn-secondary">
                                                Payer
                                        </Link>
                                        <button style={{ marginBottom: '10px' }} onClick={() => {setStudentToEditId(student.id); setIsEditStudent(v => !v)}} to={`/students/edit/${student.id}`} className="btn btn-warning"> Editer</button>
                                        <button className="btn btn-danger" onClick={() => {deleteStudent(student.id)}}> {loadingDel ? studentTraductions[getLang()].deleting : studentTraductions[getLang()].delete} </button>
                                    </td>
                                </tr> }) : <tr> 
                                    <td colSpan={10} style={{textAlign: 'center'}}>
                                    {` ${studentTraductions[getLang()].noStudent}`}
                                    </td>
                                </tr>
                }
            </tbody>
            </table>

            <Modal isOpen={isAddStudent}>
                <AddStudent error={error} setError={setError} setIsAddStudent={setIsAddStudent}/>
            </Modal>
            <Modal isOpen={isEditStudent}>
                <EditStudent error={error} setError={setError} setIsEditStudent={setIsEditStudent} studentToEditId={studentToEditId}/>
            </Modal>
        </div>
    )
}

export default StudentsByClass