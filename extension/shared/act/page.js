function refresh(){
    location.reload();
    return true;
}

function go_back(){
    window.history.back();
    return true;
}

function move_to_url(url){
    window.location.href = url;
    return true;
}

export {move_to_url,go_back,refresh};