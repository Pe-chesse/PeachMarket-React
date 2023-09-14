import './signup.scss'
import { useNavigate } from 'react-router-dom';

function Signup() {

    const navigate = useNavigate();
    const goBackbtn = ()=>{
        navigate('/');
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
                    <input type="email" name="email" id="email" onchange="inputValueEmail()" placeholder="이메일" autocomplete="off"/>
                    <p className="email-warn">* 이메일양식이 잘못되었습니다.</p>
                    <input type="password" name="password" id="password" onchange="inputValuePwr()" placeholder="비밀번호" autocomplete="off"/>
                    <p className="pass-warn">* 비밀번호는 문자,숫자,특수문자 포함 6~15자이내로 <br/> &nbsp&nbsp입력해주세요</p>
            </form>
            <button className="next-btn">다음</button>
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
            <button className="check-btn">확인</button>
        </div>  
    </>
  );
}

export default Signup;
