import { useState } from "react";
import { useEffect } from "react";
import { styled } from "styled-components";
import Footer from "../components/Footer";
import { TbDropletQuestion } from "react-icons/tb";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../constants";

const Container = styled.div`
    background-color: #9fc6ff;
    min-width: 400px;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: start;
    margin-bottom: 10px;
 
    
      
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
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
  
    
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
const ErrorMessage = styled.div`
    font-size: 8px;
    color:red;
    
`



const EditPage = () => {
    const [selectedCloudy, setSelectedCloudy] = useState('');
    const [selectedBackground, setSelectedBackground] = useState('');
    const [cloudyName , setCloudyName] = useState('');
    const [errorCloudName , setErrorCloudName] = useState(false);
    const [cloudyIntro, setCloudyIntro] = useState('');
    const [errorCloudIntro , setErrorCloudIntro] = useState(false);
    const [editCloudy , setEditCloudy] = useState([]);
    const navigate = useNavigate();
    const handleBackgroundClick = (value) =>{
        setSelectedBackground(value);
    }
    const handleCloudyClick = (value) =>{
        setSelectedCloudy(value);
    }
    const handelCloudyName = (value)=>{
        if(value.length > 6){
            setErrorCloudName(true);
        } else {
        setErrorCloudName(false);
        setCloudyName(value);
        }
    }
    const handleCloudyIntro = (value) => {
        if(value.length > 20){
            setErrorCloudIntro(true);
        } else {
        setErrorCloudIntro(false);
        setCloudyIntro(value);
        }
    }
   
    const getData = async () => {
        const token = localStorage.getItem('token');
        if(token){
        try {
            const response = await axios.get(
                `${baseUrl}/users/edit`,
                {
                  withCredentials: true,
                  headers: {
                    "ngrok-skip-browser-warning": true,
                    atk: token, 
                  },
                }
              );
            const res = response.data.result;

            setCloudyName(res.nickname);
            setCloudyIntro(res.intro);
            setSelectedCloudy(res.color);
            setSelectedBackground(res.background);
               
        } catch (error) {
            console.error('Error:', error); // 에러 처리
        }
        }
    
    };

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
              
         
            const redirectUrl = `/home/${userId}`;
            navigate(redirectUrl); // 유저 고유 링크로 이동하기 
        } catch (error) {
            console.error('Error:', error); // 에러 처리
        }
        }
    
    };
    useEffect(() => {
        getData();
    }, []);
    const handlePostBtnClick = () => {
        if (selectedCloudy && selectedBackground && cloudyName && cloudyIntro) {
            // 데이터가 유효한 경우에만 요청 보냄
            sendData();
        } else {
            // 데이터가 유효하지 않은 경우 경고창 띄움
            alert('구르미 수정을 완료해주세요!');
        }
    };
    return (
        <>
        <Container>
        <FlexLayout>    
            <Title>구르미 수정하기</Title>
            
            <IntroCloudy>
                <div>
                    <span>구르미 이름 :</span>
                    <input type="text" value={cloudyName}
                        onChange={(e) => handelCloudyName(e.target.value)} />
                </div>
                {errorCloudName ? 
                <ErrorMessage>
                    6자 이하로 작성해주세요!
                </ErrorMessage> : undefined}
                <div>
                    <span>한 줄 소개 :</span>
                    <input type="text" value={cloudyIntro}
                        onChange={(e) => handleCloudyIntro(e.target.value)}/>
                </div>
                {errorCloudIntro ? 
                <ErrorMessage>
                    20자 이하로 작성해주세요!
                </ErrorMessage> : undefined}

            </IntroCloudy>
            <PostBtn onClick={handlePostBtnClick}>수정하기</PostBtn>
        </FlexLayout>
        </Container>
        <Footer/>
        </>
    );
};

export default EditPage;