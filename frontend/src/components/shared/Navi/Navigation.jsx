import React from 'react'
import { Link } from 'react-router-dom';
import { logout } from '../../../http';
import style from './Navigation.module.css';
import { useDispatch,useSelector } from 'react-redux';
import { setAuth } from '../../../store/authSlice';
const Navigation = () => {
  const brandStyle ={
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '22px',
    display: 'flex',
    alignItems: 'center'
  };
  const logoText={
    marginLeft: '10px',
  }
  const dispatch = useDispatch();
  const {isAuth, user} = useSelector(state=>state.auth)
  async function logoutUser(){
    try{
        const {data} = await logout();
        dispatch(setAuth(data));
    }catch(err){
        console.log(err)
    }
  }
  return (
    <nav className={`${style.navbar} container`}>
      <Link style={brandStyle} to='/'>
        <img  src="/images/Logo.png" alt="" />
        <span style={logoText}>TalkNow</span>
      </Link>
      {isAuth &&(
        <div className={style.navRight}>
            <h3>{user?.name}</h3>
            <Link to='/'>
                <img className={style.avatar} src={user.avatar ? user.avatar:'/images/monkey.jpg'}  weight="40" height="40" alt="" />
            </Link>
            <button className={style.logoutBtn}onClick={logoutUser}>
                <img  src="/images/logout.png" alt="" />
            </button>
        </div>
      )}
        {/*isAuth && <button onClick={logoutUser}>Logout</button>*/}
    </nav>
  )
}

export default Navigation