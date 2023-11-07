import styled from "styled-components"

export default function Skills({ data }) {
  const { lang } = data

  return (
    <Section>
      <div className="grid-container">
        <div className="child-1">
          <h2>Skills</h2>
        </div>
        <div className="child-2">
          <TagArea>
          {
            lang.split(', ').map((item, index) => (
              item === "JavaScript" || item === "React" ?
              <span key={index} className="skill-tag active">{item}</span> :
              <span key={index} className="skill-tag">{item}</span>
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
    background-color: #000;
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
  .active {
    color: #FFF;
    background-color: #F99417;
    border: 2px solid #F99417;
  }
`;


