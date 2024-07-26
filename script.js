const inputslider=document.querySelector("[data-lengthSlider]");
const lengthdisplay=document.querySelector("[data-lengthNumber]");
const passworddisplay=document.querySelector("[data-passwordDisplay]");
const copybtn=document.querySelector("[data-copy]");
const copymsg=document.querySelector("[data-copyMsg]");
const uppercasecheck=document.querySelector("#uppercase");
const lowercasecheck=document.querySelector("#lowercase");
const numbercheck=document.querySelector("#numbers");
const symbolcheck=document.querySelector("#symbols");
const indicator=document.querySelector("[data-indicator]")
const generatebtn=document.querySelector(".generateButton");
const allcheckbox=document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password="";
let passwordlength=0;
let checkcount=0;
handleslider();
setindicator("#ccc");

function handleslider(){
    inputslider.value=passwordlength;
    lengthdisplay.innerText=passwordlength;
    const min=inputslider.min;
    const max=inputslider.max;
    inputslider.style.backgroundSize = ( (passwordlength - min)*100/(max - min))  + "% 100%"

}

function setindicator(color){
    indicator.style.backgroundColor=color;
    indicator.style.boxShadow=`0px 0px 12px 1px ${color}`;
}

function getrandominteger(min,max){
   return Math.floor(Math.random()*(max-min))+min;
}

function generateuppercase(){
    return  String.fromCharCode(getrandominteger(65,91));
 
 }
 
 function generatesymbol(){
     const rand =getrandominteger(0,symbols.length);
     return symbols.charAt(rand);
 }

function generaterandomnumber(){
    return getrandominteger(0,9);
}

function generatelowercase(){
    return String.fromCharCode(getrandominteger(97,123));

}



function calcstrength(){
    let hasupperc =false;
    let haslowerc =false;
    let hasnum=false;
    let hassym=false;

    if(uppercasecheck.checked) hasupperc=true;
    if(lowercasecheck.checked) haslowerc=true;
    if(numbercheck.checked) hasnum=true;
    if(symbolcheck.checked) hasupperc=true;

    if(hasupperc && haslowerc &&(hasnum || hassym) && passwordlength>=0){
        setindicator("#0f0");
    }
    else if(
        (haslowerc || hasupperc)&&
        (hasnum || hassym) &&
        passwordlength>=6
    ){
        setindicator("#ff0");
    }
    else{
        setindicator("#f00");
    }

}

async function copycontent(){
    try{
        await navigator.clipboard.writeText(passworddisplay.value);
        copymsg.innerText="Copied";
    }
    catch(e){
        copymsg.innerText="failed";
    }
    copymsg.classList.add("active");

    setTimeout(() => {
        copymsg.classList.remove("active");
    }, 2000);
    
   
}

inputslider.addEventListener('input',(e)=>{
    passwordlength=e.target.value;
    handleslider();
})

copybtn.addEventListener('click',()=>{
    if(passworddisplay.value){
        copycontent();
    }
})

function handlecheckboxchange(){
    checkcount=0;
    allcheckbox.forEach((checkbox) => {
        if(checkbox.checked){
            checkcount++;
        }
        
    });
    if(passwordlength<checkcount){
        passwordlength=checkcount;
        handleslider();
    }
}
allcheckbox.forEach((checkbox) => {
    checkbox.addEventListener('change',handlecheckboxchange);
})

function shuffle(array){
    for(let i=array.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        const temp=array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    let str="";
    array.forEach((el)=>(str+=el));
    return str;
}
generatebtn.addEventListener('click',()=>{
    if(checkcount<=0){
        return ;
    }
    if(passwordlength<checkcount){
        passwordlength=checkcount;
        handleslider();
    }
    password="";

    // if(uppercasecheck.checked){
    //     password+=generateuppercase();
    // }
    // ;

    // if(lowercasecheckcasecheck.checked){
    //     password+=generatelowercase();
    // }
    // ;

    // if(symbolcheck.checked){
    //     password+=generatesymbol();
    // }
    // ;

    // if(numbercheck.checked){
    //     password+=generaterandomnumber();
    // }
   
    let funarr=[];
    if(uppercasecheck.checked){
        funarr.push(generateuppercase);
    }

    if(lowercasecheck.checked){
        funarr.push(generatelowercase);
    }

    if(symbolcheck.checked){
        funarr.push(generatesymbol);
    }

    if(numbercheck.checked){
        funarr.push(generaterandomnumber);
    }

    for(let i=0;i<funarr.length;i++){
        password+=funarr[i]();
    }
    

    for(let i=0;i<passwordlength-funarr.length;i++){
        let ranindex=getrandominteger(0,funarr.length);
        password+=funarr[ranindex]();
    }

    password=shuffle(Array.from(password));

    passworddisplay.value=password;

    calcstrength();
})





