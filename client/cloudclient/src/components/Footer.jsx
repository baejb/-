import styled from 'styled-components';
import { GiUpgrade } from "react-icons/gi";
import { TiHome } from "react-icons/ti";
import { IoPersonSharp } from "react-icons/io5";
const Container = styled.div`
    width: 375px;
    height: 45px;
    border-top: 2px gray solid;
    position: fixed;
    bottom: 0;
    

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