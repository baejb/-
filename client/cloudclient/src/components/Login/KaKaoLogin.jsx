import styled from 'styled-components';
import { RiKakaoTalkFill } from "react-icons/ri";
const KaKaoBtn = styled.button`
  width: 220px;
  height: 50px;
  background-color: #FFEB02;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: none;
  font-size: 18px;
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
        <RiKakaoTalkFill/>kakao 로그인 하러가기
      </KaKaoBtn>
    );
  };
  export default KaKaoLogin;