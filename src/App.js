import './App.css';
import GlobalStyle from './component/GlobalStyle';

const APIKEY = process.env.REACT_APP_FIREBASE_KEY

function App() {
  console.log(APIKEY)
  return (
    <>
      <div className="wrapper">
        <GlobalStyle/>
        <article className="logo">
            <img src="./img/Peach_logo.PNG" alt="peach-logo" />
            <h1>Peach Market</h1>
        </article>
        <article className="go-login">
            <button id="google-sign-in">
                <img src="./img/google_logo.png" alt="google_logo" />
                <p>구글 계정으로 로그인</p>
            </button>
            <div className="login-reg">
                <a href="./html/loginpage.html">이메일로 로그인</a>
                <a href="./html/join.html">회원가입</a>
            </div>
        </article>
      </div>
  </>
  );
}

export default App;
