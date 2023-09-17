import { Link } from 'react-router-dom';
import './App.scss';
import { initAuthListener } from './controllers/auth';
import { useEffect, useState } from 'react';

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    initAuthListener((user) => {
      setUser(user);
    });
  }, []); // 이니셜라이징

  return (
    <>
      <div className="wrapper">
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
                <Link to="/login/">이메일로 로그인</Link>
                <Link to='/signup/'>회원가입</Link>
            </div>
        </article>
      </div>
  </>
  );
}

export default App;
