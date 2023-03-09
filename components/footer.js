class Footer extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = `
      <p> &copy 2023 Victor Leblond </p>
      <a class="credits" href = "credits/index.html"> credits </a>
      `;
    }
  }
  
  customElements.define('f-main', Footer);