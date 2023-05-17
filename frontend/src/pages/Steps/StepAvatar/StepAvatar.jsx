import React,{useState, useEffect} from 'react';
import styles from './StepAvatar.module.css';
import Card from '../../../components/shared/Card/Card';
import Button from '../../../components/shared/Button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { setName, setAvatar } from '../../../store/activationSlice';
import { activate } from '../../../http/index';
import { setAuth } from '../../../store/authSlice'
import Loader from '../../../components/shared/Loader/Loader'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StepAvatar = ({onNext}) => {
    const {name, avatar} = useSelector((state)=> state.activate);
    const dispatch = useDispatch();
    const [image, setImage] = useState('/images/monkey.jpg');
    const [loading, setLoading] = useState(false);

    function captureImage(e){
       const file = e.target.files[0];
       const reader = new FileReader();
       reader.readAsDataURL(file)
       reader.onloadend = function(){
            setImage(reader.result);
            dispatch(setAvatar(reader.result))
       }
    }
    async function submit(){
        if(!name || !avatar) {
           return toast.warn('Please upload the image', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
        setLoading(true);
        try{
            const {data} = await activate({name, avatar});
            if(data.auth){
                dispatch(setAuth(data));
            }
        }catch(err){
            console.log(err.message);
        }
        finally{
            setLoading(false);
        }
    }
   

    if(loading) return <Loader message="Activation in progress..." />
    return (
        <>
            <div className={styles.cardWrapper}>
                    <Card title={`Okay, ${name}`} icon="Monkey">
                        <p className={styles.para}>How's this photo?</p>
                        <div className={styles.avatarWrapper}>
                            <img className={styles.avatarImage} src={image} alt="avatar" />    
                        </div>
                        <div>
                            <input onChange={captureImage} id="avatarInput" type="file"  className={styles.avatarInput}/>
                            <label className={styles.avatarLabel} htmlFor="avatarInput">Choose a different pic</label>
                        </div>  
                        <div className={styles.actionButtonWrap}>
                            <Button onClick={submit} text="Next"/>
                        </div>
                            
                    </Card>
                </div>
        </>
    )
}

export default StepAvatar