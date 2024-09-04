import styled from "styled-components";

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
              data.map((items, index) => (
                <li className="skill" key={index}>
                  <p className="skill-category">{items.category}</p>
                  {items.tag?.split(", ").map((item, itemIndex) => (
                    <span key={itemIndex} className={`skill-tag ${item.includes("*") ? "active" : ""}`}>
                      {item.split("*").join("")}
                    </span>
                  ))}
                </li>
              ))
            }
          </TagArea>
        </div>
      </div>
    </Section>
  );
}

const Section = styled.section`
  .child-2 {
    justify-content: center;
  }
  `;

const TagArea = styled.ul`
  padding-top: 30px;
  position: relative;

  &::before {
    @media (max-width: 1100px) {
      display: none;
    }
    position: absolute;
    top: 0;
    content: "";
    width: 100%;
    height: 2px;
    background-color: #D2D2D0;
  }
  .skill + .skill {
    margin-top: 30px;
  }
  .skill-category {
    margin-top: 0;
    margin-bottom: 15px;
  }
  .skill-tag {
    display: inline-block;
    border-radius: 30px;
    border: 2px solid #D2D2D0;
    font-size: 1rem;
    padding: 10px 15px 8px;
    box-sizing: border-box;
    margin-bottom: 10px;
    margin-right: 10px;
    line-height: 1;
    transition: .3s;
    &:hover {
      border: 2px solid #F99417;
      background-color: #F99417;
      color: #FFF;
      transform: scale(1.1);
    }
  }
  .active {
    color: #FFF;
    background-color: #F99417;
    border: 2px solid #F99417;
  }
`;


