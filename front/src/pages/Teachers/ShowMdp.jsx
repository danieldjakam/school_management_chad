import React from 'react'
import { teacherTraductions } from '../../local/teacher';
import { getLang } from '../../utils/lang';

const EditTeacher = ({error, setIsMdp, mdp}) => {

    return <div className="card login-card">
      <div className="card-head">
        <h1>{teacherTraductions[getLang()].seeMdp}</h1>
      </div>
        <div className="card-content">
            {
                mdp
            }
        </div>
        <div className="card-footer">
          <button onClick={() => {setIsMdp(v => !v)}} type="submit">{teacherTraductions[getLang()].close}</button>
        </div>
    </div>
}

export default EditTeacher;