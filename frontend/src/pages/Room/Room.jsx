import React,{useState, useEffect, Suspense} from 'react'
import { useWebRTC } from '../../hooks/useWebRTC'
import {useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import styles from './Room.module.css';
import {getRoom} from '../../http/index'

const Room = () => {
    const {id: roomId} =  useParams();
    const history = useNavigate()
    const [room, setRoom ] = useState(null);
    const user = useSelector(state => state.auth.user)
    const {clients, provideRef,handleMute} = useWebRTC(roomId,user);
    const [isMute, setMute]= useState(true)
    const handleManualLeave=()=>{
        history('/rooms');
    }
    useEffect(()=>{
        handleMute (isMute,user.id);
    },[isMute]);
    useEffect(() => {
        const fetchRoom = async ()=>{
            const { data } =await getRoom(roomId);
            console.log(data)
            setRoom((prev)=> data);
        }
        fetchRoom();
    }, [roomId]);
    const handleMuteClick=(clientId)=>{
        if(clientId !==user.id){
            return;
        }
        setMute((isMute)=>!isMute)
    }
  return (
    <div>
        <div className='container'>
            <button onClick={handleManualLeave} className={styles.goBack}>
                <img src="/images/BackArrow.png" alt="" />
                <span>All voice connected</span>
            </button>
        </div>
        <div className={styles.clientsWrap}>
            <div className={styles.header}>
                <h2 className={styles.topic}>{room?.topic}</h2>
                <div className={styles.actions}>
                    <button onClick={handleManualLeave}className={styles.actionButton}>
                        <img src="/images/Exit.png" alt="" />
                        <span>Leave Quietly</span>
                    </button>
                </div>
            </div>
            <div className={styles.clientsList}>
                {
                    clients.map((client,index)=>{
                        return (
                        <div className={styles.client} key={index}>
                            <div className={styles.userHead}>
                            <audio ref={(instance)=>provideRef(instance,client.id)} ></audio>
                            <img className={styles.userAvatar} src={client.avatar} alt="" />
                            <button onClick={()=>handleMuteClick(client.id)}className={styles.micBtn}>
                                {
                                    client.muted ? 
                                    <img src="/images/mute.png" alt="" />
                                    :
                                    <img src="/images/unmute.png" alt="" />
                                }
                            </button>
                        </div>
                        
                        <h4>{client.name}</h4>
                        </div>
                    )})
                }
            </div>
        </div>
    </div>
  )
}

export default Room

