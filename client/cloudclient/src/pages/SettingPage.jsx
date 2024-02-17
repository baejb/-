import { useState, useEffect } from "react";
// import { useRecoilState } from 'recoil';
// import { isLoggedInState,userIdState } from "../states/LoginAtoms";
import { styled } from "styled-components";
import Footer from "../components/footer";
import { TbDropletQuestion } from "react-icons/tb";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../constants";

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
      
`
const Title = styled.div`
    font-size: 18px;
    width:100%;
    text-align: center;
    height: 20px;
    margin : 10%;
    padding: 5px;
    color: whitesmoke;
    text-shadow: 2px 2px 2px #171717;

    
`
const FlexLayout = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    overflow-y: auto; 
    
`
const MiddleTitle = styled.div`
    font-size: 12px;
    margin-bottom: 10px;
    color: white;
    text-shadow: 2px 2px 8px #020254;
`
const RadioInput = styled.input`
    margin: 20px;
    appearance: none; 
    background-color: #939CD5;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    opacity: 20%;
    border: 3px double #f3f1f1;
    
    &:checked {
        opacity: 1;
    }
    &:hover {
        cursor: pointer;
    }

`;
const CloudDiv = styled.div`
    width: 300px;
    height: 400px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    >label{
        display: flex;
        flex-direction: column;
        align-items: center;
        
        &:hover{
            cursor: pointer;
        }
    }
    margin-bottom: 20%;
    backdrop-filter: blur(5px);

    background-color: rgba(255, 255, 255, 1);

    border-radius: 26px;

    box-shadow: 35px 35px 68px 0px rgba(159, 198, 255, 0.5), inset -8px -8px 16px 0px rgba(159, 198, 255, 0.6), inset 0px 11px 28px 0px rgb(255, 255, 255);


`
const CloudyImg = styled.img`
    width: 120px;
    height: 80px;
    /* border: 1px solid black; */
    object-fit: contain;
    transition: transform 0.5s ease-in-out;

    &:hover {
    transform: scaleX(-1);
   
  }
   
`
const BackgroudDiv = styled.div`
    width:300px;
    height: 400px;
    border: 2px dashed #FAF7F0;
    margin-bottom: 20%;
    border-radius: 20px;
    
    >div{
        display: flex;
        justify-content: center;
        align-items: center;
    }
`

const ExplainCloudy = styled.div`
    text-align: center;
    font-size: 12px;
`
const BackgroundInput = styled.input`
    margin: 20px;
    appearance: none;
    background-color: ${({ color }) => color || "#E3A295"};
    width: 20px;
    height: 20px;
    border-radius: 50%;
    opacity: 0.5;
    border: 3px double #f3f1f1;
    
    &:checked {
     opacity: 1;
    }
    &:hover {
    cursor: pointer;
  }
`;
const Preview = styled.div`
    width: 260px;
    height: 300px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    
    background-color: ${({ color }) => color || "aliceblue"};
    >img{
        width: 100px;
        height: 110px;
        object-fit: fill;
    }   
`
const NoneCloudyDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const IntroCloudy = styled.div`

    width: 300px;
    height:150px;
    backdrop-filter: blur(5px);
    background-color: rgba(255, 255, 255, 1);
    border-radius: 20px;
    box-shadow: 35px 35px 68px 0px rgba(159, 198, 255, 0.5), inset -8px -8px 16px 0px rgba(159, 198, 255, 0.6), inset 0px 11px 28px 0px rgb(255, 255, 255);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 12px;
    > div {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        margin: 5px;
    }
    div > span {
        width:70px;
        text-align: right;
        margin-right: 10px;
        color: #1b4687;
        text-shadow: 1px 1px 2px #acaaaa;
    }
    div > input{
        padding: 10px;
        border:none;
        outline: none;
        width: 180px;
        box-shadow: 2px 2px 2px gray;
        backdrop-filter: blur(5px);
        background-color: rgba(255, 255, 255, 1);
        border-radius: 20px;
        box-shadow: 35px 35px 68px 0px rgba(159, 198, 255, 0.5), inset 1px 1px 8px 0px rgba(159, 198, 255, 0.6), inset 0px 11px 28px 0px rgb(255, 255, 255);
        
    }
    margin-bottom: 20%;

`
const PostBtn = styled.button`
    width: 150px;
    height: 40px;
    border-radius: 10px;
    font-size: 18px;
    border: none;
    backdrop-filter: blur(4px);
    margin-bottom: 20%;
    background-color: rgba(255, 255, 255, 0.5);

    border-radius: 26px;

    box-shadow: 35px 35px 68px 0px rgba(159, 198, 255, 0.5), inset 1px 1px 8px 0px rgba(159, 198, 255, 0.6), inset 0px 11px 28px 0px rgb(255, 255, 255);


    &:hover{
        cursor: pointer;
    }
    &:active{
        transform: translate(0px ,3px);
        /* box-shadow: none; */
    }

`



