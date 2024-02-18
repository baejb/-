import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
import { baseUrl } from "../../constants";
const Container = styled.div`
    width: 90%;
    display: flex;
    justify-content: center;
`
const LogoutBtn = styled.button`
    width: 50px;
    height: 20px;
    border-radius: 20px;
    font-size: 8px;
    border:none;
    backdrop-filter: blur(5px);
    background-color: rgba(253, 95, 95, 0.8);
    box-shadow: 0px 35px 68px 0px rgba(255, 93, 67, 0.5), inset 0px -8px 16px 0px rgba(255, 93, 67, 0.6), inset 0px 11px 28px 0px rgb(255, 255, 255);

    &:hover{
        cursor: pointer;

    }
    &:active{
    transform: translate(0px ,2px);

    }
    
    `

   
const LogOut = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const handleLogout= async() =>{
        try {
            const response = await axios.post(`${baseUrl}/users/logout`, 
            {},
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json', 
                    "ngrok-skip-browser-warning": true,
                    atk: token
                }
            });
            
            if(response.status === 200 ){
            localStorage.removeItem('userId');
            localStorage.removeItem('token');
            localStorage.removeItem('rkt');
            localStorage.removeItem('atkTime');
            localStorage.removeItem('rtkTime');
            }
        }catch(error){
            console.error('Error:', error);
        }
  
        Swal.fire(
            '로그아웃 완료',       
            '시작페이지로 이동합니다!', 
            'info'                         
        );
        navigate('/');

    }
    return (
        <Container>
            <LogoutBtn onClick={handleLogout}>로그아웃</LogoutBtn>
        </Container>
    );
};

export default LogOut;