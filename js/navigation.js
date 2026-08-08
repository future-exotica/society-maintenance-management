const Navigation={

clearActive(){
document.querySelectorAll(".sidebar .nav-link").forEach(link=>{
link.classList.remove("active");
});
},

showDashboard(){

this.clearActive();

document.getElementById("dashboardSection").style.display="block";
document.getElementById("pendingSection").style.display="none";
if(document.getElementById("transactionsSection")){
    document.getElementById("transactionsSection").style.display="none";
}
if(document.getElementById("reportsSection")){
    document.getElementById("reportsSection").style.display="none";
}

document.getElementById("menuDashboard").classList.add("active");

},

showPending(){

this.clearActive();

document.getElementById("dashboardSection").style.display="none";
document.getElementById("pendingSection").style.display="block";
if(document.getElementById("transactionsSection")){
    document.getElementById("transactionsSection").style.display="none";
}
if(document.getElementById("reportsSection")){
    document.getElementById("reportsSection").style.display="none";
}
document.getElementById("menuPending").classList.add("active");
}
,
showTransactions(){
this.clearActive();

document.getElementById("dashboardSection").style.display="none";
document.getElementById("pendingSection").style.display="none";
if(document.getElementById("transactionsSection")){
    document.getElementById("transactionsSection").style.display="block";
}
if(document.getElementById("reportsSection")){
    document.getElementById("reportsSection").style.display="none";
}
if(document.getElementById("menuTransactions")){
    document.getElementById("menuTransactions").classList.add("active");
}
},

showReports(){
    this.clearActive();
    document.getElementById("dashboardSection").style.display="none";
    document.getElementById("pendingSection").style.display="none";
    if(document.getElementById("transactionsSection")){
        document.getElementById("transactionsSection").style.display="none";
    }
    if(document.getElementById("reportsSection")){
        document.getElementById("reportsSection").style.display="block";
    }
    if(document.getElementById("menuReports")){
        document.getElementById("menuReports").classList.add("active");
    }
}

};
