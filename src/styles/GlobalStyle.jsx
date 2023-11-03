import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  :root {
    --main-color : #FDE989;
  }

  body {
    margin: 0;
    font-family: 'Noto Sans', sans-serif;
  }
  
  h1, h2, h3, p {
    margin: 0;
    padding: 0;
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