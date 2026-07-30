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

document.getElementById("menuDashboard").classList.add("active");

},

showPending(){

this.clearActive();

document.getElementById("dashboardSection").style.display="none";
document.getElementById("pendingSection").style.display="block";
if(document.getElementById("transactionsSection")){
    document.getElementById("transactionsSection").style.display="none";
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
if(document.getElementById("menuTransactions")){
    document.getElementById("menuTransactions").classList.add("active");
}
}

};
