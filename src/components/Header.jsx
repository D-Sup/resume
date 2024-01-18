import { useEffect, useState } from "react"
import styled from "styled-components"

import dataHandler from "../api/dataHandler"
import PwInput from "./common/PwInput"

import textResume from "../assets/icon/text-resume.svg"
import iconEdit from "../assets/icon/icon-edit.svg"
import iconKey from "../assets/icon/icon-key.svg"
import iconCheck from "../assets/icon/icon-check.svg"

export default function Header({ fileData, isEditPage, setIsEditPage, refetchData }) {

  const [isKeyBtn, setIsKeyBtn] = useState(false);
  const [pw, setPw] = useState("");
  const PASSWORD = process.env.REACT_APP_PASSWORD;

  const handleBtn = async () => {
    !isEditPage && setIsKeyBtn(true);
    if (isKeyBtn && pw === PASSWORD) {
      setPw("");
      setIsKeyBtn(false)
      setIsEditPage(Prev => !Prev);
    }
    if (isEditPage) {
      await dataHandler.putFile('resume', fileData)
      refetchData();
      setIsEditPage(Prev => !Prev);
    }
  }

  return (
    <HeaderStyle>
      <div className="container">
        <img className="title" src={textResume} />
        <button onClick={handleBtn}>
          <img className="edit-btn" src={!isEditPage ? isKeyBtn ? iconKey : iconEdit : iconCheck} />
        </button>
        <PwInput isKeyBtn={isKeyBtn} pw={pw} setPw={setPw} />
      </div>
    </HeaderStyle>
  )
}

const HeaderStyle = styled.header`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 40px;
  background-color: #FFF;
  box-shadow: 2px 0 5px #000;
  z-index: 999;

  .container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 1200px;
    padding: 0 80px;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media (max-width: 950px) {
      padding: 40px;
    }
  }
  button {
    cursor: pointer;
    z-index: 999;
  }
  .title {
    width: 70px;
  }
  .edit-btn {
    width: 26px;
  }
`;



