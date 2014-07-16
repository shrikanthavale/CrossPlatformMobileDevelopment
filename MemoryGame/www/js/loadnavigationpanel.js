/**
 * 
 */
var loadleftpanel = (function() {

	// initialize the left navigation application with all links:
	function loadLeftNavigatonPanel() {

		// loading left navigation
		console.log('Loading Left Navigation');

		// left panel
		var leftPanel = $('#leftnavigationpaneldiv');

		// add the facebook photo and user name if user is already logged in
		// check if user is already logged in
		var accessToken = window.localStorage['fbtoken'];

		// facebook list tag
		var facebookListTag = '';

		if (typeof accessToken === 'undefined') {
			// User is not logged in do nothing

		} else {

			// get the facebook username and profile picture
			var username = window.localStorage['username'];
			var profilePicURL = window.localStorage['profilepicurl'];
			facebookListTag = '<li id="facebookprofileimagenametag" data-icon="false"><img src='
					+ profilePicURL + '> <div>' + username + '</div> </li>';
			leftPanel.children('ul').prepend(facebookListTag);

		}

		// div counter
		var divCounter = 1;

		// get the all div tags with page as data role
		$('div[data-role="page"]').each(
				function() {

					// don't do this for home page
					if ($(this).children('#home_page_container').length || $(this).children('#dummyleftnavigationpanelpage').length) {

						// do nothing

					} else {

						var actualHtmlLeftPanel = leftPanel.clone().attr('id',
								'leftnavigationpaneldiv' + divCounter).wrap(
								'<p>').parent().html();

						// `this` is the div
						$(this).prepend(actualHtmlLeftPanel);

						// create the anchor menu button
						var menuButton = $("<a />");
						menuButton.attr('data-role', 'button');
						menuButton.attr('data-controltype', 'panelbutton');
						menuButton.attr('href', '#leftnavigationpaneldiv'
								+ divCounter);
						menuButton.attr('data-icon', 'bars');
						menuButton.attr('data-iconpos', 'left');
						menuButton.attr('data-theme', 'b');
						menuButton.text('Menu');

						$(this).children('div[data-role="header"]').append(
								menuButton);

						divCounter = divCounter + 1;
					}
				});
	}

	// The public API
	return {
		loadLeftNavigatonPanel : loadLeftNavigatonPanel
	};

}());