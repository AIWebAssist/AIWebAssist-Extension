export default function getScrollHeightInfo() {
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const documentHeight = Math.max(
    document.body.scrollHeight, document.body.offsetHeight,
    document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight
  );

  const isScrollbarAtTop = window.scrollY === 0;
  const isScrollbarAtBottom = documentHeight - viewportHeight === window.scrollY;

  if (isScrollbarAtTop && isScrollbarAtBottom) {
    return "The webpage content fits the viewport, and there is no need to scroll.";
  } else if (isScrollbarAtTop) {
    return "The scrollbar is at the top of the page, but there is more content to scroll up.";
  } else if (isScrollbarAtBottom) {
    return "The scrollbar is at the bottom of the page, and there is no more content to scroll down to.";
  } else {
    return "The webpage is scrollable, and there is content in both directions.";
  }
}