import React from 'react';
import { styled } from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
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
    width:80%;
    height: 20px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    > span{
        font-size: 14px;
        width: 50px;
        margin-right: 5px;
    }
`
const ProgressBarContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: #626262d2; /* 바탕색 설정 */
    border-radius: 20px;
    margin-right: 2%;
`

const ProgressBar = styled.div`
    width: ${({ percent }) => percent > 100 ? 100 : percent }%; /* 최대값을 100으로 제한 */
    height: 100%;
    background: linear-gradient(to right, #e74c3c, #f39c12, #f1c40f, #2ecc71, #3498db);
    border-radius: 20px;
    transition: width 0.5s ease-in-out;
`
const PercentSpan = styled.span`
    font-size: 14px;
    width:40px;
    color: rgba(69, 77, 90, 0.824);
`
const UpgradeDiv = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   margin: 2%;
    > button {
    width: 100px;
    height: 30px;
    border: none;
    border-radius: 10px;
    font-size: 14px;
    color: white;
    text-shadow: 0px 1px 4px white;
    background: linear-gradient(135deg, #6ab7ff, #ff6b6b);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
    &:active{
        cursor: pointer;
        transition: background 0.3s ease;
    }
    }
`

const Cloudy = ({userData}) => {
    const cloudyImage = `/img/${userData.color}.png`; // 구르미 이미지 
    const userId = localStorage.getItem('userId');
    const {id} = useParams();
    const navigate = useNavigate();
    const handleClickUpgradeButton = () => {
        navigate(`/upgrade/${userId}`);
    }
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
                <PercentSpan>{userData.percent}%</PercentSpan>
            </LevelDiv>
            {userId === id ?
            <UpgradeDiv>
                <button onClick={handleClickUpgradeButton}>성장하기</button>
            </UpgradeDiv> : undefined }
        </ContentDiv>
    );
};

export default Cloudy;