import './App.css';
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
import Home from './pages/Home/Home.jsx';
import Navigation from './components/shared/Navigation/Navigation';
import Authenticate from './pages/Authenticate/Authenticate';
import Activate from './pages/Activate/Activate';
import Rooms from './pages/Rooms/Rooms';
import Room from './pages/Room/Room'
import {useSelector} from 'react-redux';
import { useState } from 'react';
import { useLoadingWithRefresh } from './hooks/useLoadingWithRefresh';
import Loader from './components/shared/Loader/Loader';


// const isAuth = false;
// const user = {
//     activated: false,
// }
const GuestRoute=(props)=>{
    const {user,isAuth} = useSelector((state) => state.auth);
    const {Component} = props;
    return (
            isAuth ? (
                <Navigate to="/rooms" replace/>
            ):(
                <Component/>
            )
    )
};

const SemiProtectedRoute=(props)=>{
    const {user,isAuth} = useSelector((state) => state.auth);
    const {Component} = props;
    return (
            !isAuth ? (
                <Navigate to="/" replace/>
            ): isAuth && !user.activated ?
            (
                <Component/>
            ):
            (
                <Navigate to="/rooms" replace/>
            )
    )
};

const ProtectedRoute=(props)=>{
    const {user,isAuth} = useSelector((state) => state.auth);
    const {Component} = props;
    return (
            !isAuth ? (
                <Navigate to="/" replace/>
            ): isAuth && !user.activated ?
            (
                <Navigate to="/activate" replace/>
            ):
            (
                <Component/>
            )
    )
};


function App() {
    const {loading} = useLoadingWithRefresh();
    //  call refresh endpoint

    return loading ? (<Loader message="Loading... please wait"/>) :
    (

        <BrowserRouter>
        <Navigation/>
            <Routes>
                <Route path="/" exact element={<GuestRoute Component={Home}/>}/>
                <Route path="/authenticate" element={<GuestRoute Component={Authenticate}/>}/>
                
                <Route path="/activate" element={<SemiProtectedRoute Component={Activate}/>}/>
                <Route path="/rooms" element={<ProtectedRoute Component={Rooms}/>}/>
                <Route path="/room:id" element={<ProtectedRoute Component={Room}/>}/>
            </Routes>
        </BrowserRouter>
    )
}


export default App;  
