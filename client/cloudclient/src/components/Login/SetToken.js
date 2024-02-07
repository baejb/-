import axios from 'axios';
import moment from 'moment';
import { baseUrl } from '../../constants';

async function SetToken() {
  // HEADER에 토큰 설정
  axios.defaults.headers.common['atk'] = localStorage.getItem('token');
  // 만료시간이 지났을 경우, RefreshToken을 이용하여 AccessToken 재발급
  var expiredTime = moment.utc(localStorage.getItem('atkTime'));
  var diffTime = moment.duration(expiredTime.diff(moment()));
  
  if (diffTime < 10000) {
    axios.defaults.headers.common['rtk'] = localStorage.getItem('rtk');
    try {
      const res = await axios.get(`${baseUrl}/users/reissue`);
      localStorage.setItem('atk', res.data.token[1].token);
      localStorage.setItem('atkTime', res.data.token[1].tokenExpiresTime);
      axios.defaults.headers.common['atk'] = localStorage.getItem('token');
    } catch (err) {
      // Login 페이지로 리디렉션
       
    
      console.error('Token reissue failed:', err);
    }
  }
  
  return true;
}

export default SetToken;
