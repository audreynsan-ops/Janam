const debounce = require('debounce');

class ScrollDirection {
  constructor() {
    this._instance = null;
    this._elements = [];
    this._lastScrollTop = null;
    this._onScroll = null;

    this.scrollClasses = {
      scrollUp: 'scroll-up',
      scrollDown: 'scroll-down',
    };
  }

  // Method static to add element.
  static add(element) {
    const scrollDirection = ScrollDirection.getInstance();
    scrollDirection._elements.push(element);
    scrollDirection.addListener();
  }

  // Method static to get instance.
  static getInstance() {
    if (!ScrollDirection._instance) {
      ScrollDirection._instance = new ScrollDirection();
    }

    return ScrollDirection._instance;
  }

  // Method to add event listener.
  addListener() {
    if (!this._onScroll) {
      this._onScroll = debounce(() => this.scroll(), 250);
      window.addEventListener('scroll', this._onScroll);
    }
  }

  // Method to manage the scroll.
  scroll() {
    const scrollTop = window.scrollY;
    const scrollDistance = Math.abs(scrollTop - this._lastScrollTop);

    this._elements.forEach(element => {
      if (scrollTop < 200) {
        element.classList.remove(this.scrollClasses.scrollUp, this.scrollClasses.scrollDown);
      }
      else if (scrollDistance > 100) {
        if (scrollTop > this._lastScrollTop && !element.classList.contains(this.scrollClasses.scrollDown)) {
          element.classList.remove(this.scrollClasses.scrollUp);
          element.classList.add(this.scrollClasses.scrollDown);
        }
        else if (scrollTop < this._lastScrollTop && element.classList.contains(this.scrollClasses.scrollDown)) {
          element.classList.remove(this.scrollClasses.scrollDown);
          element.classList.add(this.scrollClasses.scrollUp);
        }
      }
    });

    this._lastScrollTop = scrollTop;
  }
}

module.exports = ScrollDirection;
