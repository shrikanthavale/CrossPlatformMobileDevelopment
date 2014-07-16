var soundStatus = true;

function setSound(state)
{
	soundStatus = state;
}

var MemoryGame = function(options) {
	if (typeof(options) == "undefined" || options == null) {
		options = {};
	};

	STATE = {
		START: 0, // on intialize
		GAME: 1, // after load gets called
		CARDOPENED: 2, // one card opened
		ANIMATION: 3, // wait for animation, to disable clicking ...
		END: 4 // when all cards are matched
	};
	DIFFICULTY = { // DIFFICULTY level, used for calculatin card size and final score(scoreK some coeficient for points?)
		EASY: {
			value: 3,
			name: "easy",
			imageCount: 12,
			marginsum: 0,
			scoreK: 3
		},
		NORMAL: {
			value: 4,
			name: "normal",
			imageCount: 20,
			marginsum: 10,
			scoreK: 4
		},
		HARD: {
			value: 5,
			name: "hard",
			imageCount: 30,
			marginsum: 40,
			scoreK: 6
		},
		HELL: {
			value: 6,
			name: "hell",
			imageCount: 42,
			marginsum: 70,
			scoreK: 10
		},
	};
	SOUNDS = {
		GAMEOVER: 100, 
		SLIDEUP: 101, 
		RANDOM: 102
	};
	
	// parse the string difficulty passed, set difficulty parameters
	this.parseDifficulty = function(difficultyString) {
		difficultyString = difficultyString.toLowerCase().trim();
		switch (difficultyString) {
			case "easy":
				return DIFFICULTY.EASY;
				break;
			case "normal":
				return DIFFICULTY.NORMAL;
				break;
			case "hard":
				return DIFFICULTY.HARD;
				break;
			case "hell":
				return DIFFICULTY.HELL;
				break;
			default:
				console.log("Error parsing difficulty string:" + difficultyString);
				return null;
				break;
		}

	}
	/* 
		Shuffles the array using  Fisher-Yates.
		Used for shuffling images before they are loaded, so "easy" game for instance has many permutations 
	 */
	this.shuffle = function(array) {
		var tmp, current, top = array.length;

		if (top)
			while (--top) {
				current = Math.floor(Math.random() * (top + 1));
				tmp = array[current];
				array[current] = array[top];
				array[top] = tmp;
			}

		return array;
	}
	/*
	Declaring some variables :)
	 */
	this._target = options.target;
	this._images = shuffle(options.images);
	this._difficulty = parseDifficulty(options.difficulty); // set the difficulty based on string parameter in options
	this._state = STATE.START;
	this._openedCard = null;
	this._startTime = new Date();
	this._timeScore = 0;
	this._moves = 0;
	//this._isSound = true;
	this._soundPicker = SOUNDS.POP;
	var gameover_sound = null;
	var slideup_sound = null;
	
	
	gameover_sound = new Media("/android_asset/www/gameover.mp3",
			function() {
			// navigator.notification.alert('Success!', alertDismissed);
			//pop_sound.release();
			 console.log("playAudio():Audio Success");
			},
			function(err) {
			// navigator.notification.alert('Error!', alertDismissed);
			console.log("code: " + error.code + "\n" + 
	                  "message: " + error.message + "\n");
			});
	if(gameover_sound == null)
		{
			alert('gameover_sound not loaded from assets');
		}
			
	slideup_sound = new Media("/android_asset/www/slideup.mp3",
			function() {
			// navigator.notification.alert('Success!', alertDismissed);/
			 //slideup_sound.release();
			 console.log("playAudio():Audio Success");
			},
			function(err) {
			// navigator.notification.alert('Error!', alertDismissed);
			console.log("code: " + error.code + "\n" + 
	                  "message: " + error.message + "\n");
			});
	
	if(slideup_sound == null)
	{
		alert('gameover_sound not loaded from assets');
		//navigator.notification.alert('slideup_sound not loaded from assets!', alertDismissed);
		
	}
	
	/*this.getIsSound = function() {
		return this._isSound;
	}
	
	this.setIsSound = function setSound(sound) {
		this._isSound = sound;
	}*/
	
	this.getSoundPicker = function() {
		return this._soundPicker;
	}
	this.setSoundPicker = function(soundPick) {
		this._soundPicker = soundPick;
	}

	this.getState = function() {
		return this._state;
	}
	this.setState = function(state) {
		this._state = state;
	}
	this.getOpenedCard = function() {
		return this._openedCard;
	}
	this.setOpenedCard = function(card) {
		this._openedCard = card;
	}

	this.getMovesScore = function() {
		return this._moves;
	}
	this.getTimeScore = function() {
		return this._timeScore;
	}

	/* 
		Calculates the prefered card size depending on the screen size and difficulty

	// TO-DO Get device properties, width, pixel density etc. and use it for better calculation

	*/
	this.calculateSizes = function() {
		var deviceWidth = $(window).width() - this._difficulty.marginsum; // TO-DO Get device properties, width, pixel density etc.
		var cardWidth = deviceWidth / (1 + this._difficulty.value);
		this._imageWidth = cardWidth;
	}
	this.setTime = function() {
		var now = new Date();
		var dif = now - this._startTime;
		var s = Math.floor(dif / 1000);
		$("#score-status span").eq(0).html(s);
		if (getState() != STATE.END)
			setTimeout(function() {
				setTime()
			}, 500);
	}
	this.setMoves = function() {
		$("#score-status span").eq(1).html(this._moves);
	}
/*	function turnOnSound()
	{
		_isSound = true;
	}
	function turnOffSound()
	{
		_isSound = false;
	}*/
	
	function playSound() {
	    if(soundStatus == false)
		{
			return;
		}
		
		switch (getSoundPicker()) {
			case SOUNDS.GAMEOVER:
				gameover_sound.play();
			    break;
				
			case SOUNDS.SLIDEUP:
				slideup_sound.play();
			    break;
				
			default:
				console.log("Error choosing sound:" + getSoundPicker());
				return null;
				break;
		}
	}

	this.isGameOver = function() {
		var endCheck = $('.card-solved').length;

		endTime = new Date();


		if (endCheck == this._difficulty.imageCount) {
			setState(STATE.END)

			setSoundPicker(SOUNDS.GAMEOVER);
			playSound();
			// navigator.notification.alert("Score: 100", alertCallback, "Game finished ", "OK");
			this._timeScore = endTime - this._startTime;
			this._timeScore = Math.floor(this._timeScore / 1000);

			storeResultInDB();

			$("#score-popup > p").html("Game finished in " + this._timeScore + ' seconds and ' + this._moves + ' moves');
			$("#score-popup").popup("open");
			// alert("Game finished in "+ Math.floor(res/1000) + ' seconds and ' + this._moves + ' moves');
		}

	}

	/* 
		Loads the game cards
	*/
	this.load = function() {
		calculateSizes();

		var gameImages = this._images.slice(0, this._difficulty.imageCount / 2); // select only the number of needed, so half the game card count
		gameImages = gameImages.concat(gameImages); // Merges both arrays
		gameImages = shuffle(gameImages); // shuffle again so they are randomized
		$(this._target).empty();
		for (var i = 0; i < gameImages.length; i++) {
			var divEl = document.createElement('div');
			divEl.className = 'card';
			divEl.className += ' card-' + this._difficulty.name; // add diffuculty specific card css class

			var imgEl = document.createElement('img');

			// imgEl.src = gameImages[i].image_name;
			imgEl.src = "data:image/png;base64," + gameImages[i].image_data;
			imgEl.width = this._imageWidth;

			var spanEl = document.createElement('span');
			spanEl.className = "questionmark";
			divEl.appendChild(spanEl);
			divEl.appendChild(imgEl);
			$(this._target).append(divEl);

		};
		this._state = STATE.GAME;
		setTime();
		setMoves();
		// for handling card clicks
		$(".card").click(function(e) {
			var card = $(this);
			switch (getState()) {
				case STATE.GAME:
					if (!card.hasClass('card-opened')) {
						card.addClass('card-opened');
						card.find('.questionmark').remove();
						setState(STATE.CARDOPENED);
						setOpenedCard(card);
					}
					break;

				case STATE.CARDOPENED:
					if (!card.hasClass('card-opened')) {
						card.addClass('card-opened');
						card.find('.questionmark').remove();
						setState(STATE.ANIMATION);
						this, _moves++;
						setMoves();
						if (card.html() == getOpenedCard().html()) {
							setTimeout(function() {
								card.addClass('card-solved');
								getOpenedCard().addClass('card-solved');
								
								setSoundPicker(SOUNDS.SLIDEUP);
								playSound();

								card.removeClass('card-opened');
								getOpenedCard().removeClass('card-opened');
								setState(STATE.GAME);
								isGameOver();
							}, 1000);

						} else {
							setTimeout(function() {
								card.removeClass('card-opened');
								getOpenedCard().removeClass('card-opened');
								setState(STATE.GAME);
								// vibrate only if turned on from settings
								if(window.localStorage['vibrationglobalvariable'] === 'true'){
									navigator.notification.vibrate(1000);
								}
							}, 1200);

						}

					}
					break;

			}

		});
		console.log('Loaded with difficulty ' + this._difficulty.name + ' and number of images: ' + this._images.length);


	};

	this.storeResultInDB = function() {

		// if user is not logged in, we dont store the score
		if (localStorage.getItem("emailid") === null) {
			return;
		}

		$.ajax({
			url: 'http://memorygamewebservice-shrikanthavale.rhcloud.com/MemoryGameWebservice/rest/memorygamewrite/insertscores',
			type: 'POST',
			dataType: 'json',
			crossDomain: true,
			data: {
				GameName: localStorage.game_name,
				EmailID: localStorage['emailid'],
				DifficultyLevel: localStorage.difficulty,
				ScoreMove: getMovesScore(),
				ScoreTimerSeconds: getTimeScore(),
				CustomPredefineGame: localStorage['game_type'] === 'PREDEFINED' ? localStorage['game_type'] : localStorage['emailid']
			},
			xhrFields: {
				withCredentials: false
			},
			error: function(jqXHR, textStatus, errorThrown) {

				console.log(jqXHR);
				console.log(textStatus);
				console.log(errorThrown);
			}

		})
			.done(function(e) {
				// alert("success");
			})
			.fail(function(e) {
				alert("error");
				console.log(e);
			})
			.always(function() {
				// alert("complete");
			});

	}

	return this;
};

