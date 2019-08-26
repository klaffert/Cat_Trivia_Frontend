let correctAnswer

// Questions API
let randomURL = 'http://localhost:3000/api/v1/random'

// Hide Elements
document.getElementById("question-page").style.visibility = 'hidden'
document.getElementById("username").style.visibility = 'hidden'
document.getElementById("profile-container").style.visibility = 'hidden'
document.getElementById("go-home").style.visibility = 'hidden'
 
document.getElementById("ready-button").addEventListener("click", function() {
  hide("welcome-message");

  // Show Elements on Questions Page
  document.getElementById("question-page").style.visibility = 'visible'
  document.getElementById("username").style.visibility = 'visible'
  document.getElementById("profile-container").style.visibility = 'visible'
  document.getElementById("go-home").style.visibility = 'visible'
})

function hide (id) {
  if (document.getElementById(id).className == "hide-home") {
    var divid = document.getElementById(id)
    var divs = document.getElementsByClassName("hide-home")
    for(div of divs) {
      div.style.display = "none"
    }
    divid.style.display = "block"
  }
  return false
}


//POST submit username & profile pic choice
const readyButton = document.getElementById("submit-form")
readyButton.addEventListener("submit", function(event) {
  event.preventDefault()
  const profileBox = document.getElementById("profile-container")
  const userInput = event.target[0].value

  const profilePic1 = document.getElementById("picture1")
  const profilePic2 = document.getElementById("picture2")
  const profilePic3 = document.getElementById("picture3")
  const profilePic4 = document.getElementById("picture4")
  const profilePic5 = document.getElementById("picture5")
  const profilePic6 = document.getElementById("picture6")

  const pictures = [profilePic1, profilePic2, profilePic3, profilePic4, profilePic5, profilePic6]
  
  const pictureArray = document.getElementsByTagName("img")

  var userProfilePic;
  for (let i=0; i<pictures.length;i++) {
    if (pictures[i].checked) {
        userProfilePic = pictures[i].value
        
    }
  }

  let profilePicture
  for (let i=0; i<pictureArray.length; i++) {
    if (pictures[i].checked) {
      profilePicture = pictureArray[i].src
  
    }
  }


  const addedUser = {
    "name": userInput,
    "profile_picture_id": userProfilePic,
    "score": 0,
  }
  
  fetch('http://localhost:3000/api/v1/users', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(
      addedUser
    )
  })
  .then(response => {
    return response.json()
  })
  .then(json => {
    sessionStorage.setItem("name", JSON.stringify(json))
  })

  profileBox.innerText = addedUser.name
  // console.log
  profileBox.append(profilePicture)
  // debugger
  // addedUser.profile_picture_id
  
})


// Tell user if question is right/wrong
document.getElementById("question-form").addEventListener("submit", function(event) {
  event.preventDefault();

  var userAnswerNode;
  var initialScore = JSON.parse(sessionStorage.getItem("name")).score 
  var userId = JSON.parse(sessionStorage.getItem("name")).id
  var newScore = parseInt(initialScore) + 1

  for (let i = 0; i < event.target.answer.length; i++) {
    const node = event.target.answer[i];
    if(node.checked) { userAnswerNode = node}
  }
  if(userAnswerNode.value == correctAnswer) {
    fetch(`http://localhost:3000/api/v1/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "score": newScore
      })
    })
    .then(function(response) {
    return response.json()
      })
    .then(function(json) {
    sessionStorage.setItem("name", JSON.stringify(json))
      })
    newQuestion()
    clearRadio()
    }
  else {
    // newQuestion()
   alert("Incorrect! Try again.")
  }
  })
// new question after each submit
newQuestion()

//GET random questions from API
function newQuestion () {
  fetch(randomURL)
  .then(function(response) {
    return response.json()
  })
  .then(function(json) {
    const data = json
    const questionPage = document.getElementById("question-page")
    const randomQuestion = `${data.question}`
    
    const answerList = document.getElementById("answer-list")
    const a1 = `${data.answer1}`
    const a2 = `${data.answer2}`
    const a3 = `${data.answer3}`
    const a4 = `${data.answer4}`

    const answer1 = document.getElementById("radio-button-1")
    const value1 = document.getElementById("answer1")
    value1.setAttribute("value", a1)
    answer1.innerText = a1

    const answer2 = document.getElementById("radio-button-2")
    const value2 = document.getElementById("answer2")
    value2.setAttribute("value", a2)
    answer2.innerText = a2

    const answer3 = document.getElementById("radio-button-3")
    const value3 = document.getElementById("answer3")
    value3.setAttribute("value", a3)
    answer3.innerText = a3

    const answer4 = document.getElementById("radio-button-4")
    const value4 = document.getElementById("answer4")
    value4.setAttribute("value", a4)
    answer4.innerText = a4

    questionPage.innerText = randomQuestion
    questionPage.append(answerList)
  
    return json 
  })
  .then(json => {
    correctAnswer = json.correct_answer
  })
}

// reset Radio Button after each question answered
function clearRadio(){
  var a=[];
  a=document.getElementsByTagName('input');
  for(var b=0;b<a.length;b++){
    if(a[b].type=='radio'){
      a[b].checked=false;
    }
  }
}

// display Scoreboard on Home Page
function scoreboard() {
  fetch('http://localhost:3000/api/v1/users')
  .then(function(response) {
    return response.json()
  })
  .then(function(json) {

    for (let i = 0; i < json.length; i++) {
    const finalScore = json[i].score
    const finalName = json[i].name
    const listItem1 = document.createElement("ul")
    const listItem2 = document.createElement("ul")
    const listName = document.getElementById("scorer-name")
    const listScore = document.getElementById("scorer-score")
    listItem1.textContent = finalName
    listItem2.textContent = finalScore


    listName.append(listItem1)
    listScore.append(listItem2)
  
    }
  })
}
scoreboard()

 // Go Back Home functionality
function goBackHome() {
  document.getElementById("go-home").addEventListener("click", function(){
   window.location.reload()
  })
}
goBackHome()


  