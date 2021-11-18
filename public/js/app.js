fetch('http://puzzle.mead.io/puzzle').then( (response) => {

})



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
// messageOne.textContent = 'From JavaScript'


//frorm default behaviour is to refresh the page
weatherForm.addEventListener('submit', (oEvent) => {
     oEvent.preventDefault();

     messageOne.textContent = "Loading..."
     messageTwo.textContent = ""

     const location = search.value;
      
    

     //bu call u bizim kendi serverimiza yapiyoruz
fetch('/weather?address=' + location).then( (response) => {
    response.json().then( (data) => {
        if(data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }

    })
})
})

 function Person(age, name) {
     this.name = name; 
     this.age = age;
 }

 var kamil = new Person("33", "Kamil");