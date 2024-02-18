import styled from 'styled-components';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { isLoggedInState, userIdState } from '../../states/LoginAtoms';
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { baseUrl } from '../../constants';
import { useState  } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleBtn = styled.button`
  width: 220px;
  height: 50px;
  display: flex;
  justify-content: space-evenly;
  background-color: white;
  align-items: center;
  border-radius: 20px;
  border: none;
  font-size: 14px;
  margin: 5%;
  > div {
    width: 150px;
  }
  &:hover {
    cursor: pointer;
  }
  &:active {
    transform: translate(0px, 3px);
  }
  backdrop-filter: blur(5px);
  background-color: rgba(255, 255, 255, 1);
  box-shadow: inset -8px -8px 16px 0px rgba(193, 193, 193, 0.6),
    inset 0px 11px 28px 0px rgb(255, 255, 255);
`;
const GoogleDiv = styled.div`
  width: 220px;
  height: 50px;
  display: flex;
  justify-content: space-evenly;
  background-color: white;
  align-items: center;
  border-radius: 20px;
  &:hover {
    cursor: pointer;
  }
  &:active {
    transform: translate(0px, 3px);
  }
`
const GoogleLoginLiv = () => {
  const clientId = '1021590318212-lgjt6nke2mubal0lifa2fmopqd2ea0ps.apps.googleusercontent.com';
  const [isClicked, setIsClicked] = useState(false);
  const [userId, setuserId] = useRecoilState(userIdState);
    const navigate = useNavigate();
  const handleClick = () => {
    setIsClicked(true);
  };
  const handleSuccess = async (res) => {
    const result = res.credential;
    try {
      // 여기에 axios를 사용하여 백엔드에 토큰을 전송하는 요청을 보냅니다.
      const response = await axios.post(`${baseUrl}/google/oauth`, result ,
      {
        withCredentials: true,
        headers: {
          "ngrok-skip-browser-warning": true,
        },
      }
      );


      const rtk = response.data.token[0].token;
      const atk = response.data.token[1].token;
      const rtkExpiredTime = response.data.token[0].tokenExpiresTime;
      const atkExpiredTime = response.data.token[1].tokenExpiresTime;

      const userId = response.data.userId;
      localStorage.setItem('rtk', rtk); //리프레쉬 토큰 
      localStorage.setItem('token', atk); //액세스 토큰 
      localStorage.setItem('rtkTime', rtkExpiredTime ); //리프레쉬 토큰 만료기간 
      localStorage.setItem('atkTime', atkExpiredTime); // 액세스 토큰 만료기간 
      localStorage.setItem('userId', userId );
      const userState = response.data.status ;
  

      // // Recoil 상태 업데이트
      
      setuserId(userId);
      if(userState === 201){
        // setIsLoggedIn(true);
        navigate(`/setting/${userId}`);
      } else if(userState === 200){
        // setIsLoggedIn(true);
        navigate(`/home/${userId}`)
      }  
    } catch (error) {
      console.error('토큰 전송 실패:', error);
    }
  };

  const handleFailure = (err) => {
    console.error('Google 로그인 실패:', err);
  };


  
  return (
    <>
  
    {isClicked ?
    <GoogleDiv>
      <GoogleOAuthProvider clientId={clientId }>
        <GoogleLogin 
          buttonText="Google로 로그인하기"
          onSuccess={handleSuccess}
          onFailure={handleFailure}
        />
      </GoogleOAuthProvider>
    </GoogleDiv>
   :  <GoogleBtn onClick={handleClick}>
        <FcGoogle/>
        <div>
        Google로 로그인하기
        </div>
      </GoogleBtn>
  }
    </>
  );
};

export default GoogleLoginLiv;
