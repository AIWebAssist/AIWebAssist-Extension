function refresh(){
    location.reload();
    return undefined;

}

function go_back(){
    try{
        window.history.back();
    } catch (error){
        return "failed to back "+error
    }
    return undefined;

}

function move_to_url(url){
    if (!url.startsWith("http://") && !url.startsWith("https://")){
        return "you should provide a url with http or https prefix."
    }

    window.location.href = url;

    if (window.location.href !== url){
        return "new url is not "+url;
    }
    return undefined;

}

export {move_to_url,go_back,refresh};