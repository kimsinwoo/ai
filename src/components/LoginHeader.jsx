import style from '../style/LoginHeader.module.css'
import { useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom'

const LoginHeader = ({isLogin, setIsLogin}) => {
    const navigate = useNavigate();
    
    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
          setIsLogin(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('stuName')
        setIsLogin(false);
        navigate('/');
      };
    return (
        <div className={style.LoginHeader_component}>
            {
                isLogin == true ? 
                <div className={style.Login_Link}>
                    <button 
                        className={style.Logout}
                        onClick={() => handleLogout()}
                    >
                        <span class="material-symbols-outlined">logout</span>
                        로그아웃
                    </button>
                </div> :
                <div className={style.Login_Link}>
                    <Link to="/login" className={style.Link}>
                        <span class="material-symbols-outlined">login</span>
                        로그인
                    </Link>
                </div>
            }
        </div>
    )
}

export default LoginHeader