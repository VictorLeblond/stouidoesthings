class Footer extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = `
      <p> &copy 2023 Victor Leblond </p>
      <a class="credits" href = "https://vicleblond.com/credits"> credits </a>
      `;
    }
  }
  
  customElements.define('f-main', Footer);
