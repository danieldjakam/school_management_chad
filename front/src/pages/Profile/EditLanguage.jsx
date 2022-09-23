import React from 'react'
import { getLang, setLang } from '../../utils/lang'

function EditLanguage({setError}) {
    const languages = [
        {
            name: 'Francais',
            code: 'fr'
        },
        {
            name: 'Anglais',
            code: 'en'
        }
    ]
    return (
        <div className="dL">
            <div className="choices">
            {
                languages.map(lang => {
                    return  <div key={lang.code} className={`choice ${lang.code === getLang() ? 'checked': '' } `} id="lang_choice" onClick={(e) => {setLang(lang.code, setError)}}>
                                <div className="example">
                                    <img src={`../../assets/${lang.code}.png`} alt="d"/>
                                </div>
                                <div className="name">
                                    {lang.name}
                                </div>
                            </div>
                })
            }
        </div>
        </div>
  )
}

export default EditLanguage