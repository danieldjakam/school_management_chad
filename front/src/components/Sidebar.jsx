import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
    HospitalFill, HouseHeartFill,
    PeopleFill, GearFill, People, Search, 
    BookFill, FileTextFill, ArrowLeftCircleFill
} from 'react-bootstrap-icons'
import logo from '../images/sem.png'
import avatar from '../images/1.png'
import { host } from '../utils/fetch'

function Sidebar() {
    const [page, setPage] = useState(window.location.href.split('/')[3])
    const navigate = useNavigate();
    const [userInfos, setUserInfos] = useState({});
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        (
        async () => {
            if (sessionStorage.user !== undefined) {
                setLoading(true);
            const resp = await fetch(host+'/users/getTeacherOrAdmin/', {headers: {
              'Authorization': sessionStorage.user
            }}).catch(e => console.log(e))
            const data = await resp.json();
            setUserInfos(data);
            setLoading(false);
            }
        }
        )()
    }, [])

    const links = sessionStorage.stat === 'ad' ? 
    [
        {
            name: 'Sections',
            href: '/',
            icon: <HospitalFill/>
        },
        {
            name: 'Classes',
            href: '/class',
            icon: <HouseHeartFill/>
        },
        {
            name: 'Enseignants',
            href: '/teachers',
            icon: <PeopleFill/>
        },
        {
            name: 'Matieres',
            href: '/matieres',
            icon: <FileTextFill/>
        },
        {
            name: 'Rechercher',
            href: '/search',
            icon: <Search/>
        },
        {
            name: 'Profil',
            href: '/params',
            icon: <People/>
        },
        {
            name: 'Parametres',
            href: '/settings',
            icon: <GearFill/>
        }
    ] : 
    sessionStorage.stat === 'comp' ? 
    [
        {
            name: 'Classes',
            href: '/class-comp',
            icon: <HouseHeartFill/>
        },
        {
            name: 'Rechercher',
            href: '/search',
            icon: <Search/>
        },
        {
            name: 'Profil',
            href: '/params-comp',
            icon: <People/>
        },
        {
            name: 'Statitics',
            href: '/stats',
            icon: <People/>
        }
    ] 
        : 
    [
        {
            name: 'Eleves',
            href: '/students/'+sessionStorage.classId,
            icon: <PeopleFill/>
        },
        {
            name: 'Sequences',
            href: '/seqs',
            icon: <FileTextFill/>
        },
        {
            name: 'Trimestres',
            href: '/trims',
            icon: <BookFill/>
        },
        {
            name: 'Rechercher',
            href: '/search',
            icon: <Search/>
        },
        {
            name: 'Profil',
            href: '/params',
            icon: <People/>
        }
    ]

    const logout = () => {
        sessionStorage.removeItem('stat')
        sessionStorage.removeItem('user')
        navigate('/login')
        window.location.reload()
    }
    if(sessionStorage.user !== undefined){
        return <div className="sidebar">
            <div className="toggler"></div>
            <Link to='/' className="sidebar-brand">
                <img src={logo} alt="application logo" style={{width: '100px', height: '100px'}} className="sidebar-brand-logo" />
            </Link>
            <div className="sidebar-links">
                {
                    links.map((link, k) => {
                        return <Link key={k} to={link.href} className={`sidebar-link ${page === link.href ? 'active' : ''}`} onClick={() => {setPage(link.href)}}>
                            {link.icon}
                            <span>{link.name}</span>
                        </Link>
                    })
                }
                {/* <a href={host+'/download/recette/1'} className={`sidebar-link`}>
                    <Calendar2DayFill/>
                    <span>
                        Recette Journ.    
                    </span>
                </a>
                <a href={host+'/download/recette/2/0'} className={`sidebar-link`}>
                    <WalletFill/>
                    <span>
                        Recette Globale    
                    </span>
                </a> */}
            </div>
            <div className="sidebar-user">
                <div className="user-avatar" onClick={() => {logout()}}>
                    <img src={avatar} alt={" avatar"} />
                    <div className="logoutBtn">
                        <ArrowLeftCircleFill/>
                    </div>
                </div>
                <div className="user-infos">
                    <h5>{`@${ userInfos !== {} ? sessionStorage.stat === 'ad' || sessionStorage.stat === 'comp' ? userInfos.username : userInfos.name + " " + userInfos.subname: ''}`}</h5>
                    <h5>{ !loading ? sessionStorage.stat === 'ad' ? 'Admin' : sessionStorage.stat === 'comp' ? 'Comptable' : 'Enseignant' : ''}</h5>
                </div>
            </div>
        </div>
    }else{
        return <></>
    }
}

export default Sidebar