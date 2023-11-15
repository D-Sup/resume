import { useEffect, useState } from "react";
import useFetchData from "./hooks/useFetchData";

import styled from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";

import Header from "./components/Header";
import Info from "./components/Info";
import Profile from "./components/Profile";
import Activities from "./components/Activities";
import Skills from "./components/Skills";
import EditDataPage from "./components/EditDataPage";
import Loader from "./components/common/Loader";

function App() {

  const { file, parseData, isLoading, refetchData } = useFetchData("resume");
  const [isEditPage, setIsEditPage] = useState(false);
  const [fileData, setFileData] = useState("");

  useEffect(() => {
    setFileData(file)
  }, [file])

  if (isLoading) {
    return <Loader />
  }

  return (
    <WrapperStyle className="wrapper-style">
      <GlobalStyle />
      {/* <Header fileData={fileData} isEditPage={isEditPage} setIsEditPage={setIsEditPage} refetchData={refetchData}/> */}
      <header>이력서 링크 : <a target="_blank" href="https://resume-dongsupahn.vercel.app">https://resume-dongsupahn.vercel.app</a></header>
      {isEditPage ? (
        <EditDataPage fileData={fileData} setFileData={setFileData}/>
      ) : (
        <>
          <Info data={parseData.info} />
          <Profile data={parseData.Profile} />
          {
            parseData.sequence.index.split(' - ').map((item, index) => {
              if (item === "Skills") {
                return <Skills key={index} data={parseData[item]} />
              } else {
                return <Activities key={index} data={parseData[item]} categoryName={item} />
              }
            })
          }
        </>
      )}
    </WrapperStyle>
  );
}

export default App;

const WrapperStyle = styled.div`

  header {
    margin: auto;
    text-align: center;
    font-size: 1.5rem;
  }
  margin: 30px auto;
  padding: 80px;
  max-width: 1200px;
  box-sizing: border-box;
  width: auto;

  @media (max-width: 950px) {
    padding: 40px;
  }
  section:nth-of-type(2) {
    margin-top: 40px;
  }
  section + section {
    margin-top: 55px;
  }
`;