const SocietyApp={

async init(){

Loading.show();

try{

Dashboard.initialize();

await GoogleSheet.loadTransactions();

Filters.populate();

Filters.apply();

Navigation.showDashboard();

this.bindEvents();

}
finally{

Loading.hide();

}

},

bindEvents(){

document.getElementById("monthFilter").addEventListener("change",Filters.apply);
document.getElementById("flatFilter").addEventListener("input",Filters.apply);
document.getElementById("categoryFilter").addEventListener("change",Filters.apply);
document.getElementById("searchText").addEventListener("input",Filters.apply);

document.getElementById("menuDashboard").addEventListener("click",(e)=>{
e.preventDefault();
Navigation.showDashboard();
});

document.getElementById("menuPending").addEventListener("click",(e)=>{
e.preventDefault();
Filters.apply();
Navigation.showPending();
});

document.getElementById("refreshBtn").addEventListener("click",async()=>{

Loading.show("Refreshing data...");

try{

await GoogleSheet.loadTransactions();

Filters.populate();

Filters.apply();

}
finally{

Loading.hide();

}

});

}

};

document.addEventListener("DOMContentLoaded",()=>SocietyApp.init());
