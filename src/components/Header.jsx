import style from '../style/Header.module.css'
import { Link } from 'react-router-dom'

const Header = ({ isLogin }) => {
    return (
        <div className={style.Header_component}>
            <Link 
                to="/"
                style={{
                    textDecoration:"none",
                    color: "black",
                    fontSize: "20px"
                }}    
            >
                <div className={style.Logo}>
                    9해요
                </div>
            </Link>
            <div className={style.search_container}>
                <input type="text" />
                <button>
                    <span class="material-symbols-outlined">search</span>
                </button>
            </div>
            <div className={style.NavBar}>
                <ul>
                    <li>
                        <Link to={isLogin === true ? "/chat" : "/login"} className={style.Link}>
                            <span class="material-symbols-outlined">chat</span>
                            <span>채팅</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={isLogin === true ? "/profile" : "/login"} className={style.Link}>
                            <span class="material-symbols-outlined">person</span>
                            <span>프로필</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={isLogin === true ? "/upload" : "/login"} className={style.Link}>
                            <span class="material-symbols-outlined">upload</span>
                            <span>업로드</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Header