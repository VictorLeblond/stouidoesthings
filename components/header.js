class Header extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.innerHTML = `
      <div class="mainNav">
      <a class="mainButton" href="https://vicleblond.com">Home</a>
        <a class="mainButton" href="https://vicleblond.com/socials">Socials</a>
        <a class="mainButton" href="https://vicleblond.com/projects">Projects</a>
        <a class="mainButton" href="https://vicleblond.com/about">About</a>
      </div>
      `;
    }
  }
  
  customElements.define('h-main', Header);
