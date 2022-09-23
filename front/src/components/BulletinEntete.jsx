import React from 'react';
import sem from '../images/sem.png'
import { downloadTraductions } from '../local/bulletin';
import { getLang } from '../utils/lang';
const BulletinEntete = ({student, currentClass, actualExam}) => {
        
    const months = [
        'Incorrect',
        'Janvier',
        'Fevrier',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Aout',
        'Septembre',
        'Octobre',
        'Novembre',
        'Decembre'
    ]
    
    const date = new Date(student.birthday).getDate() + ' '+ months[new Date(student.birthday).getMonth()] + " " + new Date(student.birthday).getUTCFullYear()
    return <div>
                <div class="head">
                    <div class="header">
                        <h2>REPUBLIQUE DU TCHAD</h2>
                        <h4>Unité - Travail - Progrès</h4>
                        <h4>***********</h4>
                        <h4>MINISTERE DE L'ENSEIGNEMENT PRIMAIRE ET DE L'EDUCATION CIVIQUE</h4>
                        <h4>INSPECTION PEDAGOGIQUE DE L'ENSEIGNEMENT PRIMAIRE DU 6<sup>eme</sup> ARRONSIDESSEMENT</h4>
                    </div>

                    <div class="body">
                        <img src={sem} alt="logo" />
                        <h3>CARNET DE NOTES</h3>
                        <p>
                            ECOLE PRIVEE FRANCO - ANGLAISE <br/>
                            "Living Word Missions Chad"
                        </p>
                    </div>
                </div>

            <h2 style={{textAlign: 'center'}}>
                {actualExam.name} - 2021/2022
            </h2>

            
            <div>
            <table className='table table-light table-bordered table-striped'>
            <thead style={{textAlign: 'center'}}>
                <tr>
                    <th>{downloadTraductions[getLang()].nameAndSubname}</th>
                    <th colSpan={5}>
                        {student.name} {student.subname}
                    </th>
                </tr>
                <tr>
                    <th colSpan={2}>{downloadTraductions[getLang()].birthday}</th>
                    <th  colSpan={2}>
                        {
                            date
                        }
                    </th>
                    <th>{downloadTraductions[getLang()].sex}</th>
                    <th>
                        {
                            student.sex === 'm' ? 'Masculin' : 'Feminin'
                        }
                    </th>
                </tr>
                <tr>
                    <th>{downloadTraductions[getLang()].class}</th>
                    <th>
                        {
                            currentClass.name
                        }
                    </th>
                    <th>Effectif</th>
                    <th>{currentClass.total_students}</th>
                    <th>{downloadTraductions[getLang()].teacher}</th>
                    <th>{currentClass.teacher_name} {currentClass.teacher_subname}</th>
                </tr>
            </thead>
            </table>
            </div>
            
        </div>
}

export default BulletinEntete;