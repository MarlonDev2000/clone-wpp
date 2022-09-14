import { useState, useEffect } from 'react'
import styles from './messageItem.module.css'

export const MessageItem = ({ data, user }) => {

  const [time, setTime] = useState('')

  useEffect(()=>{
    if(data.date > 0) {
      let date = new Date(data.date.seconds * 1000)
      let hours = date.getHours()
      let minutes = date.getMinutes()
      hours = hours < 10 ? '0'+hours : hours
      minutes = minutes < 10 ? '0'+hours : minutes
      setTime(`${hours}:${minutes}`)
    }
  },[data])

  return (
    <div className={styles.messageLine} style={{ justifyContent: user.id === data.author ? 'flex-end' : 'flex-start' }}>
      <div className={styles.messageItem} style={{ backgroundColor: user.id === data.author ? '#d9fdd3' : '#ffffff' }}>
        <div className={styles.messageText}>{data.body}</div>
        <div className={styles.messageDate}>{time}</div>
      </div>
    </div>
  )
}