window.onload = function(){
    //type of games bools
    var predefinedSelected = true;
    var customSelected = false;

    //difficulty level bools
    var easySelected = true;
    var normalSelected = false;
    var hardSelected = false;
    var hellSelected = false;

    function handlePathInfobar(){
        var typeOfGame = "predefined";
        var difLevel = "easy";

        if(predefinedSelected == true && customSelected == false){
            typeOfGame = "predefined";
        }else if(predefinedSelected == false && customSelected == true){
            typeOfGame = "custom";
        }

        if(easySelected == true && normalSelected == false && hardSelected == false && hellSelected == false){
            difLevel = "easy";
        }else if(easySelected == false && normalSelected == true && hardSelected == false &&  hellSelected == false){
            difLevel = "normal";
        }else if(easySelected == false && normalSelected == false && hardSelected == true &&  hellSelected == false){
            difLevel = "hard";
        }else if(easySelected == false && normalSelected == false && hardSelected == false &&  hellSelected == true){
            difLevel = "hell";
        }

        var pathInfo = document.getElementById("path_info");
        pathInfo.innerHTML = "scores > " + typeOfGame + " games > " + difLevel;
    }

    //select predefined games
    document.getElementById("predefined").onclick=function(){
        var ulTag = document.getElementById("scores_list");
        ulTag.innerHTML = "";

        predefinedSelected = true;
        customSelected = false;
        
        handlePathInfobar();

        getScores();
    }  

    document.getElementById("customs").onclick=function(){
        var ulTag = document.getElementById("scores_list");
        ulTag.innerHTML = "";

        predefinedSelected = false;
        customSelected = true;

        handlePathInfobar();

        getScores();
    }

    document.getElementById("easySelected").onclick = function(){
        var ulTag = document.getElementById("scores_list");
        ulTag.innerHTML = "";

        easySelected = true;
        normalSelected = false;
        hardSelected = false;
        hellSelected = false;

        handlePathInfobar();

        getScores();
    }

    document.getElementById("normalSelected").onclick = function(){
        var ulTag = document.getElementById("scores_list");
        ulTag.innerHTML = "";

        easySelected = false;
        normalSelected = true;
        hardSelected = false;
        hellSelected = false;

        handlePathInfobar();

        getScores();
    }

    document.getElementById("hardSelected").onclick = function(){
        var ulTag = document.getElementById("scores_list");
        ulTag.innerHTML = "";

        easySelected = false;
        normalSelected = false;
        hardSelected = true;
        hellSelected = false;

        handlePathInfobar();

        getScores();
    }

    document.getElementById("hellSelected").onclick = function(){

        var ulTag = document.getElementById("scores_list");
        ulTag.innerHTML = "";
        
        easySelected = false;
        normalSelected = false;
        hardSelected = false;
        hellSelected = true;

        handlePathInfobar();

        getScores();
    }

    function getScores(){

        $.ajax({
            type: 'GET',
            url: 'http://memorygamewebservice-shrikanthavale.rhcloud.com/MemoryGameWebservice/rest/memorygameread/readgamescores',
            crossDomain : true,
            dataType: 'json',
            data:{},
            success:function(data){
                var scoresNameList = document.getElementById("scores_list");
                var xtoken = window.localStorage['fbtoken'];
                //if the user is not logged in with his facebook account
                if( typeof xtoken === 'undefined'){
                    for(var i = 0; i < data.length; i++){
                        if(easySelected == true && normalSelected == false && hardSelected == false && hellSelected == false){
                            if(predefinedSelected){
                                if(data[i].difficultyLevel == "EASY" && data[i].isPredefinedGame == true){
                                    //create a new element in the list
                                    var newGameName = document.createElement("li");
                                    //create a new paragraph element inside li. It will contain the players name
                                    var newPlayerNameP = document.createElement("p");
                                    newPlayerNameP.innerHTML = data[i].user_name;
                                    //calculate score
                                    var scoreFormula = (data[i].numberMoves + data[i].numberSeconds) * 0.5;

                                    //print score
                                    newGameName.innerHTML += data[i].game_name + " <span class='ui-li-count'>" + scoreFormula + "</span>";
                                    //append players name
                                    newGameName.appendChild(newPlayerNameP);
                                    //append li
                                    scoresNameList.appendChild(newGameName);
                                }
                            }else{//not predefined - custom
                                if(data[i].difficultyLevel == "EASY" && data[i].isPredefinedGame == false){
                                    //create a new element in the list
                                    var newGameName = document.createElement("li");
                                    //create a new paragraph element inside li. It will contain the players name
                                    var newPlayerNameP = document.createElement("p");
                                    newPlayerNameP.innerHTML = data[i].user_name;
                                    //calculate score
                                    var scoreFormula = (data[i].numberMoves + data[i].numberSeconds) * 0.5;

                                    //print score
                                    newGameName.innerHTML += data[i].game_name + " <span class='ui-li-count'>" + scoreFormula + "</span>";
                                    //append players name
                                    newGameName.appendChild(newPlayerNameP);
                                    //append li
                                    scoresNameList.appendChild(newGameName);
                                }
                            }
                            
                        }else if(easySelected == false && normalSelected == true && hardSelected == false && hellSelected == false){
                            if(predefinedSelected){
                                if(data[i].difficultyLevel == "NORMAL" && data[i].isPredefinedGame == true){
                                    //create a new element in the list
                                    var newGameName = document.createElement("li");
                                    //create a new paragraph element inside li. It will contain the players name
                                    var newPlayerNameP = document.createElement("p");
                                    newPlayerNameP.innerHTML = data[i].user_name;
                                    //calculate score
                                    var scoreFormula = (data[i].numberMoves + data[i].numberSeconds) * 0.5;

                                    //print score
                                    newGameName.innerHTML += data[i].game_name + " <span class='ui-li-count'>" + scoreFormula + "</span>";
                                    //append players name
                                    newGameName.appendChild(newPlayerNameP);
                                    //append li
                                    scoresNameList.appendChild(newGameName);
                                }
                            }else{
                                if(data[i].difficultyLevel == "NORMAL" && data[i].isPredefinedGame == false){
                                    //create a new element in the list
                                    var newGameName = document.createElement("li");
                                    //create a new paragraph element inside li. It will contain the players name
                                    var newPlayerNameP = document.createElement("p");
                                    newPlayerNameP.innerHTML = data[i].user_name;
                                    //calculate score
                                    var scoreFormula = (data[i].numberMoves + data[i].numberSeconds) * 0.5;

                                    //print score
                                    newGameName.innerHTML += data[i].game_name + " <span class='ui-li-count'>" + scoreFormula + "</span>";
                                    //append players name
                                    newGameName.appendChild(newPlayerNameP);
                                    //append li
                                    scoresNameList.appendChild(newGameName);
                                }
                            }
                        }else if(easySelected == false && normalSelected == false && hardSelected == true && hellSelected == false){
                            if(predefinedSelected){
                                if(data[i].difficultyLevel == "HARD" && data[i].isPredefinedGame == true){
                                    //create a new element in the list
                                    var newGameName = document.createElement("li");
                                    //create a new paragraph element inside li. It will contain the players name
                                    var newPlayerNameP = document.createElement("p");
                                    newPlayerNameP.innerHTML = data[i].user_name;
                                    //calculate score
                                    var scoreFormula = data[i].numberMoves + data[i].numberSeconds;

                                    //print score
                                    newGameName.innerHTML += data[i].game_name + " <span class='ui-li-count'>" + scoreFormula + "</span>";
                                    //append players name
                                    newGameName.appendChild(newPlayerNameP);
                                    //append li
                                    scoresNameList.appendChild(newGameName);
                                }
                            }else{
                                if(data[i].difficultyLevel == "HARD" && data[i].isPredefinedGame == false){
                                    //create a new element in the list
                                    var newGameName = document.createElement("li");
                                    //create a new paragraph element inside li. It will contain the players name
                                    var newPlayerNameP = document.createElement("p");
                                    newPlayerNameP.innerHTML = data[i].user_name;
                                    //calculate score
                                    var scoreFormula = data[i].numberMoves + data[i].numberSeconds;

                                    //print score
                                    newGameName.innerHTML += data[i].game_name + " <span class='ui-li-count'>" + scoreFormula + "</span>";
                                    //append players name
                                    newGameName.appendChild(newPlayerNameP);
                                    //append li
                                    scoresNameList.appendChild(newGameName);
                                }
                            }
                        }else if(easySelected == false && normalSelected == false && hardSelected == false && hellSelected == true){
                            if(predefinedSelected){
                                if(data[i].difficultyLevel == "HELL" && data[i].isPredefinedGame == true){
                                    //create a new element in the list
                                    var newGameName = document.createElement("li");
                                    //create a new paragraph element inside li. It will contain the players name
                                    var newPlayerNameP = document.createElement("p");
                                    newPlayerNameP.innerHTML = data[i].user_name;
                                    //calculate score
                                    var scoreFormula = (data[i].numberMoves + data[i].numberSeconds);

                                    //print score
                                    newGameName.innerHTML += data[i].game_name + " <span class='ui-li-count'>" + scoreFormula + "</span>";
                                    //append players name
                                    newGameName.appendChild(newPlayerNameP);
                                    //append li
                                    scoresNameList.appendChild(newGameName);
                                }
                            }else{
                                if(data[i].difficultyLevel == "HELL" && data[i].isPredefinedGame == false){
                                    //create a new element in the list
                                    var newGameName = document.createElement("li");
                                    //create a new paragraph element inside li. It will contain the players name
                                    var newPlayerNameP = document.createElement("p");
                                    newPlayerNameP.innerHTML = data[i].user_name;
                                    //calculate score
                                    var scoreFormula = (data[i].numberMoves + data[i].numberSeconds);

                                    //print score
                                    newGameName.innerHTML += data[i].game_name + " <span class='ui-li-count'>" + scoreFormula + "</span>";
                                    //append players name
                                    newGameName.appendChild(newPlayerNameP);
                                    //append li
                                    scoresNameList.appendChild(newGameName);
                                }
                            }
                        }
                    }
                }else{ //else if the user is logged in with his fb account
                    for(var i = 0; i < data.length; i++){
                        if(easySelected == true && normalSelected == false && hardSelected == false && hellSelected == false){
                            if(predefinedSelected){
                                if(data[i].difficultyLevel == "EASY" && data[i].isPredefinedGame == true){
                                    if(data[i].email_id == window.localStorage['emailid']){
                                        //create a new element in the list
                                        var newGameName = document.createElement("li");
                                        //calculate score
                                        var scoreFormula = (data[i].numberMoves + data[i].numberSeconds) * 0.5;
                                        //print score
                                        newGameName.innerHTML += data[i].game_name + " <span class='ui-li-count'>" + scoreFormula + "</span>";
                                        newGameName.appendChild(document.createElement("p"));
                                        //append li
                                        scoresNameList.appendChild(newGameName);
                                    }
                                }
                            }else{
                                if(data[i].difficultyLevel == "EASY" && data[i].isPredefinedGame == false){
                                    if(data[i].email_id == window.localStorage['emailid']){
                                        //create a new element in the list
                                        var newGameName = document.createElement("li");
                                        //calculate score
                                        var scoreFormula = (data[i].numberMoves + data[i].numberSeconds) * 0.5;
                                        //print score
                                        newGameName.innerHTML += data[i].game_name + " <span class='ui-li-count'>" + scoreFormula + "</span>";
                                        newGameName.appendChild(document.createElement("p"));
                                        //append li
                                        scoresNameList.appendChild(newGameName);
                                    }
                                }
                            }
                        }else if(easySelected == false && normalSelected == true && hardSelected == false && hellSelected == false){
                            if(predefinedSelected){
                                if(data[i].difficultyLevel == "NORMAL" && data[i].isPredefinedGame == true){
                                    if(data[i].email_id == window.localStorage['emailid']){
                                        //create a new element in the list
                                        var newGameName = document.createElement("li");
                                        //calculate score
                                        var scoreFormula = (data[i].numberMoves + data[i].numberSeconds) * 0.5;
                                        //print score
                                        newGameName.innerHTML += data[i].game_name + " <span class='ui-li-count'>" + scoreFormula + "</span>";
                                        //append li
                                        scoresNameList.appendChild(newGameName);
                                    }
                                }
                            }else{
                                if(data[i].difficultyLevel == "NORMAL" && data[i].isPredefinedGame == false){
                                    if(data[i].email_id == window.localStorage['emailid']){
                                        //create a new element in the list
                                        var newGameName = document.createElement("li");
                                        //calculate score
                                        var scoreFormula = (data[i].numberMoves + data[i].numberSeconds) * 0.5;
                                        //print score
                                        newGameName.innerHTML += data[i].game_name + " <span class='ui-li-count'>" + scoreFormula + "</span>";
                                        newGameName.appendChild(document.createElement("p"));
                                        //append li
                                        scoresNameList.appendChild(newGameName);
                                    }
                                }
                            }
                            
                        }else if(easySelected == false && normalSelected == false && hardSelected == true && hellSelected == false){
                            if(predefinedSelected){
                                if(data[i].difficultyLevel == "HARD" && data[i].isPredefinedGame == true){
                                    if(data[i].email_id == window.localStorage['emailid']){
                                        //create a new element in the list
                                        var newGameName = document.createElement("li");
                                        //calculate score
                                        var scoreFormula = (data[i].numberMoves + data[i].numberSeconds) * 0.5;
                                        //print score
                                        newGameName.innerHTML += data[i].game_name + " <span class='ui-li-count'>" + scoreFormula + "</span>";
                                        newGameName.appendChild(document.createElement("p"));
                                        //append li
                                        scoresNameList.appendChild(newGameName);
                                    }
                                }
                            }else{
                                if(data[i].difficultyLevel == "HARD" && data[i].isPredefinedGame == false){
                                    if(data[i].email_id == window.localStorage['emailid']){
                                        //create a new element in the list
                                        var newGameName = document.createElement("li");
                                        //calculate score
                                        var scoreFormula = (data[i].numberMoves + data[i].numberSeconds) * 0.5;
                                        //print score
                                        newGameName.innerHTML += data[i].game_name + " <span class='ui-li-count'>" + scoreFormula + "</span>";
                                        newGameName.appendChild(document.createElement("p"));
                                        //append li
                                        scoresNameList.appendChild(newGameName);
                                    }
                                }
                            }
                        }else if(easySelected == false && normalSelected == false && hardSelected == false && hellSelected == true){
                            if(predefinedSelected){
                                if(data[i].difficultyLevel == "HELL" && data[i].isPredefinedGame == true){
                                    if(data[i].email_id == window.localStorage['emailid']){
                                        //create a new element in the list
                                        var newGameName = document.createElement("li");
                                        //calculate score
                                        var scoreFormula = (data[i].numberMoves + data[i].numberSeconds) * 0.5;
                                        //print score
                                        newGameName.innerHTML += data[i].game_name + " <span class='ui-li-count'>" + scoreFormula + "</span>";
                                        //append li
                                        scoresNameList.appendChild(newGameName);
                                    }
                                }
                            }else{
                                if(data[i].difficultyLevel == "HELL" && data[i].isPredefinedGame == false){
                                    if(data[i].email_id == window.localStorage['emailid']){
                                        //create a new element in the list
                                        var newGameName = document.createElement("li");
                                        //calculate score
                                        var scoreFormula = (data[i].numberMoves + data[i].numberSeconds) * 0.5;
                                        //print score
                                        newGameName.innerHTML += data[i].game_name + " <span class='ui-li-count'>" + scoreFormula + "</span>";
                                        newGameName.appendChild(document.createElement("p"));
                                        //append li
                                        scoresNameList.appendChild(newGameName);
                                    }
                                }
                            }
                        }
                    }
                }      
            },
            error: function(jqXHR, textStatus, errorThrown){
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        })
        .done(function(e) {
            
        })
        .fail(function(e) {
            alert("error");
            console.log(e);
        })
        .always(function() {

        });
    }

    $(document).on('pagebeforeshow', '#predefined_scores_page', function(e){ 
        getScores();
    });

    //empties the score listview when the page is about to be hiden
    $(document).on("pagebeforehide","#predefined_scores_page",function(){ // When leaving predefined_scores_page
      var scoresNameList = document.getElementById("scores_list");
      scoresNameList.innerHTML = "";
    });
}