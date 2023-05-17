import React,{useState} from 'react'
import Card from '../../../components/shared/Card/Card';
import Button from '../../../components/shared/Button/Button';
import TextInput from '../../../components/shared/TextInput/TextInput';
import styles from './StepOtp.module.css';
import { verifyOtp } from '../../../http';
import { useSelector, useDispatch } from 'react-redux';
import { setAuth } from '../../../store/authSlice'

const StepOtp = () => {
    const [otp,setOtp] = useState('');
    const dispatch = useDispatch()
    const {phone, hash } = useSelector((state)=> state.auth.otp)
    async function submit(){
        if(!otp || !phone || !hash) return;
        try{
            const {data} = await verifyOtp({ otp, phone,hash});
            dispatch(setAuth(data))
            console.log(data); 
        }catch(err){
            console.log(err);
        }
        
    
    }
  return (
    <>
        <div className={styles.cardWrapper}>
            <Card title="Enter the otp" icon="Lock">
                <div>
                    <TextInput value={otp} onChange={(e)=>setOtp(e.target.value)}/>
                </div>
                <div className={styles.actionButtonWrap}>
                    <Button onClick={submit} text="Next"/>
                </div>
                    <p className={styles.para}>By entering your number, you are agreeing to out Terms of Service and Privacy Policy. Thanks!</p>
                
            </Card>
        </div>
       
    </>
  )
}

export default StepOtp