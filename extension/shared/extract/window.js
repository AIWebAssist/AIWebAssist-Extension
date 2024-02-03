export default function get_viewpoint(){
    const viewpointscroll = window.pageYOffset || document.documentElement.scrollTop;
    const viewportHeight = window.innerheight || document.documentElement.clientHeight;

    return {"viewpointscroll":viewpointscroll,"viewportHeight":viewportHeight}
}