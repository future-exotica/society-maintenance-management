const Ledger={

open(flatNo){

const transactions=DataStore
.getAll()
.filter(t=>t.flatNo==flatNo);

let expected=0;
let received=0;

transactions.forEach(t=>{

expected+=t.expectedMaintenance;

received+=t.credit;

});

document.getElementById("ledgerExpected").innerHTML=
Utils.currency(expected);

document.getElementById("ledgerReceived").innerHTML=
Utils.currency(received);

document.getElementById("ledgerOutstanding").innerHTML=
Utils.currency(expected-received);

document.getElementById("ledgerCount").innerHTML=
transactions.length;

const tbody=document.getElementById("ledgerTable");

tbody.innerHTML="";

transactions.forEach(t=>{

tbody.innerHTML+=`

<tr>

<td>${t.date}</td>

<td>${t.month}</td>

<td>${t.voucherNo}</td>

<td>${Utils.currency(t.expectedMaintenance)}</td>

<td>${Utils.currency(t.credit)}</td>

<td>${t.status}</td>

</tr>

`;

});

const modal=new bootstrap.Modal(

document.getElementById("ledgerModal")

);

modal.show();

}

};