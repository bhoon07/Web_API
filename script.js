window.onload = function() {
        console.log("starting");
      };
var Timer=60;
//question number
var index=0;
var countDown=75;
var score=75;
var highscore=0;
var quizTime;

document.getElementById("startButton").addEventListener("click", event=>{
        document.getElementById("startQuiz").classList.add("d-none");
        document.getElementById("quizQuestions").classList.remove("d-none");
        setTime();
        renderQuestion();
        quiztime=setInterval(setTime, 1000)//every thousand=1 second
});

function renderQuestion() {
        var questionindexlength=questions.length-1;
        if (index <= questionindexlength) {
                document.getElementById("question").innerHTML=questions[index].title;
                renderQuestionchoices()
        }
        quizOver();
}

function renderQuestionchoices() {
        var question = questions[index].choices;
  console.log(question);
  for (var option = 0; option < question.length; option++) {
    var questionOptionsDiv = document.getElementById("questionChoices");
    var questionButtons = document.createElement("button");
    questionButtons.className =
      "btn btn-outline-primary btn-lg d-flex justify-content-around";
    questionButtons.innerHTML = question[option];
    //This fires the check answer function when the user clicks a question choices button
    questionButtons.setAttribute(
      "onclick",
      "checkAnswer(" + index + "," + option + ");"
    );
    questionOptionsDiv.append(questionButtons);
  }
  quizOver();
}

//This function clears the divs in preperation for rendering the next question
function clearQuestionDiv() {
        console.log("About to clear html");
        document.getElementById("questionChoices").innerHTML = "";
        quizOver();
      }
      //This function checks if the user selected the correct answer
      function checkAnswer(question, answer) {
        console.log("question: ", question);
        console.log("asnwer: ", answer);
        let correctAnswer = questions[question].answer;
        let userAnswer = questions[question].choices[answer];
        if (userAnswer == correctAnswer) {
          index = index + 1;
          console.log(score);
          console.log("Correct");
        }
        //Whether they get the right or wrong answer, the program continues to the next question and deducts 15 seconds from the quiz clock
        else {
          index = index + 1;
          countDown = countDown - 15;
          score = score - 15;
          console.log(score);
          console.log("Next question: ", index);
          console.log("Incorrect");
        }
        clearQuestionDiv();
        renderQuestion();
        quizOver();
      }
      //This function starts the countdown for the time left clock quiz timer when the user clicks the start button
      function setTime() {
        document.getElementById("timer").innerHTML = countDown + "sec left";
        countDown--;
        if (countDown == -1) {
          clearInterval(quizTime);
        }
        quizOver();
      }
      //This is a function that checks to see if these conditions are being met in other functions within the program
      function quizOver() {
        if (index >= 4 || countDown <= 0) {
          document.getElementById("quizQuestions").classList.add("d-none");
          document.getElementById("all-done").classList.remove("d-none");
          document.getElementById("timer").innerHTML = countDown + "sec left";
          document.getElementById("final-score").innerHTML = countDown;
          clearInterval(quizTime);
        }
      }
      //Event listener to fire the function that allows the user to save their initial and high score
      document.getElementById("initials-button").addEventListener("click", saveScore);
      //Function for saving high score and initial
      function saveScore() {
        var userInitials = document.querySelector("#initial-input").value;
        var finalScore = countDown;
        //Object stores intitials and high scores
        var scoreObject = { initials: userInitials, score: finalScore };
        var highScores = localStorage.getItem("highScoreList");
        if (highScores == null) {
          localStorage.setItem("highScoreList", JSON.stringify([scoreObject]));
          console.log(highScores);
        } else {
          highScoreList = JSON.parse(highScores);
          console.log(typeof highScoreList);
          highScoreList.push(scoreObject);
          localStorage.setItem("highScoreList", JSON.stringify(highScoreList));
        }
      }