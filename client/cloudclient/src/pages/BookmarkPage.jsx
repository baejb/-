import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';
import axios from 'axios';
import { baseUrl } from '../constants';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    background-color: #9fc6ff;
    /* width: 375px; */
    min-width: 400px;
    display: flex;
    align-items: center;
    flex-direction: column;
    border: 3px solid transparent;
    box-sizing: border-box;
    overflow-y: auto; 
    min-height: 900px;
    margin-bottom: 10%;
`;
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
const BookmarkDiv = styled.div`
    width: 300px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border:none;
    backdrop-filter: blur(5px);
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 30px;
    box-shadow: 35px 35px 68px 0px rgba(159, 198, 255, 0.5), inset -8px -8px 16px 0px rgba(159, 198, 255, 0.6), inset 0px 11px 28px 0px rgb(255, 255, 255);
    margin: 20px;
    padding: 20px;
    >img {
        width: 50px;
        height: 50px;
        border-radius: 10px;
        
    }
    >span{
        font-size: 12px;
    }
    >button{
        width: 100px;
        height: 30px;
        font-size: 16px;
        border: none;
        color: white;
        border-radius: 10px;
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
    }

`
const BookmarkPage = () => {
    const [bookmarkData, setBookmarkData] = useState([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleVisitClick = () => {
    navigate(data.link);
    };
    useEffect(() => {
        const getBookmarkList = async () => {
            try {
                const response = await axios.get(`${baseUrl}/users/bookmark`, {
                    withCredentials: true,
                    headers: {
                        "ngrok-skip-browser-warning": true,
                        atk: token,
                    }
                });
                console.log(response.data);
                setBookmarkData(response.data.result);
                console.log(bookmarkData);
            } catch (error) {
                console.log(error);
            }
        };
        getBookmarkList();
    }, []);

    return (
        <>  
            <Container>
            <Title>친구 목록</Title>
                {bookmarkData.length!==0 ?
                bookmarkData.map((data) => (
                    <BookmarkDiv>
                    <img src={data.image}/>
                    <span>{data.name}님의 홈페이지</span>
                   
                    <button onClick={handleVisitClick}>방문하기</button>
                </BookmarkDiv>
                ))
                
                : undefined}
            </Container>
            <Footer />
        </>
    );
};

export default BookmarkPage;
