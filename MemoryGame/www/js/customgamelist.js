/**
 * Load the list of custom games of the user
 */
var customGames = (function() {
	
	// event handler
	$(document).on('pagebeforeshow', '#game_selection_page_custom', function(e){  
		
		//get the div tags
		var usernotloggedinDiv = $('#usernotloggedin');
		var createGameMessage = $('#creategamediv');
		var gameListDiv = $('#customgameslist');
		
		// check if user is already logged in
		var accessToken = window.localStorage['fbtoken'];
		
		if (typeof accessToken === 'undefined') {
			
			// Ask the user to log in
			usernotloggedinDiv.show();
			
			// hide the gamelist div
			gameListDiv.hide();
			
			// hide the create game tab
			createGameMessage.hide();
			
		}else {
			
			
			// hide the user asking to log in
			usernotloggedinDiv.hide();
			
			// hide the create game tab
			createGameMessage.hide();
			
			// hide the gamelist div
			gameListDiv.hide();			
			
			// clear the search field
			$('#customgamefilter').val('');
			
			gameListDiv.off().on('click', 'li', function() {
			 	var el = $(this).find( $('a') );
		       	localStorage.game_name = el.attr("hiddengamename");
		       	localStorage.game_number_of_images = el.attr("hiddennumberofimages");
		       	localStorage.game_type = 'CUSTOM';
		       	localStorage.game_thumbnail_image_data = el.find('img').attr('src');
		    });
			
			$.ajax({
				url: 'http://memorygamewebservice-shrikanthavale.rhcloud.com/MemoryGameWebservice/rest/memorygameread/readgameslist',
				type: 'GET',
				dataType: 'json',
				crossDomain : true,
				data: { 
					EmailID: window.localStorage['emailid'],
				},
				xhrFields: {
			    	withCredentials: false
		  },
		  error: function(jqXHR, textStatus, errorThrown){
		      console.log('Error ' + jqXHR);
		      console.log(textStatus);
		      console.log(errorThrown);
			},
		 beforeSend: function() {
			 setTimeout(function(){ $.mobile.loading('show'); }, 1);			 
		  },
		  complete: function(){
			  setTimeout(function(){ $.mobile.loading('hide'); }, 1);			  
		  } 
			})
			.done(function(e) {
				var games = e;
				console.log(games);
				gameListDiv.empty();

				if(games.length < 1 ){
					createGameMessage.show();
				}else{
					//show the list of games					
					gameListDiv.show();
				}
				
				for (var i = 0; i < games.length; i++) {
					var imgEl = '<img class="ui-li-thumb" src=\'data:image/png;base64,' + games[i].image_data + '\'>';
					var name= '<a style="white-space: normal;" href="#game__difficulty_selection_page" data-transition="slide" class="ui-btn ui-btn-b ui-btn-icon-right ui-icon-carat-r" hiddengamename="' + games[i].game_name + '" hiddennumberofimages="'+ games[i].number_images +'">'  + games[i].game_name + imgEl + '</a>';	
					$('<li data-theme="b">').append(name).appendTo(gameListDiv);
					gameListDiv.listview('refresh');
				};
				
			})
			.fail(function(e) {
				 $('<div>').simpledialog2({
					    mode: 'button',
					    headerText: 'Error !!!',
					    headerClose: true,
					    buttonPrompt: 'Some Error Occurred, Please check your Internet connenction, or try after some time',
					    buttonInput: false,
					    buttons : {
					      'OK': {
					        click: function () { 
					          //do nothing
					        }
					      },
					   }
				 });
				console.log(e);
			})
			.always(function() {
				// alert("complete");
			});
			
		}

	});
	
	// The public API
	return;

}());
