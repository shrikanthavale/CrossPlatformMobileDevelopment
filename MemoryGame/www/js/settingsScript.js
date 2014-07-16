$(document).on("pageshow","#settings_page",function(){ // When entering settings screen

	//$("#soundsSlider").val("on").slider("refresh");
	//$("#vibrationSlider").val("on").slider("refresh");
	
	if(window.localStorage['vibrationglobalvariable']){
		window.localStorage['vibrationglobalvariable'] === 'true' ? $("#vibrationSlider").val("on").slider("refresh") : $("#vibrationSlider").val("off").slider("refresh");
	}else{
		
		$("#vibrationSlider").val("on").slider("refresh");
		window.localStorage['vibrationglobalvariable'] = true;
	}
	
	if(window.localStorage['soundglobalvariable']){
		window.localStorage['soundglobalvariable'] === 'true' ? $("#soundsSlider").val("on").slider("refresh") : $("#soundsSlider").val("off").slider("refresh");
	}else{
		
		$("#soundsSlider").val("on").slider("refresh");
		window.localStorage['soundglobalvariable'] = true;
	}
	
	$("#soundsSlider").change(function(){
		var currentSoundValue = $('#soundsSlider').slider().val();
		if(currentSoundValue === 'on'){
			window.localStorage['soundglobalvariable'] = true;
			//turnOnSound();
			setSound(true);
		}else {
			window.localStorage['soundglobalvariable'] = false;	
			//turnOffSound();
			setSound(false);
		}
	});

	$("#vibrationSlider").change(function(){
		var currentVibrationValue = $('#vibrationSlider').slider().val();		
		if(currentVibrationValue === 'on'){
			window.localStorage['vibrationglobalvariable'] = true;
		}else {
			window.localStorage['vibrationglobalvariable'] = false;
		}
	});
});
