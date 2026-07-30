const GoogleSheet={

async loadTransactions(){

const response=await fetch(CONFIG.API_URL);

if(!response.ok){

throw new Error("Unable to load data.");

}

const data=await response.json();

const transactions=data.map(r=>({

transactionId:r["Transaction ID"]||"",

date:r["Date"]||"",

month:r["Month"]||"",

voucherNo:r["Voucher No"]||"",

transactionType:r["Transaction Type"]||"",

category:r["Category"]||"",

flatNo:r["Flat No"]||"",

ownerName:r["Owner/Tenant"]||"",

mobile:r["Mobile"]||"",

email:r["Email"]||"",

expectedMaintenance:Number(r["Expected Maintenance"]||0),

credit:Number(r["Credit"]||0),

debit:Number(r["Debit"]||0),

paymentMode:r["Payment Mode"]||"",

transactionReference:r["Transaction Reference"]||"",

status:r["Status"]||"",

remarks:r["Remarks"]||""

}));

DataStore.set(transactions);

}

};