$(document).on('pagebeforeshow', '#play_page', function(e) {

	//clear the previous one before loading
	$('#game-wrapper').empty();

	$.ajax({
		url: 'http://memorygamewebservice-shrikanthavale.rhcloud.com/MemoryGameWebservice/rest/memorygameread/readgame',
		type: 'GET',
		dataType: 'json',
		crossDomain: true,
		data: {
			GameName: localStorage.game_name,
			EmailID: localStorage['game_type'] === 'PREDEFINED' ? localStorage['game_type'] : localStorage['emailid'],
		},
		xhrFields: {
			withCredentials: false
		},
		error: function(jqXHR, textStatus, errorThrown) {

			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
		},
		beforeSend: function() {
			setTimeout(function() {
				$.mobile.loading('show')
			}, 1);
		},
		complete: function() {
			setTimeout(function() {
				$.mobile.loading('hide')
			}, 1);
		}
	})
		.done(function(e) {
			var images = e;
			// console.log(results);
			var options = {
				target: '#game-wrapper',
				difficulty: localStorage.difficulty,
				images: images,
				// onComplete: when game is finished
			};
			var game = MemoryGame(options);
			game.load();

			// alert("success");
		})
		.fail(function(e) {
			alert("error");
			console.log(e);
		})
		.always(function() {
			// alert("complete");
		});

});

