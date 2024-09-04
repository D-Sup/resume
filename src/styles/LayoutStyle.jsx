import { createGlobalStyle } from "styled-components";

const LayoutStyle = createGlobalStyle`

  h2 {
    font-size: 1.7rem;
    display: inline;
    position: relative;
  &::after {
    position: absolute;
    left: 1px;
    bottom: -15px;
    content: "";
    background-color: #000;
    width: 30%; 
    height: 4px;
    z-index: -999;
  }
  }

  .grid-container {
    @media (max-width: 1100px) {
      grid-template-columns: none;
    }
    display: grid;
    grid-template-columns: 1fr 3fr;
  }

  .child-1,
  .child-2 {
    display: flex;
    flex-direction: column;
  }

  .child-1 {
    @media (max-width: 1100px) {
      padding-left: 0;
    }
    padding-left: 30px;
  }

  .child-2 {
    @media (max-width: 1100px) {
      margin-top: 20px;
    }
  }
`;

export default LayoutStyle;
