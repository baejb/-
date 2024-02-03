import { styled } from "styled-components";
import Footer from "../components/footer";
import axios from "axios";
import { baseUrl } from "../constants";
import { useState, useEffect } from "react";
import { RiEmotionSadLine } from "react-icons/ri";
import { IoHappyOutline } from "react-icons/io5";
const Container = styled.div`
    background-color: #9fc6ff;
    width: 375px;
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    border: 3px solid transparent;
    box-sizing: border-box;
    overflow: auto; 
    min-height: 800px;
    margin-bottom: 10%;

`
const Title = styled.div`
    font-size: 18px;
    height: 20px;
    margin : 10%;
    padding: 5px;
    color: whitesmoke;
    text-shadow: 2px 2px 2px #171717;
    text-align: center;
    
`
const ShowCloudyDiv = styled.div`
    width: 300px;
    height: 300px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    backdrop-filter: blur(5px);
    background-color: rgba(255, 255, 255, 1);
    border-radius: 26px;
    box-shadow: 35px 35px 68px 0px rgba(145, 192, 255, 0.5), inset -8px -8px 16px 0px rgba(145, 192, 255, 0.6), inset 0px 11px 28px 0px rgb(255, 255, 255);
`
const CloudyDiv = styled.div`
    width:80%;
    height: 70%;
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
const ExplainDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    >div {
        width: 120px;
        font-size: 12px;
        text-align: end;
        margin-right: 40px;
       >span{
            display: inline-block;
            width: 20px;
            margin-left: 5px;
            color: #e05135;
            text-align: start;
       }
    }
    
`
const UpgradeBtn = styled.button`
    width: 120px;
    height: 40px;
    margin: 40px;
    border: none;
    border-radius: 10px;
    font-size: 18px;
    color: white;
    text-shadow: 0px 1px 4px white; 
    background: linear-gradient(135deg, #6ab7ff, #ff6b6b);
    /* background: linear-gradient(135deg, #007bff, #2fcbff); */
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
        background: linear-gradient(135deg, #538fc7, #e86161);
    }
    &:active{
        transform: translate(0px ,3px);
        
    }
 
`
const ResultDiv= styled.div`
    width: 300px;
    height: 150px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    backdrop-filter: blur(5px);
    background-color: rgba(255, 255, 255, 1);
    border-radius: 26px;
    box-shadow: 35px 35px 68px 0px rgba(145, 192, 255, 0.5), inset -8px -8px 16px 0px rgba(145, 192, 255, 0.6), inset 0px 11px 28px 0px rgb(255, 255, 255);
    >div{
        width: 100%;
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        >span{
           color: #e05135;
           font-size: 14px;
        }
    }

`
const NotBttonClick = styled.div`
    font-size: 18px;
    text-align: center;
    color: white;
    text-shadow: 2px 2px 8px #020254;
    margin-top: 80px;
`
const UpgradePage = () => {
    const [upgradeInfo, setUpgradeInfo] = useState('')
    const [showResult, setShowResult] = useState(false);

    const handleUpgardeButtonClick = async () => {
        try {
            let token = localStorage.getItem('token');
            console.log(token);
            const response = await axios.post(`${baseUrl}/users/upgrade`, 
           {},
             {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json', 
                    "ngrok-skip-browser-warning": true,
                    atk: token
                }
            });
            console.log(response.data);
            setShowResult(true);
            // setUpgradeInfo(response.data.result);
            
        } catch (error) {
            console.error('Error:', error);
          
        }
    };
    const fetchData = async () => {
        try {
            let token = localStorage.getItem('token');
            console.log(token);
            const response = await axios.get(`${baseUrl}/users/upgrade`, 
             {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json', 
                    "ngrok-skip-browser-warning": true,
                    atk: token
                }
            });
            console.log(response.data);
            setUpgradeInfo(response.data.result);
            
        } catch (error) {
            console.error('Error:', error);
          
        }
    };
    useEffect(()=>{
        fetchData();
    },[]);
    return (
        <>
        <Container>
            <Title>구르미 성장 확인하기</Title>
            <ShowCloudyDiv>
                <CloudyDiv color={upgradeInfo.background}>
                    <img src={`/img/${upgradeInfo.color}.png`} alt="구르미이미지"/>
                </CloudyDiv>
                <ExplainDiv>
                    <div>레벨 <span>{upgradeInfo.level}</span></div>
                    <div>현재 내 포인트 <span>{upgradeInfo.upgrade}</span></div>
                    <div>성장 필요 포인트 <span>{upgradeInfo.needPoint}</span></div>
                </ExplainDiv>
            </ShowCloudyDiv>
            <UpgradeBtn onClick={handleUpgardeButtonClick}>성장</UpgradeBtn>
            {
                showResult ?
                    <ResultDiv>
                        { upgradeInfo.needPoint===0 ? 
                            <div>
                            <IoHappyOutline size="30"/>
                            <p>축하합니다! </p>
                            구르미가 한단계 업그레이드 되었습니다.</div>
                             :
                            <div>
                                <div><RiEmotionSadLine size="30"/> </div>
                                <p>아직은 구르미가 성장할 수 없어요 </p>
                                구르미가 성장하기 위해선 <span>{upgradeInfo.needPoint}point</span>  더 필요해요
                             </div> 
                             
                   
                    }
                    </ResultDiv> : <NotBttonClick>구르미를 성장시켜보세요!</NotBttonClick>
                    
            }
        </Container>
        <Footer/>
        </>
    );
};

export default UpgradePage;