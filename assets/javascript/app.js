$(document).ready(function() {
    var index = 0;
    var countdownTimer = {
        time: 30,
        reset: function() {
            this.time = 30;
            $('.timer').html('<h3>' + this.time + ' seconds remaining</h3>');
        },
        start: function() {
            counter = setInterval(countdownTimer.count, 1000);
        },
        stop: function() {
            clearInterval(counter);
        },
        count: function() {
            countdownTimer.time--;
            console.log(countdownTimer.time);
            //				$('.timer').html(countdownTimer.time);
            if (countdownTimer.time >= 0) {
                $('.timer').html('<h3>' + countdownTimer.time + ' seconds remaining</h3>');
            } else {
                index++;
                answerWrong();
                countdownTimer.reset();
                if (index < questionArray.length) {
                    loadQuestion(index);
                } else {
                    $(".answerchoice").hide();
                    showScore();
                }
            }
        }
    };

    /* variables for right and wrong answers, also  doing one variable per question with aswers. */

    var correct = 0;
    var wrong = 0;

    var q1 = {
        question: 'When in doubt you... ?',
        possibleAnswers: ['A. Phone a friend',
            'B. you Google it',
            'C. you take a powernap',
            'D. all of the above'
        ],
        flags: [false, false, false, true],
        answer: 'D. all of the above'
    };

    var q2 = {
        question: 'Who is your daddy ?',
        possibleAnswers: ['A. you do not know',
            'B. you are',
            'C. Father',
            'D. I am addopted'
        ],
        flags: [false, false, true, false],
        answer: 'C. Father'
    };

    var q3 = {
        question: 'Is the Earth round ?',
        possibleAnswers: ['A. Nope is Flat',
            'B. Maybe IDK',
            'C. Ask Christopher Columbus',
            'D. I need to wait to the next Eclipse to find out'
        ],
        flags: [false, false, true, false],
        answer: 'C. Ask Christopher Columbus'
    };

    var q4 = {
        question: 'Which comes first the chicken or the egg ?',
        possibleAnswers: ['A. The Egg',
            'B. The Chicken',
            'C. Only God knows',
            'D. Who cares'
        ],
        flags: [false, false, false, true],
        answer: 'D. Who cares'
    };

    var q5 = {
        question: 'Did you like this game ?',
        possibleAnswers:['A. it is lame',
            'B. it does not makes sense',
            'C. is the best game ever',
            'D. Sure'
        ],
        flags: [false, false, false, true],
        answer: 'D. Sure'
    };

    var questionArray = [q1, q2, q3, q4, q5];

    function loadQuestion(questionSelection) {
        console.log(questionSelection);
        countdownTimer.reset();
        $(".question").html("<h3>" + questionArray[questionSelection].question + "</h3>");
        $("#buttonA").text(questionArray[questionSelection].possibleAnswers[0]).show();
        $("#buttonB").text(questionArray[questionSelection].possibleAnswers[1]).show();
        $("#buttonC").text(questionArray[questionSelection].possibleAnswers[2]).show();
        $("#buttonD").text(questionArray[questionSelection].possibleAnswers[3]).show();

    }

    function setup() {
        index = 0;
        $('.question').append('<button id="startButton">Start</button>');
        $('#startButton').on('click', function() {
            $(this).hide();
            countdownTimer.start();
            loadQuestion(index);
        });
    }

    function getAnswer() {

        //  nextQuestion();
        $('.answerchoice').on('click', function() {
            console.log('alert', index);
            index++;
            console.log('click', index);
            $(".question").text('');
            $("#buttonA").text('');
            $("#buttonB").text('');
            $("#buttonC").text('');
            $("#buttonD").text('');
            loadQuestion();
        })
    }

    function answerCorrect() {
        correct++;
        alert("Correct!");
        console.log("correct");
    }

    function answerWrong() {
        wrong++;
        alert("Incorrect!");
        console.log("wrong");
    }

    function showScore() {
        $('.question').empty();
        $('.question').append("<h2><p>" + correct + " correct</p></h2>");
        $('.question').append("<h2><p>" + wrong + " incorrect</p></h2>");
        countdownTimer.stop();
        $('.timer').empty();

    }


    setup();
    $('.answerchoice').on('click', function() {
        console.log($(this));
        if (this.id == 'buttonA') {
            var answerChosen = 'A';
        } else if (this.id == 'buttonB') {
            answerChosen = 'B';
        } else if (this.id == 'buttonC') {
            answerChosen = 'C';
        } else if (this.id == 'buttonD') {
            answerChosen = 'D';
        }
        if ((answerChosen == 'A') && (questionArray[index].flags[0] == true)) {
            answerCorrect();
        } else if (answerChosen == 'A') {
            answerWrong();
        }
        if ((answerChosen == 'B') && (questionArray[index].flags[1] == true)) {
            answerCorrect();
        } else if (answerChosen == 'B') {
            answerWrong();
        }
        if ((answerChosen == 'C') && (questionArray[index].flags[2] == true)) {
            answerCorrect();
        } else if (answerChosen == 'C') {
            answerWrong();
        }
        if ((answerChosen == 'D') && (questionArray[index].flags[3] == true)) {
            answerCorrect();
        } else if (answerChosen == 'D') {
            answerWrong();
        }

        $(".question").text('');
        $("#buttonA").text('');
        $("#buttonB").text('');
        $("#buttonC").text('');
        $("#buttonD").text('');
        index++;
        if (index < questionArray.length) {
            loadQuestion(index);
        } else {
            $(".answerchoice").hide();
            showScore();
        }
    });

});