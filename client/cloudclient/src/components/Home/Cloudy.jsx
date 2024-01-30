import React from 'react';
import { styled } from 'styled-components';

const ContentDiv = styled.div`
    width: 300px;
    height:360px;
    padding: 10px;
    backdrop-filter: blur(5px);
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 30px;
    box-shadow: 35px 35px 68px 0px rgba(159, 198, 255, 0.5), inset -8px -8px 16px 0px rgba(159, 198, 255, 0.6), inset 0px 11px 28px 0px rgb(255, 255, 255);
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    
`
const Title = styled.div`
    width:80%;
    text-align: center;
    font-size: 14px;
    >span{
        color:#E3A295;
        text-shadow: 1px 1px 2px #f3d0ca;
        font-size: 16px;
        
    }
`
const CloudyDiv = styled.div`
    width:200px;
    height: 200px;
    border: none;
    margin-bottom: 10px;
    margin-top:10px;
    border-radius: 20px;
    background-color: ${({ color }) => color || "aliceblue"};
    display: flex;
    align-items: center;
    justify-content: center;
    >img{
        width: 100px;
        height: 100px;
        object-fit: fill;
    }   
  
`
const LevelDiv = styled.div`
    width:200px;
    height: 20px;
    padding: 10px;
    display: flex;
    justify-content: start;
    align-items: center;
    > span{
        font-size: 14px;
        width: 40px;
        margin-right: 5px;
    }
`
const ProgressBarContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: #626262d2; /* 바탕색 설정 */
    border-radius: 20px;
`

const ProgressBar = styled.div`
    width: ${({ percent }) => percent > 100 ? 100 : percent * 2}%; /* 최대값을 100으로 제한 */
    height: 100%;
    background: linear-gradient(to right, #e74c3c, #f39c12, #f1c40f, #2ecc71, #3498db);
    border-radius: 20px;
    transition: width 0.5s ease-in-out;
`

const Cloudy = ({userData}) => {
    const cloudyImage = `/img/${userData.color}.png`; // 구르미 이미지 
    return (
        <ContentDiv>
            <Title>{userData.name}님의 <span>{userData.nickname}</span></Title>
            <CloudyDiv color={userData.background}> 
                <img src={cloudyImage}></img>
            </CloudyDiv>
            <LevelDiv>
                <span>LV {userData.level}</span>
                <ProgressBarContainer>
                    <ProgressBar percent={userData.percent}/>
                </ProgressBarContainer>
            </LevelDiv>
        </ContentDiv>
    );
};

export default Cloudy;