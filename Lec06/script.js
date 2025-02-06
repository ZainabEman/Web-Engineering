// document.getElementById("hello");
// document.querySelector(.hello)
//let mainEl=document.getElementById("zainab");
// console.log(mainEl.childNodes);
// console.log(mainEl.firstChild);
// console.log(mainEl.lastChild);
// let mainEl=document.getElementById("hello").innerText="Manipulated";
// let mainEl=document.getElementsByTagName("zainab").innerHTML="<h1>i am changed</h1>";
// let mainEl=document.getElementById("ayesha");
// mainEl.innerText="i am ayesha";
// mainEl.style.color="purple";
// mainEl.style.backgroundColor="pink";
// let myimage=document.getElementById("image");
// myimage.src="";
let myEl=document.createElement("div");
let myButton=document.createElement("button");
myButton.innerText="Zainab";
myEl.appendChild(myButton);
document.body.appendChild(myEl);
// myEl.remove;
myButton.addEventListener("click",()=>console.log("ayesha hoon mainn"))