const DataStore={
transactions:[],
filteredTransactions:[],
set(data){
this.transactions=data;
this.filteredTransactions=[...data];
},
getAll(){
return this.transactions;
},
get(){
return this.filteredTransactions;
},
setFiltered(data){
this.filteredTransactions=data;
}
};