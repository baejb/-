import React from 'react';
import styled from 'styled-components'

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

const Profile = ({userData}) => {

    return (
        <ProfileDiv>
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