import React, { useState , useEffect } from 'react';
import styled from 'styled-components'
import { FiUserPlus } from "react-icons/fi";
import { FiUserMinus } from "react-icons/fi";
import Swal from 'sweetalert2';
import axios from 'axios';
import { baseUrl } from '../../constants';
import { useParams } from 'react-router-dom';
const ProfileDiv = styled.div`
    width: 300px;
    height:150px;
    padding: 10px;
    backdrop-filter: blur(5px);
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 30px;
    box-shadow: 35px 35px 68px 0px rgba(159, 198, 255, 0.5), inset -8px -8px 16px 0px rgba(159, 198, 255, 0.6), inset 0px 11px 28px 0px rgb(255, 255, 255);
    display: flex;
    justify-content: center;
    align-items: center;
    
`
const ImgDiv = styled.div`
    width: 80px;
    height: 80px;
    border: 2px solid black;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    > img {
        width: 100%;
        height: 100%;
        border-radius: 30%;
        object-fit: cover;
        padding: 10px;
        border:none;
        backdrop-filter: blur(5px);
        background-color: rgba(255, 255, 255, 1);
        box-shadow: inset 1px 1px 4px 0px rgba(159, 198, 255, 0.6), inset 0px 11px 28px 0px rgb(255, 255, 255);
        
    }
    
`
const InfoDiv = styled.div`
    width: 200px;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 12px;
    
    > div:nth-child(1){
        width: 80%;
        font-size: 10px;
        color: #454d5aac;
        > span {
            color: #E3A295;
            margin-left:2px;
            margin-right:2px;
        }
    }
    > div:nth-child(2){
        margin:2px;
        width: 80%;
        border-radius: 30px;
        padding-left: 10px;
        padding-right: 10px;
        font-size: 14px;
        color: #000000d8;
       
    }
    > div:nth-child(3){
        margin:2px;
        width: 80%;
        border-radius: 30px;
        padding-left: 10px;
        padding-right: 10px;
        color: #454d5ad2;

      
    }

    
`
const BookmarkDiv = styled.div`
    position: absolute;
    top:10px;
    right: 50px;
    &:active{
        cursor: pointer;
    }
    &:hover{
        cursor: pointer;
    }
`

const Profile = ({userData}) => {
    const [bookmark, setBookmark] = useState(userData.bookmark || false);
    const { id } = useParams();
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const handleBookmarkClick = () => {
        if(bookmark){
            setBookmark(false);
            deleteBookmark();
            Swal.fire(
                '친구 삭제 완료',       
                '', 
                'success'                         
            );
        }else{
            setBookmark(true);
            updateBookmark();
            Swal.fire(
                '친구 등록 완료',       
                '', 
                'success'                         
            );
        }
    }
        const updateBookmark = async () => {
            try{
               const response =  await axios.post(`${baseUrl}/users/bookmark`, 
                      {kakaoId:id},
                {
                    withCredentials: true,
                    headers: {
                      "ngrok-skip-browser-warning": true,
                      atk: token, 
                    },
                  }
                    )
               
            }catch(error){
                console.log(error);
            }
        }
        const deleteBookmark = async () => {
            try {
                const response = await axios.delete(`${baseUrl}/users/bookmark`, {
                    withCredentials: true,
                    headers: {
                        "ngrok-skip-browser-warning": true,
                        atk: token,
                    },
                    data: {
                     kakaoId:id
                    }
                    ,
                });
   
            } catch (error) {
                console.log(error);
            }
        };
        
      
    return (
        <ProfileDiv>
            {id !== userId && token && (
            <BookmarkDiv onClick={handleBookmarkClick}>
                {bookmark ? (
                    <FiUserMinus size={25}/>
                ) : (
                    <FiUserPlus size={25}/>
                )}
            </BookmarkDiv>
            )}
            <ImgDiv>
               <img src={userData.image}/>
            </ImgDiv>
            <InfoDiv>
                <div>TODAY <span>{userData.today}</span>/ {userData.total}</div>
                <div>{userData.name}</div>
                <div>{userData.intro}</div>
            </InfoDiv>
        </ProfileDiv>
    );
};

export default Profile;