import styles from './chatWindow.module.css'

import { useState, useEffect, useRef } from 'react'
import EmojiPicker from 'emoji-picker-react'
import Api from '../../Api'

import { MessageItem } from '../MessageItem'

import SearchIcon from '@mui/icons-material/Search'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';


export const ChatWindow = ({ user, data }) => {

  const body = useRef()

  let recognition = null
  let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  if(SpeechRecognition !== undefined) {
    recognition = new SpeechRecognition()
  }

  const [text, setText] = useState('')
  const [emojiOpen, setEmojiOpen] = useState(false)
  const [listening, setListening] = useState(false)
  const [list, setList] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    setList([])
    let unsub = Api.onChatContent(data.chatId, setList, setUsers)
    return unsub
  },[data.chatId])

  useEffect(() => {
    if(body.current.scrollHeight > body.current.offsetHeight) {
      body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight
    }
  },[list])

  const handleEmojiClick = (e, emojiObject) => {
    setText( text + emojiObject.emoji)
  }

  const handleOpenEmoji = () => {
    setEmojiOpen(true)
  }

  const handleCloseEmoji = () => {
    setEmojiOpen(false)
  }

  const handleInputKeyUp = (e) => {
    if(e.key === "Enter") {
      handleSendClick()
    }
  }

  const handleSendClick = () => {
    if(text !== '') {
      Api.sendMessage(data, user.id, 'text', text, users)
      setText('')
      setEmojiOpen(false)
    }
  }

  const handleMicClick = () => {
    if(recognition !== null) {
      recognition.onstart = () => {
        setListening(true)
      }

      recognition.onend = () => {
        setListening(false)
      }

      recognition.onresult = (e) => {
        setText(e.results[0][0].transcript)
      }

      recognition.start()
    }
  }

  return (
    <div className={styles.chatWindow}>
      <div className={styles.chatWindowHeader}>

        <div className={styles.chatWindowHeaderInfo}>
          <img src={data.image} alt="avatar" className={styles.chatWindowAvatar} />
          <div className={styles.chatWindowName}>{data.title}</div>
        </div>

        <div className={styles.chatWindowHeaderButtons}>
          <div className={styles.chatWindowHeaderBtn}>
            <SearchIcon style={{color: '#919191'}}/>
          </div>

          <div className={styles.chatWindowHeaderBtn}>
            <MoreVertIcon style={{color: '#919191'}}/>
          </div>
        </div>

      </div>

      <div ref={body} className={styles.chatWindowBody}>
        {list.map((item, index) => (
          <MessageItem 
            key={index}
            data={item}
            user={user}
          />
        ))}
      </div>

      <div className={styles.chatWindowEmojiArea} style={{height: emojiOpen ? '200px' : '0px'}}>
        <EmojiPicker
          onEmojiClick={handleEmojiClick}
          disableSearchBar
          disableSkinTonePicker
          pickerStyle={{width: 'auto' }}
        />
      </div>

      <div className={styles.chatWindowFooter}>

        <div className={styles.chatWindowPre}>
          <div className={styles.chatWindowHeaderBtn} onClick={handleOpenEmoji} >
            <InsertEmoticonIcon style={{color: emojiOpen ? '#00a884' : '#919191'}}/>
          </div>

          <div className={styles.chatWindowHeaderBtn} onClick={handleCloseEmoji} style={{width: emojiOpen ? '40px': '0'}}>
            <CloseIcon style={{color: '#919191'}}/>
          </div>

          <div className={styles.chatWindowHeaderBtn}>
            <AttachFileIcon style={{color: '#919191'}}/>
          </div>
        </div>

        <div className={styles.chatWindowInputArea}>
          <input 
            className={styles.chatWindowInput}
            type="text" 
            placeholder='Mensagem'
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyUp={handleInputKeyUp}
          />
        </div>


        <div className={styles.chatWindowPos}>
          {text !== '' &&
            <div onClick={handleSendClick} className={styles.chatWindowHeaderBtn}>
              <SendIcon style={{color: '#919191'}}/>
            </div>
          }

          {text === '' &&
            <div onClick={handleMicClick} className={styles.chatWindowHeaderBtn}>
              <MicIcon className={listening ? styles.chatWindowMicOpen : styles.chatWindowMicClose} />
            </div>
          }
        </div>

      </div>
    </div>
  )
}