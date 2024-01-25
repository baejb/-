import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
const Oauth = () => { 
    useEffect(() => {
        const fetchData = async () => {
          try {
            const code = new URL(window.location.href).searchParams.get("code");
            if (code) {
            
                const response = await axios.post(
                    `https://24ae-1-230-186-79.ngrok-free.app/oauth`,
                     code  ,
                    {
                      withCredentials: true,
                      headers: {
                        "ngrok-skip-browser-warning": true,
                      },
                    }
                  );
                  
              console.log(response.data); 
              // 여기서 고유 링크인 카카오 id 를 받아서 저장해야됨 (토큰이랑 같이 저장하면 될듯);
            }
          } catch (error) {
            console.error('Error:', error);
          }
        };
        
        fetchData(); 
      }, []);
      return(
        <>
            <div> 로그인중 </div>
        </>
      )
};

export default Oauth;