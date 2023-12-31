import firebaseAuth from '../../services/firebase/auth';
import './index.scss'
import { Link } from 'react-router-dom';


function Index() {

  return (
    <>
      <div className="wrapper">
        <article className="logo">
            <img src="./img/Peach_logo.PNG" alt="peach-logo" />
            <h1>Peach Market</h1>
        </article>
        <article className="go-login">
            <button onClick={firebaseAuth.signInWithGoogle} id="google-sign-in">
                <img src="./img/google_logo.png" alt="google_logo" />
                <p>구글 계정으로 로그인</p>
            </button>
            <div className="login-reg">
                <Link to="/login/">이메일로 로그인</Link>
                <Link to='/signup/'>회원가입</Link>
            </div>
        </article>
      </div>
  </>
  );
}

export default Index;
