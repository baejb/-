import styled from 'styled-components';
import { TiWeatherCloudy } from "react-icons/ti";
import { useState, useRef} from 'react';
import KaKaoLogin from '../components/Login/KaKaoLogin';

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
    background-size: cover;
`
const Title = styled.div`
   font-size :24px;
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
    font-size: 20px;
    background-color: #d5fd86;
    border:none;

    &:hover{
        box-shadow: 3px 3px 3px#c6eb7c ;
    }
    &:active{
        transform: translate(3px ,3px);
        box-shadow: none;
    }

`
const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`
const ModalContent = styled.div`
    background-color: white;
    padding: 20px;
    width: 300px;
    height: 240px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const LandingPage = () => {
    const [LoginModal, showLoginModal] = useState(false);
    const modalBackgroud = useRef();

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
                <ModalWrapper ref={modalBackgroud} onClick={handleModalClose}>
                    <ModalContent onClick={handleModalContentClick}>
                        <KaKaoLogin/>
                    </ModalContent>
                </ModalWrapper>
            )}
        </Container>
    );
};

export default LandingPage;