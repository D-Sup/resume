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
                    <div>
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
    background-color: #FFCD4B;
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
    background-color: #000;
  }
  time {
    margin-bottom: 10px;
  }
  .only-time {
    @media (max-width: 950px) {
      margin-bottom: -20px;
    }
  }
  .date-link-tag {
    padding: 0;
  }
  img {
    padding-left: 15px; 
    width: 20px;
    height: 20px;
  }
  .tag-container {
    @media (max-width: 950px) {
      position: static;
      width: 100%;
      margin-top: 10px;
    }
    width: 25%;
    position: absolute;
    bottom: 16px;
  }
  .skill-tag {
    display: inline-block;
    border-radius: 30px;
    border: 2px solid #000;
    font-size: .9rem;
    padding: 4px 8px;
    box-sizing: border-box;
    margin-right: 5px;
    margin-bottom: 5px;
  }
  .project-type {
    position: absolute;
    right: 0;
    top: 0;
  }
`;