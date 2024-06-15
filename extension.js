let myleads = [];
let oldleads = [];
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const inputBtn = document.getElementById("input-btn");
const delBtn = document.getElementById("del-btn");
const saveBtn = document.getElementById("savebtn");
const delStr=document.getElementById("del-str");
const delEnd=document.getElementById("del-end");

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
    myleads = leadsFromLocalStorage;
    render(myleads);
}

delBtn.addEventListener("dblclick", function () {
    localStorage.clear();
    myleads = [];
    render(myleads);
});

inputBtn.addEventListener("click", function () {
    myleads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myleads));
    render(myleads);
});

delStr.addEventListener('click', function(){
    if (myleads && myleads.length > 0) {
        myleads.shift();
    }
    localStorage.setItem("myLeads", JSON.stringify(myleads));
    render(myleads);
})
delEnd.addEventListener('click',function(){
    if(myleads && myleads.length>0){
        myleads.pop();
    }
    localStorage.setItem("myLeads", JSON.stringify(myleads));
    render(myleads);
})


saveBtn.addEventListener("click", function () {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        const currentTabUrl = tabs[0].url;
        myleads.push(currentTabUrl);
        localStorage.setItem("myLeads", JSON.stringify(myleads));
        render(myleads);
    });
});


function render(leads) {
    let lit = "";
    for (let i = 0; i < leads.length; i++) {
        lit += `<li>
            <a target='_blank' href='${leads[i]}'>
                ${leads[i]}
            </a>
        </li>`;
    }
    ulEl.innerHTML = lit;
}

