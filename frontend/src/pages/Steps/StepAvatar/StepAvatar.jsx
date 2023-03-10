import React from 'react'
import Card from '../../../components/shared/Card/Card'
import Button from '../../../components/shared/Button/Button'
import styles from './StepAvatar.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'
import { setAvatar } from '../../../store/activateSlice'
import {activate} from '../../../http/index'
import {setAuth} from '../../../store/authSlice';
import Loader from '../../../components/shared/Loader/Loader'

const StepAvatar = ({onNext}) => {
  const dispatch = useDispatch();
  const {name , avatar} = useSelector((state) => state.activate);
  const [image , setImage] = useState('/images/monkey-avatar.png');
  const [loading, setLoading] = useState(false);
  const [unMounted, setUnMounted] = useState(false);

  function captureImage(e){
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function(){
      setImage(reader.result);
      dispatch(setAvatar(reader.result));
    }
  }

  async function submit(){
    if(!name || !avatar) return;
    setLoading(true);
    try{
      const {data} = await activate({name,avatar});
      if(data.auth){
        if(!unMounted){
          dispatch(setAuth(data));
        }
      }
      console.log(data);
    }catch(err){
      console.log(err);
    }finally{
      setLoading(true);
    }
  }

  useEffect(() => {
    return () => {
      setUnMounted(true);
    }
  }, []);
  

  if(loading) return <Loader message="Activation in Progress"/>;
  return (
    <>
      <Card title={`Okay, ${name}`} icon="monkey-emoji">
          <p className={styles.subHeading}>How's this photo?</p>
          <div className={styles.avatarWrapper}>
            <img className={styles.avatarImage} src={image} alt = "avatar"/>
          </div>
          <div>
            <input 
              onChange={captureImage}
              id="avatarInput" type="file" className={styles.avatarInput}/>
            <label htmlFor="avatarInput">Choose a different Photo</label>
          </div>
          <div>
            <Button text="Next" onClick={submit}></Button>
          </div>

        </Card>
    </>
  )
}

export default StepAvatar