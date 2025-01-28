class Selector {
    constructor(container, items) {
        this.container = container;
        this.items = items;
        this.currentIndex = 0;
        this.createUI();
        this.updateDisplay();
    }

    createUI() {
        const selectorWrapper = document.createElement("div");
        selectorWrapper.classList.add("selector");

        this.leftArrow = document.createElement("button");
        this.leftArrow.classLift.add("arrow");
        this.leftArrow.textContent = "<";
        this.leftArrow.addEventListener("click", () => this.navigate(-1));
        selectorWrapper.appendChild(this.leftArrow);

        this.display = document.createElement("div");
        this.display.classList.add("display");

        this.displayImage = document.createElement("img");
        this.displayImage.classList.add("display-image");
        this.display.appendChild(this.displayImage);

        this.displayText = document.createElement("p");
        this.displayText.classList.add("display-text");
        this.display.appendChild(this.displayText);

        selectorWrapper.appendChild(this.display);

        this.rightArrow = document.createElement("button");
        this.rightArrow.classList.add("arrow");
        this.rightArrow.textContent = ">";
        this.rightArrow.addEventListener("click", () => this.navigate(1));
        selectorWrapper.appendChild(this.rightArrow);
        this.container.appendChild(selectorWrapper);
    }

    updateDisplay() {
        const currentItem = this.items[this.currentIndex];
        this.displayImage.src = currentItem.image;
        this.displayText.textContent = currentItem.text;
        this.displayDescription.textContent = currentItem.description;

        if (this.onIndexChange) {
            this.onIndexChange(this.currentIndex);
        }
    }

    navigate(direction) {
        this.currentIndex = (this.currentIndex + direction + this.items.length) % this.items.length;
        this.updateDisplay();
    }
}

function handleBackgroundChange(currentIndex) {
    const background = document.querySelector(".background");
    if (currentIndex === 1) {
      background.style.display = "block";
    } else {
      background.style.display = "none";
    }
  }