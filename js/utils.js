const Utils={
currency(value){
return CONFIG.CURRENCY+Number(value||0).toLocaleString("en-IN");
},
number(value){
return Number(value||0);
},
text(value){
return value??"";
}
};