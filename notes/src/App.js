import Notes from './pages/notes';
import Login from './pages/login';
import RegistrationForm from './pages/registrationform';
import NoteForm from './pages/createNote';
import  AuthProvider from './context/authContext';
import Home from './pages/home';
import NavBar from './pages/navigationBar'; 
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/' element={<Notes/>} />
          <Route path='/notes' element={<Notes/>} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<RegistrationForm/>}/>
          <Route path='/create-note' element={<NoteForm />}/>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
