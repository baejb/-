import React from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { isLoggedInState, userIdState } from '../../states/LoginAtoms';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { baseUrl } from '../../constants';
import SetToken from './SetToken';
const Oauth = () => { 
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
    const [userId, setuserId] = useRecoilState(userIdState);
    const navigate = useNavigate();

    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const code = new URL(window.location.href).searchParams.get("code");
            if (code) {
            
                const response = await axios.post(
                    `${baseUrl}/oauth`,
                     code  ,
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
                  console.log(rtkExpiredTime);
                  console.log(atkExpiredTime);
                  const userId = response.data.userId;
                  localStorage.setItem('rtk', rtk); //리프레쉬 토큰 
                  localStorage.setItem('token', atk); //액세스 토큰 
                  localStorage.setItem('rtkTime', rtkExpiredTime ); //리프레쉬 토큰 만료기간 
                  localStorage.setItem('atkTime', atkExpiredTime); // 액세스 토큰 만료기간 
                  localStorage.setItem('userId', userId );
                  const userState = response.data.status ;
                  console.log(response.data);
            
                  // // Recoil 상태 업데이트
                  
                  setuserId(userId);
                  if(userState === 201){
                    setIsLoggedIn(true);
                    navigate(`/setting/${userId}`);
                  } else if(userState === 200){
                    setIsLoggedIn(true);
                    navigate(`/home/${userId}`)
                  }                       
            }
          } catch (error) {
            console.error('Error:', error);
          }
        };
        SetToken();
        fetchData(); 
      }, []);
      return(
        <>
            <div> 로그인 처리 중 입니다. </div>
        </>
      )
};

export default Oauth;