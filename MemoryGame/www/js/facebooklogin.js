/**
 * 
 */
var check = 0;
var url = location.href;
var url2 = 'EMPTY';

var facebookLogin = (function() {

	var facebookAppID = '692057454188967';
	// initialize the facebook application with your ID:
	function initializeFacebookApp(isDevice) {

		// check if user is already logged in
		var accessToken = window.localStorage['fbtoken'];

		// log the token value
		console.log('Access Token Facebook : ' + accessToken);

		// initialize the facebook
		openFB.init(facebookAppID, '', window.localStorage, isDevice);

		if (typeof accessToken === 'undefined') {
			// enable login button and hide logout button
			enableFacebookLogin('true');

		} else {

			// user is already registered with the application
			showToastFacebookMessage('Welcome back '
					+ window.localStorage['username']);

			// disable login button and show logout button
			enableFacebookLogin('false');
		}

	}

	function addListeners() {
		$("[href]").click(function () {
			console.log("this.id:  " + this.id);
			
		    if (this.id == 'facebook_login_button2') {
		    	//console.log("Clicked facebook_login_button3 URL2:  " + location.href);
		        check= 2;
		    	//console.log("Clicked facebook_login_button2:  " + check);
		    }
		    else if (this.id == 'facebook_login_button3') {
		    	//console.log("Clicked facebook_login_button3 URL2:  " + location.href);
		        check= 3;
		        //console.log("Clicked facebook_login_button3:  " + check);
		    }
		    else if(this.id == 'facebook_login_button') {
		    	check= 1;
		    	//console.log("Clicked facebook_login_button:  " + check);
		    }
		});
		
		$('#facebook_login_button').on('click', facebookLoginMethod);
		$('#facebook_login_button2').on('click', facebookLoginMethod);
		$('#facebook_login_button3').on('click', facebookLoginMethod);
		$('#facebookLogoutButton').on('click', facebookLogoutMethod);
	}

	function facebookLoginMethod() {
		
		
		openFB
				.login(
						'email',
						function() {
							
							openFB
									.api({
										path : '/me',
										success : function(data) {
											var username = data.name;
											var emailId = data.email;
											var facebookID = data.id;
											// store user name, emailid, and
											// facebookID in local storage
											window.localStorage['username'] = username;
											window.localStorage['emailid'] = emailId;
											window.localStorage['facebookID'] = facebookID;

											// try to save the user details in
											// database using webservice
											saveUserDetailsDatabase();

											showToastFacebookMessage('Facebook Login was successful, '
													+ 'Welcome '
													+ username
													+ '. Continue playing game');
											enableFacebookLogin('false');
											addFacebookProfilePictureMenu();
											
											
										},
										error : function() {
											showToastFacebookMessage('Some exception occured, Please try again ');
										}
									});
							
							// $(location).attr('href', url);
						},
						function(error) {
							showToastFacebookMessage('Facebook access is required for creating games.');
						});
	}

	function facebookLogoutMethod() {

		// revoke the permissions from the application
		openFB.revokePermissions(function() {
			// do nothing - success function
		}, function() {
			// do nothing - error function
		});

		// showToastFacebookMessage('Some exception occurred,
		// Please try again ');
		// it token expires after some time, logout throws
		// error, but if token is already expired, then
		// automatically users facebook session is
		// invalidated, so don't show error message
		// also we are deleting token from our local storage
		// and fetching new one in next login
		window.localStorage.removeItem('fbtoken');
		window.localStorage.removeItem('username');
		window.localStorage.removeItem('emailid');
		window.localStorage.removeItem('facebookID');
		window.localStorage.removeItem('profilepicurl');
		showToastFacebookMessage('You have been successfully logged out from application.');
		enableFacebookLogin('true');
		removeFacebookProfilePictureMenu();
	}

	function showToastFacebookMessage(message) {

		$('.facebookloginmessage').text(message);
		$('.facebookloginmessage').text().toLowerCase();
		$('.facebookloginmessage').fadeIn(400).delay(5000).fadeOut(400);

	}

	function enableFacebookLogin(flag) {

		var loginButton = $('#facebook_login_button');
		var loginButton2 = $('#facebook_login_button2');
		var loginButton3 = $('#facebook_login_button3');
		var logoutButton = $('#facebookLogoutButton');

		if (flag === 'true') {
			// enable the facebook login button
			loginButton.removeClass('ui-disabled');
			loginButton2.removeClass('ui-disabled');
			loginButton3.removeClass('ui-disabled');
			
			// show login buttons
			loginButton2.show();
			loginButton3.show();

			// show the logout button
			logoutButton.hide();

		} else if (flag === 'false') {

			// show the logout button
			logoutButton.show();

			// disable the facebook login button
			loginButton.addClass('ui-disabled');
			loginButton2.addClass('ui-disabled');
			loginButton3.addClass('ui-disabled');
			loginButton2.hide();
			loginButton3.hide();
			
			url2 = location.href;
			//console.log("URL:  " + url);
			//console.log("URL2:  " + url2);
			//alert(currenturl);
			if(check == 2 || check == 3)
				{
					location.replace(url);
					//location.assign(url2);
				}
		}
	}

	function addFacebookProfilePictureMenu() {

		// get the facebook username and profile picture
		var username = window.localStorage['username'];

		var facebookListTag = '';
		
		// make a call to facebook api
		openFB
				.api({
					path : '/me/picture',
					ajaxasynchronous : 'false',
					params : {
						redirect : 'false',
						type : 'square',
					},
					success : function(data) {
						var imageURL = data.data.url;
						window.localStorage['profilepicurl'] = imageURL;
						facebookListTag = '<li id="facebookprofileimagenametag" data-icon="false"><a href="#" style="text-decoration: none"><img src='
								+ imageURL + '>' + username + '</a></li>';
					},
					error : function() {
						// do nothing
					}
				});
		
		// get the all div tags with page as data role
		$('div[data-role="page"]').each(function() {
			// don't do this for home page
			if ($(this).children(
					'#home_page_container').length) {
				// do nothing
			} else {
				// `this` is the div
				$(this).children('div[data-role="panel"]').find('ul').prepend(
						facebookListTag);

			}
		});

	}

	function removeFacebookProfilePictureMenu() {

		var facebookListTag = $('#facebookprofileimagenametag');

		// get the all div tags with page as data role
		$('div[data-role="page"]').each(function() {
			// don't do this for home page
			if ($(this).children('#home_page_container').length) {
				// do nothing
			} else {
				// `this` is the div
				$(this).children('div[data-role="panel"]').find('#facebookprofileimagenametag').remove();
			}
		});

	}

	function saveUserDetailsDatabase() {

		$
				.ajax(
						{
							url : 'http://memorygamewebservice-shrikanthavale.rhcloud.com/MemoryGameWebservice/rest/memorygamewrite/insertnewuser',
							type : 'POST',
							dataType : 'json',
							crossDomain : true,
							data : {
								EmailID : window.localStorage['emailid'],
								Username : window.localStorage['username']
							},
							xhrFields : {
								withCredentials : false
							},
							error : function(jqXHR, textStatus, errorThrown) {
								console.log(jqXHR);
								console.log(textStatus);
								console.log(errorThrown);
							},
							beforeSend : function() {
								setTimeout(function() {
									$.mobile.loading('show');
								}, 1);
							},
							complete : function() {
								setTimeout(function() {
									$.mobile.loading('hide');
								}, 1);
							}
						}).done(function(e) {
								console.log('JSON Data Saving User Details ' + e);
							}).fail(function(e) {
								console.log('Error ' + e);
							}).always(function() {
								// alert("complete");
							});

	}

	// The public API
	return {
		initializeFacebookApp : initializeFacebookApp,
		addListeners : addListeners
	};

}());
