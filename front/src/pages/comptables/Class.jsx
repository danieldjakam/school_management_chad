import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import ReactLoading from 'react-loading';
import { Link } from "react-router-dom";
import {
    Modal
} from "reactstrap"
import { host } from '../../utils/fetch';
import { getLang } from '../../utils/lang';
import { classTraductions } from '../../local/class';
import EditClass from './EditClass';

const Class = () => {
    const [Classes, setClass] = useState({});
    const [affich, setAffich] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [classToEditId, setClassToEditId] = useState('')
    const [isEditClass, setIsEditClass] = useState(false);
	const [search, setSearch] = useState('');
	const [total, setTotal] = useState({});

    useEffect(() => {
        (
            async () => {
                setLoading(true)
                const resp = await fetch(host+'/class/getAll', {headers: {
                    'Authorization': sessionStorage.user
                  }})
                const data = await resp.json();

                const resp2 = await fetch(host+'/students/total', {headers: {
                    'Authorization': sessionStorage.user
                  }})
                const data2 = await resp2.json();
                setClass(data);
				setTotal(data2);
				setAffich(data);
                setLoading(false);
            }
        )()
    }, [])

	useEffect(() => {
		if (Classes.length > 0) {
			setAffich(Classes.filter(clas => clas.name.toLowerCase().includes(search.toLowerCase())))
		}
	}, [search])
    return <div style={{padding: '10px 10px'}} className='container'>
        
        <div style={{marginBottom: '10px', display: 'flex'}}>
			<input value={search} onChange={(e) => {setSearch(e.target.value)}} type="search" className='form-control form-control-sm' style={{ width: '75%', marginRight: '10px' }} placeholder='Rechercher une classe' /> 
			{/* <button className="btn btn-primary" onClick={() => {searchClass(search)}}>
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
					<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
				</svg>
			</button> */}
        </div>
        <div style={{marginBottom: '10px', display: 'flex'}}>
			&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
			<h3>
				Effectif total: {total.total}
			</h3> <br />
			<h3>
				Nombre de garcons: {total.boys}
			</h3> &nbsp; &nbsp;
			<h3>
				Nombre de filles: {total.girls}
			</h3> &nbsp; &nbsp;
			<h3>
				Sex non specifies: {total.unspecified}
			</h3>
        </div>
        <div className="allClas">
            {
                loading ? 
						<div className="error" style={{ position: 'absolute', top: '39%', left: '53%' }}>
							<ReactLoading color="#fff" type="spin"/>
						</div> 
					: 
						affich.length > 0? affich.map((classs, id) => {
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
									<div className="qq">
										<span className="q">
											Nombre d'inscrits:
										</span>
										<span className="r">
											{classs.inscripted}
										</span>
									</div>
								</div>
								<div className="bottom">
									<Link to={`${classs.id}`} className="btn btn-primary"> {classTraductions[getLang()].visite} </Link>
									<button onClick={() => { setClassToEditId(classs.id); setIsEditClass(v => !v)}} className="btn btn-warning"> {classTraductions[getLang()].edit} </button>
								</div>  
							</div>
                }) : <div className="i">
                        <div className="empty monINfos">
                            {classTraductions[getLang()].nohaveclass} <br />
                        </div>
                    </div>
        }
        </div>
        
        <Modal isOpen={isEditClass}>
            <EditClass error={error} setError={setError} setIsEditClass={setIsEditClass} classToEditId={classToEditId}/>
        </Modal>
    </div>
}
export default Class;