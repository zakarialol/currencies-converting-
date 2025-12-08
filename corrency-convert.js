// selecting elements; 
const selectOne = document.getElementById('selectOne')
const selectTwo = document.getElementById('selectTwo')
const convertBtn = document.getElementById('convertBtn')
const inputValue = document.getElementById('amount-input')
const finalResult = document.getElementById('finalResult')
const errMsgHolder = document.getElementById('errMsgHolder')
const errTextHolder = document.querySelector('#errMsgHolder .errTextHolder ')
//
//onload function function
window.onload = selectsContentFunc
function selectsContentFunc(){
    let currenciesKeysUrl ='https://api.frankfurter.dev/v1/currencies'
    fetch(currenciesKeysUrl).then(result => {
        if(!result.ok) throw new Error('no response from url')
        return result.json()
    }).then(result=>{
        if(!result) throw new Error('no data')
        putItemsInsideSelectsFunc(result)
    }).catch(err =>{
        if(!navigator.onLine){
            errMessageFunc('check your internet')
        }else{
            errMessageFunc(err.message)
        }
    })
}
// function to handle selects
function putItemsInsideSelectsFunc(currenciesLogo){
    let currenciesKeys = Object.keys(currenciesLogo)
    // fill selects
    let currencies3Letters = '';
    currenciesKeys.forEach((itm)=>{
        currencies3Letters += `<option value="${itm}">${itm}</option>`
    })
    //
    selectOne.innerHTML= currencies3Letters
    selectTwo.innerHTML = currencies3Letters
}
//convete Button 
convertBtn.addEventListener('click',convertFunc)
function convertFunc(){
    if(!handleInputFunc()) return;
    convertBtn.disabled = true
    let selectOneValue = selectOne.value.trim()
    let selectTwoValue = selectTwo.value.trim()
    let convertingUrl =   `https://api.frankfurter.dev/v1/latest?base=${selectOneValue}&symbols=${selectTwoValue}`;

    fetch(convertingUrl).then(result =>{
            if(!result.ok) {
                return result.json().then(err=>{
                    if(err.message === 'not found'){
                        throw new Error(`can't convert this currency to ${selectTwo.value.trim().toLowerCase()}`)
                    }
                    if(err.message === 'bad currency pair'){
                        throw new Error("can't change to same currency")
                    }
                    throw new Error(result.message||"semething went wrong")
                })
            }
            return result.json()
        }).then(result => {
            showFinalRsultFunc(result)
        })
        .catch(err=>{
        if(!navigator.onLine){
            errMessageFunc('check your internet')
        }else{
            errMessageFunc(err.message)
        }
    }).finally(()=>{
        convertBtn.disabled = false
    })
}
// show message in the dom function 
function errMessageFunc(msg){
    errTextHolder.textContent = msg
    let errMsgHolderHeight = errMsgHolder.scrollHeight
    errMsgHolder.style.height = errMsgHolderHeight + 'px'
    // setTimeout
    setTimeout(()=>{
        errMsgHolder.style.height = 0 + 'px'
    },2000)
}
// showing final rsult to the dom 
function showFinalRsultFunc(result){
    // calculation of the rsult 
        let calcletedRsult = inputValue.value.trim() * Object.values(result.rates)[0]
    // appending rsult to the dom
        finalResult.innerHTML = `<p>${calcletedRsult.toFixed(2)}</p>`
}
// handling input value here 
function handleInputFunc(){
    let inputRegex = /^\d+(\.\d+)?$/
    let inputStatus = inputRegex.test(inputValue.value.trim())
    if(inputValue.value.trim()=== '' || !inputStatus){
        errMessageFunc('please type valid number')
        return false;
    }else{
        return true;
    }
}
