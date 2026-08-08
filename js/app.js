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

document.getElementById("menuTransactions").addEventListener("click",(e)=>{
    e.preventDefault();
    Filters.apply();
    Navigation.showTransactions();
});

if(document.getElementById("menuReports")){
    document.getElementById("menuReports").addEventListener("click",(e)=>{
        e.preventDefault();
        // make sure filters are applied so month options are correct
        Filters.apply();
        Navigation.showReports();
        Reports.generate();
    });
}

// when month changes, update report view as well
const monthEl = document.getElementById("monthFilter");
if(monthEl){
    monthEl.addEventListener('change', ()=>{
        Reports.generate();
    });
}

// generate/print buttons on reports
const genBtn = document.getElementById('generateReportBtn');
if(genBtn) genBtn.addEventListener('click', ()=>Reports.generate());
const printBtn = document.getElementById('printReportBtn');
if(printBtn) printBtn.addEventListener('click', ()=>window.print());
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
