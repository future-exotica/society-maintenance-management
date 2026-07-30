const Calculator={
calculate(data){
const result={
totalCredit:0,
totalDebit:0,
expectedMaintenance:0,
maintenanceReceived:0,
outstandingMaintenance:0,
currentBalance:0,
collectionEfficiency:0,
pendingFlats:0
};
const paidFlats=new Set();
data.forEach(t=>{
result.totalCredit+=t.credit;
result.totalDebit+=t.debit;
if(t.transactionType==="Maintenance"){
result.expectedMaintenance+=t.expectedMaintenance;
result.maintenanceReceived+=t.credit;
if(t.credit>0) paidFlats.add(t.flatNo);
}
});
result.currentBalance=result.totalCredit-result.totalDebit;
result.outstandingMaintenance=result.expectedMaintenance-result.maintenanceReceived;
if(result.expectedMaintenance>0){
result.collectionEfficiency=(result.maintenanceReceived/result.expectedMaintenance)*100;
}
result.pendingFlats=CONFIG.TOTAL_FLATS-paidFlats.size;
return result;
}
};