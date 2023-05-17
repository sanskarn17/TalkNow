import React,{useState} from 'react'
import Card from '../../../components/shared/Card/Card'
import Button from '../../../components/shared/Button/Button'
import TextInput from '../../../components/shared/TextInput/TextInput'
import styles from './StepName.module.css'
import { useDispatch, useSelector} from 'react-redux';
import { setName } from '../../../store/activationSlice'
const StepName = ({onNext}) => {
    const { name } = useSelector(state=>state.activate);
    const dispatch = useDispatch();
    const [fullname, setFullname] = useState(name);
    function nextStep(){
        if(!fullname){
            return;
        }
        dispatch(setName(fullname));
        onNext();
    }
    return (
        <>
            <div className={styles.cardWrapper}>
                <Card title="What's your name?" icon="Smile">
                        <div>
                            <TextInput value={fullname} onChange={(e)=> setFullname(e.target.value)}/>
                        </div>
                        
                        <p className={styles.para}>People use real Name for Coder'sVilla</p>
                        <div className={styles.actionButtonWrap}>
                            <Button onClick={nextStep} text="Next"/>
                        </div>
                        
                </Card>
            </div>
        </>
  )
}

export default StepName