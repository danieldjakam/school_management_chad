import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { trimTraductions } from '../../local/trim';
import { host } from '../../utils/fetch';
import { getLang } from '../../utils/lang';

const Trims = () => {

    const [students, setStudents ] = useState([]);
    const [coms, setComs ] = useState([]);
    const [mat, setMat ] = useState([]);
    const [ActualClass, setActualClass ] = useState({});
    const [ActualTrim, setActualTrim ] = useState({});
    const [loading, setLoading ] = useState(false);
    const {exam_id, class_id} = useParams();
    const [notes, setNotes] = useState({});
    const [error, setError] = useState("");
    const [diviser, setDiviser] = useState(1);
    useEffect(() => {
        (
            async () => {
                setLoading(true)
                const resp = await fetch(host+'/notes/getByTrim/'+exam_id, {headers: {
                    'Authorization': sessionStorage.user
                }})
                let data = await resp.json();
                data = data.filter(d => d.class_id === class_id)
                setNotes(data);
                setLoading(false);
            }
        )()
    }, []);
    useEffect(() => {
        (
            async () => {
                setLoading(true)
                const resp = await fetch(host+'/trim/'+exam_id, {headers: {
                    'Authorization': sessionStorage.user
                }})
                const data = await resp.json();
                setActualTrim(data);
                setLoading(false);
            }
        )()
    }, []);
    useEffect(() => {
        (
            async () => {
                setLoading(true)
                const resp = await fetch(host+'/students/'+class_id, {headers: {
                    'Authorization': sessionStorage.user
                  }})
                let data = await resp.json();
                setStudents(data);
                data = new Set([...data])
                data.forEach(stu => {
                    const to = {
                        student_id: stu.id,
                        exam_id,
                        class_id
                    }
                    fetch(host+'/notes/addOrUpdateStats', {method: 'POST', body: JSON.stringify(to), headers: {'Content-Type': 'application/json', 'Authorization': sessionStorage.user}})
                        .then((res) => res.json())
                        .then(res => {
                            if (!res.success) {
                                setError(res.message)
                            }
                        })
                })
                setLoading(false);
            }
        )()
    }, []);
    useEffect(() => {
        (
            async () => {
                setLoading(true)
                const resp = await fetch(host+'/class/'+class_id, {headers: {
                    'Authorization': sessionStorage.user
                  }})
                const data = await resp.json();
                setActualClass(data);
                setLoading(false);
            }
        )()
    }, []);
    useEffect(() => {
        (
            async () => {
                setLoading(true)
                const resp = await fetch(host+'/matiere/getAll', {headers: {
                    'Authorization': sessionStorage.user
                  }})
                const data = await resp.json();
                setMat(data);
                setLoading(false);
                let total = 0;
                data.forEach(m => {
                    const tags = JSON.parse(m.tags);
                    tags.forEach(tag => {
                                total += parseFloat(tag.over);
                                return <td>{tag.name} / {tag.over}</td>
                            })
                })
                setDiviser(total);
            }
        )()
    }, []);
    useEffect(() => {
        (
            async () => {
                setLoading(true)
                fetch(host+'/com/getAll', {headers: { 'Authorization': sessionStorage.user}})
                    .then(competences => competences.json())
                    .then(competences => {
                        competences.forEach(com => {
                            fetch(host+'/matiere/getAll', {headers: { 'Authorization': sessionStorage.user}})
                                .then(matieres => matieres.json())
                                .then(matieres => {
                                    com.sub = matieres.filter(mat => mat.comId === com.id)
                                })
                        })
                        setComs(competences)
                    })
            }
        )()
    }, []);
    useEffect(() => {
    }, []);
    return <div className="container">
        <nav className="navbar navbar-expand-lg" style={{padding: '10px 10px'}}>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav" style={{fontSize: '1.3rem'}}>
                    <h2 style={{marginLeft  : '40px'}}>{ActualTrim.name} : {ActualClass.name}</h2>
                    <button onClick={() => {}} className="btn btn-success">{trimTraductions[getLang()].downloadBuls}</button>
                    <button onClick={() => {}} style={{marginLeft: '10px'}} className="btn btn-secondary">{trimTraductions[getLang()].order}</button>
                </ul>
            </div>
        </nav>

        
        {
            error === '' ? <></> : <div style={{marginTop: '30px'}} className="alert alert-danger">{error}</div>
        }
        <table style={{textAlign: 'center'}} className="table table-bordered table-striped table-light text-align-center">
        <thead style={{color: '#000', fontSize :'1rem', fontWeight: '500'}}>
            <tr className="table-dark">
                <th rowSpan={3} width='20' >
                    N
                </th>
                <th rowSpan={3}>
                    {trimTraductions[getLang()].name}
                </th>
                {
                    coms.length > 0 ? coms.map((com, ID) => {
                        let total = 0;
                        mat.filter(m => m.comId === com.id).forEach(m => {
                            const tags = JSON.parse(m.tags);
                            total += tags.length + 1;
                        })
                        return <th key={ID} colSpan={total}>{com.name}</th>
                    }) : <>{trimTraductions[getLang()].noCom}</>
                }
                <th colSpan={3} rowSpan={2}>
                    {trimTraductions[getLang()].essential}
                </th>
                <th colSpan={1} rowSpan={3}>
                    {trimTraductions[getLang()].action}
                </th>
            </tr>   
            <tr className="table-light">
                {     
                    mat.map((mat, id) => {
                        const t = JSON.parse(mat.tags).length + 1;
                        return <th key={id} colSpan={t}> {mat.name}</th>
                    })                    
                }
            </tr>
            <tr className="table-light">
                {     
                    mat.map((mat, id) => {
                        const tags = JSON.parse(mat.tags)
                        let total = 0;
                        return <>
                            {
                                tags.map(tag => {
                                            total += parseFloat(tag.over);
                                            return <td>{tag.name} / {tag.over}</td>
                                        })
                            }
                            <td>{trimTraductions[getLang()].total} / {total}</td>
                        </>   
                    })        
                } 
                <td>{trimTraductions[getLang()].totalOfPoints}</td>
                <td>{trimTraductions[getLang()].average}</td>
                <td>{trimTraductions[getLang()].rank}</td>
                
            </tr>
        </thead>
        <tbody>
            {
                students.length > 0 ? students.map((student, index) => {
                    const herNotes = notes.length > 0 ? notes.filter(n => n.student_id === student.id) : {}
                    let totalNote = 0;
                    return <tr key={index}>
                        <td>
                            {index + 1}
                        </td>
                        <td>
                            {student.name} {student.subname}
                        </td>           
                        {
                            mat.map((m, f) => {
                                const notesForThisMatiere = herNotes !== {} && herNotes.length > 0 ? herNotes.filter(h => h.matiere_id === m.id) : {};
                                let total = 0;
                                const tags = JSON.parse(m.tags)
                                return <> 
                                            {
                                                tags.map(t => {
                                                    const notesForThisTag = notesForThisMatiere !== {} && herNotes.length > 0 ? notesForThisMatiere.filter(h => h.tag_name === t.name)[0] : {};
                                                    const note = notesForThisTag !== {} && herNotes.length > 0 && notesForThisTag !== undefined ? parseFloat(notesForThisTag.value) : 0;
                                                    total += note;
                                                    totalNote += note;
                                                    return <td>
                                                        {note}
                                                    </td>
                                                })
                                            }
                                            <td>{total}</td>
                                        </>

                            })
                        }
                        <td >
                            {
                                totalNote
                            }
                        </td>
                        <td>
                            {
                                (
                                    loading ? '0' : Math.round(totalNote / diviser * 20 * 100) / 100
                                )
                            }
                        </td>
                        <td>
                            {
                                index + 1
                            }
                        </td>
                        <td>
                            <Link to={`${student.id}`} className="btn btn-primary">
                                {trimTraductions[getLang()].seeBul}
                            </Link>
                        </td>
                    </tr>
                }) : <tr className={'table-light'}>
                    <td colSpan={144}>
                        {trimTraductions[getLang()].noStudent}               
                    </td>
                </tr>
            }
        </tbody>
    </table>
    </div>
}

export default Trims;