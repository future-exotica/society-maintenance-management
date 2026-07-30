const Dashboard={
initialize(){
document.getElementById("lastRefresh").textContent="-";
},
update(){
const totals=Calculator.calculate(DataStore.get());
document.getElementById("currentBalance").textContent=Utils.currency(totals.currentBalance);
document.getElementById("totalCredit").textContent=Utils.currency(totals.totalCredit);
document.getElementById("totalDebit").textContent=Utils.currency(totals.totalDebit);
document.getElementById("expectedMaintenance").textContent=Utils.currency(totals.expectedMaintenance);
document.getElementById("maintenanceReceived").textContent=Utils.currency(totals.maintenanceReceived);
document.getElementById("outstandingMaintenance").textContent=Utils.currency(totals.outstandingMaintenance);
document.getElementById("collectionEfficiency").textContent=totals.collectionEfficiency.toFixed(2)+"%";
document.getElementById("pendingFlats").textContent=totals.pendingFlats;
document.getElementById("lastRefresh").textContent=new Date().toLocaleString("en-IN");
}
};