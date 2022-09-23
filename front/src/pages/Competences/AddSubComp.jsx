import React from 'react';
import { useState } from "react";
import { subjectTraductions } from '../../local/subject';
import { host } from '../../utils/fetch';
import { getLang } from '../../utils/lang';

const AddSubComp = ({error, setError, setIsSeq, comInfo}) => {
  const [data, setData] = useState({
    name: '',
    slug: '',
    comId: comInfo.id,
    orale: true,
    ecrit: true,
    savEtre: true,
    pratique: false,
    oraleOver: 20,
    ecritOver: 10,
    savOver: 5,
    section: comInfo.section,
    pratiqueOver: 15,
  })
  const [loading, setLoading] = useState(false);
  const handleAdd = (e) => {
      e.preventDefault();
      setLoading(true);
      fetch(host+'/sub_comp/add', {method: 'POST', body: JSON.stringify(data), headers: {'Content-Type': 'application/json', 'Authorization': sessionStorage.user}})
      .then((res) => res.json())
      .then(res => {
          if (res.success) {
              window.location.reload();
          }else{
              setError(res.message)
          }
      })
      .catch(err => setError(`Erreur: ${err}`))
      setLoading(false)
  } 
  const handleCancel = () => {
    setIsSeq(false)
    setError('')
  }
  return <div className="card login-card">
    <div className="card-head">
      <h1>{ subjectTraductions[getLang()].addSubject }</h1>
    </div>
    <form onSubmit={(e) => {handleAdd(e)}}>
      <div className="card-content">
        <div className="field">
          <div className="label">{ subjectTraductions[getLang()].subName }</div>
          <input type="text" value={data.name} onChange={(e) => {setData(val => {return {...val, name: e.target.value}})}} placeholder={ subjectTraductions[getLang()].subName } />
        </div> 
        <div className="field">
          <div className="label">{ subjectTraductions[getLang()].slug }</div>
          <input type="text" value={data.slug} onChange={(e) => {setData(val => {return {...val, slug: e.target.value}})}} placeholder={ subjectTraductions[getLang()].slug } />
        </div> 
        <table className="table table-bordered">
              <thead className="table-dark" style={{textAlign :'center'}}>
                <tr>
                  <th>{ subjectTraductions[getLang()].select } ?</th>
                  <th>{ subjectTraductions[getLang()].name }</th>
                  <th>{ subjectTraductions[getLang()].over }</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input type="checkbox" checked={data.orale} onChange={(e) => {setData(val => {return {...val, orale: !data.orale}})}} />
                  </td>
                  <td>
                    <label className="check-label">{ subjectTraductions[getLang()].oral }</label>
                  </td>
                  <td>
                    {
                      data.orale ? <input type="number" value={data.oraleOver} min={0} max={100} onChange={(e) => {setData(val => {return {...val, oraleOver: e.target.value }})}} placeholder="Sur" />: <></>
                    }
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="checkbox" checked={data.ecrit} onChange={(e) => {setData(val => {return {...val, ecrit: !data.ecrit}})}} />
                  </td>
                  <td>
                    <label className="check-label">{ subjectTraductions[getLang()].ecrit }</label>
                  </td>
                  <td>
                    {
                      data.ecrit ? <input type="number" value={data.ecritOver} min={0} max={100} onChange={(e) => {setData(val => {return {...val, ecritOver: e.target.value }})}} placeholder="Sur" />: <></>
                    }
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="checkbox" checked={data.savEtre} onChange={(e) => {setData(val => {return {...val, savEtre: !data.savEtre}})}} />
                  </td>
                  <td>
                    <label className="check-label">{ subjectTraductions[getLang()].savoirEtre }</label>
                  </td>
                  <td>
                    {
                      data.savEtre ? <input type="number" value={data.savOver} min={0} max={100} onChange={(e) => {setData(val => {return {...val, savOver: e.target.value }})}} placeholder="Sur" />: <></>
                    }
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="checkbox" checked={data.pratique} onChange={(e) => {setData(val => {return {...val, pratique: !data.pratique}})}} />
                  </td>
                  <td>
                    <label className="check-label">{ subjectTraductions[getLang()].pratic }</label>
                  </td>
                  <td>
                    {
                      data.pratique ? <input type="number" value={data.pratiqueOver} min={0} max={100} onChange={(e) => {setData(val => {return {...val, pratiqueOver: e.target.value }})}} placeholder="Sur" />: <></>
                    }
                  </td>
                </tr>
              </tbody>
        </table>

        {
          error !== '' ? <div className="error">{error}</div> : ''
        } 
      </div>
      <div className="card-footer">
        <button className="btn btn-blue" type="submit">{loading ? subjectTraductions[getLang()].saving : subjectTraductions[getLang()].save}</button>
        <button onClick={() => {handleCancel()}} type="reset"> {subjectTraductions[getLang()].close} </button>
      </div>
      
    </form>
  </div>
}

export default AddSubComp;