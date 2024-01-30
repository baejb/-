import React from 'react';
import { styled } from 'styled-components';
import { TbHomeHeart } from "react-icons/tb";
import { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../constants';
import { useParams } from 'react-router-dom';
import { RiEmotionSadLine } from "react-icons/ri";
const Container = styled.div`
    width:100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const BoardDiv = styled.div`
    width: 280px;
    /* height: 140px; */
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

    >div{
        display: flex;

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
const CreatedDiv = styled.div`
    width:100%;
    font-size: 12px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 5px;
    
    >button {
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        background: none;
    }
    >span:nth-child(1){
        font-size: 12px;
        color: #df816f;
    }
    >span:nth-child(3){
        font-size: 8px;
        color: #454d5aac;
    }
`
const ContextDiv = styled.div`
    width: 140px;
    height: 100px;
    padding: 10px;
    font-size: 10px;
    overflow-wrap: break-word;
    white-space: pre-wrap;
    display: flex;
    justify-content: start;
    align-items: center;
    overflow: auto;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 20px;
    box-shadow: 35px 35px 68px 0px rgba(159, 198, 255, 0.5), inset 1px 1px 8px 0px rgba(159, 198, 255, 0.6), inset 0px 11px 28px 0px rgb(255, 255, 255);
`
const ReplyDiv = styled.div`
    width:100%;
    display: flex;
    flex-direction:column;
    
`
const ReplyInput = styled.div`
    width:98%;
    display: flex;
    justify-content: center;
    margin-top: 10px;
   >input {
    flex: 9;
    border:none;
    padding :8px;
    font-size: 10px;
    margin-right: 10px;
    border-radius: 10px;
   } 
   >button {
    flex: 1;
    font-size: 10px;
    border:none;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 1);
    
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
const Reply = styled.div`
    margin-top: 5px;
    width: 98%;
    display: flex;
    align-items: center;
    justify-content: start;
    >span:nth-child(1){
        font-size: 8px;
        color: #33374f;
    }
    >span:nth-child(2){
        font-size: 8px;
        color: #454d5aac;
    }
    >span:nth-child(3){
        font-size: 5px;
        color: #454d5aac;
    }
    
`
const NoneReply = styled.div`
    margin-top:10px;
    font-size: 10px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
`
const BoardList = ({ boardData }) => {
    const [comment, setComment] = useState('');
    const { id } = useParams();
    const handleLinkClick = (link) => {
        window.location.href = link; 
      };

      const handlePostComment = async (postId, comment) => {
        let token = localStorage.getItem('token');
        try {
            const response = await axios.post(
                `${baseUrl}/board/replies`,
                {   userId:id,
                    postIdx : postId,
                    context: comment,
                },
                {
                    withCredentials: true,
                    headers: {
                      "ngrok-skip-browser-warning": true,
                      atk: token, 
                    },
                }
            );
            console.log('댓글이 성공적으로 등록되었습니다:', response.data);
        } catch (error) {
            console.error('댓글 등록 오류:', error);
        }
    };
    
    // handlePostButtonClick 함수 내에서 해당 함수를 호출하여 댓글을 백엔드로 전송합니다.
    const handlePostButtonClick = async (postId) => {
        console.log('댓글 내용:', comment);
        await handlePostComment(postId, comment);
    };  
    return (
      <Container>
        {boardData.map((boardItem, index) => (
        <BoardDiv key={boardItem.postIdx}>
            <CreatedDiv>
                <span>{boardItem.userPostInfo.nickname}</span>
                <button onClick={() => handleLinkClick(boardItem.userPostInfo.link)}><TbHomeHeart/></button>
                <span>{boardItem.created}</span>
            </CreatedDiv>
            <div>
                <ProfileDiv color={boardItem.userPostInfo.background}>
                    <img src={`/img/${boardItem.userPostInfo.color}.png`}></img>
                </ProfileDiv> 
                <ContextDiv>{boardItem.context}</ContextDiv>
            </div>
            <ReplyDiv>
                <ReplyInput>
                    <input 
                        type="text" 
                        // value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                     <button onClick={() => handlePostButtonClick(boardItem.postIdx)}>확인</button>
                    
                </ReplyInput>
            {boardItem.reply.length!==0 ? 
            boardItem.reply.map((replyItem , index) => (
                <Reply key={replyItem.replyIdx}>
                    <span>{replyItem.nickname}</span>
                    <span>:{replyItem.context}</span>
                    <span>{replyItem.created}</span>
                </Reply> 
            )) 
            : 
            <NoneReply>댓글이 없어요<RiEmotionSadLine/></NoneReply>
            }

               
            </ReplyDiv>
        </BoardDiv>
        ))}
      </Container>
    );
  };
  

export default BoardList;