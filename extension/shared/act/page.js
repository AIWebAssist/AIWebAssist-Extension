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

function move_to_url(url) {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        return "you should provide a url with http or https prefix.";
    }

    window.location.href = url;

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (window.location.href !== url) {
                resolve({
                    execution_status: false,
                    message: "url miss-match " + window.location.href
                });
            } else {
                resolve({
                    execution_status: true,
                    data: {
                        url: window.location.href
                    }
                });
            }
        }, 2000); // Adjust timeout duration as needed
    });
}

export {move_to_url,go_back,refresh};