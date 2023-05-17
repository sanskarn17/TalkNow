import './App.css';
import {  BrowserRouter, Routes, Route,Navigate, useLocation} from 'react-router-dom';
import Home from './pages/Home/Home';
import Navigation from './components/shared/Navi/Navigation';
import Activate from './pages/Activate/Activate';
import Authenticate from './pages/Authenticate/Authenticate';
import Rooms from './pages/Rooms/Rooms';
import Room from './pages/Room/Room'
import { useSelector } from 'react-redux'
import { useLoadingWithRefresh } from './hooks/useLoadingWithRefresh';
import { ToastContainer, toast } from 'react-toastify';
import Loader from './components/shared/Loader/Loader';

function App() {
    const {loading}=useLoadingWithRefresh();
    //call refresh endpoint

    return loading ? (<Loader message='Loading, please wait...'/>): (
        <BrowserRouter>
            <ToastContainer />
            <Navigation/>
            <Routes>
                <Route path='/' exact element={
                    <GuestRoute>
                        <Home/>
                    </GuestRoute>}/>
                <Route path="authenticate" element=
                    {<GuestRoute>
                        <Authenticate/>
                    </GuestRoute>}/>
                <Route path="activate" element={
                    <SemiProtectedRoute>
                        <Activate/>
                    </SemiProtectedRoute>
                }/>
                <Route path="rooms" element={
                    <ProtectedRoute>
                        <Rooms/>
                    </ProtectedRoute>
                }/>
                <Route path="/room/:id" element={
                    <ProtectedRoute>
                        <Room/>
                    </ProtectedRoute>
                }/>
            </Routes>
        </BrowserRouter>
  );
};

const GuestRoute = ({children})=>{
    const {isAuth} = useSelector((state)=> state.auth)
    const location = useLocation();
    if (isAuth) {
        return <Navigate to="/rooms" state={{ from: location }} />
    }
    return children;
};

const SemiProtectedRoute = ({children})=>{
    const {user,isAuth} = useSelector((state)=> state.auth)
    const location = useLocation();
    if (!isAuth) {
        return <Navigate to="/" state={{ from: location }} />;
    };
    if(isAuth && !user.activated){
        return children
    };
    return <Navigate to="/rooms" state={{ from: location }}/>;
};

const ProtectedRoute = ({children})=>{
    const {user,isAuth} = useSelector((state)=> state.auth)
    const location = useLocation();
    if (!isAuth) {
        return <Navigate to="/" state={{ from: location }} />;
    };
    if(isAuth && !user.activated){
        return <Navigate to="/activate" state={{ from: location }}/>
    };
    return children;
};
export default App;



