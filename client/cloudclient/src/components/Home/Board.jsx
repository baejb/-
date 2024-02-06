import React from 'react';
import styled from 'styled-components';
import Footer from '../footer';
import { useEffect, useState } from 'react';
import { useParams ,useNavigate } from 'react-router-dom';
import { baseUrl } from '../../constants';
import axios from 'axios';
import Swal from 'sweetalert2';
import BoardList from './BoardList';
import { RiEmotionSadLine } from "react-icons/ri";

const Container = styled.div`
    background-color: #9fc6ff;
    width: 375px;
    display: flex;
    justify-content: center;
    border: 3px solid transparent;
    box-sizing: border-box;
    margin-bottom: 10px;
    /* overflow: hidden; */
    min-height: 100vh;
    margin-bottom: 10%;


`
const DecoDiv = styled.div`
    width: 355px;
    /* border: 4px double whitesmoke; */
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
  
`
const Title = styled.div`
    font-size: 14px;
    margin : 10%;
    padding: 5px;
    color: whitesmoke;
    text-shadow: 2px 2px 2px #171717;
    text-align: center;
    > span{
        font-size: 18px;
    }
`
const BoardDiv = styled.div`
    width: 280px;
    height: 140px;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin : 20px;
    padding: 20px;

    border:none;
    border-radius: 20px;
    backdrop-filter: blur(5px);
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 35px 35px 68px 0px rgba(159, 198, 255, 0.5), inset -8px -8px 16px 0px rgba(159, 198, 255, 0.6), inset 0px 11px 28px 0px rgb(255, 255, 255);
    margin: 10px;
    > div{
        display: flex;
        justify-content: center;
        align-items: center;
    }
`
const ProfileDiv = styled.div`
    width:100px;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ color }) => color || "aliceblue"};
    margin-right: 10px;
    border-radius: 20px;
    > img {
        width: 60px;
        height: 60px;
        object-fit: contain;
    
        
    }
`
const BoardTextArea = styled.textarea`
    width: 140px;
    height: 100px;
    padding: 10px;
    font-size: 10px;
    overflow-y: auto;
    overflow-wrap: break-word; 
    resize: none; 
    
`
const PostBtn = styled.div`
    width: 60px;
    margin-top:10px;
    >button{
    width:100%;
    border:none;
    backdrop-filter: blur(5px);
    background-color: rgba(255, 255, 255, 1);
    border-radius: 20px;
    box-shadow: 35px 35px 68px 0px rgba(93, 159, 248, 0.5), inset -8px -8px 16px 0px rgba(93, 159, 248, 0.6), inset 0px 11px 28px 0px rgb(255, 255, 255);
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
const NotBoard = styled.div`
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 200px;
`

const SecretDiv = styled.div`
    position: fixed;
    bottom: 10px;
    right: 20px;
    >label {
        font-size: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
`
const Board = () => {
    const [userData, setUserData] = useState([]);
    const [boardData, setBoardData] = useState('');
    const [message, setMessage] = useState("");
    const [isSecret, setIsSecret] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    let userId = localStorage.getItem('userId');
    let token = localStorage.getItem('token');
    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };
    const handleCheckboxChange = (e) => {
        setIsSecret(e.target.checked); 
    };
    const fetchData = async () => {
        try {
          const response = await axios.get(`${baseUrl}/board/${id}`, {
              withCredentials: true,
              headers: {
                "ngrok-skip-browser-warning": true,
                atk: token, 
              },
            });
          // 응답 데이터 확인
          console.log(response.data.result);
          // 받아온 데이터 상태 업데이트
          setBoardData(response.data.result); // result에 실제 데이터 위치에 따라 변경
         
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
    const handleEditButtonClick = async (postId, newMessage) => {
        try {
            const response = await axios.post(`${baseUrl}/board/update`, 
            {
                userId: id,
                postIdx: postId,
                context: newMessage
            },
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json', 
                    "ngrok-skip-browser-warning": true,
                    atk: token
                }
            });
            console.log(response.data.result);
            // 수정된 메시지를 상태에서 업데이트
            const updatedBoardData = boardData.map(item => {
                if (item.postIdx === postId) {
                    return { ...item, context: newMessage };
                }
                return item;
            });
            setBoardData(updatedBoardData);
            Swal.fire(
                '수정 완료',       
                '', 
                'success'
            ).then(() => {
                window.location.reload();
            });
        } catch (error) {
            console.error('Error:', error);
            // 오류 발생 시 처리할 작업 추가
        }
    }; 
    
    const handlePostButtonClick = async () => {
        try {
            const response = await axios.post(`${baseUrl}/board/create`, 
            {   
                userId : id,
                context : message,
                secret: isSecret,
            }
            , {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json', 
                    "ngrok-skip-browser-warning": true,
                    atk: token
                }
            });
            console.log(response.data.result);
            // fetchData();
            // const newBoardData = [...boardData, response.data.result];
            // setBoardData(newBoardData);
            setMessage('');
            window.location.reload(); //새로고침( get 요청 )
           
         
        } catch (error) {
            console.error('Error:', error);
            // 오류 발생 시 처리할 작업 추가
        }
 };
 
    useEffect(()=>{

        if(!token){
            Swal.fire(
                '로그인이 필요한 서비스입니다.',       
                '시작페이지로 이동합니다 ', 
                'error'                         
            );
            navigate('/');
            return;
        }
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${baseUrl}/users/board/${id}`,{
                    withCredentials: true,
                    headers: {
                        "ngrok-skip-browser-warning": true,
                        atk: token, 
                    }
                });
                console.log(response.data.result);
              // 받아온 데이터 상태 업데이트
                setUserData(response.data.result);
                
            }catch (error) {
                console.error('Error:', error);
              }
        };

      
          // fetchData 함수 실행
          fetchUserData();
          fetchData();
    },[]);


    return (
        <>
        <Container>
            <DecoDiv>
                <Title><span>{userData.houseName}</span>님의 방명록</Title>
                {userId !== id ?<BoardDiv>
                    <div>
                    { userData ?
                    <ProfileDiv color={userData.background}>
                        <img src={`/img/${userData.color}.png`}></img>
                    </ProfileDiv> : undefined
                    }
                    <BoardTextArea 
                        value={message}
                        onChange={handleMessageChange}
                        placeholder='방명록을 작성해보세요!'/>
                    </div>
            
                    <PostBtn>
                        <button onClick={handlePostButtonClick}>작성</button>
                    </PostBtn>
                    <SecretDiv>
                        <label>비밀글로 작성하기
                        <input type="checkbox" checked={isSecret} onChange={handleCheckboxChange} ></input>
                        </label>
                    </SecretDiv>
                    
                </BoardDiv>: undefined}
                {boardData.length !== 0 ?
                <BoardList boardData={boardData} setBoardData={setBoardData} onEditButtonClick={handleEditButtonClick} /> 
                : <NotBoard>작성된 방명록이 없어요 <RiEmotionSadLine/>
                </NotBoard>
                }
            </DecoDiv>
           
        </Container>
         <Footer/>
         </>
    );
};

export default Board;