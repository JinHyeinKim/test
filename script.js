$(function () {
    $('.started').hide();
    $('.start').on('click', quizStart);
    $('.end').hide();
    $('.footnote').hide();
    $('.input-answer').on('input', checkInput);
    $('.reset').on('click', reSet);
    initAnswers();

    score = 0;
    timeRemaining = Quiz_Time * 60;
});

function quizStart() {
    $('.started').show();
    $('.start').hide();
    $('.total').text(QUIZ_ANSWERS.length);
    $('.timer-remaining').text(getTimeString());
    timeInterval = setInterval(reduceTime, 1000);
}

//time part
var timeRemaining;
var Quiz_Time = 1.05;

function getTimeString() {
    if (timeRemaining <= 0) {
        return '0:00';
    } else {
        var minutes = Math.floor(timeRemaining / 60);
        var seconds = timeRemaining % 60;
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        return minutes + ':' + seconds;
    }
}

function reduceTime() {
    timeRemaining--;
    if (timeRemaining === 0) {
        endQuiz();
    } else {
        $('.timer-remaining').text(getTimeString());
    }
}

// 정답

var QUIZ_ANSWERS = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'
];

function initAnswers() {
    answers = {};
    QUIZ_ANSWERS.forEach(function (item) {
        var answer = item.trim().toLowerCase();
        answers[answer] = false;
        console.log(answer);
    });
}

function checkInput(event) {
  console.log(3)
    var input = event.currentTarget.value.trim().toLowerCase();
  if (answers.hasOwnProperty(input) && !answers[input]) {
    // give credit
    answers[input] = true;
    score++;
    $('.current-score').text(score);
    $('.answers-score').prepend(createAnswerItem(input));
    
    console.log(4)
    // clear input
    $('.input-answer').val('');
    
    // check if user beat the quiz
    if (score === QUIZ_ANSWERS.length) {
      endQuiz();
    }
  }
}
function createAnswerItem(answer) {
  return $('<li>', { text: answer });
}

function endQuiz() {
    clearTimeout(timeInterval);
    $('.input-answer').text("당신의 점수는"+score*10+"점입니다." )
    $('.input-answer').prop('disabled', true);
    $('.timer').hide();
    $('.score').hide();
    $('.started').hide();
    $('.end').show();
    $('#score').text(score*30);
    $('.footnote').show();
}

function reSet(){
    window.location.reload()
}
