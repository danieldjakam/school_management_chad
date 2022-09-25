import React from 'react'
import { useEffect, useRef } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { host } from '../../utils/fetch';

const Promotion = ({type}) => {
    const [students, setStudents ] = useState([]);
    const [subjects, setSubjects ] = useState([]);
    const [ActualClass, setActualClass ] = useState({});
    const [actualExam, setActualExam ] = useState({});
    const [totalPoints, setTotalPoints] = useState(0);
    const [loading, setLoading ] = useState(false);
    const {exam_id, class_id} = useParams();
    const [notes, setNotes] = useState({});
    const [error, setError] = useState("");
    const bulRef = useRef();
    useEffect(() => {
        (
            async () => {
                setLoading(true)
                const re = await fetch(host+'/students/'+class_id, {headers: {
                    'Authorization': sessionStorage.user
                }})
                const dat = await re.json();
                const resp = await fetch(host+'/annuals/'+exam_id, {headers: {
                    'Authorization': sessionStorage.user
                }})
                const data = await resp.json();
                console.log(data);
                const resp2 = await fetch(host+'/class/'+class_id, {headers: {
                    'Authorization': sessionStorage.user
                  }})
                const data2 = await resp2.json();
                const resp4 = await fetch(host+'/subjects/all2/'+type, {headers: {
                    'Authorization': sessionStorage.user
                }})
                const data4 = await resp4.json();
                const resp5 = await fetch(host+'/notes/all/'+class_id+'/'+exam_id, {headers: {
                    'Authorization': sessionStorage.user
                }})
                const data5 = await resp5.json();
                
                let tot = 0;
                data4.forEach(sub => {
                    tot += sub.over
                })

                setTotalPoints(tot);
                setStudents(dat);
                setActualExam(data);
                setActualClass(data2);
                setSubjects(data4);
                setNotes(data5);
                setLoading(false);
            }
        )()
    }, []);

    const calc = () => {
        const data = {
            exam_id,
            class_id
        }
        fetch(host+'/notes/calTrimNotes', {method: 'POST', body: JSON.stringify(data), headers: {'Content-Type': 'application/json', 'Authorization': sessionStorage.user}})
            .then((res) => res.json())
            .then(res => {
                if (!res.success) {
                    setError(res.message)
                }else{
                    window.location.reload()
                }
            })
    }
    return <div className="container">

    </div>
}

export default Promotion;