function refresh(){
    location.reload();
}

function go_back(){
    window.history.back();
}

function move_to_url(url){
    window.location.href = url;
}

module.exports = {move_to_url,go_back,refresh};