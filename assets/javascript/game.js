window.onload = function () {
    var rocky_words = ["rocky", "adrian", "paulie", "boxing", "thunderlips", "clubber", "russian", "montage", "roboservant"];

    var rocky_videos = [
    "https://www.youtube.com/embed/I33u_EHLI3w",
    "https://www.youtube.com/embed/2JyJAZkIz8I",
    "https://www.youtube.com/embed/DZEaInw7r90",
    "https://www.youtube.com/embed/Q_qhLRUh66k",
    "https://www.youtube.com/embed/GykbWx88nGs",
    "https://www.youtube.com/embed/wMwyoLNKOXI",
    "https://www.youtube.com/embed/EiTYwecY41c",
    "https://www.youtube.com/embed/lVY8SbQGW-Y",
    "https://www.youtube.com/embed/DZW0k735_9o",
    ];

    var guesses = [];
    var word = "";
    var display_word = "";
    var isLetter = [];
    var allTrue = false;
    var remainingGuesses = 12;
    var wins = 0;
    var losses = 0;
    var rand;


    //start by choosing a word at random and displaying it
    chooseRandomWord();
    concealWord();
    setisLetter();
    showDisplayWord();

    document.addEventListener("keypress", function (event) {
        var key = String.fromCharCode(event.which);
        var bool = false;
        key = key.toUpperCase();

        //Game Logic - functions to follow
        for(var i = 0; i < word.length; i++)
        {
            if(key == word[i])
            {
                bool = true;
                setLetterTrue(i);
                display_word = revealLetters();
                showDisplayWord();
                allTrue = checkAllTrue();

                if(allTrue)
                {
                    alert("Winner!");
                    setTimeout(function(){
                    addWin();
                    chooseRandomWord();
                    concealWord();
                    setisLetter();
                    showDisplayWord();
                    resetGuesses();
                    displayGuesses();
                    resetRemainingGuesses();
                    allTrue = false;
                }, 1200);
            
                playVideo();   
            };
            }
        }
        if(bool === false){
            subFromRemainingGuesses();
            addGuess(key);
            displayGuesses();
            if(remainingGuesses < 1)
            {
                alert("Game Over!");
                setTimeout(function(){
                    resetWins();
                    chooseRandomWord();
                    concealWord();
                    setisLetter();
                    showDisplayWord();
                    resetGuesses();
                    displayGuesses();
                    resetRemainingGuesses();
                    allTrue = false;
                }, 1200);
            }
        }

    });
    
    function playVideo(){
        document.getElementById("video").setAttribute("src", rocky_videos[rand]);
    }

    function resetWins(){
        wins = 0;
        document.getElementById("win-counter").innerHTML = wins;
    }

    function addGuess(letter)
    {
        guesses.push(letter);
    }

    function subFromRemainingGuesses(){
        remainingGuesses--;
        document.getElementById("remaining-guesses").innerHTML = remainingGuesses;
    }

    function resetRemainingGuesses(){
        remainingGuesses = 12;
        document.getElementById("remaining-guesses").innerHTML = remainingGuesses;
    }

    function displayGuesses(){
        var word = "";

        for(var i = 0; i < guesses.length; i++)
        {
            word += guesses[i] + " ";
        }

        document.getElementById("guesses").innerHTML = word;

    }

    function resetGuesses(){
        guesses = [];
    }

    function addWin(){
        wins++;
        document.getElementById("win-counter").innerHTML = wins;
    }

    function checkAllTrue(){
        var bool = true;

        for(var i = 0; i < isLetter.length; i++)
        {
            if(isLetter[i] == false)
            {
                bool = false;
            }
        }

        return bool;
    }

    function revealLetters(){
        var newWord = "";

        for(var i = 0; i < word.length; i++)
        {
            if(isLetter[i] == true)
            {
                newWord += word.charAt(i);
            }
            else{
                newWord += " _";
            }
        }

        return newWord;
    }

    function setLetterTrue(num)
    {
        isLetter[num] = true;
    }

    function setisLetter()
    {
        isLetter = [];

        for(var i = 0; i < word.length; i++)
        {
            isLetter.push(false);
        }
    }

    function chooseRandomWord() {
        rand = Math.floor(Math.random() * rocky_words.length);
        word = rocky_words[rand];
        word = word.toUpperCase();
    }

    function concealWord() {
        display_word = "";
        for (var i = 0; i < word.length; i++) {
            display_word += "_ ";
        }
    }

    function showDisplayWord() {
        document.getElementById("current-word").innerHTML = display_word;
    }


}