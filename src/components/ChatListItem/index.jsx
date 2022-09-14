import { useState, useEffect } from 'react'
import styles from './chatListItem.module.css'

export const ChatListItem = ({ onClick, active, data }) => {

  const [time, setTime] = useState('')

  useEffect(()=>{
    if(data.lastMessageDate > 0) {
      let date = new Date(data.lastMessageDate.seconds * 1000)
      let hours = date.getHours()
      let minutes = date.getMinutes()
      hours = hours < 10 ? '0'+hours : hours
      minutes = minutes < 10 ? '0'+hours : minutes
      setTime(`${hours}:${minutes}`)
    }
  },[data])


  return (
    <div className={`${styles.chatListItem} ${active ? styles.active : ''}`} onClick={onClick}>
      <img src={data.image} alt="avatar" className={styles.chatListItemAvatar}/>
      <div className={styles.chatListItemLines}>
        <div className={styles.chatListItemLine}>
          <div className={styles.chatListItemName}>{data.title}</div>
          <div className={styles.chatListItemDate}>{time}</div>
        </div>
        <div className={styles.chatListItemLine}>
          <div className={styles.chatListItemLastMsg}>
            <p>{data.lastMessage}</p>
          </div>
        </div>
      </div>
    </div>
  )
}