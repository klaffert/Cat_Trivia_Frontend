let correctAnswer

document.addEventListener("DOMContentLoaded", function() {
  const randomURL = 'http://localhost:3000/api/v1/random'
 
document.getElementById("button").addEventListener("click", function() {
  hideHome("welcome-message");
})

document.getElementById("name-button").addEventListener("click", function(event) {
  event.preventDefault();
  debugger
})

document.getElementById("question-form").addEventListener("submit", function(event) {
  event.preventDefault();
  var userAnswerNode;
  for (let i = 0; i < event.target.answer.length; i++) {
    const node = event.target.answer[i];
    if(node.checked) { userAnswerNode = node}
  }
  if(userAnswerNode.value == correctAnswer){
    alert("RIGHT")
  }
  else {
    alert("WRONG")
  }
})

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

    questionPage.append(randomQuestion)
    questionPage.append(answerList)
  
    return json 
  })
  .then(json => {
    correctAnswer = json.correct_answer
  })
  
})

function hideHome(id) {
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