const SettingPage = () => {
    const [selectedCloudy, setSelectedCloudy] = useState('');
    const [selectedBackground, setSelectedBackground] = useState('');
    const [cloudyName , setCloudyName] = useState('');
    const [cloudyIntro, setCloudyIntro] = useState('');
    // const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
    // const [userId, setuserId] = useRecoilState(userIdState);
    const navigate = useNavigate();
    const handleBackgroundClick = (value) =>{
        setSelectedBackground(value);
    }
    const handleCloudyClick = (value) =>{
        setSelectedCloudy(value);
    }
    const handelCloudyName = (value)=>{
        setCloudyName(value);
    }
    const handleCloudyIntro = (value) => {
        setCloudyIntro(value);
    }
    // const handleWrongApproach = () =>{
    //     const userId = localStorage.getItem('userId');
    //     if(userId && selectedCloudy && selectedBackground && cloudyName && cloudyIntro) {
    //         console.log('이미 셋팅을 완료하셨네요 ~');
    //         navigate(`/home/${userId}`);
    //     }
    // }

    // useEffect(()=>{
    //     handleWrongApproach();
    // },[])
   
    const sendData = async () => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if(token){
        try {
            const response = await axios.post(
                `${baseUrl}/users`,
                
                {
                  nickname :cloudyName,
                  intro: cloudyIntro,
                  color: selectedCloudy,
                  background: selectedBackground,
                },
                {
                  withCredentials: true,
                  headers: {
                    "ngrok-skip-browser-warning": true,
                    atk: token, 
                  },
                }
              );
              
            console.log(response.data); // 성공 시 응답 데이터 처리
            console.log(userId); // 데이터 구조에 따라 바꾸기 
            const redirectUrl = `/home/${userId}`;
            navigate(redirectUrl); // 유저 고유 링크로 이동하기 
        } catch (error) {
            console.error('Error:', error); // 에러 처리
        }
        }
    
    };

    const handlePostBtnClick = () => {
        if (selectedCloudy && selectedBackground && cloudyName && cloudyIntro) {
            // 데이터가 유효한 경우에만 요청 보냄
            sendData();
        } else {
            // 데이터가 유효하지 않은 경우 경고창 띄움
            alert('구르미 설정을 완료해주세요!');
        }
    };
    return (
        <>
        <Container>
        <FlexLayout>    
            <Title>구르미 설정하기</Title>
            
            <MiddleTitle>키우고 싶은 구르미를 선택해주세요!</MiddleTitle>
        <CloudDiv>
        <label onClick={() => handleCloudyClick("cloudyblue1")}>
            <CloudyImg src="/img/cloudyblue1.png" alt="Cloudy Blue" />
            <RadioInput type="radio" name="cloud" value="cloudyblue1" />
            <ExplainCloudy>
                특징 : 운동을 잘함
            </ExplainCloudy>
        </label>
        <label onClick={() => handleCloudyClick("cloudyyellow1")}>
            <CloudyImg src="/img/cloudyyellow1.png" alt="Cloudy Yellow" />
            <RadioInput type="radio" name="cloud" value="cloudyyellow1" />
            <ExplainCloudy>
                특징 : 노래를 잘함
            </ExplainCloudy>
        </label>
        <label onClick={() => handleCloudyClick("cloudypurple1")}>
            <CloudyImg src="/img/cloudypurple1.png" alt="Cloudy Purple" />
            <RadioInput type="radio" name="cloud" value="cloudypurple1" />
            <ExplainCloudy>
                특징 : 공감을 잘함
            </ExplainCloudy>
        </label>
        <label onClick={() => handleCloudyClick("cloudygreen1")}>
            <CloudyImg src="/img/cloudygreen1.png" alt="Cloudy Green" />
            <RadioInput type="radio" name="cloud" value="cloudygreen1" />
            <ExplainCloudy>
                특징 : 공부를 잘함
            </ExplainCloudy>
        </label>
        </CloudDiv>
            <MiddleTitle>구르미 배경을 선택해주세요!</MiddleTitle>
            
            <BackgroudDiv>
                <div>
                    <label>
                    <BackgroundInput type="radio" name="backgroud" value="bgbeige" color="#FAF7F0" onChange={() => handleBackgroundClick("#FAF7F0")}/>    
                    </label>
                    <label>
                    <BackgroundInput type="radio" name="backgroud" value="bgyellow" color="#fae28f" onChange={() => handleBackgroundClick("#fae28f")}/>
                    </label>
                    <label>
                    <BackgroundInput type="radio" name="backgroud" value="bggreen" color="#9FBF82" onChange={() => handleBackgroundClick("#9FBF82")}/>
                    </label>
                    <label>
                    <BackgroundInput type="radio" name="backgroud" value="bgblue" color="#939CD5" onChange={() => handleBackgroundClick("#939CD5")}/>
                    </label>
                </div>
                <div>
                {selectedCloudy ?
                <Preview color={`${selectedBackground}`} >
                    <img src={`/img/${selectedCloudy}.png`}/>
                </Preview>
                :
                <Preview>
                    <NoneCloudyDiv>
                        <TbDropletQuestion />
                        <MiddleTitle>구르미를 선택해주세요!</MiddleTitle>
                    </NoneCloudyDiv>
                </Preview> 
                }
                </div>
            </BackgroudDiv>
            <MiddleTitle>구르미를 소개해주세요!</MiddleTitle>
            <IntroCloudy>
                <div>
                    <span>구르미 이름 :</span>
                    <input type="text" value={cloudyName}
                        onChange={(e) => handelCloudyName(e.target.value)} />
                </div>
                <div>
                    <span>한 줄 소개 :</span>
                    <input type="text" value={cloudyIntro}
                        onChange={(e) => handleCloudyIntro(e.target.value)}/>
                </div>

            </IntroCloudy>
            <PostBtn onClick={handlePostBtnClick}>생성하기</PostBtn>
        </FlexLayout>
        </Container>
        <Footer/>
        </>
    );
};

export default SettingPage;