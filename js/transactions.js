const Transactions={
render(){
const data=DataStore.get();
let html="";
data.forEach(t=>{
html+=`
<tr>
<td>${t.date}</td>
<td>${t.voucherNo}</td>
<td>${t.flatNo}</td>
<td>${t.ownerName}</td>
<td>${t.category}</td>
<td class="credit">${t.credit?Utils.currency(t.credit):""}</td>
<td class="debit">${t.debit?Utils.currency(t.debit):""}</td>
<td>${t.paymentMode}</td>
<td>${t.status}</td>
</tr>`;
});
document.getElementById("transactionTable").innerHTML=html;
}
};