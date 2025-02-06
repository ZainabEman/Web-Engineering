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
// // myEl.remove;
// 
let count=0;
function incrementCounter(){
    return count++;
}
myButton.addEventListener("click",()=>{alert('i am clicked')});
myEl.addEventListener('click', incrementCounter);
myButton.addEventListener("mouseover", function() {
    myButton.style.color = "red";
});
let element=document.getElementsByTagName("*");
console.log(element);
for (let i = 0; i < element.length; ++i) { 
    console.log(element[i]);
}
