import styled from 'styled-components';
import { TiWeatherCloudy } from "react-icons/ti";
import { useState, useRef} from 'react';
import KaKaoLogin from '../components/Login/KaKaoLogin';
import GoogleLogin from '../components/Login/GoogleLogin';
const GREETING = '구르미 월드에 오신 걸 환영합니다'
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    background-image: url(/img/landing.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    
`
const Title = styled.div`

   font-size :14px;
   position: absolute;
   top: 6%;  
   display: flex;
   justify-content: center;
   align-items: center;
   
 
`
const LoginBtn = styled.button`
    width: 150px;
    height: 40px;
    border-radius: 10px;
    position: absolute;
    bottom: 10%;
    font-size: 18px;
    border: none;
    backdrop-filter: blur(4px);

    background-color: rgba(255, 255, 255, 0.5);

    border-radius: 26px;

    box-shadow: 35px 35px 68px 0px rgba(184, 233, 134, 0.5), inset -8px -8px 16px 0px rgba(184, 233, 134, 0.6), inset 0px 11px 28px 0px rgb(255, 255, 255);


    &:hover{
        cursor: pointer;
    }
    &:active{
        transform: translate(0px ,3px);
        /* box-shadow: none; */
    }

`
const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.135);
    display: flex;
    justify-content: center;
    align-items: center;
`
const ModalContent = styled.div`
    background-color: white;
    padding: 20px;
    width: 300px;
    height: 240px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* backdrop-filter: blur(5px);  */
    background-color: rgba(255, 255, 255, 1); 
    border-radius: 26px; 
    box-shadow: 35px 35px 68px 0px rgba(193, 193, 193, 0.5), inset -8px -8px 16px 0px rgba(193, 193, 193, 0.6), inset 0px 11px 28px 0px rgb(255, 255, 255);
`
const LoginBtnDiv =styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    
`
const LandingPage = () => {
    const [LoginModal, showLoginModal] = useState(false);
    const modalBackground = useRef();

    const handleLoginClick = () => {
        showLoginModal(true);
    }
    const handleModalClose = () => {
        showLoginModal(false);
    }
    const handleModalContentClick = (e) => {
        e.stopPropagation(); // 모달 내부 클릭 이벤트가 상위로 전파되지 않도록 함
      };
    return (
        <Container >

            <Title>
                <TiWeatherCloudy/>
                {GREETING}
                <TiWeatherCloudy/> 
            </Title>
            <LoginBtn onClick={handleLoginClick}>시작하기</LoginBtn>
            {LoginModal && (
                <ModalWrapper ref={modalBackground} onClick={handleModalClose}>
                    <ModalContent onClick={handleModalContentClick}>
                        <LoginBtnDiv>
                            <GoogleLogin/>
                            <KaKaoLogin/>
                        </LoginBtnDiv>
                    </ModalContent>
                </ModalWrapper>
            )}
        </Container>
    );
};

export default LandingPage;