import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading'
import { Link } from 'react-router-dom';
import { sequenceTraductions } from '../../local/sequence';
import { host } from '../../utils/fetch';
import { getLang } from '../../utils/lang';

function SeqStu() {

    const [exams, setExams] = useState({});
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        (
            async () => {
                setLoading(true)
                const resp = await fetch(host+'/seq/getAll', {headers: {
                    'Authorization': sessionStorage.user
                  }})
                const data = await resp.json();
                setExams(data);
                setLoading(false);
            }
        )()  
    }, []) 
    return (
        <div className='container' style={{paddingTop: '20px'}}>
            <table className="table table-dark table-bordered table-striped">
                <thead>
                    <tr>
                        <th>{sequenceTraductions[getLang()].name}</th>
                        <th>{sequenceTraductions[getLang()].action}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        loading ? <tr ><td colSpan={5} style={{justifyItems: 'center', paddingLeft: '50%'}}><ReactLoading color="#fff" type="cylon"/></td></tr> : exams.length > 0 ? exams.map((exam, index) => {
                            return <tr key={index}>
                                <td>{exam.name}</td>
                                <td><Link style={{textDecoration: 'none', color: '#fff'}}  to={`/exams/${exam.id}/${sessionStorage.classId}`}>{sequenceTraductions[getLang()].enterData}</Link></td>
                            </tr> }) : <tr> <td colSpan={5} style={{textAlign: 'center'}}>{sequenceTraductions[getLang()].noSeq}</td> </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default SeqStu