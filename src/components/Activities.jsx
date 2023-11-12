import Markdown from "../utils/Markdown";
import styled from "styled-components"

import iconGithub from "../assets/icon/icon-github.svg"
import iconDeploy from "../assets/icon/icon-deploy.svg"

export default function Activities({ data, categoryName }) {

  return (
    <section>
      <div className="grid-container">

        <div className="child-1">
          <h2>{categoryName}</h2>
        </div>

        <ContentArea className="child-2">
          {data.map(item => {
            return (
              <div className="grid-container content">
                <span className="project-type">{item.projectType}</span>
                <div className="child-1 date-link-tag">
                  <time className={!item.repoLink && "only-time"} dateTime={item.date}>{item.date}</time>
                  {item.repoLink &&
                    <div className="link">
                      <span>LINK :</span>
                      <a target="_blank" href={item.repoLink}><img src={iconGithub} /></a>
                      <a target="_blank" href={item.deployLink}><img src={iconDeploy} /></a>
                    </div>
                  }
                  <div className="tag-container">
                    {
                      item.tag?.split(", ").map((item) => (
                        <span className="skill-tag">{item}</span>
                      ))
                    }
                  </div>
                </div>
                <div className="child-2">
                  <Markdown>
                    {item.content}
                  </Markdown>
                </div>
              </div>
            );
          })}
        </ContentArea>

      </div>
    </section>
  )
}

const ContentArea = styled.div`
  position: relative;
  
  .content {
    position: relative;
  }
  .content:first-child{
    margin-top: 30px;
  }
  .content + .content {
    margin-top: 30px;
  }
  &::before {
    @media (max-width: 950px) {
      display: none;
    }
    position: absolute;
    content: "";
    width: 25%;
    height: 2px;
    background-color: #F99417;
  }
  &::after {
    @media (max-width: 950px) {
      display: none;
    }
    position: absolute;
    right: 0;
    content: "";
    width: 75%;
    height: 2px;
    background-color: #D2D2D0;
  }
  .only-time {
    @media (max-width: 950px) {
      margin-bottom: -10px;
    }
  }
  .date-link-tag {
    padding: 0;
  }
  .link {
    margin: 10px 0 15px;
    display: flex;
    align-items: center;
    span {
      padding-top: 4px;
    }
    a {
      margin-left: 15px; 
    }
  }
  img {
    padding: 5px;
    border-radius: 30px;
    overflow: visible;    
    width: 25px;
    height: 25px;
    transition: .3s;
    outline: 2px solid #FFF;
    &:hover {
      outline: 2px solid #000;
      transform: scale(.9);
    }
  }
  .tag-container {
    @media (max-width: 950px) {
      position: static;
      width: 100%;
      /* margin-top: 10px; */
    }
    /* width: 25%;
    position: absolute;
    bottom: 16px; */
  }
  .skill-tag {
    display: inline-block;
    border-radius: 30px;
    border: 2px solid #D2D2D0;
    font-size: .8rem;
    padding: 8px 12px 6px;
    box-sizing: border-box;
    margin-right: 5px;
    margin-bottom: 5px;
    line-height: 1;
    transition: .3s;
    &:hover {
      border: 2px solid #F99417;
      background-color: #F99417;
      color: #FFF;
      transform: scale(1.1);
    }
  }
  .project-type {
    position: absolute;
    right: 0;
    top: 0;
  }
`;