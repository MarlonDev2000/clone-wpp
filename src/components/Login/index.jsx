import styles from './login.module.css'
import Api from '../../Api'
import wppLogo from '../../../public/favicon.png'
import loginImg from '../../assets/loginImg.png'


export const Login = ({onRecive}) => {

  const handleGoogleLogin = async () => {
    let result = await Api.googlePopup()
    if(result) {
      onRecive(result.user)
    } else {
      alert('Erro!')
    }
  }

  return (
    <div className={styles.login}>
      <div className={styles.container}>
        <div className={styles.loginTop}>
          <div onClick={handleGoogleLogin} className={styles.loginBtn}>Faça login com sua conta Google</div>
          <div>WhatsApp Clone - 2022</div>
        </div>
        <div className={styles.loginMain}>
          <img src={wppLogo} alt=""/>
          <h1>WhatsApp Clone</h1>
        </div>
        <div className={styles.loginContent}>
          <img src={loginImg} alt="" />
        </div>
        <div className={styles.footer}>
          Desenvolvido por Marlon Braga Filho
        </div>
      </div>
    </div>
  )
}