export default function getScrolWidthInfo() {
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth;

  const documentHeight = Math.max(
    document.body.scrollHeight, document.body.offsetHeight,
    document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight
  );
  const documentWidth = Math.max(
    document.body.scrollWidth, document.body.offsetWidth,
    document.documentElement.clientWidth, document.documentElement.scrollWidth, document.documentElement.offsetWidth
  );

  const isVerticalScrollbarAtTop = window.scrollY === 0;
  const isVerticalScrollbarAtBottom = documentHeight - viewportHeight === window.scrollY;
  const isHorizontalScrollbarAtLeft = window.scrollX === 0;
  const isHorizontalScrollbarAtRight = documentWidth - viewportWidth === window.scrollX;

  if (isVerticalScrollbarAtTop && isVerticalScrollbarAtBottom && isHorizontalScrollbarAtLeft && isHorizontalScrollbarAtRight) {
    return "The webpage content fits the viewport, and there is no need to scroll in either direction.";
  } else if (isVerticalScrollbarAtTop && isVerticalScrollbarAtBottom) {
    return "The webpage is horizontally scrollable, but there is no need to scroll vertically.";
  } else if (isHorizontalScrollbarAtLeft && isHorizontalScrollbarAtRight) {
    return "The webpage is vertically scrollable, but there is no need to scroll horizontally.";
  } else if (isVerticalScrollbarAtTop) {
    return "The scrollbar is at the top of the page, but there is more content to scroll up vertically.";
  } else if (isVerticalScrollbarAtBottom) {
    return "The scrollbar is at the bottom of the page vertically, and there is no more content to scroll down to.";
  } else if (isHorizontalScrollbarAtLeft) {
    return "The scrollbar is at the left of the page, but there is more content to scroll left horizontally.";
  } else if (isHorizontalScrollbarAtRight) {
    return "The scrollbar is at the right of the page horizontally, and there is no more content to scroll right to.";
  } else {
    return "The webpage is scrollable in both vertical and horizontal directions.";
  }
}

  
// console.log(getScrollInfo());
