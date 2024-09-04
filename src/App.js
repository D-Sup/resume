import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { useEffect, useState } from "react";
import useFetchData from "./hooks/useFetchData";

import styled from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";

import Header from "./components/Header";
import Profile from "./components/Profile";
import Activities from "./components/Activities";
import Skills from "./components/Skills";
import EditDataPage from "./components/EditDataPage";
import Loader from "./components/common/Loader";
import Modal from "./components/Modal";

function App() {

  const { file, parseData, isLoading, refetchData } = useFetchData("resume");
  const [isEditPage, setIsEditPage] = useState(false);
  const [fileData, setFileData] = useState("");
  const [modalState, setModalState] = useState({ isModalOpen: false, imageTitle: "", images: "" });

  useEffect(() => {
    setFileData(file)
  }, [file])

  if (isLoading) {
    return <Loader />
  }

  return (

    <WrapperStyle className="wrapper-style">
      <GlobalStyle />
      <Header fileData={fileData} isEditPage={isEditPage} setIsEditPage={setIsEditPage} refetchData={refetchData} />
      {isEditPage ? (
        <EditDataPage fileData={fileData} setFileData={setFileData} />
      ) : (
        <>

          <Router>
            <Routes>
              <Route path="/*" element={<Profile data={parseData.Profile} />} />
            </Routes>
          </Router>

          {
            parseData.sequence.index.split(" - ").map((item, index) => {
              if (item === "Skills") {
                return <Skills key={index} data={parseData[item]} />
              } else {
                return <Activities key={index} data={parseData[item]} categoryName={item} setModalState={setModalState} />
              }
            })
          }
        </>
      )}
      <Modal modalState={modalState} setModalState={setModalState} />
    </WrapperStyle>
  );
}

export default App;

const WrapperStyle = styled.div`
  margin: 30px auto;
  padding: 80px;
  max-width: 1200px;
  box-sizing: border-box;
  width: auto;

  @media (max-width: 1100px) {
    padding: 40px;
  }
  section:nth-of-type(2) {
    margin-top: 40px;
  }
  section + section {
    margin-top: 55px;
  }
`;