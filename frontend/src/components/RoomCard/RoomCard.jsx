import React from 'react'
import styles from './RoomCard.module.css';
import {useNavigate} from 'react-router-dom';

const RoomCard = ({room}) => {
    const history = useNavigate()
  return (
    <div onClick={()=>{history(`/room/${room.id}`)}}className={styles.card}>
        <h3 className={styles.topic}>{room.topic}</h3>
        <div className={`${styles.speaker} ${room.speakers.length ===1 ? styles.singleSpeaker: ""}`}>
            <div className={styles.left}>
                {room.speakers.map(speaker=>(
                    <img key={speaker.id} src={speaker.avatar} alt="" />
                ))}
            </div>
            <div className={styles.right}>
                {room.speakers.map(speaker=>(
                    <div key={speaker.id}className={styles.nameWrapper}>
                        <span>{speaker.name}</span>
                        <img src="/images/chat.png" alt="" />
                    </div>
                ))}
            </div>
        </div>
        <div className={styles.peopleCount}>
            <span>{room.totalPeople}</span>
            <img src="/images/user.png" alt="" />
        </div>
    </div>
  )
}

export default RoomCard