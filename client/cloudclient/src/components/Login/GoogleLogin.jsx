import styled from 'styled-components';
import { FcGoogle } from "react-icons/fc";
const GoogleBtn = styled.button`
  width: 220px;
  height: 50px;
  display: flex;
  justify-content: space-evenly;
  background-color: white;
  align-items: center;
  border-radius: 20px;
  border: none;
  font-size: 18px;
  margin: 2%;
  >div{
    width:150px;
  }
  &:hover {
    cursor: pointer;
  }
  backdrop-filter: blur(5px); 
  background-color: rgba(255, 255, 255, 1); 
  box-shadow: 35px 35px 68px 0px rgba(193, 193, 193, 0.5), inset -8px -8px 16px 0px rgba(193, 193, 193, 0.6), inset 0px 11px 28px 0px rgb(255, 255, 255);
  
`
const GoogleLogin = () => {
    const googleClientId = '백엔드1';
    const googleRedirectUrl = '백엔드2';
    const link = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${googleClientId}&scope=openid%20profile%20email&redirect_uri=${googleRedirectUrl}`;
    
    const loginHandler = () => {
        window.location.href = link;
      };
    return (
        <>
            <GoogleBtn onClick={loginHandler}>
                <FcGoogle/>
                <div>
                Google로 로그인하기
                </div>
            </GoogleBtn>
        </>
    );
};

export default GoogleLogin;