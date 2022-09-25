import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { studentTraductions } from '../../local/student';
import { host } from '../../utils/fetch';
import { getLang } from '../../utils/lang';

function SelectClass({setShowInfos}) {
    const handleCancel = () => {
        setError('');
        setShowInfos(v => !v);
    }
    return ( <div className="card login-card">
        <div className="card-head">
            <h1>
                Infos sur l'exportation des eleves.
            </h1>
        </div>
        <div className="card-content">
        </div>
        <div className="card-footer">
            <button onClick={() => {handleCancel()}} type="reset"> {studentTraductions[getLang()].close}</button>
        </div>
    </div>
    )
}

export default SelectClass