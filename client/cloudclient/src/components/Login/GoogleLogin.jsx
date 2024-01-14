import styled from 'styled-components';
import { FcGoogle } from "react-icons/fc";
const GoogleBtn = styled.button`
  width: 220px;
  height: 50px;
  display: flex;
  justify-content: space-evenly;
  background-color: white;
  align-items: center;
  border-radius: 10px;
  border: 2px solid #d9d9d9;
  font-size: 18px;
  margin: 2%;
  >div{
    width:150px;
  }
  &:hover {
    cursor: pointer;
  }
  
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