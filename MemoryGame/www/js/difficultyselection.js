/**
 * 
 */
var difficultyselection = (function() {
	
	/* Difficulty selection screen */
	$(document).on('pagebeforeshow', '#game__difficulty_selection_page', function(e) {
		
		var target = $('#difficultyselectionselectedgame');
		target.empty();

		// just show the user which game he has selected
		var imgEl = '<img class="ui-li-thumb" src=\'' + localStorage.game_thumbnail_image_data + '\'>';
		var name= '<a style="white-space: normal;" class="ui-btn ui-btn-b">'  + localStorage.game_name + imgEl + '</a>';	
		$('<li data-theme="b">').append(name).appendTo(target);
		target.listview('refresh');
		
		// based on the number of images enable or disable
		var numberImages = localStorage.game_number_of_images;
		
		// initially enable them all
		$('#difficulty_listview li').removeClass('ui-disabled');
		
		// initially empty the message
		$('#difficultyleveldisabledmessage').text('');
		
		//6 10 15 21
		if(numberImages >= 21  ){
			
			// enable all the difficulty levels
			// do nothing , already enabled
			$('#difficultyleveldisabledmessage').text('');
			
		}else if(numberImages >= 15){
			
			// disable the last one
			$('#difficulty_listview li').last().addClass('ui-disabled');
			
			// set the message
			$('#difficultyleveldisabledmessage').text('HELL level is disabled due to insufficient number of images');

		}else if(numberImages >= 10){

			// disable the last one
			$('#difficulty_listview li').last().addClass('ui-disabled');
			
			// disable the third one
			$('#difficulty_listview li:nth-child(3)').addClass('ui-disabled');
			
			// set the message
			$('#difficultyleveldisabledmessage').text('HARD and HELL levels are disabled due to insufficient number of images');

			
		}else if(numberImages >= 6){
			
			// disable the last one
			$('#difficulty_listview li').last().addClass('ui-disabled');
			
			// disable the third one
			$('#difficulty_listview li:nth-child(3)').addClass('ui-disabled');

			// disable the second one
			$('#difficulty_listview li:nth-child(2)').addClass('ui-disabled');
			
			// set the message
			$('#difficultyleveldisabledmessage').text('NORMAL, HARD and HELL levels are disabled due to insufficient number of images');


		}else{
			
			// disable all of them
			$('#difficulty_listview li').addClass('ui-disabled');
			
			// set the message
			$('#difficultyleveldisabledmessage').text('All levels are disabled due to insufficient number of images');
			
		}
		
		
		$('#difficulty_listview').off().on('click', 'li', function() {
			var el = $(this).find($('a'));
			localStorage.difficulty = $(el[0]).html().trim();
		});
		
		
	});
	
	// The public API
	return;

}());