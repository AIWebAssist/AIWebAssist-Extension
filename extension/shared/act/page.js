function refresh(){
    location.reload();
    return true;
}

function go_back(){
    starting_herf = window.location.href
    window.history.back();
    ending_herf = window.location.href

    if (ending_herf === starting_herf){
        return false;
    }
    return true;
}

function move_to_url(url){
    window.location.href = url;

    if (window.location.href !== url){
        return false;
    }
    return true;
}

export {move_to_url,go_back,refresh};