import styled from 'styled-components';
import { GiUpgrade } from "react-icons/gi";
import { TiHome } from "react-icons/ti";
import { IoPersonSharp } from "react-icons/io5";
const Container = styled.div`
    width: 375px;
    height: 45px;
    position: fixed;
    bottom: -5px;
    box-sizing: border-box;


`
const Icon = styled.div`
    width: 100px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
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
    return (
        <Container>
            <IconDiv>
                <Icon><GiUpgrade /></Icon>
                <Icon><TiHome/></Icon>
                <Icon><IoPersonSharp/></Icon>
            </IconDiv>
        </Container>
    );
};

export default Footer;