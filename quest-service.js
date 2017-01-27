function QuestService(ready){

    if(typeof ready !== 'function'){
        return console.error("I\'m sorry Dave, I cannot do that.")
    }

    var currentQuestionIndex = 0
    var currentQuestion = null
    var questions = null
    var baseURL = 'https://api.myjson.com/bins/kuos9'

    function loadQuestions(){
        $.get(baseURL).then(function(response){
            console.log(response)
            questions = response
            ready()
        }) 
    }
    loadQuestions()

    this.reset = function(){
        currentQuestionIndex = 0
    }
    
    // var questions = [{
    //     narrative: 'As you are walking, you see a large canyon with a spanning bridge. As you approach the bridge, a crazy old dude suddnely appears and asks...',
    //     body: 'What is your name',
    //     answer: 'jake'
    // },{
    //     narrative: 'The old man lets out a disgruntled sigh... then with distrust he prompts',
    //     body: 'What is your quest',
    //     answer: 'i seek the holy grail'
    // },{
    //     narrative: 'The old man becomes noticeably more agitated as he shifts his stance making himself wider, further blocking access to the spanning bridge. Finally he asks...',
    //     body: 'What is your favorite color',
    //     answer: 'green'
    // }]



    this.getNextQuestion = function(){
        currentQuestion = questions[currentQuestionIndex]

        if(currentQuestionIndex > questions.length - 1){
            return {victory: true}
        }
        return {body: currentQuestion.body, narrative: currentQuestion.narrative}
    }

    this.checkAnswer = function(guess){
        if(guess == currentQuestion.answer.toLowerCase()){
            currentQuestionIndex++
            return true
        }else {
            return false
        }
    }



}