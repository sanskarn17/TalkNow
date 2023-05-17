import React,{useState} from 'react'
import StepName from '../Steps/StepName/StepName'
import StepAvatar from '../Steps/StepAvatar/StepAvatar'
const steps = {
    1: StepName,
    2: StepAvatar
}

const Activate = () => {
  
    function onNext(){
        setStep(step+1);
    }
    const [step, setStep] = useState(1);
    const Step = steps[step]
    return (
    <Step onNext={onNext}></Step>
  )
}

export default Activate