function refresh(){
    location.reload();
    return true,"";
}

function go_back(){
    try{
        window.history.back();
    }catch (error){
        return "failed to back "+error
    }
    return true,"";
}

function move_to_url(url){
    if (!url.startsWith("http://") && !url.startsWith("https://")){
        return false,"you should provide a url with http or https prefix."
    }

    window.location.href = url;

    if (window.location.href !== url){
        return false,"new url is not "+url;
    }
    return true,"";
}

export {move_to_url,go_back,refresh};