import { useState } from "react"
import style from '../style/Login.module.css'
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [seePassword, setSeePassword] = useState(false)

    const [activeId, setActiveId] = useState(false)
    const [activePwd, setActivePwd] = useState(false)

    const [stuId, setStuId] = useState('');
    const [stuPwd, setStuPwd] = useState('');

    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      try {
        const response = await axios.post('http://localhost:8080/gbsw/students/signIn', { stuId, stuPwd });
        const token = response.data.token;
        const stuName = response.data.stuName;
        localStorage.setItem('jwt', token);
        localStorage.setItem('stuName', stuName);
        navigate('/');
      } catch (error) {
        console.error('로그인 실패:', error);
        alert('로그인 실패. 다시 시도해주세요.');
      }
    };

    return (
        <div className={style.Login_container}>
            <div >

            </div>
            <form action="" className={style.Login_form} onSubmit={(e) => {
                e.preventDefault()
            }}>
                <h1>경소고 중고 / 공동 구매 <br />
                    로그인
                </h1>
                <div>
                    <label 
                        htmlFor="id"
                        style={{
                            position: "absolute",
                            fontSize: "14px"
                        }}
                    >
                        {activeId === true ? "아이디" : "아이디를 입력해주세요."}
                    </label>
                    <input 
                        type="text" 
                        id="id" 
                        onChange={(e) => {
                            setStuId(e.target.value)
                        }}
                        onFocus={() => {
                            setActiveId(true)
                        }}
                        onBlur={() => {
                            if(stuId === "") {
                                setActiveId(false)
                            } else {
                                setActiveId(true)
                            }
                        }}
                    />
                    <label htmlFor="pwd">
                        {activePwd === true ? "비밀번호" : "비밀번호를 입력해주세요."}
                    </label>
                    <input 
                        id="pwd" 
                        type={seePassword == true ? "text" : "password"} 
                        onChange={(e) => {
                            setStuPwd(e.target.value)
                        }}
                        onFocus={() => {
                            setActivePwd(true)
                        }}
                        onBlur={() => {
                            if(stuPwd === "") {
                                setActivePwd(false)
                            } else {
                                setActivePwd(true)
                            }
                        }}
                    />
                    <input 
                    type="submit" 
                    value="로그인" 
                    onClick={() => handleSubmit()} />
                    <div className={style.checkbox}>
                        <div>
                            <input type="checkbox" id="seePassword" onChange={(e) => {
                                setSeePassword(e.target.checked)
                            }} />
                            <label htmlFor="seePassword">패스워드를 보여줘!</label>
                        </div>
                        <div>
                            <label htmlFor="rememberMe">나를 기억 해줘</label>
                            <input type="checkbox" id="rememberMe" />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login