console.log('client side javascript loaded')
fetch('http://localhost:3000/weather?address=Pune').then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
        }else{
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')


    //messageone.textContent='From javascript'
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    messageone.textContent= 'loading'
    messagetwo.textContent=''
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageone.textContent = data.error
               // console.log(data.error)
            }else{
                messageone.textContent =  data.location
                messagetwo.textContent = data.forecast
                // console.log(data.location)
                // console.log(data.forecast)
            }
        })
    })
    
})