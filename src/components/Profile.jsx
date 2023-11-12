import styled from "styled-components"
import Markdown from "../utils/Markdown";

import profileImage from "../assets/images/profile-img.png"

export default function Profile({ data }) {
  const { introduction } = data

  return (
    <section>
      <H2>Profile</H2>
      <IntroduceArea className="grid-container">
        <div className="child-1">
          <img src={profileImage} />
        </div>
        <div className="child-2">
          <Markdown>
            {introduction}
          </Markdown>
        </div>
      </IntroduceArea>
    </section>
  )
}

const H2 = styled.h2`
  @media (max-width: 950px) {
    margin-left: 0;
  }
  position: relative;
  margin-left: 30px;

  &:after {
    position: absolute;
    left: 1px;
    bottom: 7px;
    content: "";
    display: block;
    background-color: var(--main-color);
    width: 200%; 
    height: 7px;
    z-index: -999;
  }
`;

const IntroduceArea = styled.div`
  margin-top: 20px;

  .child-2 {
    justify-content: center;
  }
  img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    object-position: center -12px;
    border-radius: 50%;
  }
`;