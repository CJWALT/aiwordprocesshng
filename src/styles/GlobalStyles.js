import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  
  transition: background-color 0.3s, border 0.3s;
}

html {
  font-size: 16px;
}

body {
  font-family: "Poppins", sans-serif;

  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.6rem;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color:white;
  color:black;
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid dodgerblue;
  outline-offset: -1px;
}

a {
  color: inherit;
  text-decoration: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

`;


export default GlobalStyles