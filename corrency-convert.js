// selecting elements; 
const selectOne = document.getElementById('selectOne')
const selectTwo = document.getElementById('selectTwo')
//
//onload function function
window.onload = selectsContentFunc()
selectsContentFunc(){
    let currenciesKeysUrl = 'https://api.frankfurter.dev/v1/currencies'
    fetch(currenciesKeysUrl).then(result => {
        if(!result.ok) throw new Error('')
        
    })
}