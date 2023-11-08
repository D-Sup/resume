import { useState } from "react";
import styled from "styled-components";

export default function PwInput({ isKeyBtn, pw, setPw }) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <InputStyle>
      <div className={`group ${isFocused ? 'focused' : ''} ${isKeyBtn ? 'on' : ''}`}>
        <svg stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="icon">
          <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" strokeLinejoin="round" strokeLinecap="round"></path>
        </svg>
        <input
          className="input"
          type="password"
          placeholder="password"
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />
      </div>
    </InputStyle>
  );
}

const InputStyle = styled.div`
    position: absolute;
    right: 115px;
    @media (max-width: 950px) {
      right: 75px;
    }

  .group {
    display: flex;
    line-height: 30px;
    align-items: center;
    position: relative;
    transition: .5s ease;
    transform: translateY(-150%);
    opacity: 0;
  }

  .group.focused .input {
    width: 140px;
  }
  .group.on {
    opacity: 1;
    transform: translateY(0);
  }

  .input {
    width: 60px;
    height: 20px;
    line-height: 30px;
    padding: 0 2rem;
    padding-left: 3rem;
    border: 2px solid transparent;
    border-radius: 10px;
    outline: none;
    background-color: #f8fafc;
    color: #0d0c22;
    transition: .5s ease;
  }

  .input::placeholder {
    color: #94a3b8;
  }

  .input:focus,
  .input:hover {
    outline: none;
    border-color: var(--main-color);
    background-color: #fff;
    box-shadow: 0 0 0 5px #F9F3CC;
  }

  .icon {
    position: absolute;
    left: 1rem;
    fill: none;
    width: 1rem;
    height: 1rem;
  }
`;
