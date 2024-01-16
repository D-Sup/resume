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

  h3:last-of-type {
    margin-bottom: 16px;
  }

  li + li {
    margin-top: 14px;
  }

  ul li ul li {
    margin-top: 7px;
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
  
  a {
    padding: 5px;
    box-sizing: border-box;
    border-radius: 5px;
    transition: .3s;
  }

  a:hover {
    background-color: #F0F0F0;
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
