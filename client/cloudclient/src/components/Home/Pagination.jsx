import React, { useEffect ,useState } from 'react';
import { useNavigate, useParams,useLocation } from 'react-router-dom';
import {styled} from 'styled-components';
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: start;
    flex-wrap: wrap;
    position: relative;
    bottom:0px;
`

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10%;
`
const PagesBtn = styled.button`
    width: 25px;
    height: 25px;
    border:none;
    background-color: white;
    border-radius: 5px;
    margin: 1px;

    &:active{
        color: #4c92fcaf;
       
    }
    &:hover{
        color: #4c92fcaf;
        
    }

`
const PrevNextBtn = styled.button`
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    border:none;
    border-radius: 5px;
    background-color: #4c92fcaf ;
    margin: 5px;
    
`

const Pagination = ({totalpages}) => {
    const [currentPage, setCurrentPage] = useState(1); //현재 페이지 
    // const itemPerPage = 5; // 한 페이지 당  아이템 수 
    const totalPages = totalpages;
    const maxPageButtons = 5;
    const navigate = useNavigate();
             
    const renderPageNumbers = () => { // 페이지네이션 버튼 구현 함수 
      const pageNumbers = [];
      const startPage = ((Math.ceil(currentPage / maxPageButtons) - 1) * maxPageButtons) + 1; 
      const endPage = Math.min(startPage + maxPageButtons - 1, totalPages);
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      return pageNumbers;
    };
    
    const handleClickPrevBtn = () => {
      setCurrentPage(prevPage => Math.max(prevPage - maxPageButtons, 1)); 
      navigate(`?page=${currentPage}`);
    };
    
    const handleClickNextBtn = () => {
      setCurrentPage(prevPage => Math.min(prevPage + maxPageButtons, totalPages)); 
      navigate(`?page=${currentPage}`);
    };

    const handleClickCurrentPage = (page) => {
        setCurrentPage(page);
        // fetchPagesData(page);
        navigate(`?page=${page}`, { replace: true });
    }
    // const startIndex = (currentPage - 1 ) * itemPerPage; //화면에 보여줄 데이터의 시작 
    // const endIndex = currentPage * itemPerPage ; // 화면에 보여줄 데이터의 끝 
    // const currentData = allData.slice(startIndex, endIndex); // slice로 데이터 배열을 복사해 저장 

  
    return (
        <Container>
          <ButtonContainer>
              <PrevNextBtn onClick={handleClickPrevBtn} disabled={currentPage === 1}>
                  <GrFormPrevious size={25}/>
              </PrevNextBtn>
              <div>
              {renderPageNumbers().map(page => (
                    <PagesBtn key={page} onClick={() => handleClickCurrentPage(page)}>
                        {page}
                    </PagesBtn>
                ))}
              </div>
              <PrevNextBtn onClick={handleClickNextBtn} disabled={currentPage === totalPages}>
                  <GrFormNext size={25}/>
              </PrevNextBtn>
          </ButtonContainer>
        </Container>
      );
};

export default Pagination;