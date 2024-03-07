const inputSlider = document.querySelector("[data-lengthSlider]");

const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwardDisplay]");

const copyBtn = document.querySelector("[data-copy]");

const copyMsg = document.querySelector("[data-copyMsg]");

const uppecaseCheck = document.querySelector("#uppercase");

const lowercaseCheck = document.querySelector("#lowercase");

const numberCheck = document.querySelector("#numbers");

const symbolCheck = document.querySelector("#symbols");

const indicator = document.querySelector("[data-indicator]");

const generateBtn = document.querySelector(".generateBtn");

const allCheckBox = document.querySelectorAll("input[type=checkbox]");

const symbols = '~`!@#$%^&*()_-+={}[]|;:"<,>.?/';

let password = "";

let passwordLength = 10;

let checkCount = 0;
handleSlider();
// set strength circle color to grey
setIndicator("#ccc");
//set password length
function handleSlider() {
  inputSlider.value = passwordLength;
  lengthDisplay.innerHTML = passwordLength;

  const min = inputSlider.min;
  const max = inputSlider.max;
  inputSlider.style.backgroundSize = ((passwordLength - min)*100/(max - min))+"%100%";
}

function setIndicator(color) {
  indicator.style.backgroundColor = color;
  //shadow
  indicator.style.boxShadow = `0px 0px 12px 1px ${color}`
}

function getRndNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber() {
  return getRndNumber(0, 9);
}
function generateLowerCase() {
  return String.fromCharCode(getRndNumber(97, 103));
}
function generateUpperCase() {
  return String.fromCharCode(getRndNumber(65, 91));
}

function generateSymbol() {
  const randNum = getRndNumber(0, symbols.length);
  return symbols.charAt(randNum);
}

function calcStrength() {
  let hasUpper = false;
  let hasLower = false;
  let hasNum = false;

  let hasSym = false;

  if (uppecaseCheck.checked) hasUpper = true;

  if (lowercaseCheck.checked) {
    hasLower = true;
  }
  if (numberCheck.checked) {
    hasNum = true;
  }
  if (symbolCheck.checked) {
    hasSym = true;
  }

  if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
    setIndicator("$0f0");
  } else if (
    (hasLower || hasUpper) &&
    (hasNum || hasSym) &&
    passwordLength >= 6
  ) {
    setIndicator("#ff0");
  } else {
    setIndicator("#f00");
  }
}

async function copyContent(){

    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerHTML = "copied";
    }catch(e){
        copyMag.innerHTML = "failed";
    }

    copyMsg.classList.add("active");
    setTimeout(() =>{
        copyMsg.classList.remove("active");
    },1000);
}


function shufflePassword(Array)
{
    // fisher yetes method

    for(let i = Array.length - 1; i > 0; i--)
    {

        // every time find j randomly
        const j = Math.floor(Math.random()*(i + 1));
        const temp = Array[i];
        Array[i] = Array[j];
        Array[j] = temp;
    }
    let str = "";

    Array.forEach((el) =>{
        str += el;
    })

    return str;

}

function handleCheckBoxChange(){
    checkCount = 0;

    allCheckBox.forEach((checkbox) =>{
        if(checkbox.checked)
        {
            checkCount++;
        }
    });
    // special condition 

    if(passwordLength < checkCount)
    {
        passwordLength = checkCount;
        handleSlider();
    }
}
allCheckBox.forEach((checkbox) =>{
    checkbox.addEventListener('change',handleCheckBoxChange);
})
inputSlider.addEventListener('input',(e) =>{
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click',(e) =>{
    if(passwordDisplay.value)
    {
        copyContent();
    }
})

generateBtn.addEventListener('click',(e) =>{

    // none of the checkbox are selected 

    if(checkCount == 0) 
        return;

    if(passwordLength < checkCount)
    {
        passwordLength = checkCount;
        handleSlider();
    }

    // find the new passWord

    // firsty remove old password

    password = "";

    // put the stuff mentioned by checkboxes

    // if(uppecaseCheck.checked)
    // {
    //     password += generateUpperCase();
    // }
    // if(lowercaseCheck.checked)
    // {
    //     password += generateLowerCase();
    // }
    // if(numberCheck.checked)
    // {
    //     password += generateRandomNumber();
    // }
    // if(symbolCheck.checked)
    // {
    //     password += generateSymbol();
    // }


    let funcArr = [];
    if(uppecaseCheck.checked)
    {
        funcArr.push(generateUpperCase);
    }

    if(lowercaseCheck.checked)
    {
        funcArr.push(generateLowerCase);
    }
    if(numberCheck.checked)
    {
       funcArr.push(generateRandomNumber);
    }
    if(symbolCheck.checked)
    {
        funcArr.push(generateSymbol);
    }

    // complsury addition, size no of checkboxes checked
   for(let i = 0; i < funcArr.length; i++)
   {
        let randIndex = getRndNumber(0,funcArr.length);
        password += funcArr[randIndex]();
   }
    for(let i = 0; i < passwordLength - funcArr.length; i++)
    {
        let randIndex = getRndNumber(0,funcArr.length);
        password += funcArr[randIndex]();
    }

    // shuffle the password;

    password = shufflePassword(Array.from(password));

    //show password o UI;

    passwordDisplay.value = password;

    //calculate strength;

    calcStrength();

})