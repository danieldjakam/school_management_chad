import React, { useState } from 'react'
import { Modal } from 'reactstrap';
import { host } from '../utils/fetch';
import SelectClass from './Class/SelectClass';

function Statistics() {
    const [date, setDate] = useState(new Date());

    const [isSelectClass, setSelectClass] = useState(false);
    const [date1, setDate1] = useState(new Date());
    const [error, setError] = useState('');
    const [date2, setDate2] = useState(new Date());
    
    return (
        <div className='container'>
            <div style={{margin: '10px 5px'}}>
                <a href={host+'/download/recette/1/'+date+'/0'} className="btn btn-primary">
                    Recette Journaliere:
                </a>
                <span style={{ fontSize: '20px', marginLeft: '10px'}}>
                    choisir la date
                </span>
                <input type="date" onChange={(e) => {setDate(e.target.value)}} style={{ padding: '5px 10px', borderRadius: '10px', border: 'none', marginLeft: '10px' }}/>
            </div>
            <div style={{margin: '10px 5px'}}>
                <a href={host+`/download/recette/3/${date1}/${date2}`} className={`btn btn-secondary`}>
                    <span>
                        Recette Periodique    
                    </span>
            
                </a> 
                <span style={{ fontSize: '20px', marginLeft: '10px'}}>
                    De
                    <input type="date" onChange={(e) => {setDate1(e.target.value)}} style={{ padding: '5px 10px', borderRadius: '10px', border: 'none', marginLeft: '10px' }}/>
                </span>
                
                <span style={{ fontSize: '20px', marginLeft: '10px'}}>
                    A
                    <input type="date" onChange={(e) => {setDate2(e.target.value)}} style={{ padding: '5px 10px', borderRadius: '10px', border: 'none', marginLeft: '10px' }}/>
                </span>
            </div>
            <div style={{margin: '10px 5px'}}>
                <a href={host+'/download/recette/2/0/0'} className={`btn btn-info`}>
                    <span>
                        Recette Globale    
                    </span>
                </a> 
            </div>
            <div style={{margin: '10px 5px'}}>
                <button onClick={() => {setSelectClass(v => !v)}} className={`btn btn-info`}>
                    <span>
                        Etat Global    
                    </span>
                </button> 
            </div>


            <Modal isOpen={isSelectClass}>
                <SelectClass error={error} setError={setError} setSelectClass={setSelectClass}/>
            </Modal>
        </div>
  )
}

export default Statistics