
function print_log(text){
    const log_space = window.document.getElementById("log");
    const log = window.document.createElement("div");
    log.textContent=text;
    log.setAttribute("class","log");
    log_space.append(log)
}

function print_title(title){
    let gas_title = document.getElementById("gas_title");
    gas_title.textContent=title;
}

function set_title() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(
            tabs[0].id,
            {"msg":"gettitle"}
            ,
            (content) => {
                if (!content) {
                    alert('chat-gptを開いてください.\n開いてるよ！って方は再読み込みしてみて');
                    return;
                }
                print_title(content);
            }
        );
    });
}

function search(){
    // 親要素を取得
    const parentElement = document.getElementById("search_result");

    // 子要素をすべて削除
    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    }
    let keyword_strings = document.getElementById("keywords");
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(
            tabs[0].id,
            {
                "msg": "search",
                "keywords" : keyword_strings.value.split(' ')
            }
            ,
            (content) => {
                console.log(content)
                if (!content) {
                    alert('データの取得ミス');
                    return;
                }
                const search_result = document.getElementById("search_result");
                for (const i of content){
                    const result = document.createElement("div");
                    result.textContent = i[1];
                    result.setAttribute("class", "result");
                    result.setAttribute("custom_index", i[0]);
                    result.addEventListener("click",result_selected);
                    search_result.appendChild(result);
                }
            }
        );
    });
}

function result_selected(e){
    const elem = e.target;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(
            tabs[0].id,
            {
                "msg": "result_selected",
                "custom_index": elem.getAttribute("custom_index")
            }
            ,
            (content) => {
                if (!content) {
                    alert('ごめん、ジャンプできんかった');
                    return;
                }
            }
        );
    });
}

set_title()

let search_button = document.getElementById("search");
search_button.addEventListener("click",search)