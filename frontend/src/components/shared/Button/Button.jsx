import React from 'react';
import style from './Button.module.css';
const Button = ({text, onClick}) => {
  return (
    <button onClick={onClick} className={style.button}> 
        <span>{text}</span>
        <img className={style.arrow} src="/images/Arrow.png" alt="" />
    </button>
  )
}

export default Button