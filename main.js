import "./style.css";
import { setupCounter } from "./counter.js";

document.querySelector("#app").innerHTML = `
  <div>
    hello world
  </div>
`;

setupCounter(document.querySelector("#counter"));