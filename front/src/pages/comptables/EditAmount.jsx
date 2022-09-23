import React from 'react'
import { useState } from 'react';
import { classTraductions } from '../../local/class';
import { getLang } from '../../utils/lang';

function EditAmount({setAmount, setTotalAmount, isLocked, completetheinsurance, setIsAmount, assur}) {
    const [edition, setEdition] = useState(0);
    const addAmount = (d) => {
        setEdition(v => v + d);
    }
    const [hasr, setHasr] = useState(false);
    const handleCancel = () => {
      setIsAmount(v => !v)
    }
    const isOk2 = () => {
        if (!isLocked) {
            setHasr(true);
            setEdition(v => v);
            completetheinsurance();
        }else{
            setHasr(true);
            setEdition(v => v);
            completetheinsurance();
        }
    }
    const isOk = () => {
        setAmount( edition );
        // setAmounts(v => {return [...v, edition]})
        setIsAmount(false);
		// amounts.forEach(am => {
        setTotalAmount(v => v += ( !hasr ? edition : edition - 3000 ));
		// })
    }
    return (<div className="card login-card">
                <div className="card-head">
                    <h1>
                        Veuillez entrer le montant versé par le parent
                    </h1>
                </div>
                <div className="card-content">
                    
                    <div>
                        <input className='form-control' type="number" value={edition} onChange={(e) => {setEdition(parseInt(e.target.value))}} />
                        <h5 className="">
                            Assurance: ({assur})
                        </h5>
                        <div>
                            <button style={{ marginLeft: '10px', marginTop: '10px' }} onClick={() => {addAmount(500)}}>
                                Ajouter 500
                            </button>
                            <button style={{ marginLeft: '10px', marginTop: '10px' }} onClick={() => {addAmount(1000)}}>
                                Ajouter 1000
                            </button>
                            <button style={{ marginLeft: '10px', marginTop: '10px' }} onClick={() => {addAmount(2000)}}>
                                Ajouter 2000
                            </button>
                            <button style={{ marginLeft: '10px', marginTop: '10px' }} onClick={() => {addAmount(5000)}}>
                                Ajouter 5000
                            </button>
                            <button style={{ marginLeft: '10px', marginTop: '10px' }} onClick={() => {addAmount(10000)}}>
                                Ajouter 10000
                            </button>
                        </div>
                        <div>
                            <button className={isLocked ? 'disabled' : ''} style={{ marginLeft: '10px', marginTop: '10px' }} onClick={() => {isOk2()}}>
                                Assurance(3000)
                            </button>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                <button className="btn btn-blue" onClick={() => {isOk()}} >Ok</button>
                <button onClick={() => {handleCancel()}} type="reset"> {classTraductions[getLang()].close} </button>
                </div>         
            </div>
    )
}

export default EditAmount