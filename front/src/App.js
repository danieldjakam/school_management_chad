// React package
import React from 'react'
import {useState} from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

// Css files
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import Home from './pages/Home';
import Login from './pages/Login';
import Class from './pages/Class/Class';
import Error404 from './pages/Error404';
import Settings from './pages/Settings';
import SearchView from './pages/Search';
import Sidebar from './components/Sidebar';
import Params from './pages/Profile/Params';
import MatA from './pages/Notes/Annuels/Mat';
import SeqStu from './pages/Sequences/SeqStu';
import Student from './pages/Students/Student';
import Matiere from './pages/Matieres/Matiere';
import PrimA from './pages/Notes/Annuels/Prim';
import Mat from './pages/Notes/Trimestres/Mat';
import Statistics from './pages/Statistics.jsx';
import MatAB from './pages/Bulletin/Annuels/Mat';
import TrimStu from './pages/Trimestres/TrimStu';
import Teachers from './pages/Teachers/Teachers';
import Prim from './pages/Notes/Trimestres/Prim';
import ClassCompt from './pages/comptables/Class';
import PrimAB from './pages/Bulletin/Annuels/Prim';
import MatB from './pages/Bulletin/Trimestres/Mat';
import ParamsCompt from './pages/comptables/Params';
import PrimB from './pages/Bulletin/Trimestres/Prim';
import ReductFees from './pages/comptables/ReductFees';
import StudentsComp from './pages/comptables/Students';
import ClassBySection from './pages/Class/ClassBySection';
import TransfertStudent from './pages/Students/TransfertStudent';
import StudentsByClass from './pages/comptables/StudentsByClass';
import Promotion from './pages/Students/Promotion';

function App() {
  let val = null;
  if (sessionStorage.user) {
    val = true;
  }
  const [user, setUser] = useState(val);

  return <div className="App">
		<Router>
			<Sidebar/>
			<Routes>
				{
					user ? <>
							<Route path='/' element={<Home/>} />
							<Route path='/students-comp' element={<StudentsComp/>} />
							<Route path='/class-comp' element={<ClassCompt/>} />
							<Route path='/class-comp/:id' element={<StudentsByClass/>} />
							<Route path='/reduct-fees/:id' element={<ReductFees/>} />
							<Route path='/params-comp' element={<ParamsCompt/>} />
							<Route path='/class' element={<Class/>} /> 
							<Route path='/classBySection/:name' element={<ClassBySection />} /> 
							<Route path='/students/:id' element={<Student/>} />
							<Route path='/transfert/:id' element={<TransfertStudent/>} />
							<Route path='/teachers' element={<Teachers/>} />
							<Route path='/matieres' element={<Matiere/>} />  
							<Route path='/search' element={<SearchView/>}/>
							<Route path='/params' element={<Params/>}/>
							<Route path='/seqs' element={<SeqStu/>}/>
							<Route path='/settings' element={<Settings/>}/>
							<Route path='/trims' element={<TrimStu/>}/>
							<Route path='/stats' element={<Statistics/>}/>
							<Route path='promotion/:exam_id/:class_id' element={<Promotion/>} />

							<Route path='/trims1/:exam_id/:class_id' element={<Mat type={1}/>} /> 
							{/* Routes for bulletins */}

							<Route path='/annuals2/:exam_id/:class_id' element={<PrimA type={2}/>} /> 
							<Route path='/annuals1/:exam_id/:class_id' element={<MatA type={1}/>} /> 
							<Route path='/trims1/:exam_id/:class_id/:student_id' element={<MatB type={1}/>} /> 

							<Route path='/annuals2/:exam_id/:class_id/:student_id' element={<PrimAB type={2}/>} />
							<Route path='/trims2/:exam_id/:class_id/:student_id' element={<PrimB type={2}/>} />

							{/* Route for see notes */}
							<Route path='/annuals1/:exam_id/:class_id/:student_id' element={<MatAB type={1}/>} /> 
							<Route path='/trims2/:exam_id/:class_id' element={<Prim type={2}/>} /> 



							<Route path='*' element={<Error404/>} />
						</>
						: <> 
							<Route path='/login' element={<Login setUser={setUser}/>} />
							<Route path='*' element={<Login setUser={setUser} />} />
						</> 
				}
			</Routes>
		</Router>
    </div>
}

export default App;