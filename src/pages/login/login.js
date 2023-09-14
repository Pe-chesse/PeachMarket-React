import './login.css'
import { useNavigate } from 'react-router-dom';


function Login() {

    const navigate = useNavigate();
    const goBackbtn = ()=>{
        navigate(-1);
    }

  return (
    <>
        <article className="top-area">
            <img src="../img/arrow.png" alt="arrow" onClick={goBackbtn}/>
            <p>이메일로 로그인</p>
        </article>
        <section className="main-area">
            <h2>LOGIN 🍑</h2>
            <p>이메일과 비밀번호를 입력해주세요</p>
            <form>
                    <input type="email" name="email" className="email" placeholder="이메일" autoComplete="off"/>
                    <input type="password" name="password" className="password" placeholder="비밀번호"/>
            </form>
            <p className="login-warn">* 이메일 또는 비밀번호가 일치하지 않습니다. 회원이 아니실 경우에는 회원 가입을 먼저 진행해 주세요.</p>
        </section>
        <div className="regist-btn">
            <a href="./join.html">회원가입</a>
        </div>
        <div className="login-btn-area">
            <button className="login-btn">로그인</button>
        </div>
    <div className="email-verify">
        <h3>이메일 미인증</h3>
        <p>사용자님의 주소로 인증요청을 전송했습니다.</p>
        <p>메일 내부의 링크를 클릭하시면 인증이 완료됩니다.</p>
        <div className="send-btn-area">
            <button className="resend">인증 메일 재발송</button>
            <button className="confirm">확인</button>
        </div>
    </div>
  </>
  );
}

export default Login;
