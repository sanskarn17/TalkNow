import React,{useState} from 'react'
import Card from '../../../../components/shared/Card/Card';
import Button from '../../../../components/shared/Button/Button';
import TextInput from '../../../../components/shared/TextInput/TextInput';
import styles from '../StepEmail.module.css';
const Email = ({onNext}) => {
    const [email, setemail] = useState('');
  return (
    <Card title="Enter your email id" icon="Emoji">
            <div>
                <TextInput value={email} onChange={(e)=>setemail(e.target.value)}/>
            </div>
            <div className={styles.actionButtonWrap}>
                <Button onClick={onNext} text="Next"/>
            </div>
            <p className={styles.para}>By entering your number, you are agreeing to out Terms of Service and Privacy Policy. Thanks!</p>
        </Card>
  )
}

export default Email