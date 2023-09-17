import './signup.scss'
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import firebaseAuth from '../../services/firebase/auth';

function Signup() {
    // 뒤로가기
    const navigate = useNavigate();
    const goBackbtn = ()=>{
        navigate('/');
    }

    // 확인시 이동
    const gologin = ()=>{
        navigate('/login/')
    }

    // 이메일 비밀번호 컨트롤러 
    const emailRef = useRef();
    const passwordRef = useRef();

    // 이메일 회원가입
    const [ registEamil, setResistEmail ] = useState('');
    const [ registPassword, setResistPassword ] = useState('');

    // 이메일,비밀번호 확인
    const emailpattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    const pwrpattern = registPassword.search(/^.*(?=^.{6,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/);
    const checkPwr = registPassword.length >= 6 && pwrpattern >= 0;

    useEffect(()=>{
        if(!emailpattern.test(registEamil) && registEamil.length > 1){
            emailRef.current.style.opacity = '1'
        }else{
            emailRef.current.style.opacity = '0'
        };

        if(!checkPwr && registPassword.length >= 1){
            passwordRef.current.style.opacity='1'
        }
        else{
            passwordRef.current.style.opacity='0'
        }
    })
    
    // 버튼 활성화
    const [activeBtn, setActiveBtn] = useState(true);
    useEffect(()=>{
        if(emailRef.current.style.opacity == 1 || passwordRef.current.style.opacity == 1 || registEamil.length == 0 || registPassword.length == 0){
            setActiveBtn(true)
        }
        else{
            setActiveBtn(false)
        }
    })

    // 회원가입
    const register = async()=>{
        try {
            await firebaseAuth.signUpWithEmail(registEamil,registPassword);

            document.querySelector('.back-black').classList.add('dibl')
            document.querySelector('.popup').classList.add('dibl')
            setTimeout(()=>{
                document.querySelector('.back-black').classList.add('op05')
                document.querySelector('.popup').classList.add('op1')
            },200)
        }
        catch(err){
            console.log(err.message)
        }
    }

  return (
    <>
    <div className='signup-wrapper'>
        <article className="top-area">
            <img src="../img/arrow.png" alt="arrow" onClick={goBackbtn}/>
            <p>회원가입</p>
        </article>
        <section className="main-area">
            <h2>JOIN 🍑</h2>
            <p>이메일과 비밀번호를 입력해 가입해주세요</p>
            <form>
                    <input type="email" name="email" id="email" placeholder="이메일" autoComplete="off"
                    onChange={(e)=>{setResistEmail(e.target.value)}}/>
                    <p className="email-warn" ref={emailRef}>* 이메일양식이 잘못되었습니다.</p>
                    <input type="password" name="password" id="password" placeholder="비밀번호" autoComplete="off"
                    onChange={(e)=>{
                        setResistPassword(e.target.value)
                    }}/>
                    <p className="pass-warn" ref={passwordRef}>* 비밀번호는 문자,숫자,특수문자 포함 6~15자이내로 <br/>입력해주세요</p>
            </form>
            <button className={activeBtn ? 'next-btn' : 'next-btn active'} disabled={activeBtn ? true : false} onClick={register}>다음</button>
        </section>
    </div>
        <div className="back-black">
        </div> 
        <div className="popup">
            <article className="pop-message">
                <h3 className="pop-">회원가입 완료</h3>
                <p>입력하신 이메일 주소로 이메일을 전송 했습니다.</p>
                <p>메일 내부의 링크를 클릭하시면 인증이 완료됩니다.</p>
            </article>
            <button className="check-btn" onClick={gologin}>확인</button>
        </div>  
    </>
  );
}

export default Signup;
