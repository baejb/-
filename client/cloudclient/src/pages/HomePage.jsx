import React from 'react';
import { useEffect ,useState} from 'react';
import { styled } from "styled-components";
import { useNavigate ,useLocation , useParams} from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { isLoggedInState, userIdState } from '../states/LoginAtoms';
import axios from 'axios';
import Profile from '../components/Home/Profile';
import Cloudy from '../components/Home/Cloudy';
import LogOut from '../components/Login/LogOut';
import Swal from 'sweetalert2';
import { BiLoaderCircle } from "react-icons/bi";
import { baseUrl } from '../constants';
import { FaShareAlt } from "react-icons/fa";
import Footer from '../components/Footer';
import { domain } from '../constants';
const localUrl = "http://localhost:5173"


const Container = styled.div`
    background-color: #9fc6ff;
    width: 375px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 3px solid transparent;
    box-sizing: border-box;
    overflow-y: auto; 
    min-height: 900px;
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
const BoardBtn = styled.button`
    width: 200px;
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
    flex-direction: column;
    >button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 180px;
        padding: 10px;
        border:none;
        border-radius: 20px;
        backdrop-filter: blur(5px);
        background-color: rgba(255, 255, 255, 0.8);
        box-shadow: 35px 35px 68px 0px rgba(159, 198, 255, 0.5), inset -8px -8px 16px 0px rgba(159, 198, 255, 0.6), inset 0px 11px 28px 0px rgb(255, 255, 255);
        margin: 20px;
        color: #000000e5;
        font-size: 12px;
        text-shadow: 1px 1px 2px white;
        &:hover{
        cursor: pointer;

        }
        &:active{
        transform: translate(0px ,3px);

        }
        >span{
            margin-left: 5px;
        }
    }
`
// 공유하기 버튼 자기일때만 보이게 
const HomePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
    const [userId, setuserId] = useRecoilState(userIdState);
    const [userData, setUserData] = useState(null);
    const { id } = useParams();
    const handelClickBoardBtn = () =>{
        navigate(`/board/${id}`);
    }
    const handleCopyClipBoard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            Swal.fire(
                '링크 복사 완료',       
                '내 구르미월드로 친구들을 초대하세요!', 
                'success'                         
            );
            
            
        } catch (err) {
            console.log(err);
        }
    };
// url 에서 userId 따서 보내주기 
    useEffect(() => {
        let token = localStorage.getItem('token');
        let userId = localStorage.getItem('userId');
    
        const fetchData = async () => {
          try {
            
            const response = await axios.get(`${baseUrl}/users/${id}`, {
                withCredentials: true,
                headers: {
                  "ngrok-skip-browser-warning": true,
                  atk: token, 
                },
              });
            // 응답 데이터 확인
   
            // 받아온 데이터 상태 업데이트
            setUserData(response.data.result); // result에 실제 데이터 위치에 따라 변경
            
          } catch (error) {
            console.error('Error:', error);
          }
        };
    
        // fetchData 함수 실행
        fetchData();
      }, [id]); 
    return (
        <>
            <Container>
                <FlexLayout>
                        <Title>구르미 월드</Title>
                    {userData ? <Profile userData={userData} /> : <BiLoaderCircle/>}

                    <BoardBtn onClick={handelClickBoardBtn}> 
                        방명록 쓰러가기
                    </BoardBtn>
                    {userData ?<Cloudy userData = {userData} /> : <BiLoaderCircle/> }
                    {userData && userData.status === 'master' ?
                    <ShareDiv> 
                        <button onClick={() => handleCopyClipBoard(`${domain}${location.pathname}`)}><FaShareAlt /> <span>공유하기</span> </button>
                        <LogOut />
                    </ShareDiv> : undefined
                    }
                </FlexLayout>
            </Container>
            <Footer/>
        </>
    );
};

export default HomePage;