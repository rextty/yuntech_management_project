window.onload=function(){
    
    var questions = [
        {
            "question": "笑氣是好東西?",
            options: ["4", "不4", "不知道", "以上皆否"],
            answer: "1",
            question_explain: "因為笑氣是毒品"
        },{
            "question": "林擇智幾公斤?",
            options: ["30~40", "40~50", "50~60", "以上皆否"],
            answer: "0",
            question_explain: "因為笑氣是毒品"
        },{
            "question": "笑氣是好東西?",
            options: ["4", "不4", "不知道", "以上皆否"],
            answer: "1",
            question_explain: "因為笑氣是毒品"
        },{
            "question": "笑氣是好東西?",
            options: ["4", "不4", "不知道", "以上皆否"],
            answer: "1",
            question_explain: "因為笑氣是毒品"
        },{
            "question": "笑氣是好東西?",
            options: ["4", "不4", "不知道", "以上皆否"],
            answer: "1",
            question_explain: "因為笑氣是毒品"
        },
    ]

    var socre = 0;
    var answer = [];
    var question_index = 0;
    var question = document.getElementsByClassName("question_title")[0];
    var options = document.getElementsByName("option");
    var time = document.getElementById("time");
    var wrap = document.getElementsByClassName("wrap")[0];
    var buttons = document.getElementsByTagName("Button");
    var body = document.getElementsByTagName("Body")[0];
    
    init();

    var count = 600;
    var timer = setInterval(function () {
        if (count > 0) {
            count = count - 1;

            if (count > 60 ) {
                var minutes = parseInt(count / 60);
                var second = count % 60;
                time.innerHTML = minutes + "分" + second + "秒";
            }else {
                time.innerHTML = count + "秒";
                console.log(count + "秒");
            }
        }
        else {
            clearInterval(timer);
            endGame();
        }
    }, 1000);

    options.forEach(element => {
        element.addEventListener("click", nextQuestion);
    });
    
    function init() {
        question.children[0].innerHTML = questions[question_index].question;
      
        options.forEach((element, index) => {
            element.innerText = questions[question_index].options[index];
        });
    }

    function nextQuestion(e) {
        if (e.target.id !== questions[question_index].answer) {
            e.target.style.backgroundColor = "#ff0000";
            document.getElementById(questions[question_index].answer).style.backgroundColor = "#00ff00";
            answer.push({question_index: e.target.id});
        }else {
            socre += 10;
            e.target.style.backgroundColor = "#00ff00"
            answer.push({question_index: e.target.id});
        }

        options.forEach(element => {
            element.disabled = true;
        });

        window.setTimeout(function() {
            options.forEach(element => {
                element.style.backgroundColor = "#364cca";
                element.disabled = false;
            });

            question_index++;
                
            if (question_index == questions.length) {

                endGame();
                return;
            }
    
            document.title= "關卡" + (parseInt(question_index) + 1);
            
            question.children[0].innerHTML = questions[question_index].question;

            options.forEach((element, index) => {
                element.innerText = questions[question_index].options[index];
            });
        }, 2000);
    }

    function endGame() {

        body.innerHTML = '<div class="blns"><div class="bln-1"></div></div>';
        
        blowUpBalloons();

        window.setTimeout(function() {

            body.innerHTML = '<div class="container"><div class="wrap"></div></div>';

            wrap = document.getElementsByClassName("wrap")[0];

            wrap.style.width = "auto";
            wrap.style.height = "100%";

            wrap.innerHTML = '<div class="tittle"><h1>遊戲結束</h1><h2>分數: '+ socre + '</h2></div><div class="questions"></div><div class="button"><button onclick="window.location.href=&apos;/index.html&apos;">回首頁</button><button>排行榜</button></div>';
        
            window.title = "遊戲結束";

            buttons = Array.prototype.slice.call(buttons)
            buttons = [].slice.call(buttons);

            buttons.forEach(element => {
                element.style.width = "100%";
            });

            var questions_ele = document.getElementsByClassName("questions")[0];

            answer.forEach((element, index) => {
                questions_ele.innerHTML += '<div class="question" id="' + index + '"><p>第'+ (parseInt(index) + 1) +'題: ' + questions[index].question + '</p><p>你的選擇: '+ questions[index].options[element.question_index] +'</p><p>答案: '+ questions[index].options[questions[index].answer] +'</p><p>問題解析: '+ questions[index].question_explain +'</p></div>';
            });

        }, 4200);
    }

    var windowWidth = $(window).outerWidth();
    var windowHeight = $(window).outerHeight();

    function pickANumber(max, min) {
      return Math.random() * (max - min + min) + min;
    }

    function changeColors(el) {
      el.removeClass();
      var random = Math.floor(pickANumber(5,1));
      el.addClass('bln-'+random+'-clone');
    }

    function resetBalloon(el) {
      changeColors(el);

      var scale = (pickANumber(0.9,0.5)).toFixed(1);
      el.css('transform', 'scale(' + scale + ')');

      var x = Math.floor(Math.random() * windowWidth);
      el.css('left', x);
      var y = Math.floor(Math.random() * 300 + windowHeight);
      el.css('top', y);
      releaseBalloon(el);
    }

    function releaseBalloon(el) {
      var maxbllnSpeed = Math.floor(Math.random() * 10000 + 300);
      var wind = Math.floor(Math.random() * - 30);
      var rotate = Math.floor(Math.random() * 560) + 100;  


      el.animate(
        { 
          top: '-150px',
          left: '+=' + wind + 0,
        }, {
        step: function() {
          el.css({
            transform: 'rotate('+rotate+'deg)',
            transition: 'transform '+ maxbllnSpeed * .001  +'s linear'
          });
        },
        duration: maxbllnSpeed,
        easing: 'linear',
        complete: function() {
          resetBalloon(el);
        }
      });

    }

    function blowUpBalloons() {
      for (i = 0; i < 200; i++) {
        var el = $('.bln-1').clone();
        el.appendTo('.blns');

        resetBalloon(el);

        var position = el.position();

        if (position.top > windowHeight || position.left > windowWidth || position.left < -100) {
          resetBalloon(el);
        } else {
          //releaseBalloon(el);
        }

      }
    }
}