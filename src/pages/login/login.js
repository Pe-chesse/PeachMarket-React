import { useRef, useState } from 'react';
import './login.scss'
import { Link, useNavigate } from 'react-router-dom';
import firebaseAuth from '../../services/firebase/auth';

function Login() {
    const navigate = useNavigate();
    // 뒤로가기
    const goBackbtn = ()=>{
        navigate(-1);
    }

    // 아이디 비밀번호
    const [userEmail, setUserEmail] = useState('');
    const [userPwr, setUserPwr] = useState('');
    
    // 비밀번호 틀렸을 시
    const loginwarnRef = useRef();

    // 로그인 시도
    const emailVerfiy = document.querySelector('.email-verify')

    const goLogin = async ()=>{
        await firebaseAuth.signInWithEmail(userEmail,userPwr)
        .then((res)=>{
            if(res.user === undefined) {
                loginwarnRef.current.style.opacity = 1;
            }else{
                if(!res.user.emailVerified){
                    console.log('이메일 인증 안됌')
                    console.log(res)
                    emailVerfiy.classList.add('disfl')
                    setTimeout(() => {
                        emailVerfiy.classList.add('op1')
                    }, 100);
                }else{
                    navigate('/home/')
                }
            }
        })
    }
    
    // 로그인 미인증시 버튼 기능
    const emailVerifyConfirm = ()=>{
        emailVerfiy.classList.remove('op1')
        setTimeout(() => {
            emailVerfiy.classList.remove('disfl')
        }, 100);
    }

    const resendEmail = () => {
        firebaseAuth.resendtoEmail()
        emailVerfiy.classList.remove('op1')
        setTimeout(() => {
            emailVerfiy.classList.remove('disfl')
        }, 100);
    }

  return (
    <>
    <div className='login-wrapper'>
        <article className="top-area">
            <img src="../img/arrow.png" alt="arrow" onClick={goBackbtn}/>
            <p>이메일로 로그인</p>
        </article>
        <section className="main-area">
            <h2>LOGIN 🍑</h2>
            <p>이메일과 비밀번호를 입력해주세요</p>
            <form>
                    <input type="email" name="email" className="email" placeholder="이메일" autoComplete="off" onChange={(e)=>{
                        setUserEmail(e.target.value)
                    }}/>
                    <input type="password" name="password" className="password" placeholder="비밀번호" onChange={(e)=>{
                        setUserPwr(e.target.value)
                    }}/>
            </form>
            <p className="login-warn" ref={loginwarnRef}>* 이메일 또는 비밀번호가 일치하지 않습니다. 회원이 아니실 경우에는 회원 가입을 먼저 진행해 주세요.</p>
        </section>
        <div className="regist-btn">
            <Link to='/signup/'>회원가입</Link>
        </div>
        <div className="login-btn-area">
            <button className="login-btn" onClick={goLogin}>로그인</button>
        </div>
    </div>

    <div className="email-verify">
        <h3>이메일 미인증</h3>
        <p>사용자님의 주소로 인증요청을 전송했습니다.</p>
        <p>메일 내부의 링크를 클릭하시면 인증이 완료됩니다.</p>
        <div className="send-btn-area">
            <button className="resend" onClick={resendEmail}>인증 메일 재발송</button>
            <button className="confirm" onClick={emailVerifyConfirm}>확인</button>
        </div>
    </div>
  </>
  );
}

export default Login;
