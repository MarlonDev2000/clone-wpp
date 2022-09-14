import { useState, useEffect } from 'react'

import styles from './newChat.module.css'
import Api from '../../Api'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';


export const NewChat = ({ user, chatList, show, setShow }) => {

  const [list, setList] = useState([])

  useEffect(()=>{
    const getList = async () => {
      if(user !== null) {
        let results = await Api.getContactList(user.id)
        setList(results)
      }
    } 
    getList()
  }, [user])

  const addNewChat = async (user2) => {
    await Api.addNewChat(user, user2)

    handleClose()
  }

  const handleClose = () => {
    setShow(false)
  }

  return (
    <div className={styles.newChat} style={{left: show ? 0 : '-999px'}}>
      <div className={styles.newChatHead}>
        <div className={styles.newChatBackButton} onClick={handleClose}>
          <ArrowBackIcon style={{color: '#fff'}}/>
        </div>
        <div className={styles.newChatHeadTitle}>Nova conversa</div>
      </div>
      <div className={styles.newChatList}>
        {list.map((item, index)=>(
          <div onClick={() => addNewChat(item)} className={styles.newChatItem} key={index}>
            <img className={styles.newChatItemAvatar} src={item.avatar} alt="" />
            <div className={styles.newChatItemName}>{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}