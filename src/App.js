import './App.css';
import Header from './Components/Header';
import Main from './Components/Main';
import styled from 'styled-components'

const FooterWrapper = styled.div`
  height: 50px;
  background-color: black;
  color: white;
  font-size: 14px;
  display: flex;
  justify-content: center;
  font-size: 14px;
  align-items: center;
  font-weight: 500;
`


function App() {
  return (
    <>
      <Header />
      <Main />
      <FooterWrapper>
        Copyright © 2022 arschettino
      </FooterWrapper>
    </>
  );
}

export default App;
