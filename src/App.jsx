import { useState, useEffect } from 'react'

import Api from './Api'
import styles from './App.module.css'

import { ChatListItem } from './components/ChatListItem'
import { ChatIntro } from './components/ChatIntro'
import { ChatWindow } from './components/ChatWindow'
import { NewChat } from './components/NewChat'
import { Login } from './components/Login'

import DonutLargeIcon from '@mui/icons-material/DonutLarge'
import ChatIcon from '@mui/icons-material/Chat'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';

const App = () => {
  const [chatList, setChatList] = useState([])

  const [activeChat, setActiveChat] = useState({})

  const [user, setUser] = useState(null)

  const [showNewChat, setShowNewChat] = useState(false)

  useEffect(() => {
    if(user !== null) {
      let unsub = Api.onChatList(user.id, setChatList)
      return unsub
    }
  }, [user])

  const handleNewChat = () => {
    setShowNewChat(true)
  }

  const handleLoginData = async (u) => {
    let newUser = {
      id: u.uid,
      name: u.displayName,
      avatar: u.photoURL,
      teste: console.log(u)
    }
    await Api.addUser(newUser)
    setUser(newUser)
  }

  if(user === null) {
    return (
      <Login onRecive={handleLoginData} />
    )
  }

  return (
    <>
      <div className={styles.bar}>
        </div>
          <div className={styles.appWindow}>
          <div className={styles.sideBar}>

            <NewChat
              show={showNewChat}
              setShow={setShowNewChat}
              user={user}
              chatlist={chatList}
            />
            <header>
                    <img src={user.avatar} alt="avatar" className={styles.headerAvatar}/>
                    <div className={styles.headerButtons}>

                      <div className={styles.headerBtn}>
                        <DonutLargeIcon style={{color: '#919191'}} />
                      </div>

                      <div className={styles.headerBtn}>
                        <ChatIcon style={{color: '#919191'}} onClick={handleNewChat}/>
                      </div>

                      <div className={styles.headerBtn}>
                        <MoreVertIcon style={{color: '#919191'}} />
                      </div>

                    </div>
            </header>

            <div className={styles.search}>
                    <div className={styles.searchInput}>
                      <SearchIcon style={{color: '#919191'}} fontSize="small"/>
                      <input type="search" placeholder='Pesquisar ou começar uma nova conversa'/>
                    </div>
            </div>

            <div className={styles.chatlist}>
                    {chatList.map((item, index) => (
                      <ChatListItem
                        key={index}
                        data={item}
                        active={activeChat.chatId === chatList[index].chatId}
                        onClick={()=>setActiveChat(chatList[index])}
                      />
                    ))}
            </div>

          </div>
          <div className={styles.contentArea}>
            {activeChat.chatId !== undefined && 
              <ChatWindow
                user={user}
                data={activeChat}
              />
            }
            {activeChat.chatId === undefined && 
              <ChatIntro />
            }
        </div>
      </div>
    </>
  )
}

export default App