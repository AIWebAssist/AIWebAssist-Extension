function getWindowSize() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  
    return { width, height };
  }
  
const windowSize = getWindowSize();
console.log(`${windowSize.width}px`);
console.log(`${windowSize.height}px`);