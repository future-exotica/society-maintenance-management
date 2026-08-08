const Filters={

populate(){

const data=DataStore.getAll();
const months=[...new Set(
data
.map(t=>String(t.month||"").trim())
.filter(Boolean)
)].sort((a,b)=>new Date("1 "+a)-new Date("1 "+b));

const categories=[...new Set(
data
.map(t=>String(t.category||"").trim())
.filter(Boolean)
)].sort();

const month=document.getElementById("monthFilter");
let monthHtml='<option value="All">All</option>';

months.forEach(m=>{
monthHtml+=`<option value="${m}">${m}</option>`;
});

month.innerHTML=monthHtml;

const category=document.getElementById("categoryFilter");
let categoryHtml='<option value="All">All</option>';

categories.forEach(c=>{
categoryHtml+=`<option value="${c}">${c}</option>`;
});

category.innerHTML=categoryHtml;

},

apply(){

let data=[...DataStore.getAll()];

const selectedMonth=document.getElementById("monthFilter").value.trim();
const flat=document.getElementById("flatFilter").value.trim().toLowerCase();
const category=document.getElementById("categoryFilter").value.trim();
const search=document.getElementById("searchText").value.trim().toLowerCase();

if(selectedMonth!=="All"){
data=data.filter(t=>String(t.month||"").trim()===selectedMonth);
}

if(flat!==""){
data=data.filter(t=>
String(t.flatNo||"").toLowerCase().includes(flat)
);
}

if(category!=="All"){
data=data.filter(t=>
String(t.category||"").trim()===category
);
}

if(search!==""){
data=data.filter(t=>
String(t.ownerName||"").toLowerCase().includes(search)||
String(t.voucherNo||"").toLowerCase().includes(search)||
String(t.transactionReference||"").toLowerCase().includes(search)||
String(t.remarks||"").toLowerCase().includes(search)
);
}

DataStore.setFiltered(data);

Dashboard.update();

Transactions.render();
PendingDue.render();

}

};
