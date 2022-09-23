import React, { useEffect, useState } from 'react'
import {HospitalFill, PeopleFill, Search} from 'react-bootstrap-icons'
import * as Swal from 'sweetalert2'
import ReactLoading from 'react-loading';
import OneClass from './Class/OneClass';
import OneTeacher from './Teachers/OneTeacher';
import Onestudent from './Students/OneStudent';
import { host } from '../utils/fetch';
import { searchTraductions } from '../local/search';
import { getLang } from '../utils/lang';

function SearchView() {
	const [searchValue, setSearchValue] = useState('');
	const [loading, setLoading] = useState(false);
	const [results, setResults] = useState([{d: '  '}]);
	const [searchColumn, setSearchColumn] = useState('');
	const [isQuestionSearch, setIsQuestionSearch] = useState(false)
	const [students, setStudents] = useState([])
	const [classes, setClasses] = useState([])
	const [teachers, setTeachers] = useState([])
	
	useEffect(() => {
		(
		async () => {
			setLoading(true)
			const resp = await fetch(`${host+'/students/getAll'}`, {headers: {
				'Authorization': sessionStorage.user
				}})
			const data = await resp.json();
			setStudents(data);
			setLoading(false);
		}
		)()
	}, [])
	useEffect(() => {
		(
			async () => {
				setLoading(true)
				const resp = await fetch(host+'/teachers/getAll', {headers: {
					'Authorization': sessionStorage.user
					}})
				const data = await resp.json();
				setTeachers(data);
				setLoading(false);
			}
		)()
	}, [])
	useEffect(() => {
		(
			async () => {
				setLoading(true)
				const resp = await fetch(host+'/class/getOAll/'+sessionStorage.getItem('section_id'), {headers: {
					'Authorization': sessionStorage.user
				}})
				const data = await resp.json();
				setClasses(data);
				setLoading(false);
			}
		)()
	}, [])
	const handleSearch = (column) => {
		setSearchColumn(column)
		setLoading(true)

		setTimeout(() => {
			setLoading(false)
		}, 1000)
		switch (column) {
			case 't':
				const resultsTeachersByName = teachers.filter(teacher => teacher.name.toLowerCase().includes(searchValue.toLocaleLowerCase()))
				const resultsTeachersBySubname = teachers.filter(teacher => teacher.subname.toLowerCase().includes(searchValue.toLocaleLowerCase()))
				const finallyTeachersResults = [...new Set([...resultsTeachersByName, ...resultsTeachersBySubname])]
				setResults(finallyTeachersResults)
				break;
		
			case 's':
				const resultsStudentsByName = students.filter(student => student.name.toLowerCase().includes(searchValue.toLocaleLowerCase()))
				const resultsStudentsBySubname = students.filter(student => student.subname.toLowerCase().includes(searchValue.toLocaleLowerCase()))
				const finallyStudentsResults = [...new Set([...resultsStudentsByName, ...resultsStudentsBySubname])]
				setResults(finallyStudentsResults)
				break;
			
			case 'c':
				const resultsClassesByName = classes.filter(c => c.name.toLowerCase().includes(searchValue.toLocaleLowerCase()))
				console.log(resultsClassesByName, searchValue);
				const finallyClassResults = [...new Set([...resultsClassesByName])]
				setResults(finallyClassResults)
				break;
			
			default:
				break;
		}
	}
	const handleSubmit = (e) => {
		e.preventDefault()
		if (searchValue !== '') {
		setIsQuestionSearch(true)
		if (searchColumn !== '' && sessionStorage.stat === 'ad') {
			handleSearch(searchColumn)
		}else{
			handleSearch('s')
		}
		}else{        
		setIsQuestionSearch(false)
		Swal.fire({
			title: 'Erreur lors de la recherche !',
			icon: 'error',
			text: 'La recherche ne peut etre un vide !!',
			confirmButtonColor: 'rgba(196, 23, 112, 1)',
			confirmButtonText: "J'ai compris !"
		})
		}
	}
	return (
		<div className='container'>
			<form onSubmit={(e) => {handleSubmit(e)}} className="searchForm">
			<input type="search" value={searchValue} onChange={(e) => {setSearchValue(e.target.value)}} placeholder={searchTraductions[getLang()].placeholder} />
			<button className="btn btn-elementary">
				<Search/>
			</button>
			</form>

			{
			isQuestionSearch ? <div className="optionsSearch">
								<div onClick={() => {handleSearch('s')}} className={`${searchColumn === 's' ? 'isthis' : ''} option`}>
									<PeopleFill/> {searchTraductions[getLang()].searchInStudent}
								</div>
								{
									sessionStorage.stat === 'ad' ? <> 
									<div onClick={() => {handleSearch('t')}} className={`${searchColumn === 't' ? 'isthis' : ''} option`}>
										<PeopleFill/> {searchTraductions[getLang()].searchInTeacher}
									</div>
									<div onClick={() => {handleSearch('c')}} className={`${searchColumn === 'c' ? 'isthis' : ''} option`}>
										<HospitalFill/> {searchTraductions[getLang()].searchInClass}
									</div>
									</> : <></>
								}
								</div> : <></>
			}


			{
			loading ? <div className="error" style={{ position: 'absolute', top: '39%', left: '53%' }}><ReactLoading color="#fff" type="spin"/></div> : results.length > 0 ? <div className="allClas" style={{marginTop: '20px'}}>
						{
							results.map((result, id) => {
							switch (searchColumn) {
								case 'c':
								return <OneClass clas={result} key={id}/>
								
								case 't':
								return <OneTeacher key={id} teacher={result} />

								case 's':
								return<Onestudent key={id} student={result} />
								default:
								break;
							}
							return ''
							})
						}
					</div>
					: <div className="i">
						<div className="empty monINfos">
						{searchTraductions[getLang()].noResult} <br />
						{searchTraductions[getLang()].help}
						</div>
					</div>
			}
			<div className="results"></div>
		</div>
	)
}

export default SearchView