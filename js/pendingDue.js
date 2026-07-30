const PendingDue={

render(){

const data=DataStore.get();

console.log("Filtered Data Count:",data.length);

console.table(data);

const rows=data.filter(t=>
String(t.category).trim().toLowerCase()==="maintenance"
);

console.log("Maintenance Rows:",rows.length);

const tbody=document.querySelector("#pendingTable tbody");

let html="";

rows.forEach(t=>{

html+=`
<tr>
<td>${t.flatNo}</td>
<td>${t.ownerName}</td>
<td>${t.month}</td>
<td>${t.expectedMaintenance}</td>
<td>${t.credit}</td>
<td>${t.expectedMaintenance-t.credit}</td>
<td>${t.expectedMaintenance>t.credit?"Pending":"Paid"}</td>
</tr>
`;

});

tbody.innerHTML=html;

}

};