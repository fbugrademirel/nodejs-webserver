console.log("Client side javascript code is loaded!")
const weatherForm = document.querySelector('form')
const searchValue = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = 'Loading...'
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (e) => {

    e.preventDefault()

    const location = searchValue.value

    fetch('http://127.0.0.1:3000/weather?location=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                console.log(data.error)
                messageOne.textContent = data.error 
                messageTwo.textContent = ''
            } else {
                messageOne.textContent = data.temp+' degree celcius'
                messageTwo.textContent = data.desc
            }
        })
    })
})

