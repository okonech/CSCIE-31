// test CRUD actions for decks
( function () {
    const baseURL = 'http://159.65.32.93:8080';

    function listDecks(){
        // ajax get
        $.getJSON(baseURL + '/api/decks/', (data) => {
            displayResult(data);
        })
            .fail((err) => {
                console.log(err);
            });
    }

    function createDeck(){
        // get values from form
        let deckObject = getDeckObject();
        console.log("Creating" + deckObject);
        // ajax post
        $.ajax({
            contentType: "application/json",
            url: baseURL + "/api/decks/",
            type: "post",
            data: JSON.stringify(deckObject),
            dataType: "json"
        })
            .done((data) => {
                displayResult(data);
            })
            .fail((err) => {
                console.log(err);
            })
    }

    function readDeck(){
        // get values from form
        let readDeckID = $('#readDeckID').val();
        console.log("Reading" + readDeckID);
        // ajax get
        $.getJSON(baseURL + '/api/decks/' + readDeckID, (data) => {
            displayResult(data);
        })
            .fail((err) => {
                console.log(err);
            });
    }

    function updateDeck(){
        // get values from form
        let deckID = $('#deckID').val();
        let deckObject = getDeckObject();
        console.log("Updating" + deckObject);
        // ajax put
        $.ajax({
            contentType: "application/json",
            url: baseURL + "/api/decks/" + deckID,
            type: "put",
            data: JSON.stringify(deckObject),
            dataType: "json"
        })
            .done((data) => {
                displayResult(data);
            })
            .fail((err) => {
                console.log(err);
            })
    }

    function deleteDeck(){
        // get values from form
        let deleteDeckID = $('#deleteDeckID').val();
        console.log("Deleting" + deleteDeckID);
        // ajax delete
        $.ajax({
            url: baseURL + "/api/decks/" + deleteDeckID,
            type: "delete",
            dataType: "json"
        })
            .done((data) => {
                displayResult(data);
            })
            .fail((err) => {
                console.log(err);
            })
    }

    // extract data for update/create
    function getDeckObject(){
        // get values from form
        let deckName = $('#deckName').val();
        let deckCommander = $('#deckCommander').val();
        let deckOwner = $('#deckOwner').val();
        let deckOwnerId = $('#deckOwnerID').val();
        // assemble new object for create/update
        return {
            name: deckName,
            commander: deckCommander,
            owner: deckOwner,
            ownerID: deckOwnerId
        };
    }

    // generic function to put return json into text area
    function displayResult(data){
        console.log("Displaying data" + data);
        $('#decksJsonData').val(JSON.stringify(data));
    }

    // init buttons to perform ajax
    $(document).ready(function() {
        $('#listDecks').on('click',listDecks);
        $('#createDeckButton').on('click',createDeck);
        $('#readDeckButton').on('click',readDeck);
        $('#updateDeckButton').on('click',updateDeck);
        $('#deleteDeckButton').on('click',deleteDeck);

        // prevent submit of form
        $('#decksCrudActions').on('submit',function() {
            return false;
        });
    });
})();