/**
 * Create game script
 */
var creategame = (function() {

	// global variable
	var imageIconClicked;

	// event handler before page show
	$(document).on('pagebeforeshow', '#create_custom_page', function(e) {
		
		// fix the header and footer for facebook panel
		fixheaderfooterfacebookpanel();
		
		//get the div tags
		var usernotloggedinDiv = $('#create_custom_page').find('#usernotloggedin');
		var imagesgriddiv = $('#imagesgrid');
		var selectmenu = $('#difficultylevelselectmenu');
		var numberofgamemessagediv = $('#numberofimagesrequiredmessage');
		var cancelcreategamebutton = $('#cancelcreategame');
		var savecreategamebutton = $('#savecreategame');
		var selectdifficultyleveldiv = $('#selectdifficultylevelmessage');
		
		// check if the user is logged in or not, if logged in allow to create game , else show message
		var accessToken = window.localStorage['fbtoken'];
		
		// if the user comes back to page, reset previous data, clear all images
		resetcreategamepage();
		
		if (typeof accessToken === 'undefined') {
			
			// Ask the user to log in, disable and hide everything
			usernotloggedinDiv.show();
			
			// hide the gamelist div
			imagesgriddiv.hide();
			numberofgamemessagediv.hide();
			cancelcreategamebutton.hide();
			savecreategamebutton.hide();
			selectdifficultyleveldiv.hide();
			// disable the difficulty selection menu
			selectmenu.prop('disabled',true);
			
		}else{
		
			// hide the user log in tag
			usernotloggedinDiv.hide();
			
			// show the gamelist div
			cancelcreategamebutton.show();
			savecreategamebutton.show();
			selectdifficultyleveldiv.show();
			numberofgamemessagediv.show();
			numberofgamemessagediv.text('');
			
			// enable the difficulty selection menu
			selectmenu.prop('disabled',false);
			
			// hide till something is selected from drop down
			imagesgriddiv.hide();
			
			selectmenu.change(function(event) {
				
				/* Act on the event */
				var selectedValue = $(this).find(':selected').val();
				
				// dynamically change the div tag showing the message
				if(selectedValue === 'EASY'){
					
					selectdifficultyleveldiv.hide();
					imagesgriddiv.show();
					numberofgamemessagediv.text('Minimum 6 images are required for creating '+ selectedValue + ' game.');
					addImagesDifficultySelection(6);
	
				}else if(selectedValue === 'NORMAL'){
	
					selectdifficultyleveldiv.hide();
					imagesgriddiv.show();
					numberofgamemessagediv.text('Minimum 12 images are required for creating '+ selectedValue + ' game.');
					addImagesDifficultySelection(12);
	
				}else if(selectedValue === 'HARD'){
	
					selectdifficultyleveldiv.hide();
					imagesgriddiv.show();
					numberofgamemessagediv.text('Minimum 15 images are required for creating '+ selectedValue + ' game.');
					addImagesDifficultySelection(15);
	
				}else if(selectedValue === 'HELL'){
	
					selectdifficultyleveldiv.hide();
					imagesgriddiv.show();
					numberofgamemessagediv.text('Minimum 21 images are required for creating '+ selectedValue + ' game.');
					addImagesDifficultySelection(21);
	
				}else{
					selectdifficultyleveldiv.show();
					imagesgriddiv.hide();
					numberofgamemessagediv.text('');
				}
			});
			
		}
	});

	
	/**
	 * Dynamically add images in div tag, based on value selected in drop down difficulty level
	 */
	function addImagesDifficultySelection(imagesAddedCount){

		// get the number of images currently present
		var numberImagesPresentNow = $('#imagesgrid').children('.ui-grid-b').length;

		if((numberImagesPresentNow * 3) ===  (imagesAddedCount) ){

			// do nothing as count of images is correct
			
		}else if ((numberImagesPresentNow * 3) < (imagesAddedCount)){

			// add the div tags
			var numberDivTagsTobeAdded = ((imagesAddedCount - (numberImagesPresentNow * 3)) / 3); // considering each tag has 3 images
			for(var counter=1; counter <= numberDivTagsTobeAdded; counter++){

				// initialize id for div tag
				var idforthedivtag = 'imagesgrid' + (numberImagesPresentNow + counter);
				var divTagText = '<div class="ui-grid-b" id="' + idforthedivtag + '">';

				// append the div tag text
				$('#imagesgrid').append(divTagText);

				// create three images inside tag
				$('#' + idforthedivtag).append($('<div class="ui-block-a" >').
						append('<img src="css/images/card-style.jpg" alt="Click Here" style="width: 95%;height: 22%" id="' + idforthedivtag + 'image1"  class="creategamecard">'));

				$('#' + idforthedivtag).append($('<div class="ui-block-b" >').
						append('<img src="css/images/card-style.jpg" alt="Click Here" style="width: 95%;height: 22%" id="' + idforthedivtag + 'image2"  class="creategamecard">'));

				$('#' + idforthedivtag).append($('<div class="ui-block-c" >').
						append('<img src="css/images/card-style.jpg" alt="Click Here" style="width: 95%;height: 22%" id="' + idforthedivtag + 'image3"  class="creategamecard">'));

			}	

		}else if ((numberImagesPresentNow * 3) > (imagesAddedCount)){

			// difference in images
			var differenceinimages = (numberImagesPresentNow * 3) - (imagesAddedCount);

			var numberoftagstoberemoved = differenceinimages / 3;
			//remove the div tags

			for(var counter=1; counter <= numberoftagstoberemoved; counter++){
				// remove last child
				$('#imagesgrid .ui-grid-b:last-child').remove();
			}
		}

		// add image click listener if new images are added
		$('#imagesgrid img').click(function(){

			// save the image clicked in global variable
			imageIconClicked = this;

			// show the menu for selection			
			showpopupimageselection();
		});

	}

	/**
	 * shows popup for selection of photos
	 */
	function showpopupimageselection(){
		$('#imageselectionpopupmenu').popup('open');
	}

	/**
	 * uses camera to take photo and assigns it to a image clicked
	 */
	function usecamera(){
		
		// hide the dialog
		$('#imageselectionpopupmenu').popup('close');
		
		// this function call is like a separate thread, not exactly, but helps in closing above pop up immediately
		setTimeout( function(){

			navigator.camera.getPicture(onSuccess, onFail, { quality: 100,
	    		destinationType: Camera.DestinationType.DATA_URL, allowEdit : true,  sourceType : Camera.PictureSourceType.CAMERA,
	    		encodingType: Camera.EncodingType.PNG, targetWidth: 128, targetHeight: 128,
	    		mediaType : Camera.MediaType.PICTURE , saveToPhotoAlbum : false
	 		}); 
	
			function onSuccess(imageData) {
	
				// ajax loader for the setting of image 
				setTimeout(function() {
					$.mobile.loading('show')
				}, 1);
				
				// set the image path
				imageIconClicked.src = "data:image/png;base64," + imageData;
			    
				setTimeout(function() {
					$.mobile.loading('hide')
				}, 1);
			}
	
			function onFail(message) {
				 $('<div>').simpledialog2({
					    mode: 'button',
					    headerText: 'Error !!!',
					    headerClose: true,
					    buttonPrompt: message,
					    buttonInput: false,
					    buttons : {
					      'OK': {
					        click: function () { 
					          //do nothing
					        }
					      },
					   }
				 });
			}
		}, 10);
	}

	/**
	 * This method uses gallery function and images from gallery to capture images and assign ti selected tag
	 */
	function usegallery(){

		// hide the dialog
		$('#imageselectionpopupmenu').popup('close');
		
		// this function call is like a separate thread, not exactly, but helps in closing above pop up immediately
		setTimeout( function(){
		
			navigator.camera.getPicture(onSuccess, onFail, { quality: 100,
	    		destinationType: Camera.DestinationType.DATA_URL, allowEdit : true,  sourceType : Camera.PictureSourceType.SAVEDPHOTOALBUM,
	    		encodingType: Camera.EncodingType.JPEG,  targetWidth: 128, targetHeight: 128,
	    		mediaType : Camera.MediaType.PICTURE , saveToPhotoAlbum : false
	 		}); 
	
			function onSuccess(imageData) {
	
				// ajax loader for the setting of image 
				setTimeout(function() {
					$.mobile.loading('show')
				}, 1);
				
				// set the image path
				imageIconClicked.src = "data:image/png;base64," + imageData;
			    
				setTimeout(function() {
					$.mobile.loading('hide')
				}, 1);
			}
	
			function onFail(message) {
				 $('<div>').simpledialog2({
					    mode: 'button',
					    headerText: 'Error !!!',
					    headerClose: true,
					    buttonPrompt: message,
					    buttonInput: false,
					    buttons : {
					      'OK': {
					        click: function () { 
					          //do nothing
					        }
					      },
					   }
				 });
			}	
		}, 10);
		
	}
	
	/**
	 * Resets all the selected images
	 */
	function cancelGame(){
		
		//show a warning message before cancelling 
		  $('<div>').simpledialog2({
			    mode: 'button',
			    headerText: 'Sure?',
			    headerClose: true,
			    buttonPrompt: 'This will reset all the images selected till now',
			    buttons : {
			      'Yes': {
			        click: function () { 
			          resetcreategamepage();
			        }
			      },
			      'No': {
			        click: function () { 
			          //$('#buttonoutput').text('Cancel');
			          // do nothing
			        },
			        icon: "delete",
			        theme: "b"
			      }
			    }
		  });
	}

	/**
	 * reset the difficulty selection menu and images 
	 */
	function resetcreategamepage(){
		
		// get the difficulty select menu
		var selectmenu = $('#difficultylevelselectmenu');
		
		// reset the drop down to easy
		selectmenu.val("SELECT").change();
		
		// for all the remaining images reset them to default images
		$('#imagesgrid').find('img').each(function(){
			this.src = 'css/images/card-style.jpg';
		});
		
	}
	
	/**
	 * save game method called on save button clicked, checks few validations and saves game in database
	 */
	function saveGame(){
		
		var selectedValue = $('#difficultylevelselectmenu').find(':selected').val();
		var allImagesSet = 'true';
		
		// check difficulty level drop down
		if(selectedValue === 'SELECT'){
			
			 $('<div>').simpledialog2({
				    mode: 'button',
				    headerText: 'Error !!!',
				    headerClose: true,
				    buttonPrompt: 'Please Select Difficulty Level',
				    buttonInput: false,
				    buttons : {
				      'OK': {
				        click: function () { 
				          //$('#buttonoutput').text($.mobile.sdLastInput);
				        }
				      },
				   }
			 });
			 
			return;
		}
		
		// check if all the images are set
		$('#imagesgrid').find('img').each(function(){

			// get the source of image
			var imageSource = this.src;
			
			// check if image is set with appropriate image
			if(imageSource.indexOf('card-style.jpg') != -1){
				allImagesSet = 'false';
			}else{
			    // do nothing
			}
			
		});
		
		if(allImagesSet === 'false'){
			
			 $('<div>').simpledialog2({
				    mode: 'button',
				    headerText: 'Error !!!',
				    headerClose: true,
				    buttonPrompt: 'Please set all the minimum required images',
				    buttonInput: false,
				    buttons : {
				      'OK': {
				        click: function () { 
				          //do nothing
				        }
				      },
				   }
			 });
			 
			 return;
		}
		
		 $('<div>').simpledialog2({
			    mode: 'button',
			    headerText: 'Save Game',
			    headerClose: true,
			    buttonPrompt: 'Enter Game Name',
			    buttonInput: true,
			    buttons : {
			      'OK': {
			        click: function () { 
				          if($.mobile.sdLastInput == ""){
							  saveGame();
				          }else{
				        	  saveGameIntoDatabase($.mobile.sdLastInput);
				          }
			        }
			      },
			   }
		 });
	 
	}
	
	/**
	 * time consuming method, creates a json of all base 64 images , makes a ajax call to save a game in database.
	 */
	function saveGameIntoDatabase(gameName){
		
		// this function call is like a separate thread, not exactly, but helps in closing above pop up immediately
		setTimeout( function(){
			
			// show processing image
			setTimeout(function(){ $.mobile.loading('show'); }, 1);
			
			// image name counter
			var imageNameCounter = 1;
			
			// json string image object
			var jsonStringImageObject = '';
			
			// game details object
			var jsonStringGameDetailsObject = '';
			
			// get all the data
			// for all the images get the data
			$('#imagesgrid').find('img').each(function(){
				
				// image data
				var base64ImageData = this.src.substring("data:image/png;base64,".length, this.src.length);
				
				// image name
				var imageName = "image_" + imageNameCounter + ".png";
				
				// game id hard code it to zero, backend will generate it 
				var gameid = 0;
				
				// create jsonstring
				jsonStringImageObject = jsonStringImageObject + '{"image_id":0 , "image_name":"'+imageName+'","image_data":"'+base64ImageData+'","game_id":0},';
				
			});
	
			// final json string image object
			jsonStringImageObject = jsonStringImageObject.substring(0, jsonStringImageObject.length - 1); // remove extra comma at the end
			jsonStringImageObject = '[' + jsonStringImageObject + ']';
			
			// now create game details object
			jsonStringGameDetailsObject = '{"game_id":0,"game_name":"'+gameName+'","user_email_id":"'+window.localStorage['emailid']+'"}';
			
			// hide processing image
			setTimeout(function(){ $.mobile.loading('hide'); }, 1);
			
			// web service call to save the details
			$.ajax({
				url: 'http://memorygamewebservice-shrikanthavale.rhcloud.com/MemoryGameWebservice/rest/memorygamewrite/insertnewgame',
				type: 'POST',
				dataType: 'json',
				crossDomain: true,
				data: {
					NewGame: jsonStringGameDetailsObject,
					GameImages: jsonStringImageObject,
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
					 setTimeout(function(){ $.mobile.loading('show'); }, 1);
				 },
				  complete: function(){
					  setTimeout(function(){ $.mobile.loading('hide'); }, 1);
				  }  
			})
				.done(function(e) {
					console.log('Game Saved Successfully');
					
					var baseURL = location.href;
					baseURL = baseURL.substring(0, baseURL.indexOf('#'));
					baseURL = baseURL + '#game_selection_page_custom';
					console.log('URL ' + baseURL);
					$(location).attr('href', baseURL);
					//window.location.replace(url);
				})
				.fail(function(e) {
					
					 $('<div>').simpledialog2({
						    mode: 'button',
						    headerText: 'Error !!!',
						    headerClose: true,
						    buttonPrompt: 'Some Error Occurred, Please try after sometime',
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
				});

		}, 100);
		
	}
	
	
	/****************************************************************************************************************************************************************/
	/**************************************************************** RELATED TO FACEBOOK PHOTOS*********************************************************************/
	/**************************************************************** RELATED TO FACEBOOK PHOTOS*********************************************************************/
	/****************************************************************************************************************************************************************/
	
	/*
	 * Fixes the header in the scrolling left panel, this panel might have buttons for closing panel and selecting gallery
	 */
	function fixheaderfooterfacebookpanel(){
		var fixmeTop = $('.fixmetop').offset().top;
		$(window).scroll(function() {
		    var currentScroll = $(window).scrollTop();
		    if (currentScroll >= fixmeTop) {
		        $('.fixmetop').css({
		            position: 'fixed',
		            top: '0',
		            left: '0'
		        });
		    } else {
		        $('.fixmetop').css({
		            position: 'static'
		        });
		    }
		});
	}
	
	/**
	 * Load galleries from facebook account
	 */
	function loadfacebookgalleries(){
		
		// close the popup
		$('#imageselectionpopupmenu').popup('close');
		
		// get the panel
		var faceboolleftpaneldivtag = $('#creategamefacebookphotospanel');
		
		//get the div tags
		var selectedalbumimages = $('#creategamefacebookphotospanel').find('#selectedalbumimages');
		var facebooklistofalbumsdiv = $('#creategamefacebookphotospanel').find('#facebooklistofalbumsdiv');
		var selectalbumimagemessage = $('#creategamefacebookphotospanel').find('#selectalbumimagemessage');
		
		selectedalbumimages.hide();
		selectalbumimagemessage.text('Select Album');
		facebooklistofalbumsdiv.show();
		
		// this function call is like a separate thread, not exactly, but helps in closing above pop up immediately
		setTimeout( function(){
			
			// create an empty data set for storing album id, name, cover photo
			var albumdatadict = {};
			
			// show processing image
			setTimeout(function(){ $.mobile.loading('show'); }, 1);
			
			// make a call to facebook api
			openFB
				.api({
					path : '/me/albums',
					params : {
						fields : 'id,name,cover_photo'
					},				
					ajaxasynchronous : 'false',
					success : function(data) {
						
						console.log("Facebook Albums " + data);
						// facebook data
						var facebookdata = data.data;
						
						// add the hard coded entry as tagged photos, as they are not returned as part of album
						albumdatadict['taggedphotos'] = ['Tagged Photos', window.localStorage['profilepicurl']];
	
						for (var i = 0; i < facebookdata.length; i++) {
							// cover photo url
							var coverphotourl = '';
							
							// if the cover photo is returned as undefined, then this album is empty for sure , so don't show empty albums
							// and do this only if it has atleast one photo
							if(facebookdata[i].cover_photo){
							
								// get the image url, of cover photo
								// make a call to facebook api
								openFB
									.api({
										path : '/'+facebookdata[i].cover_photo,
										params : {
											fields : 'images'
										},				
										ajaxasynchronous : 'false',
										success : function(data) {
											// it is observed that facebook api gives high resolution image urls , and decreases
											// resolution and gives low resolution images at the end, so lets take second last image url
											coverphotourl = data.images[data.images.length - 2].source;
										},
										error : function() {
											 $('<div>').simpledialog2({
												    mode: 'button',
												    headerText: 'Error !!!',
												    headerClose: true,
												    buttonPrompt: 'Some Error Occurred, Please check your Internet connenction, or try Logout from facebook and Login again',
												    buttonInput: false,
												    buttons : {
												      'OK': {
												        click: function () { 
												          //do nothing
												        }
												      },
												   }
											 });
										}
									});
								
								albumdatadict[facebookdata[i].id] = [facebookdata[i].name , coverphotourl] ;
							};
						}
						
					},
					error : function() {
						 $('<div>').simpledialog2({
							    mode: 'button',
							    headerText: 'Error !!!',
							    headerClose: true,
							    buttonPrompt: 'Some Error Occurred, Please check your Internet connenction, or try Logout from facebook and Login again',
							    buttonInput: false,
							    buttons : {
							      'OK': {
							        click: function () { 
							          //do nothing
							        }
							      },
							   }
						 });
					}
				});
			
			
			var target = $('#facebooklistofalbums');
			target.empty();
			
			// go over all keys and values in our dictionary
			for(key in albumdatadict){
				var imgEl =  '<img class="ui-li-thumb" style="width: 30%; height:100%;" src=\'' + albumdatadict[key][1] + '\'>';
				var name = '<a style="white-space: normal;" class="ui-btn ui-btn-b"  hiddenalbumname= "' + albumdatadict[key][0] + '" hiddenalbumid="'+ key +'">'  + albumdatadict[key][0] + imgEl + '</a>';	
				$('<li data-theme="b" >').append(name).appendTo(target);
				target.listview('refresh');
			}
			
			// show processing image
			setTimeout(function(){ $.mobile.loading('hide'); }, 1);
			
			// store in local storage
			window.localStorage['listofalbums'] = albumdatadict;
			
			// add the on click listener to list
			target.off().on('click', 'li', function() {
				
			 	var el = $(this).find( $('a') );
		       	var albumid = el.attr("hiddenalbumid");
		       	
		       	// load album images
		       	loadimagesfromselectedfacebookalbum(albumid);
		       	
		    });
		
		}, 100);
	}
	
	/*
	 * based on the album selected by user, uses graph api facebook and gets all the photos from that album
	 */
	function loadimagesfromselectedfacebookalbum(albumid){
		
		// facebook path
		var path = '';
		
		//get the div tags
		var selectedalbumimages = $('#create_custom_page').find('#selectedalbumimages');
		var facebooklistofalbumsdiv = $('#create_custom_page').find('#facebooklistofalbumsdiv');
		var selectalbumimagemessage = $('#create_custom_page').find('#selectalbumimagemessage');
		
		selectedalbumimages.show();
		selectalbumimagemessage.text('Select Image');
		facebooklistofalbumsdiv.hide();
		
		selectedalbumimages.empty();
		
		if(albumid === 'taggedphotos'){
			path = '/me/photos';
		}else{
			path = '/' + albumid + '/photos';
		}
		
		// this function call is like a separate thread, not exactly, but helps in closing above pop up immediately
		setTimeout( function(){
			
			// show processing image
			setTimeout(function(){ $.mobile.loading('show'); }, 1);
			
			// make a call to facebook api
			openFB
				.api({
					path : path,
					params : {
						fields : 'images'
					},				
					ajaxasynchronous : 'true',
					success : function(data) {
						
						var albumimages = data.data;
		
						for (var i = 0; i < albumimages.length;) {
							
							// cover photo url
							// it is observed that facebook api gives high resolution image urls , and decreases
							// resolution and gives low resolution images at the end, so lets take second last image url
							var imageurl1 = albumimages[i].images[albumimages[i].images.length - 2].source;
							var imageurl2 = ''
							
							if((i + 1) < albumimages.length){
								imageurl2 = albumimages[i+1].images[albumimages[i+1].images.length - 2].source;	
							}
							
							// initialize id for div tag
							var idforthedivtag = 'leftfacebookpanelimagesgrid' + i;
							
							// div tag for image grid
							var divTagText = '<div class="ui-grid-a" id="' + idforthedivtag + '">';
	
							// append the div tag text
							selectedalbumimages.append(divTagText);
	
							// create three images inside tag
							$('#' + idforthedivtag).append($('<div class="ui-block-a" >').
									append('<img src="' + imageurl1 + '" style="width: 95%; height:25%" id="' + idforthedivtag + 'image1"  class="creategamecard"  onclick="creategame.assignselectedfacebookimage(this);">'));
	
							if(imageurl2 !== ''){
								$('#' + idforthedivtag).append($('<div class="ui-block-b" >').
										append('<img src="' + imageurl2 + '" style="width: 95%; height:25%" id="' + idforthedivtag + 'image2"  class="creategamecard" onclick="creategame.assignselectedfacebookimage(this);">'));
							}
							
							i = i + 2;
							
						};
					},
					error : function() {
						
						 $('<div>').simpledialog2({
							    mode: 'button',
							    headerText: 'Error !!!',
							    headerClose: true,
							    buttonPrompt: 'Some Error Occurred, Please check your Internet connenction, or try Logout from facebook and Login again',
							    buttonInput: false,
							    buttons : {
							      'OK': {
							        click: function () { 
							          //do nothing
							        }
							      },
							   }
						 });
					}
				});
			
			// show processing image
			setTimeout(function(){ $.mobile.loading('hide'); }, 1);
			
		}, 100);
		
	}
	
	/**
	 * Accepts the selected photo from facebook album, and assigns to one in the create game page, but before that converts
	 * into base 6 format
	 */
	function assignselectedfacebookimage(clickedimage){

		// and close the panel
		$( "#creategamefacebookphotospanel" ).panel( "close" );

		// this function call is like a separate thread, not exactly, but helps in closing above pop up immediately
		setTimeout( function(){
			
			// show processing image
			setTimeout(function(){ $.mobile.loading('show'); }, 1);

		
			// convert the image url in base64 format
			var bas64Format = convertImgToBase64( clickedimage.src , function(base64Img){
	
				// assign the selected image
				imageIconClicked.src = base64Img;
	
			});
			
			// show processing image
			setTimeout(function(){ $.mobile.loading('hide'); }, 1);
			
		}, 10);
		
	}
	
	
	/**
	 * Accepts the image url and converts into base64 format for storing into database, used only for facebook photos,
	 * for gallery and camera photos , plugin itself does that job
	 */
	function convertImgToBase64(url, callback, outputFormat){
		var canvas = document.createElement('CANVAS');
		var ctx = canvas.getContext('2d');
		var img = new Image;
		img.crossOrigin = 'Anonymous';
		img.onload = function(){
			canvas.height = img.height;
			canvas.width = img.width;
		  	ctx.drawImage(img,0,0);
		  	var dataURL = canvas.toDataURL(outputFormat || 'image/png');
		  	callback.call(this, dataURL);
	        // Clean up
		  	canvas = null; 
		};
		img.src = url;
	}

	// The public API
	return{
		usecamera : usecamera,
		usegallery : usegallery,
		cancelGame : cancelGame,
		saveGame : saveGame,
		loadfacebookgalleries : loadfacebookgalleries,
		assignselectedfacebookimage:assignselectedfacebookimage
	};
	

}());
