import React from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";

import Main from "./container/Main";
import Login from "./container/Login";
import BackgroundImg from "./img/todo_background.jpg";

const Background = styled.div`
  background-image: url(${BackgroundImg});
  width: 100vw;
  height: 100vh;
  background-position: center center;
  display: table-cell;
`;

function App() {
  return (
    <Background>
      <Routes>
        <Route path="/" element={<Main></Main>} />
        <Route path="/Login" element={<Login></Login>} />
      </Routes>
    </Background>
  );
}

export default App;