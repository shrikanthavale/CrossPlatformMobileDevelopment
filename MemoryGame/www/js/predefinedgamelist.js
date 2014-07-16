/**
 * Load the list of custom games of the user
 */
var customGames = (function() {
	
	// event handler
	$(document).on('pagebeforeshow', '#game_selection_page_installed', function(e){  
		
		// clear the search field
		$('#predefinedgamefilter').val('');
		
		 $('#preinstalled_listview').off().on('click', 'li', function() {
		 	// console.log(this);
		 	var el = $(this).find( $('a') );
		 	console.log( el ) ;
		 	console.log( $(el[0]).html() ) ;
	       	// localStorage.game_name = $(el[0]).html();
		 	localStorage.game_name = el.attr("hiddengamename");
		 	localStorage.game_number_of_images = el.attr("hiddennumberofimages");
	       	localStorage.game_type = 'PREDEFINED';
	       	localStorage.game_thumbnail_image_data = el.find('img').attr('src');
	    });

		 var count =  $('#preinstalled_listview').children().length; 
		 
		 if(count > 0){
			 // do nothing , don't load the list again
			 
		 }else{
		 
			// alert('showing installed games');
			$.ajax({
				url: 'http://memorygamewebservice-shrikanthavale.rhcloud.com/MemoryGameWebservice/rest/memorygameread/readgameslist',
				type: 'GET',
				dataType: 'json',
				crossDomain : true,
				data: { 
					EmailID: 'PREDEFINED' ,
				},
				xhrFields: {
			    	withCredentials: false
				},
			  error: function(jqXHR, textStatus, errorThrown){
			      console.log(jqXHR);
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
				var target = $('#preinstalled_listview');
				target.empty();
	
				for (var i = 0; i < games.length; i++) {
					var imgEl = '<img class="ui-li-thumb" src=\'data:image/png;base64,' + games[i].image_data + '\'>';
					var name= '<a style="white-space: normal;" href="#game__difficulty_selection_page" data-transition="slide" class="ui-btn ui-btn-b ui-btn-icon-right ui-icon-carat-r"  hiddengamename= "' + games[i].game_name + '" hiddennumberofimages="'+ games[i].number_images +'">'  + games[i].game_name + imgEl + '</a>';	
					$('<li data-theme="b" >').append(name).appendTo(target);
					target.listview('refresh');
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
			
		 }//end of else condition
		 
		});
	
	// The public API
	return;
}());
