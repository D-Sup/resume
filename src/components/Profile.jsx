import { useLocation } from "react-router-dom";

import styled from "styled-components"
import LayoutStyle from "../styles/LayoutStyle";
import Markdown from "../utils/Markdown";

import iconGithub from "../assets/icon/icon-github.svg"
import iconBlog from "../assets/icon/icon-blog.svg"
import iconEmail from "../assets/icon/icon-email.svg"

import profileImage from "../assets/images/profile-img.jpeg"

export default function Profile({ data }) {
  const { name, profession, introduction, githubLink, blogLink, emailLink } = data

  const location = useLocation();

  return (
    <section>

      <LayoutStyle />
      {location.pathname === "/linkforpdf" &&
        <div
          style={{
            fontSize: "30px",
            marginBottom: "60px"
          }}
        >
          <span style={{
            display: "block"
          }}>
            👇🏻 직접 웹사이트를 방문하셔서 읽어주시기를 권장드립니다!
          </span>
          <a href="https://resume-dongsupahn.vercel.app/"
            style={{
              color: "F99417"
            }}>
            https://resume-dongsupahn.vercel.app
          </a>
        </div>
      }

      <H1>{name}</H1>

      <Separator>
        <p>{profession}</p>
      </Separator>

      <H2>Profile</H2>
      <IntroduceArea className="grid-container">
        <div className="child-1">
          <img src={profileImage} />

          <ContactInfoArea>
            <li>
              <img className="icon" src={iconGithub} />
              <a target="_blank" href={githubLink}>{githubLink}</a>
            </li>
            <li>
              <img className="icon" src={iconBlog} />
              <a target="_blank" href={blogLink}>{blogLink}</a>
            </li>
            <li>
              <img className="icon" src={iconEmail} />
              <a target="_blank" href={`mailto:${emailLink}`}>{emailLink}</a>
            </li>
          </ContactInfoArea>

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

const H1 = styled.h1`
  margin-left: -3px;
  position: relative;
  display: inline;
  font-size: 4rem;
  line-height: 1;
  font-weight: 100;
  @media (max-width: 1100px) {
    font-size: 3rem;
  }

  &:before {
    content: "";
    position: absolute;
    background-color: var(--main-color);
    transform: translate(-51%, -51%);
    top: 50%;
    left: 50%;
    width: 93%;
    height: 68%;
    z-index: -999;
  }
`;

const Separator = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  @media (max-width: 1100px) {
    align-items: start;
    flex-direction: column;
  }

  p {
    font-size: 1.5rem;
    font-weight: 100;
    margin: 0;
  }
  &:after {
    @media (max-width: 1100px) {
      flex: none;
      margin-left: 0;
      margin-top: 10px;
    }
    margin-left: 20px;
    content: "";
    flex: 1;
    width: 100%;
    height: 2px;
    background-color: #D2D2D0;
  }
`

const H2 = styled.h2`
  @media (max-width: 1100px) {
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
    width: 180px;
    height: 180px;
    object-fit: cover;
    object-position: center -12px;
    border-radius: 5px;
  }
`;

const ContactInfoArea = styled.div`
  @media (max-width: 1100px) {
    margin-bottom: 20px;
  }
  margin-top: 20px;
  list-style: none;
  .icon {
    width: 25px;
    height: 25px;
    object-position: 0;
  }
  li + li {
    margin-top: 10px;
  }
  a {
    font-weight: 100;
    margin-left: 10px;
    border-radius: 5px;
    font-size: .8rem;
    color: #000;
    transition: .3s;
    &:hover {
      background-color: #F0F0F0;
    }
  }
  a:visited {
    color: #000;
  }
`;