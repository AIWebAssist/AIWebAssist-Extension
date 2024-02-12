function refresh(){
    location.reload();
    return {
        execution_status: true,
        data:{
            url:window.location.href
        }
    };

}

function go_back(){
    try{
        window.history.back();
    } catch (error){
        return {
            execution_status: false,
            message: "failed to back "+error
        };   
    }
    return {
        execution_status: true,
        data:{
            url:window.location.href
        }
    };

}

function move_to_url(url){
    if (!url.startsWith("http://") && !url.startsWith("https://")){
        return {
            execution_status: false,
            message: "you should provide a url with http or https prefix."
        }
    }

    window.location.href = url;

    // any additional validation here require adding this into the next page onloading
    return {
        execution_status: true,
        data: {
            url: window.location.href
        }
    }
}

export {move_to_url,go_back,refresh};