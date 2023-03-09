class Header extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = `
      <div class="mainNav">
      <a class="mainButton" href="https://vicleblond.com">Home</a>
        <a class="mainButton" href="socials">Socials</a>
        <a class="mainButton" href="stuff">Stuff</a>
        <a class="mainButton" href="about">About</a>
  </div>
      `;
    }
  }
  
  customElements.define('h-main', Header);