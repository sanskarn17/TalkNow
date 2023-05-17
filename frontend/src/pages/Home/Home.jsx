import React from 'react'
import style from './Home.module.css'
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/shared/Card/Card'
import Button from '../../../src/components/shared/Button/Button'
const Home = () => {
  const SigninStyle ={
    fontWeight: 'bold',
    textDecoration: 'none',
    color: '#fff'
  }
  const history = useNavigate();
  function startRegister(){
    history('./authenticate')
  } 
  return ( 
    <div className={style.cardWrapper}>
        <Card title="Welcome to the TalkNow!" icon="logo">
            <p className={style.text}>We’re are working hard to get TalkNow ready for everyone! 
            While we wrap the finishing touches. 
            We’re adding people gradually so nothing breaks. 
            </p>
            <div>
                <Button onClick={startRegister} text="Let's Go"/>
            </div>
            <div className={style.signin}>
                <span>Have an invite? </span>
            </div>
        </Card>
        
    </div>
  )
}

export default Home

