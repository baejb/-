import React from 'react';
import { styled } from "styled-components";
import { useNavigate } from 'react-router-dom';
import Profile from '../components/Home/Profile';
import Cloudy from '../components/Home/Cloudy';
import Footer from '../components/footer';
const Container = styled.div`
    background-color: #9fc6ff;
    width: 375px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 3px solid transparent;
    box-sizing: border-box;
    margin-bottom: 10px;
    overflow-y: auto; 
    min-height: 800px;
    margin-bottom: 10%;
      
`
const Title = styled.div`
    font-size: 18px;
    width:100px;
    height: 20px;
    margin : 10%;
    padding: 5px;
    color: whitesmoke;
    text-shadow: 2px 2px 2px #171717;
    text-align: center;
    
`
const FlexLayout = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    overflow-y: auto; 
    
`
const data = {
    isSuccess: true,
    code: 1000,
    message: "요청에 성공하였습니다.",
    result: {
        userId: "12345678",
        nickname: "배정빈",
        intro: "구르미 잘 키워보겠습니다요오오오옹",
        link: "link",
        today: 10,
        total: 879,
        color: "cloudyblue1",
        background: "#fae28f",
        upgrade: 0,
        level: 1,
        image: '/img/cloudyblue1.png',
        cloudy: '만추니',
        percent: 60,
    }
}
const BoardBtn = styled.button`
    width: 50%;
    padding: 10px;
    border-radius: 20px;
    border:none;
    backdrop-filter: blur(5px);
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 30px;
    box-shadow: 35px 35px 68px 0px rgba(159, 198, 255, 0.5), inset -8px -8px 16px 0px rgba(159, 198, 255, 0.6), inset 0px 11px 28px 0px rgb(255, 255, 255);
    margin: 20px;
    color: #000000e5;
    font-size: 16px;
    text-shadow: 1px 1px 2px white;
    &:hover{
        cursor: pointer;
       
    }
    &:active{
        transform: translate(0px ,3px);
        
    }

`
const ShareDiv = styled.div`
    width:100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    >button {
        width: 120px;
        padding: 10px;
        border:none;
        border-radius: 20px;
        backdrop-filter: blur(5px);
        background-color: rgba(255, 255, 255, 0.8);
        box-shadow: 35px 35px 68px 0px rgba(159, 198, 255, 0.5), inset -8px -8px 16px 0px rgba(159, 198, 255, 0.6), inset 0px 11px 28px 0px rgb(255, 255, 255);
        margin: 10px;
        color: #000000e5;
        font-size: 12px;
        text-shadow: 1px 1px 2px white;
        &:hover{
        cursor: pointer;

        }
        &:active{
        transform: translate(0px ,3px);

        }
    }
`
const HomePage = () => {
    const navigate = useNavigate();
    const handelClickBoardBtn = () =>{
        const userId = data.result.userId; // 실제 유저 고유 아이디 값으로 변경
        navigate(`/board/${userId}`);
    }
    return (
        <>
            <Container>
                <FlexLayout>
                        <Title>구르미 월드</Title>
                    <Profile userData ={data} />
                    <BoardBtn onClick={handelClickBoardBtn}>
                        방명록 쓰러가기
                    </BoardBtn>
                    <Cloudy userData = {data} />
                    <ShareDiv>
                        <button>공유하기</button>
                        <button>카카오 공유하기</button>
                    </ShareDiv>
                </FlexLayout>
            </Container>
            <Footer/>
        </>
    );
};

export default HomePage;