import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { useState } from 'react';
import {Link} from 'react-router-dom';
import ReactLoading from 'react-loading';

const TopBar = ({user}) => {

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(window.location.pathname[0]);
  const [userInfos, setUserInfos] = useState({});
  
  useEffect(() => {
    (
      async () => {
        setLoading(true);
        const resp = await fetch(host+'/users/getInfos', {headers: {
          'Authorization': sessionStorage.user
        }})
        const data = await resp.json();
        setUserInfos(data);
        setLoading(false);
      }
    )()
  }, [])

  return <nav style={{padding: '0 30px', width: '100%'}} className="navbar navbar-expand-lg navbar-dark bg-dark">
    <Link to='/' className="navbar-brand" style={{fontSize: '1.5rem'}}>Semence</Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav" style={{fontSize: '1.3rem'}}>
        {
          user ? <> 
                  <li className="nav-item active">
                    <Link to='/' className={`nav-link ${page === '/' ? 'active' : ''}`} onClick={() => {setPage('/')}} href="#">Accueil</Link>
                  </li>
                  {
                    sessionStorage.stat === 'ad' ?<>
                                                  <li className="nav-item" style={{color: 'green'}}>
                                                    <Link to='/class' className={`nav-link ${page === '/class' ? 'active' : ''}`} onClick={() => {setPage('/class')}} href="#">Classes</Link>
                                                  </li> 
                                                  <li className="nav-item" style={{color: 'green'}}>
                                                    <Link to='/teachers' className={`nav-link ${page === '/teachers' ? 'active' : ''}`} onClick={() => {setPage('/teachers')}} href="#">Enseignants</Link>
                                                  </li> 
                                                  <li className="nav-item active">
                                                    <Link to='/matieres' className={`nav-link ${page === '/matieres' ? 'active' : ''}`} onClick={() => {setPage('/matieres')}} href="#">Matieres</Link>
                                                  </li>
                                                  <li className="nav-item">
                                                    <Link to='/competences' className={`nav-link ${page === '/competences' ? 'active' : ''}`} onClick={() => {setPage('/competences')}} href="#">Competences</Link>
                                                  </li>
                                                </> : <>
                                                  <li className="nav-item" style={{color: 'green'}}>
                                                    <Link to={'/class'+sessionStorage.classId} className={`nav-link ${page === '/class' ? 'active' : ''}`} onClick={() => {setPage('/class')}} href="#">Classes</Link>
                                                  </li>
                                                </>
                  }
                  </>
                : <> 
                
                  <li className="nav-item active">
                    <Link to='/login' className={`nav-link ${page === '/login' ? 'active' : ''}`} href="#">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link to='/register' className={`nav-link ${page === '/register' ? 'active' : ''}`} href="#">Register</Link>
                  </li>
                  </>
        }
      </ul>
    </div>

  </nav>
}

export default TopBar;