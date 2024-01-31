import { useLocation } from "react-router-dom";

import styled from "styled-components";
import LayoutStyle from "../styles/LayoutStyle";

import iconGithub from "../assets/icon/icon-github.svg"
import iconBlog from "../assets/icon/icon-blog.svg"
import iconEmail from "../assets/icon/icon-email.svg"

export default function Info({ data }) {
  const { name, profession, githubLink, blogLink, emailLink } = data;

  const location = useLocation();

  return (
    <section>
      <LayoutStyle />
      {location.pathname === "/linkforpdf" &&
        <div
          style={{
            fontSize: '30px',
            marginBottom: '60px'
          }}
        >
          <span style={{
            display: 'block'
          }}>
            👇🏻 직접 웹사이트를 방문하셔서 읽어주시기를 권장드립니다!
          </span>
          <a href="https://resume-dongsupahn.vercel.app/"
            style={{
              color: 'F99417'
            }}>
            https://resume-dongsupahn.vercel.app
          </a>
        </div>
      }

      <H1>{name}</H1>

      <Separator>
        <p>{profession}</p>
      </Separator>

      <ContactInfoArea className="grid-container">
        <div className="child-1">
          <ul>
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
          </ul>
        </div>
        <div className="child-2">
          <img className="gh-chart" src="https://ghchart.rshah.org/D-Sup" />
        </div>
      </ContactInfoArea>
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
  @media (max-width: 950px) {
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
  @media (max-width: 950px) {
    align-items: start;
    flex-direction: column;
  }

  p {
    font-size: 1.5rem;
    font-weight: 100;
    margin: 0;
  }
  &:after {
    @media (max-width: 950px) {
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

const ContactInfoArea = styled.div`
  align-items: center;
  @media (max-width: 1100px) {
    grid-template-columns: none;
  }

  .child-2 {
    @media (max-width: 1100px) {
      padding-left: 30px;
      margin-top: 30px;
    }
    @media (max-width: 950px) {
      padding-left: 0;
    }
  }
  .icon {
    width: 25px;
    height: 25px;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  li + li {
    margin-top: 10px;
  }
  a {
    font-weight: 100;
    line-height: 1.8;
    margin-left: 10px;
    padding: 5px;
    border-radius: 5px;
    font-size: .9rem;
    color: #000;
    transition: .3s;
    &:hover {
      background-color: #F0F0F0;
    }
  }
  a:visited {
    color: #000;
  }
  .gh-chart {
    width: 100%;
    transition: .3s;
    &:hover {
      transform: scale(1.05);
    }
  }
`;