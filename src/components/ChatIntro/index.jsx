import styles from './chatIntro.module.css'
import wppIntro from '../../assets/wpp.png'

export const ChatIntro = () => {
  return (
    <div className={styles.chatIntro}>
      <img src={wppIntro} alt="" />
      <div className={styles.chatIntroText}>
        <h1>WhatsApp Web</h1>
        <span>Novo</span>
      </div>
      <h2>
        Agora você pode enviar e receber mensagens sem precisar manter seu celular conectado <br /> à internet.. <br />
        Use o WhatsApp em até quatro aparelhos conectados e um celular ao mesmo tempo.
      </h2>
    </div>
  )
}