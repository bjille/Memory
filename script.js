(function() {
    var couples = 5;
    var clickCounter = 0;
    var turns = 0;
    var previousCard;
    var currentGameScore = 0;


    // drawCards(shuffledCards);

    // document.querySelectorAll(".card").forEach(item => {item.addEventListener("click", function() {item.style.backgroundColor = item.getAttribute("value");})});
    
    document.querySelectorAll(".card").forEach(item => {item.addEventListener("click", clicklogic)});
    
    generateHeader = () => {
        // document.querySelector(".gameHeader").innerHTML = "Memory Game";
        document.querySelector(".turnsScore").innerHTML = turns;
    }

    const generateCouples = (amountOfCards) => {
        cards = [];
        for (let i = 0; i < amountOfCards; i++) {
            colorCode = randomColorGenerator();
            // 2 keer dezelfde kleurcode toevoegen aan array;
            for (let index = 0; index < 2; index++) {
            cards.push("#" + colorCode);
            }        
        }
        // console.log(cards);
        return cards;
    }

    // function drawCards(cards) {
        
    //     for (let i = 0; i < cards.length; i++) {
    //         //cardList += "<li>test" + i + "</i>";
    //         let li = document.createElement('li');
    //         let content = document.createElement('div');
    //         // content.style.backgroundColor = cards[i];
    //         content.classList.add("card");
    //         content.setAttribute("value", cards[i]);
    //         content.innerHTML = cards[i];
    //         // content.addEventListener("click", function() {
    //         //     content.style.backgroundColor = cards[i];
    //         // });

    //         li.appendChild(content);
    //         document.querySelector("#cardList").appendChild(li);
    //     }
    //     //document.querySelector("#cardList").append(cardList);
    // }

    const drawCards = cards => {
                
        for (let i = 0; i < cards.length; i++) {
            let li = document.createElement('li');
            let cardWrapper = document.createElement('div');
            let content = document.createElement('div');
            cardWrapper.classList.add("cardWrapper");
            content.classList.add("card");
            content.setAttribute("value", cards[i]);
            content.setAttribute("selected", false);
            // content.innerHTML = cards[i];
            // 
            cardWrapper.appendChild(content);
            li.appendChild(cardWrapper);
            document.querySelector("#cardList").appendChild(li);
        }
    }

    generateHeader();
    cards = generateCouples(couples);

    //code gekopieerd van https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj#:~:text=The%20first%20and%20simplest%20way,)%20%3D%3E%200.5%20%2D%20Math.
    shuffledCards = cards.sort((a, b) => 0.5 - Math.random());
    
    drawCards(shuffledCards);

    let clicklogic = e => {
        clickCounter++;
        // als er meer dan 2 kaarten aangeklik worden, stop de functie
        if (clickCounter > 2) return;
        e.setAttribute("selected", true);
        // achtergrond tonen
        e.style.backgroundColor = e.getAttribute("value");
        currentValue = e.getAttribute("value");
        if (clickCounter == 1){
            previousValue = currentValue;
        }
        if (clickCounter < 2) {
            // if (e.getAttribute("selected") == "true") {
            //     return;
            // }
        } 
        else {
            if (e.getAttribute("selected") == "true" && !(previousValue == currentValue)) {
                previousValue = null;
            }
            console.log("currentValue = " + currentValue)
            console.log("previousValue = " + previousValue)
            console.log("clickCounter = " + clickCounter); 
            setTimeout(resetCards, 1000);}
        // console.log(e);
        
    };

    let resetCards = () => {

        currentCards = document.querySelectorAll('[selected="true"]');
        turns++;
        if (previousValue == currentValue){
            currentGameScore ++;
            currentCards.forEach(element => {
                element.parentNode.removeChild(element);
            });
        }

        currentCards.forEach(item => {
            item.style.backgroundColor = "white"; 
            item.setAttribute("selected", false)});
        clickCounter = 0;
        previousValue = null;
    }

    document.querySelectorAll(".card").forEach(item => {item.addEventListener("click", function(e){clicklogic(item)})});

    //code gehaald van https://css-tricks.com/snippets/javascript/random-hex-color/
    function randomColorGenerator() {
        return Math.floor(Math.random()*16777215).toString(16);
    }
})();