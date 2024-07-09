import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from '../style/Profile.module.css'; // Assuming you're using CSS modules

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [error, setError] = useState(null); // 오류 상태 추가

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('jwt');
      const stuName = localStorage.getItem('stuName');
      console.log('토큰:', token); // 디버깅 메시지 추가
      console.log('사용자 이름:', stuName); // 디버깅 메시지 추가
      if (!token || !stuName) {
        console.error('토큰이나 사용자 이름이 없습니다.');
        setError('토큰이나 사용자 이름이 없습니다.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8080/gbsw/students/find/${stuName}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
          },
          params: {
            name: stuName
          }
        });
        console.log('API 응답:', response.data); // 디버깅 메시지 추가
        setProfile(response.data);
        setItems(response.data.items || []);
        setLoading(false);
      } catch (error) {
        console.error('사용자 정보를 가져오는 데 실패했습니다:', error);
        if (error.response && error.response.status === 403) {
          setError('접근이 금지되었습니다. 로그인 상태를 확인하세요.');
        } else {
          setError('사용자 정보를 가져오는 데 실패했습니다.');
        }
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const parseStudentId = (stuId) => {
    if (!stuId) {
      return '학번 정보가 없습니다';
    }
    const idString = stuId.toString();
    if (idString.length < 4) {
      return '잘못된 학번 형식입니다';
    }
    const grade = idString.charAt(0);
    const classroom = idString.charAt(1);
    const number = idString.substring(2);
    return `${grade}학년 ${classroom}반 ${number}번`;
  };

  const { stuId, stuName, authority } = profile;

  return (
    <div className={style.Profile_Component}>
      <div className={style.user_info_section}>
        <img src={'https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png'} width={200} height={200} alt={`${stuName || '사용자'}의 프로필 사진`} />
        <h2>{stuName || '사용자 이름'}</h2>
        <div className={style.user_detail_info}>
          <div>
            {parseStudentId(stuId)}
          </div>
          <div>
            {authority === 'ADMIN' ? '관리자' : '학생'}
          </div>
        </div>
      </div>
      <div className={style.user_uploaded_section}>
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item.id} className={style.item}>
              <h3>{item.title}</h3>
              <p>{item.explanation}</p>
              <img src={item.itemImgPath} alt={item.title} />
              <p>가격: {item.price}원</p>
            </div>
          ))
        ) : (
          <p>업로드한 상품이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
