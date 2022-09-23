import React from 'react';
import { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { settingTraductions } from '../local/setting'
import { available_years } from '../utils/date'
import { host } from '../utils/fetch'
import { getLang } from '../utils/lang'


function Settings() {
  const [settings, setSettings] = useState({})
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    (
      async () => {
        if (sessionStorage.stat === 'ad') {
          setLoading(true)
          const resp = await fetch(host+'/settings/getSettings', {headers: {
            'Authorization': sessionStorage.user
          }}).catch(err => setErrors(`Erreur: ${err}`))
          const data = await resp.json();
          setSettings(data);
          setLoading(false);
        }
      }
    )()
  }, [])
  const handleChangeSettings = (e) => {
    setLoading(true);
    e.preventDefault();
    fetch(host+'/settings/setSettings', {method: 'POST', body: JSON.stringify(settings), headers: {'Content-Type': 'application/json', Authorization: sessionStorage.user}})
      .then((res) => res.json())
      .then(res => {
        if (res.success) {
            navigate(`/class`);
        }else{
          setErrors(res.message)
        }
      })
      .catch((e) => {
        setErrors('Une erreur est survenue lors de la connexion a la base de donnee.')
      })
      setLoading(false)
  }
  return <div className="view settings-view container">
    <div className="card login-card">
      <div className="card-head">
      <h1>{settingTraductions[getLang()].setting}</h1>
      </div>
      <form onSubmit={(e) => {handleChangeSettings(e)}}>
      <div className="card-content">
          <div className="field" style={{display: 'flex'}}>
              <label className="label">{settingTraductions[getLang()].schoolYear}</label>
              <select value={settings.year_school} onChange={(e) => {setSettings(val => {return{...val, year_school: e.target.value}})}}>
                  {
                      available_years.map(year => {
                          return <option key={year} value={year}>
                              {year}
                          </option>
                      })
                  }
              </select>
          </div> 
          <div className="field check " style={{display:'flex'}}>
              <label className={`label ${settings.is_editable === 'yes' ? 'checked' : ''}`} htmlFor='check'>{settingTraductions[getLang()].question}</label>
              <input type="checkbox" checked={settings.is_editable === 'yes' ? true : false} onChange={(e) => {setSettings(val => {return{...val, is_editable: settings.is_editable === 'yes' ? 'no' : 'yes'}})}} id="check" />
          </div> 

          {
              errors !== '' ? <div className="error">{errors}</div> : ''
          }
      </div>
      <div className="card-footer">
          <button type="submit">{loading ? settingTraductions[getLang()].saving : settingTraductions[getLang()].save}</button>
      </div>
      </form>
    </div>
</div>
}

export default Settings