import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { studentTraductions } from '../../local/student';
import { host } from '../../utils/fetch';
import { getLang } from '../../utils/lang';
import { Modal } from "reactstrap";
import EditAmount from './EditAmount';
import * as Swal from 'sweetalert2';

const ReductFees = () => {

	const [student, setStudent] = useState({});
	const [classs, setClass] = useState({});
	const navigate = useNavigate();
	const [error, setError] = useState('');
	const [amount, setAmount] = useState(0);
	const studentToEditId = useParams().id;
	const [isEditAmount, setIsEditAmount] = useState(false);
	const [loading, setLoading] = useState(false);
	const [studentCopy, setStudentCopy] = useState({});
	const [payements, setPayements] = useState([]);
	let [totalAmount, setTotalAmount] = useState(0);
	
	const inscription = student.status === 'old' ? classs.inscriptions_olds_students : classs.inscriptions_news_students
	const first_tranch = student.status === 'old' ? classs.first_tranch_olds_students : classs.first_tranch_news_students
	const second_tranch = student.status === 'old' ? classs.second_tranch_olds_students : classs.second_tranch_news_students;

	useEffect(() => {
		(
			async () => {
				setLoading(true)
				const resp = await fetch(host+'/students/one/'+studentToEditId, {headers: {
					'Authorization': sessionStorage.user
				}})
				const data = await resp.json();

				const resp2 = await fetch(host+'/class/'+data.class_id, {headers: {
					'Authorization': sessionStorage.user
				}})
				const data2 = await resp2.json();

				const resp3 = await fetch(host+'/students/payments/'+studentToEditId, {headers: {
					'Authorization': sessionStorage.user
				}})
				const data3 = await resp3.json();
				
				setStudent(data);
				setStudentCopy(data);
				setClass(data2);
				setPayements(data3);

				setLoading(false);
			}
		)()
	}, [studentToEditId])
	useEffect(() => {

		if (amount > (inscription + first_tranch + second_tranch + third_tranch)) {
			// let t = amount;
			setTotalAmount(inscription + first_tranch + second_tranch + third_tranch);
			// t = inscription + first_tranch + second_tranch + third_tranch;
		}
		if (amount > 0) {
			let a = amount;
			const inscription_rest = inscription - student.inscription;
			const first_tranch_rest = first_tranch - student.first_tranch;
			const second_tranch_rest = second_tranch - student.second_tranch;

			if (inscription_rest > 0 && a > 0 ) {
				const price = a >= inscription_rest ? inscription_rest : a
				setStudent(val => {return {...val, inscription: parseInt(student.inscription) + price}});
				a -= price;
			}

			if (first_tranch_rest > 0 && a > 0 ) {
				const price = a >= first_tranch_rest ? first_tranch_rest : a
				setStudent(val => {return {...val, first_tranch: parseInt(student.first_tranch) + price}});
				a -= price;
			}

			if (second_tranch_rest > 0 && a > 0 ) {
				const price = a >= second_tranch_rest ? second_tranch_rest : a
				setStudent(val => {return {...val, second_tranch: parseInt(student.second_tranch) + price}});
				a -= price;
			}
		}


	},  [amount])
	const handleUpdate = (e) => {
		e.preventDefault();
		setLoading(true);
		const ft =  parseInt(studentCopy.inscription) + 
					parseInt(studentCopy.first_tranch) + 
					parseInt(studentCopy.second_tranch)

		const st =  parseInt(student.inscription) + 
					parseInt(student.first_tranch) + 
					parseInt(student.second_tranch) 

		const inscription_rest = (inscription - studentCopy.inscription)
		const first_tranch_rest = (first_tranch - studentCopy.first_tranch)
		const second_tranch_rest = (second_tranch - studentCopy.second_tranch)

		const totalRest =  inscription_rest + first_tranch_rest + 
							second_tranch_rest 
							
							
		let t = st - ft;
		if (st < ft) {
			Swal.fire({
				title: 'Entrer le mot de passe de l\'admin',
				input: 'password',
				inputLabel: 'Le montant total entre est inferieur a celui precedent',
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
						console.log(res);
						if (res.success) {
							fetch(host+'/students/'+studentToEditId, {method: 'PUT', body: JSON.stringify(student), headers: {'Content-Type': 'application/json', 'Authorization': sessionStorage.user}})
								.then((res) => res.json())
								.then(res => {
									if (res.success) {
										if (totalAmount > (inscription + first_tranch + second_tranch + third_tranch)) {
											setTotalAmount(inscription + first_tranch + second_tranch + third_tranch);
											t = inscription + first_tranch + second_tranch + third_tranch;
										}
										if (totalAmount > totalRest) {
											t = totalRest;
										}
										window.open(host+'/download/recu2/'+studentToEditId+'/'+t+'/'+sessionStorage.user);
										window.open(host+'/download/recu/'+studentToEditId+'/'+t+'/'+sessionStorage.user)
										navigate(-1);
									}else{
										setError(res.message)
									}
								})
						}else{
							setError(res.message)
						}
					})
				
			}) 
		}else{
			fetch(host+'/students/'+studentToEditId, {method: 'PUT', body: JSON.stringify(student), headers: {'Content-Type': 'application/json', 'Authorization': sessionStorage.user}})
				.then((res) => res.json())
				.then(res => {
					if (res.success) {
						if (totalAmount > (inscription + first_tranch + second_tranch )) {
							setTotalAmount(inscription + first_tranch + second_tranch );
							t = inscription + first_tranch + second_tranch ;
						}
						if (totalAmount > totalRest) {
							t = totalRest;
						}
						window.open(host+'/download/recu2/'+studentToEditId+'/'+t+'/'+sessionStorage.user);
						window.open(host+'/download/recu/'+studentToEditId+'/'+t+'/'+sessionStorage.user)
						navigate(-1);
					}else{
						setError(res.message)
					}
				})
		}
		setLoading(false)
	}
	const addTotalAmount = (one, two) => {
		const val = (parseInt(two) - parseInt(one));
		const p = val > 0 ? totalAmount += val : totalAmount;
		setTotalAmount(p);
		
	}
	const handleCancel = (e) => {
		navigate(-1);
	}
	return <div className="container">
		<div className="">
			<div className="card-head">
				<h4 className='mt-1 mb-0'>Editer la pension de : {student.name + ' ' + student.subname}</h4>
				<nav className="navbar navbar-expand-lg" style={{padding: '10px 10px', display:"flex", justifyContent:'space-between'}}>
					<button className="btn btn-primary btn-disabled" onClick={(e) => {setIsEditAmount(v => !v)}}>Entrer le montant versé par le parent</button>
				</nav>
			</div>
			<form onSubmit={(e) => {handleUpdate(e)}}>
				<div className="card-content">
					<table className='table table-bordered'>
						<thead className=' table-dark'>
							<tr>
								<th>Noms</th>
								<th>Payé</th>
								<th>Sur</th>
							</tr>
						</thead>
						<tbody className='table-light'>
							<tr>
								<td>Inscriptions</td>
								<td>
									<input type="number" className='form-control' min={0} max={inscription} readOnly={student.inscription >= inscription} style={{ width: '150px' }} value={student.inscription}  onChange={(e) => {addTotalAmount(studentCopy.inscription, e.target.value); setStudent(val => {return {...val, inscription: e.target.value > inscription ? inscription : e.target.value}})}} />
								</td>
								<td>
									{
										inscription
									}
								</td>
							</tr>
							<tr>
								<td>1ere tranche</td>
								<td>
									<input type="number" className='form-control' min={0} max={first_tranch} readOnly={student.first_tranch >= first_tranch} style={{ width: '150px' }} value={student.first_tranch} onChange={(e) => {addTotalAmount(studentCopy.first_tranch, e.target.value); setStudent(val => {return {...val, first_tranch: e.target.value > first_tranch ? first_tranch : e.target.value}})}}/>
								</td>
								<td>
									{
										first_tranch
									}
								</td>
							</tr>
							<tr>
								<td>2eme tranche</td>
								<td>
									<input type="number" className='form-control' min={0} max={second_tranch} readOnly={student.second_tranch >= second_tranch} style={{ width: '150px' }} value={student.second_tranch} onChange={(e) => {addTotalAmount(studentCopy.second_tranch, e.target.value); setStudent(val => {return {...val, second_tranch: e.target.value > second_tranch ? second_tranch : e.target.value }})}}/>
								</td>
								<td>
									{
										second_tranch
									}
								</td>
							</tr>
						</tbody>
					</table>
					{
						error ? <div className="alert alert-danger">{error}</div> : <></>
					}
				</div>
				<div className="card-footer">
				<button className="btn btn-blue" type="submit">{loading ? studentTraductions[getLang()].saving : studentTraductions[getLang()].save + ' et imprimer le reçu'}</button>
				<button onClick={() => {handleCancel()}} type="reset" style={{ marginLeft: '10px' }}> {studentTraductions[getLang()].close} </button>
				</div>
				
			</form>
		</div>
		<hr />
		<div className="payements px-5">
			<h2 className="title">
				Etat de paiement
			</h2>
			<div className="card-body">
				
            <table className="table table-dark table-bordered table-striped">
            <thead>
                <tr>
                    <th align='center' style={{ textAlign: 'center' }}>
                        Inscription <br />
                        
                    </th>
                    <th align='center' style={{ textAlign: 'center' }}>
                        1ere tranche<br />
                        
                    </th>
                    <th align='center' style={{ textAlign: 'center' }}>
                        2eme tranche<br />
                        
                    </th>
                    <th align='center' style={{ textAlign: 'center' }}>
                        Total <br />
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    <tr>
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
							{
								student.inscription + student.first_tranch + student.second_tranch
							} /
							{
								inscription + first_tranch + second_tranch 
							}
						</td>
					</tr> 
                }
            </tbody>
            </table>
			</div>
		</div>
		<hr />
		<div className="payements px-5">
			<h2 className="title">
				Historique de payements
			</h2>
			<div className="card-body">
				<table className="table table-bordered">
					<thead className='table-dark'>
						<tr>
							<th>Montant</th>
							<th>Operateur</th>
							<th>Date</th>
						</tr>
					</thead>
					<tbody className='table-light'>
						{
							payements.length > 0 ?  
								payements.map(p => {
									let payment_date = new Date(p.created_at).getDate() + '/' + (new Date(p.created_at).getMonth() + 1 )+ '/' + new Date(p.created_at).getFullYear() + ' à ' + new Date(p.created_at).getHours()  + ':' + new Date(p.created_at).getMinutes() ;
									return <tr>
										<td>{p.amount}</td>
										<td>{p.email}</td>
										<td>{payment_date}</td>
									</tr> 
								})
							: 
							<tr>
								<td colSpan={3}>Aucun payement effectue pour cet eleve</td>
							</tr>
						}
					</tbody>
				</table>
			</div>
		</div>
		<Modal isOpen={isEditAmount}>
			<EditAmount 
				setTotalAmount={setTotalAmount}
				amount={amount} setAmount={setAmount} setIsAmount={setIsEditAmount} 
			/>
		</Modal>
	</div>
}

export default ReductFees;