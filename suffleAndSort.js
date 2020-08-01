/**
 * @method SuffleAndSort app class
 * @param {HTMLElement} HTMLElement used to build app in
 */
function SuffleAndSort(el) {
  const TOTAL_CARDS = 9;
  this.cards = [];
  this.cardEls = [];
  this.containerEl = null;
  this.lSectionEl = null;
  this.rSectionEl = null;
  this.suffleBtn = null;
  this.sortBtn = null;

  /**
   * @method createEl util method to create new HTML element
   * @param {String} type type of element ex: "div", "span" etc
   * @param {HTMLElement} parent HTMLElement in which newly created element will be appended
   * @param {String | String[]} css css classes to be applied on new element
   * @returns {HTMLElement} newly created element
   */
  const createEl = (type, parent, css) => {
    const el = document.createElement(type);
    const classList = el.classList;
    if (Array.isArray(css)) {
      css.forEach((c) => {
        classList.add(c);
      });
    } else if (typeof css === "string") {
      classList.add(css);
    }
    parent.appendChild(el);
    return el;
  };

  /**
   * @method arrangeCards class method to arrange cards with new sequence
   * @returns {undefined}
   */
  this.arrangeCards = () => {
    this.lSectionEl.innerText = "";
    this.cards.forEach((card) =>
      this.lSectionEl.appendChild(this.cardEls[card - 1])
    );
  };

  /**
   * @method suffle class method to suffle is sequence
   * @returns {undefined}
   */
  this.suffle = () => {
    this.cards = this.cards.sort(() => Math.random() - 0.5);
  };

  /**
   * @method sort class method to sort the sequence in acensding order
   */
  this.sort = () => {
    this.cards = this.cards.sort();
  };

  /**
   * @method handleSuffle class method to handle suffle button click
   * @returns {undefined}
   */
  this.handleSuffle = () => {
    this.suffle();
    this.arrangeCards();
  };

  /**
   * @method handleSort class method to handle sort button click
   * @return {undefined}
   */
  this.handleSort = () => {
    this.sort();
    this.arrangeCards();
  };

  /**
   * @method buildHTML class method to build app HTML in provided container
   * @return {undefined}
   */
  this.buildHTML = () => {
    if (this.containerEl) {
      this.containerEl.classList.add("container");
      // Create a section to hold buttons
      this.rSectionEl = createEl("section", this.containerEl, "r-section");
      // Create section to hold cards
      this.lSectionEl = createEl("section", this.containerEl, "l-section");
      // Create 2 button for suffle and sort
      this.suffleBtn = createEl("button", this.rSectionEl, "btn");
      this.suffleBtn.innerText = "Suffle";
      this.sortBtn = createEl("button", this.rSectionEl, "btn");
      this.sortBtn.innerText = "Sort";
      // Create Cards
      for (let i = 0; i < TOTAL_CARDS; i++) {
        this.cardEls[i] = createEl("div", this.lSectionEl, [
          `card`,
          `card-${i}`,
        ]);
        this.cardEls[i].innerHTML = `<div class="card-text">${i + 1}</div>`;
        this.cards[i] = i + 1;
      }
      // Add click handlers
      this.suffleBtn.addEventListener("click", this.handleSuffle);
      this.sortBtn.addEventListener("click", this.handleSort);
    } else {
      throw "No container passed";
    }
  };

  /**
   * @method init initialize the app
   */
  this.init = () => {
    if (el && typeof el === "string") {
      this.containerEl = document.querySelector(`#${el}`);
    } else {
      this.containerEl = el;
    }

    this.buildHTML();
  };

  // Initialize the app instance
  this.init();
}
