let addToy = false;
const toyUrl = "http://localhost:3000/toys"

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  document.querySelector(".add-toy-form").addEventListener('submit', (event) => {
    //default behavior and refreshing the page
    event.preventDefault()
    // console.log(event)
    addAToy(event)

  })

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  getToys()
 
});
//fetch and render toy
  function getToys() {
    fetch(toyUrl)
      .then((res) => res.json())
      .then((toyData) => { 
        toyData.forEach((toy) => renderToy(toy))
        //iterate through the toydata array with forEach
        //then call the function renderToy and send 
        //each toy from the array
      })
  }
//add toy info to card
  function renderToy(toy) {
    
    const toyBox = document.querySelector("#toy-collection")

    let toyCard = document.createElement('div')
      toyCard.className = "card"

    let toyName = document.createElement('h2')
      toyName.innerText = toy.name
    
    let toyImg = document.createElement('img')
      toyImg.src = toy.image 
      toyImg.className = "toy-avatar"

    let toyLikes = document.createElement('p')
      toyLikes.innerText =` ${toy.likes} Likes`
    
    let toyBtn = document.createElement('button')
      toyBtn.className = "like-btn"
      toyBtn.innerText = "Like <3"

      toyBtn.addEventListener('click', ()=> {
        likeAToy(toy, toyLikes)
      })


    toyCard.append(toyName, toyImg, toyLikes, toyBtn)
    toyBox.appendChild(toyCard)

  }

  function likeAToy(toy, toyLikes) {
    // console.log(toy.name,toyLikes)

    let newLikes = {
      likes: +toyLikes.innerText.split(" ")[0] + 1
    }

    let reqPack = {
      headers: {"Content-Type": "application/json"},
      method: "PATCH",
      body: JSON.stringify(newLikes)
    }

    fetch(`${toyUrl}/${toy.id}`, reqPack)
      .then(res => res.json())
      .then((toy) => {
        toyLikes.innerText = `${toy.likes} Likes`
      })
  }
//adding new to the data base
  function addAToy(event) {
    // console.log(event)
    // console.log(event.target)
    //will get us the entire form
    //make new toy, from the submit even 
    // by grabbing values form (event.target)
    let newToy = { 
      image: event.target.image.value,
      likes: 0,
      name: event.target.name.value

     }

     let reqPack = {
       headers : { "Content-Type": "application/json"},
       method: "POST",
       body: JSON.stringify(newToy)
     }

      fetch(toyUrl, reqPack)
      .then((res) => res.json())
      //we can use the same function from before renderToy 
      .then((newToy) => renderToy(newToy))

    // console.log(newToy)
    //  console.log(newToy) to see the new to 
  }
  