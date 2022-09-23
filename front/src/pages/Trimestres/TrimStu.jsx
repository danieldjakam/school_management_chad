import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading';
import { trimTraductions } from '../../local/trim';
import { host } from '../../utils/fetch';
import { getLang } from '../../utils/lang';

function TrimStu() {
    
    const [trims, setTrims] = useState({})
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        (
            async () => {
                setLoading(true)
                const resp = await fetch(host+'/trim/getAll', {headers: {
                    'Authorization': sessionStorage.user
                  }})
                const data = await resp.json();
                setTrims(data);
                setLoading(false);
            }
        )()
    }, [])
    return (
        <div className='container' style={{paddingTop: '20px'}}>
            
            <table className="table table-dark table-bordered table-striped">
                <thead>
                    <tr>
                        <th>{trimTraductions[getLang()].name}</th>
                        <th>{trimTraductions[getLang()].action}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        loading ? <tr ><td colSpan={5} style={{justifyItems: 'center', paddingLeft: '50%'}}><ReactLoading color="#fff" type="cylon"/></td></tr> : trims.length > 0 ? trims.map((trim, index) => {
                            return <tr key={index}>
                                <td>{trim.name}</td>
                                <td><a style={{textDecoration: 'none', color: '#fff'}} href={`/trims/${trim.id}/${sessionStorage.classId}`}>{trimTraductions[getLang()].seeData}</a></td>
                            </tr> }) : <tr> <td colSpan={5} style={{textAlign: 'center'}}>{trimTraductions['fr'].nohavetrim}</td> </tr>
                    }
                </tbody>
            </table>  
        </div>
  )
}

export default TrimStu