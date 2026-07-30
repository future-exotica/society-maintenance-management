const Loading={

show(message="Loading Society Data..."){
document.getElementById("loadingMessage").textContent=message;
document.getElementById("loadingOverlay").classList.add("show");
},

hide(){
document.getElementById("loadingOverlay").classList.remove("show");
}

};