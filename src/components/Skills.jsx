import Markdown from "../utils/Markdown";
import styled from "styled-components"

export default function Skills({ data }) {

  return (
    <Section>
      <div className="grid-container">
        <div className="child-1">
          <h2>Skills</h2>
        </div>
        <div className="child-2">
          <TagArea>
            {
              data.map((item, index) => (
                <>
                  {item.lang === "TypeScript & JavaScript" || item.lang === "React" ?
                    <span key={index} className="skill-tag active">{item.lang}</span> :
                    <span key={index} className="skill-tag">{item.lang}</span>}
                  <Markdown>
                    {item.content}
                  </Markdown>
                </>
              ))
            }
          </TagArea>
        </div>
      </div>
    </Section>
  )
}

const Section = styled.section`
  .child-2 {
    justify-content: center;
  }
  `;

const TagArea = styled.div`
  padding-top: 30px;
  position: relative;

  &::before {
    @media (max-width: 950px) {
      display: none;
    }
    position: absolute;
    top: 0;
    content: "";
    width: 100%;
    height: 2px;
    background-color: #D2D2D0;
  }
  .skill-tag {
    display: inline-block;
    border-radius: 30px;
    border: 2px solid #D2D2D0;
    font-size: 1rem;
    padding: 10px 15px 8px;
    box-sizing: border-box;
    margin-top: 25px;
    margin-right: 10px;
    line-height: 1;
    transition: .3s;
    &:hover {
      border: 2px solid #F99417;
      background-color: #F99417;
      color: #FFF;
      transform: scale(1.1);
    }
    &:first-child {
      margin-top: 0
    }
  }
  .active {
    color: #FFF;
    background-color: #F99417;
    border: 2px solid #F99417;
  }
`;


