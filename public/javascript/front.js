let w1= document.getElementById("w1");
let b1 = document.getElementById("b1");

w1.addEventListener("mouseover",function(){
    b1.style.display = "block";
   
})

let w2= document.getElementById("w2");
let b2 = document.getElementById("b2");

w2.addEventListener("mouseover",function(){
    b2.style.display = "block";
   
})

let w3= document.getElementById("w3");
let b3 = document.getElementById("b3");

w3.addEventListener("mouseover",function(){
    b3.style.display = "block";
   
})
let w4= document.getElementById("w4");
let b4 = document.getElementById("b4");

w4.addEventListener("mouseover",function(){
    b4.style.display = "block";
   
})
let w5= document.getElementById("w5");
let b5 = document.getElementById("b5");

w5.addEventListener("mouseover",function(){
    b5.style.display = "block";
   
})
let w6= document.getElementById("w6");
let b6 = document.getElementById("b6");

w6.addEventListener("mouseover",function(){
    b6.style.display = "block";
   
})
let w7= document.getElementById("w7");
let b7 = document.getElementById("b7");

w7.addEventListener("mouseover",function(){
    b7.style.display = "block";
   
})
let w8= document.getElementById("w8");
let b8 = document.getElementById("b8");

w8.addEventListener("mouseover",function(){
    b8.style.display = "block";
   
})

let sign = document.getElementById("sign")
let log = document.getElementById("log")
let num = document.getElementById("num")


if (num!=null) {
    
        log.style.display = "none";
        sign.style.display = "none";
    
}
else{
    log.style.display = "block";
    
}


let btn = document.getElementById("btn")
let img = document.getElementById("img")
let profil = document.getElementById("profile")


btn.addEventListener("click", myFunction);

function myFunction() {
    profil.style.display = "block";
   
}
let v = true

img.addEventListener("click",function(){
    profil.style.visibility = "hidden";
    if (v) {
        window.location.reload();
    }
    v= false
})

let ck = document.getElementById("ck")
let bn = document.getElementById("bn")

let z =true

if(z){
ck.style.display  = "hidden"
bn.style.display  = "block"
z = false
}

if(num!=null||z!=true){
ck.style.display  = "block"
bn.style.display = "none"
}


// gsap home.js




