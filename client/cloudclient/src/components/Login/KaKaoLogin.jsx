import styled from 'styled-components';
import { RiKakaoTalkFill } from "react-icons/ri";
const KaKaoBtn = styled.button`
  width: 220px;
  height: 50px;
  background-color: #FFEB02;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 20px;
  border: none;
  font-size: 18px;
  margin:5%;
 
  >div{
    width:150px;
  }
  &:hover {
    cursor: pointer;
  }
  &:active{
        transform: translate(0px ,3px);
    }
  backdrop-filter: blur(5px); 
  background-color: #FFEB02;
  box-shadow: inset -8px -8px 16px 0px rgb(255, 235, 19), inset 0px 11px 28px 0px rgb(255, 255, 255);
   
`
const KaKaoLogin = () => {
    const REST_API_KEY = '백엔드한테 달라하자1';
    const REDIRECT_URI = '백엔드한테 달라하자2';
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  
    const loginHandler = () => {
      window.location.href = link;
    };
  
    return (
      <KaKaoBtn type='button' onClick={loginHandler}>
        <RiKakaoTalkFill/>
        <div>
          kakao 로그인 하러가기
        </div>
      </KaKaoBtn>
    );
  };
  export default KaKaoLogin;