import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IoMdPeople } from "react-icons/io";
import { TiHome } from "react-icons/ti";
import { FaUserEdit } from "react-icons/fa";

const Container = styled.div`
    min-width: 400px;
    height: 45px;
    position: fixed;
    bottom: -5px;
    box-sizing: border-box;
`

const Icon = styled.button`
    width: 100px;
    height: 40px;
    border:none;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: transparent;
    transition: color 0.3s; 

    &:active{
        color: #e6e6e6;
        }
    &:hover {
        color: #e6e6e6;
    }    
    >span{
        font-size: 8px;
    }
`

const IconDiv = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #fffdf6;
    backdrop-filter: blur(5px);
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 35px 35px 68px 0px rgba(239, 239, 239, 0.5), inset -8px -8px 16px 0px rgba(239, 239, 239, 0.6), inset 0px 11px 28px 0px rgb(255, 255, 255);
`

const Footer = () => {
    const navigate = useNavigate();
    // const { id } = useParams();
    const userId = localStorage.getItem('userId');
    const handleBookmarkClick = () => {
        navigate(`/bookmark/${userId}`);
    }

    const handleHomeClick = () => {
        navigate(`/home/${userId}`);
    }

    const handleEditClick = () => {
        navigate(`/edit/${userId}`);
    }

    return (
        <Container>
            <IconDiv>
                <Icon onClick={handleBookmarkClick} ><IoMdPeople size={25}/>
                <span>친구</span>
                </Icon> 
                <Icon onClick={handleHomeClick} ><TiHome size={20} />
                <span>홈</span>
                </Icon>
                <Icon onClick={handleEditClick}><FaUserEdit size={20} />
                <span>정보수정</span>
                </Icon>
            </IconDiv>
        </Container>
    );
};

export default Footer;
