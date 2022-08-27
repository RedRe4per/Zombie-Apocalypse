import { React, useState } from "react";
import styled from 'styled-components';
import Header from './components/header';
import GridBox from './components/grid';
import Log from "./components/log";

const AppWrapper = styled.div`
    text-align: center;
`;

const BodyArea = styled.div`
    display: flex;
    justify-content: space-around;
`;

function App() {
  const [resultData, setResultData] = useState({});
  const getResultData = (data) => {
    setResultData(data);
  };

  return (
    <AppWrapper>
      <Header getResultData={getResultData} />
      <BodyArea>
        <GridBox resultData={resultData} />
        <Log resultData={resultData} />
      </BodyArea>
    </AppWrapper>
  );
}

export default App;
