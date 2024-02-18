import axios from 'axios';
import moment from 'moment';
import { baseUrl } from '../../constants';

async function SetToken() {
  // 토큰 및 만료 시간 가져오기
  const accessToken = localStorage.getItem('token');
//   const accessTokenExpireTime = moment.utc(localStorage.getItem('atkTime'));
  const accessTokenExpireTime = moment(localStorage.getItem('atkTime'));

  // 현재 시간과의 차이 계산
  const diffTime = moment.duration(accessTokenExpireTime.diff(moment()));
 

  // 토큰 만료 10초 전에만 처리
  if (diffTime.asSeconds() < 10) { // asSeconds() 메서드를 사용하여 초 단위로 변환
    try {
      // 리프레시 토큰 가져오기
      const refreshToken = localStorage.getItem('rtk');
   
      // 서버에 액세스 토큰 갱신 요청
      const response = await axios.post(`${baseUrl}/users/reissue`,{}, {
        headers: {
          'rtk': refreshToken // 리프레시 토큰 헤더에 설정
        }
      });

      // 새로운 액세스 토큰 및 만료 시간 저장
     
      const newAccessToken = response.data.result[1].token;
      const newAccessTokenExpireTime = response.data.result[1].tokenExpiresTime;
      localStorage.setItem('token', newAccessToken); //token === atk
      localStorage.setItem('atkTime', newAccessTokenExpireTime);
     

      // axios의 헤더에 새로운 액세스 토큰 설정
      axios.defaults.headers.common['atk'] = newAccessToken;
    } catch (error) {
      // 토큰 갱신 실패 시, 로그인 페이지로 리디렉션 또는 다른 작업 수행
      console.error('Token reissue failed:', error);
      // 로그인 페이지로 리디렉션
    }
  }

  return true;
}

export default SetToken;
