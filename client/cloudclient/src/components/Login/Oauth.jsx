import React from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { isLoggedInState, userIdState } from '../../states/LoginAtoms';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { baseUrl } from '../../constants';

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
                  const token = response.data.token;
                  const userId = response.data.userId;
                  localStorage.setItem('token', token);
                  localStorage.setItem('userId', userId );
                  const userState = response.data.status ;
               
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
        
        fetchData(); 
      }, []);
      return(
        <>
            <div> 로그인 처리 중 입니다. </div>
        </>
      )
};

export default Oauth;