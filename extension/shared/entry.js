import draw_arrow from './guide/draw_arrow.js'
import go_to_url from './guide/go_to_url.js'
import point_scroll_down from './guide/scroll_down.js'
import point_scroll_up from './guide/scroll_up.js'
import point_scroll_left from './guide/scroll_left.js'
import point_scroll_right from './guide/scroll_right.js'
import show_text from './guide/show_text.js'

async function call_guide(function_name,args){
    console.log("calling guide.")
    if (function_name == "back"){
        return show_text("Please go back a page."); 
    }
    else if (function_name == "refresh"){
        return show_text("You should refresh the webpage,\n you can use the refresh button.")
    }
    else if (function_name == "click_coordinates_add_text"){
        return draw_arrow(args.x,args.y,"You should enter '"+args.text+"' here.")
    }
    else if (function_name == "keyborad_action"){
        return show_text("You should press the '"+args.key +"' key")
    }
    else if (function_name == "click_coordinates"){
        return draw_arrow(args.x,args.y,"You should click here.")
    }
    else if (function_name == "go_to_url"){
        return go_to_url("Use the bar above to go to: "+args.text)
    }
    else if (function_name == "scroll_down"){
        return point_scroll_down()
    }
    else if (function_name == "scroll_up"){
        return point_scroll_up()
    }
    else if (function_name == "scroll_left"){
        return point_scroll_left()
    }
    else if (function_name == "scroll_right"){
        return point_scroll_right()
    }
    else if (function_name == "server_fail"){
        return show_text("Service is down.")
    }
    else if (function_name == "show_guidance"){
        return show_text(args.message)
    }
    else if (function_name == "show_final_guidance"){
        return show_text(args.message)
    }
    else{
        throw new Error('function '+function_name+" is not defined.");
    }

}

import get_elements from './extract/elements.js'
import get_url from './extract/get_url.js'
import getWindowSize from './extract/get_window_size.js'
import getScrollHeightInfo from './extract/scroll_height.js'
import getScrolWidthInfo from './extract/scroll_width.js'
import get_viewpoint from './extract/window.js'


async function call_extract(function_name){
    if (function_name == "elements"){
        return get_elements()
    }
    else if (function_name == "get_url"){
        return get_url()
    }
    else if (function_name == "get_window_size"){
        return getWindowSize()
    }
    else if (function_name == "scroll_height"){
        return getScrollHeightInfo()
    }
    else if (function_name == "scroll_width"){
        return getScrolWidthInfo()
    }
    else if (function_name == "window"){
        return get_viewpoint()
    }
    else{
        throw new Error('function '+function_name+" is not defined.");
    }

}

import {click_on_coordinates,click_on_coordinates_and_text,keyborad_action} from './act/click.js'
import {scroll_left,scroll_up,scroll_right,scroll_down} from './act/scroll.js'
import {move_to_url,go_back,refresh} from './act/page.js'


async function call_act(function_name,args){
    console.log("calling acting.")
    if (function_name == "back"){
        return go_back() 
    }
    else if (function_name == "refresh"){
        return refresh()
    }
    else if (function_name == "click_coordinates_add_text"){
        return click_on_coordinates_and_text(args.x,args.y,args.text)
    }
    else if (function_name == "keyborad_action"){
        return keyborad_action(args.key)
    }
    else if (function_name == "click_coordinates"){
        return click_on_coordinates(args.x,args.y)
    }
    else if (function_name == "go_to_url"){
        return move_to_url(args.text)
    }
    else if (function_name == "scroll_down"){
        return scroll_down()
    }
    else if (function_name == "scroll_up"){
        return scroll_up()
    }
    else if (function_name == "scroll_left"){
        return scroll_left()
    }
    else if (function_name == "scroll_right"){
        return scroll_right()
    }
    else if (function_name == "server_fail"){
        return show_text("Service is down.")
    }
    else if (function_name == "show_guidance"){
        return show_text(args.message)
    }
    else if (function_name == "show_final_guidance"){
        return show_text(args.message)
    }
    else{
        throw new Error('function '+function_name+" is not defined.");
    }
}

export {call_guide,call_extract,call_act};