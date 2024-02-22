import React from 'react';
import { styled } from 'styled-components';
import { TbHomeHeart } from "react-icons/tb";
import { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../constants';
import { useParams } from 'react-router-dom';
import { RiEmotionSadLine } from "react-icons/ri";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import Swal from 'sweetalert2';
import { FaLock } from "react-icons/fa";
const Container = styled.div`
    width:100%;
    height: 100%;
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
        width: 100px;
    }
    >span:nth-child(3){
        font-size: 8px;
        color: #454d5aac;
    }
    >div{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 90px; 
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
        margin-right: 5px;
        &:hover{
            cursor: pointer;
        }

    }
    >span:nth-child(2){
        font-size: 8px;
        color: #454d5aac;
    }
    >span:nth-child(3){
        font-size: 5px;
        color: #454d5aac;
    }
    >div{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    
`
const ReplyContainer = styled.div`
    overflow: auto; 
    max-height: 150px; 
    
`

const NoneReply = styled.div`
    margin-top:10px;
    font-size: 10px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
`
const DeleteBtn = styled.button`
    width:30px;
    font-size:10px;
    color: #3f5e6788;
    border:none;
    background: none;
    &:hover{
        cursor: pointer;
    }
`
const EditBtn = styled.button`
    width:30px;
    font-size:10px;
    color: #3f5e6788;
    border:none;
    background: none;
    &:hover{
        cursor: pointer;
    }
`
const ReplyDeleteBtn = styled(DeleteBtn)`
    width:20px;
`
const ReplyEditBtn = styled(EditBtn)`
    width:20px;
   
`
const PostBtn = styled.button`
    margin-top: 10px;
    width:60px;
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
    
`
const EditDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-left: 10px;
    > textArea {
        height: 100px;
        padding: 10px;
        font-size: 10px;
        width: 100%;
    }
`
const EditReplyDiv = styled.div`
    width: 70%;
    >input {
        width: 100%;
        padding: 2px;
        font-size: 8px;
    }
`
const EditReplyConfirmBtn = styled.button`
    width: 40px;
    font-size: 10px;
    border: none;
    backdrop-filter: blur(5px);
    background-color: rgba(255, 255, 255, 1);
    border-radius: 20px;
    box-shadow: 35px 35px 68px 0px rgba(93, 159, 248, 0.5), inset -8px -8px 16px 0px rgba(93, 159, 248, 0.6), inset 0px 11px 28px 0px rgb(255, 255, 255);
    text-shadow: 1px 1px 2px white;
`
const EditReplyCancelBtn = styled.button`
    width: 40px;
    font-size: 10px;
    border: none;
    backdrop-filter: blur(5px);
    background-color: rgba(255, 255, 255, 1);
    border-radius: 20px;
    box-shadow: 35px 35px 68px 0px rgba(93, 159, 248, 0.5), inset -8px -8px 16px 0px rgba(93, 159, 248, 0.6), inset 0px 11px 28px 0px rgb(255, 255, 255);
    text-shadow: 1px 1px 2px white;
`
const SecretDiv = styled.div`
    font-size: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #1b1e3b;
`
const BoardList = ({ boardData ,setBoardData, onEditButtonClick}) => {
    const [commentInputs, setCommentInputs] = useState(Array(boardData.length).fill(''));
    const [editedContext, setEditedContext] = useState('');
    const [clickedEditId, setClickedEditId] = useState(null);
    const [clickedReplyEditId, setClickedReplyEditId] = useState(null);
    const [editedReply, setEditedReply] = useState('');
    const { id } = useParams();
    const userId = localStorage.getItem('userId');
    let token = localStorage.getItem('token');
    const handleLinkClick = (link) => {
        window.location.href = link; 
      };

      const handlePostComment = async (postId, comment) => {
        if(comment.length > 0){
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
        
            const responseData = response.data.result;
            const modifiedData = { ...responseData, kakaoId: userId }; // kakaoId 가 null이라 따로 추가해줌 
            const newBoardData = boardData.map(item => {
                if (item.postIdx === postId) {
                    return { ...item, reply: [...item.reply, modifiedData] };
                }
                
                return item;
            });
           
            // 새로운 게시글 데이터로 상태 업데이트
            setBoardData(newBoardData);
       
          
            
        } catch (error) {
            console.error('댓글 등록 오류:', error);
        }
    }else{
        Swal.fire(
            '댓글을 작성해주세요!',       
            '', 
            'error'                         
        );
    }
    };
    
    const handleCommentInputChange = (index, value) => {
        const newCommentInputs = [...commentInputs];
        newCommentInputs[index] = value;
        setCommentInputs(newCommentInputs);
    };

    const handlePostButtonClick = async (postId ,index) => {
        await handlePostComment(postId, commentInputs[index]);
        const newCommentInputs = [...commentInputs];
        newCommentInputs[index] = '';
        setCommentInputs(newCommentInputs);
        
    };  
    const handleEdit = (postId, newMessage) => {
        onEditButtonClick(postId, newMessage);
    };
    const handleEditButtonClick = (postId, context) => {
        // 수정할 게시물의 내용을 상태에 설정
        setEditedContext(context);
        setClickedEditId(postId);
      
    };

    const handelReplyEditButtonClick = (replyId, context) => {
        setEditedReply(context);
        setClickedReplyEditId(replyId); // 현재 클릭한 댓글의 ID 저장
    };
    const handleReplyEditConfirmButtonClick = async (postId, replyId, newMessage) => {
        try {
            
            const response = await axios.post(`${baseUrl}/board/replies/update`, 
            {
                userId: id,
                postIdx: postId,
                replyIdx: replyId,
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
       
            // 수정된 메시지를 상태에서 업데이트
            const updatedBoardData = boardData.map(item => {
                if (item.postIdx === postId) {
                    const updatedReplies = item.reply.map(reply => {
                        if (reply.replyIdx === replyId) {
                            return { ...reply, context: newMessage };
                        }   
                        return reply;
                    });
                    return { ...item, reply: updatedReplies };
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
    const handleDeleteButtonClick = async (postId) => {
    
        try {
            const response = await axios.delete(`${baseUrl}/board/delete`, {
                withCredentials: true,
                headers: {
                    "ngrok-skip-browser-warning": true,
                    atk: token,
                },
                data: {
                    userId: id,
                    postIdx: postId
                }
            });
            Swal.fire(
                '삭제 완료',       
                '', 
                'success'
            ).then(() => {
                window.location.reload();
            });
          // 받아온 데이터 상태 업데이트
           
            
        }catch (error) {
            console.error('Error:', error);
          }
    };
    const handleDeleteReplyButtonClick = async (postId, replyId) => {
    
        try {
            const response = await axios.delete(`${baseUrl}/board/replies/delete`, {
                withCredentials: true,
                headers: {
                    "ngrok-skip-browser-warning": true,
                    atk: token,
                },
                data: {
                    userId: id,
                    postIdx: postId,
                    replyIdx : replyId
                }
            });
            Swal.fire(
                '댓글 삭제 완료',       
                '', 
                'success'
            ).then(() => {
                window.location.reload();
            });
          // 받아온 데이터 상태 업데이트
           
            
        }catch (error) {
            console.error('Error:', error);
          }
    };

    return (
      <Container > 
        {boardData.map((boardItem, index) => { 
            if(!boardItem.secret) {
                return (
                    <BoardDiv key={boardItem.postIdx}> 
            <CreatedDiv>
                <span>{boardItem.userPostInfo.nickname}</span>
                <button onClick={() => handleLinkClick(boardItem.userPostInfo.link)}><TbHomeHeart/></button>
                <span>{boardItem.created}</span>
                {userId === boardItem.userPostInfo.kakaoId || id === userId ?
                <div>
                    {id === userId && ( // id === userId 인 경우에만 삭제 버튼을 렌더링합니다.
                        <DeleteBtn onClick={() => handleDeleteButtonClick(boardItem.postIdx)}>
                            <RiDeleteBin5Fill size={16}/>
                        </DeleteBtn>
                    )}
                    <EditBtn onClick={() => handleEditButtonClick(boardItem.postIdx, boardItem.context)}>
                        <FaEdit size={16}/>
                    </EditBtn>
                </div>
                : undefined
            }

            </CreatedDiv>
            <div>
                <ProfileDiv color={boardItem.userPostInfo.background}>
                    <img src={`/img/${boardItem.userPostInfo.color}.png`}></img>
                </ProfileDiv> 
                { clickedEditId === boardItem.postIdx  ? 
                <EditDiv>
                    <textarea
                     value={editedContext}
                    onChange={(e) => setEditedContext(e.target.value)}
                    />
                    <PostBtn onClick={()=> handleEdit(boardItem.postIdx, editedContext)}>수정</PostBtn>
                </EditDiv>
                :<ContextDiv>{boardItem.context}</ContextDiv>
                }
            </div>
            <ReplyDiv>
                <ReplyInput key={boardItem.postIdx}>
                    <input 
                        type="text" 
                        value={commentInputs[index]} // 각 댓글 입력창의 값을 배열에서 가져옴
                        onChange={(e) => handleCommentInputChange(index, e.target.value)} // 인덱스와 함께 변경 이벤트 핸들러 호출
                    />
                     <button onClick={() => handlePostButtonClick(boardItem.postIdx, index)}>확인</button>
                    
                </ReplyInput>
                <ReplyContainer>
            {boardItem.reply.length!==0 ? 
                boardItem.reply.map((replyItem , index) => (
                
                <Reply key={index}>
                <span onClick={() => handleLinkClick(replyItem.link)}>{replyItem.nickname}</span>
                {clickedReplyEditId === replyItem.replyIdx ? (
                    <EditReplyDiv>
                        <input 
                            type="text" 
                            value={editedReply} 
                            onChange={(e) => setEditedReply(e.target.value)}
                        />
                    </EditReplyDiv>
                ) : (
                    <span>{replyItem.context}</span>
                )}
                <span>{replyItem.created}</span>
                {userId === replyItem.kakaoId && (
                    <div>
                        {clickedReplyEditId === replyItem.replyIdx ? (
                            // 현재 수정 중인 댓글인 경우
                            <>
                                <EditReplyConfirmBtn onClick={() => handleReplyEditConfirmButtonClick(boardItem.postIdx, replyItem.replyIdx, editedReply)}>확인</EditReplyConfirmBtn>
                                <EditReplyCancelBtn onClick={() => setClickedReplyEditId(null)}>취소</EditReplyCancelBtn>
                            </>
                        ) : (
                            // 수정 중이 아닌 경우
                            <>
                                <ReplyEditBtn onClick={() => handelReplyEditButtonClick(replyItem.replyIdx, replyItem.context)}><FaEdit size={10}/></ReplyEditBtn>
                                <ReplyDeleteBtn onClick={() => handleDeleteReplyButtonClick(boardItem.postIdx, replyItem.replyIdx)}><RiDeleteBin5Fill size={10}/></ReplyDeleteBtn>
                            </>
                        )}
                    </div>
                )}
            </Reply> 
        )
        ) 
        :
        <NoneReply>댓글이 없어요<RiEmotionSadLine/></NoneReply>
            }
            </ReplyContainer>
            </ReplyDiv> 
            </BoardDiv>
         )
            }else if(boardItem.secret && userId === id || boardItem.secret && userId === boardItem.userPostInfo.kakaoId) {
                return(
                <BoardDiv key={boardItem.postIdx}>
                <SecretDiv><FaLock/>비밀글입니다</SecretDiv>    
            <CreatedDiv>
                <span>{boardItem.userPostInfo.nickname}</span>
                <button onClick={() => handleLinkClick(boardItem.userPostInfo.link)}><TbHomeHeart/></button>
                <span>{boardItem.created}</span>
                {userId === boardItem.userPostInfo.kakaoId || id === userId ?
                <div>
                    {id === userId && ( // id === userId 인 경우에만 삭제 버튼을 렌더링합니다.
                        <DeleteBtn onClick={() => handleDeleteButtonClick(boardItem.postIdx)}>
                            <RiDeleteBin5Fill size={16}/>
                        </DeleteBtn>
                    )}
                    <EditBtn onClick={() => handleEditButtonClick(boardItem.postIdx, boardItem.context)}>
                        <FaEdit size={16}/>
                    </EditBtn>
                </div>
                : undefined
            }

            </CreatedDiv>
            <div>
                <ProfileDiv color={boardItem.userPostInfo.background}>
                    <img src={`/img/${boardItem.userPostInfo.color}.png`}></img>
                </ProfileDiv> 
                { clickedEditId === boardItem.postIdx  ? 
                <EditDiv>
                    <textarea
                     value={editedContext}
                    onChange={(e) => setEditedContext(e.target.value)}
                    />
                    <PostBtn onClick={()=> handleEdit(boardItem.postIdx, editedContext)}>수정</PostBtn>
                </EditDiv>
                :<ContextDiv>{boardItem.context}</ContextDiv>
                }
            </div>
            <ReplyDiv>
                {/* <ReplyInput key={boardItem.postIdx}> */}
                <ReplyInput key={boardItem.postIdx}>
                    <input 
                        type="text" 
                        value={commentInputs[index]} // 각 댓글 입력창의 값을 배열에서 가져옴
                        onChange={(e) => handleCommentInputChange(index, e.target.value)} // 인덱스와 함께 변경 이벤트 핸들러 호출
                    />
                     <button onClick={() => handlePostButtonClick(boardItem.postIdx, index)}>확인</button>
                    
                </ReplyInput>
                {/* </ReplyInput> */}
            <ReplyContainer >
            {boardItem.reply.length!==0 ? 
            boardItem.reply.map((replyItem , index) => (
                    <Reply key={index}>
                    <span onClick={() => handleLinkClick(replyItem.link)}>{replyItem.nickname}</span>
                    {clickedReplyEditId === replyItem.replyIdx ? (
                    <EditReplyDiv>
                        <input 
                            type="text" 
                            value={editedReply} 
                            onChange={(e) => setEditedReply(e.target.value)}
                        />
                    </EditReplyDiv>
                ) : (
                    <span>{replyItem.context}</span>
                )}
                <span>{replyItem.created}</span>
                {userId === replyItem.kakaoId && (
                    <div>
                        {clickedReplyEditId === replyItem.replyIdx ? (
                            // 현재 수정 중인 댓글인 경우
                            <>
                                <EditReplyConfirmBtn onClick={() => handleReplyEditConfirmButtonClick(boardItem.postIdx, replyItem.replyIdx, editedReply)}>확인</EditReplyConfirmBtn>
                                <EditReplyCancelBtn onClick={() => setClickedReplyEditId(null)}>취소</EditReplyCancelBtn>
                            </>
                        ) : (
                            // 수정 중이 아닌 경우
                            <>
                                <ReplyEditBtn onClick={() => handelReplyEditButtonClick(replyItem.replyIdx, replyItem.context)}><FaEdit size={10}/></ReplyEditBtn>
                                <ReplyDeleteBtn onClick={() => handleDeleteReplyButtonClick(boardItem.postIdx, replyItem.replyIdx)}><RiDeleteBin5Fill size={10}/></ReplyDeleteBtn>
                            </>
                        )}
                    </div>
                )}
                    </Reply> 
             )) 
             :
        <NoneReply>댓글이 없어요<RiEmotionSadLine/></NoneReply>
            }

        </ReplyContainer>
            </ReplyDiv> 
          
        </BoardDiv>
        )}
        else if(boardItem.secret && userId !== id || boardItem.secret && userId !== boardItem.userPostInfo.kakaoId){
            return(
                <BoardDiv>
                <SecretDiv><FaLock/>비밀글입니다</SecretDiv> 
                </BoardDiv> 
            )
        }
        }
    )}
      </Container>
    );
  };
  

export default BoardList;