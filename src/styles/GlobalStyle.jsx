import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  :root {
    --main-color : #FDE989;
  }

  * {
    /* font-family: 'Pretendard', sans-serif; */
    font-weight: 400;
    line-height: 1.4;
  }
  
  body {
    margin: 0;
  }
  
  h1, h2, h3, p {
    margin: 0;
    padding: 0;
  }

  li + li {
    margin-top: 8px;
  }

  button {
    border: 0;
    background-color: initial;
    padding: 0;
  }

  p {
    margin-top: 16px;
  }

  ul {
    padding-inline-start: 25px;
  }

  u, a {
    text-decoration: underline;
    text-underline-offset: 0.1em; 
  }

  a:visited {
    color: #F99417;
  }

  img {
    vertical-align: top;
  }

  .a11y-hidden {
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
  }
`;

export default GlobalStyle;
