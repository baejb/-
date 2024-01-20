import { useState } from "react";
import { styled } from "styled-components";
import Footer from "../components/footer";
import { TbDropletQuestion } from "react-icons/tb";
const Container = styled.div`
    width: 375px;
    /* height: calc(100vh - 10px); */
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px #E3A295 dashed;
    background-color: white;
    box-sizing: border-box;
    margin-bottom: 10px;
    overflow-y: auto; 
    
    
`
const Title = styled.div`
    font-size: 18px;
    width:100px;
    height: 20px;
    margin : 10%;
    
`
const FlexLayout = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    overflow-y: auto; 
    
`
const MiddleTitle = styled.div`
    font-size: 12px;
`
const RadioInput = styled.input`
    margin: 20px;
    appearance: none; 
    background-color: #E3A295;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    opacity: 20%;
    border: 3px double #f3f1f1;

    &:checked {
        opacity: 1;
    }
    &:hover {
        cursor: pointer;
    }

`;
const CloudDiv = styled.div`
    width: 300px;
    height: 400px;
    border: 2px dashed #FAF7F0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    >label{
        display: flex;
        flex-direction: column;
        align-items: center;
        
        &:hover{
            cursor: pointer;
        }
    }
    margin-bottom: 20%;
`
const CloudyImg = styled.img`
    width: 120px;
    height: 80px;
    /* border: 1px solid black; */
    object-fit: contain;
    transition: transform 0.5s ease-in-out;

    &:hover {
    transform: scaleX(-1);
   
  }
   
`
const BackgroudDiv = styled.div`
    width:300px;
    height: 400px;
    border: 2px dashed #FAF7F0;
    margin-bottom: 20%;
    
    >div{
        display: flex;
        justify-content: center;
        align-items: center;
    }
`

const ExplainCloudy = styled.div`
    text-align: center;
    font-size: 12px;
`
const BackgroundInput = styled.input`
    margin: 20px;
    appearance: none;
    background-color: ${({ color }) => color || "#E3A295"};
    width: 20px;
    height: 20px;
    border-radius: 50%;
    opacity: 0.5;
    border: 3px double #f3f1f1;

    &:checked {
     opacity: 1;
    }
    &:hover {
    cursor: pointer;
  }
`;
const Preview = styled.div`
    width: 260px;
    height: 300px;
    border-radius: 20px;
    border: 2px solid #FAF7F0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ color }) => color || "white"};
    >img{
        width: 100px;
        height: 110px;
        object-fit: fill;
    }   
`
const NoneCloudyDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const SettingPage = () => {
    const [selectedCloudy, setSelectedCloudy] = useState('');
    const [selectedBackground, setSelectedBackground] = useState('');


    const handleBackgroundClick = (value) =>{
        setSelectedBackground(value);
    }
    const handleCloudyClick = (value) =>{
        setSelectedCloudy(value);
    }
    return (
        <>
        <Container>
        <FlexLayout>    
            <Title>구르미 설정하기</Title>
            
            <MiddleTitle>키우고 싶은 구르미를 선택해주세요!</MiddleTitle>
        <CloudDiv>
        <label onClick={() => handleCloudyClick("cloudyblue1")}>
            <CloudyImg src="/img/cloudyblue1.png" alt="Cloudy Blue" />
            <RadioInput type="radio" name="cloud" value="cloudyblue1" />
            <ExplainCloudy>
                특징 : 운동을 잘함
            </ExplainCloudy>
        </label>
        <label onClick={() => handleCloudyClick("cloudyyellow1")}>
            <CloudyImg src="/img/cloudyyellow1.png" alt="Cloudy Yellow" />
            <RadioInput type="radio" name="cloud" value="cloudyyellow1" />
            <ExplainCloudy>
                특징 : 노래를 잘함
            </ExplainCloudy>
        </label>
        <label onClick={() => handleCloudyClick("cloudypurple1")}>
            <CloudyImg src="/img/cloudypurple1.png" alt="Cloudy Purple" />
            <RadioInput type="radio" name="cloud" value="cloudypurple1" />
            <ExplainCloudy>
                특징 : 공감을 잘함
            </ExplainCloudy>
        </label>
        <label onClick={() => handleCloudyClick("cloudygreen1")}>
            <CloudyImg src="/img/cloudygreen1.png" alt="Cloudy Green" />
            <RadioInput type="radio" name="cloud" value="cloudygreen1" />
            <ExplainCloudy>
                특징 : 공부를 잘함
            </ExplainCloudy>
        </label>
        </CloudDiv>
            <MiddleTitle>구르미 배경을 선택해주세요!</MiddleTitle>
            
            <BackgroudDiv>
                <div>
                    <label>
                    <BackgroundInput type="radio" name="backgroud" value="bgbeige" color="#FAF7F0" onChange={() => handleBackgroundClick("#FAF7F0")}/>
                    
                    </label>
                    <label>
                    <BackgroundInput type="radio" name="backgroud" value="bgyellow" color="#fae28f" onChange={() => handleBackgroundClick("#fae28f")}/>
                    </label>
                    <label>
                    <BackgroundInput type="radio" name="backgroud" value="bggreen" color="#9FBF82" onChange={() => handleBackgroundClick("#9FBF82")}/>
                    </label>
                    <label>
                    <BackgroundInput type="radio" name="backgroud" value="bgblue" color="#939CD5" onChange={() => handleBackgroundClick("#939CD5")}/>
                    </label>
                </div>
                <div>
                {selectedCloudy ?
                <Preview color={`${selectedBackground}`} >
                    <img src={`/img/${selectedCloudy}.png`}/>
                    {/* {!selectedCloudy && <MdOutlineQuestionMark/>} */}
                </Preview>
                :
                <Preview>
                    <NoneCloudyDiv>
                        <TbDropletQuestion />
                        <MiddleTitle>구르미를 선택해주세요!</MiddleTitle>
                    </NoneCloudyDiv>
                </Preview> 
                }
                </div>
            </BackgroudDiv>
            
        </FlexLayout>
        </Container>
        <Footer/>
        </>
    );
};

export default SettingPage;