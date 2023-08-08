function condition(question_string,keywords){
    for (const i of keywords){
        if (!question_string.includes(i)){
            return false;
        }
    }
    return true
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request["msg"]=="gettitle"){
        console.log(request)
        let title = document.title;
        sendResponse(title);
    }
    if (request["msg"] =="search"){
        let result_list = [];
        const elements = document.getElementsByClassName("group w-full text-token-text-primary border-b border-black/10 dark:border-gray-900/50 dark:bg-gray-800");
        let j=0; 
        for (const i of elements){
            if (condition(i.outerText,request["keywords"])){
                result_list.push([j,i.outerText]);
            }
            j++;
        }
        console.log(result_list);
        sendResponse(result_list);
    }
    if (request["msg"] =="result_selected"){
        console.log(request);
        const elements = document.getElementsByClassName("group w-full text-token-text-primary border-b border-black/10 dark:border-gray-900/50 dark:bg-gray-800");
        elements[Number(request["custom_index"])].scrollIntoView({ behavior: "smooth" });
        sendResponse(true);
    }
});