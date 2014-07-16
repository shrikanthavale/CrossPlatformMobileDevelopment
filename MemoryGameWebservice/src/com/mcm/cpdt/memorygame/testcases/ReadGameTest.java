/**
 * 
 */
package com.mcm.cpdt.memorygame.testcases;

import java.awt.BorderLayout;
import java.awt.FlowLayout;
import java.awt.Image;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;

import com.google.gson.Gson;
import com.mcm.cpdt.memorygame.entities.ImageDetails;
import com.mcm.cpdt.memorygame.restclient.RestClient;
import com.mcm.cpdt.memorygame.restclient.RestClient.RequestMethod;
import com.mcm.cpdt.memorygame.utility.ImageUtility;

/**
 * @author Shrikant Havale
 * 
 *         This class is test case with main method and production and
 *         development URL with the call to webservice. if the webservice is not
 *         working or giving some error message, this could be used to test or
 *         debug.
 */
public class ReadGameTest {

	/**
	 * Development URL for the web service
	 */
	private static final String DEVELOPMENT_URL = "http://localhost:8080/MemoryGameWebservice/rest/memorygameread/readgame";

	/**
	 * Production URL for the web service
	 */
	private static final String PRODUCTION_URL = "http://memorygamewebservice-shrikanthavale.rhcloud.com/MemoryGameWebservice/rest/memorygameread/readgame";

	/**
	 * Name of the game - hard coded
	 */
	private static final String GAME_NAME = "Alphabets";

	/**
	 * EMAIL ID - hard coded
	 */
	private static final String EMAIL_ID = "PREDEFINED";

	/**
	 * @param args
	 * @throws IOException
	 */
	public static void main(String[] args) throws IOException {

		System.out.println("Development URL " + DEVELOPMENT_URL);
		System.out.println("Production URL " + PRODUCTION_URL);

		// Use a label to display the image - try to show images in frame
		JFrame frame = new JFrame();
		JPanel mainPanel = new JPanel(new FlowLayout());
		frame.add(mainPanel);
		frame.setSize(800, 800);

		// try to get jsonResponse from the URL
		try {
			// get the object of rest client
			RestClient restClient = new RestClient(DEVELOPMENT_URL);

			// pass the parameter
			restClient.AddParam("GameName", GAME_NAME);
			restClient.AddParam("EmailID", EMAIL_ID);

			// get the data
			String listGameImagesJsonString = restClient
					.execute(RequestMethod.GET);

			// get the images list
			List<ImageDetails> listImages = Arrays.asList(new Gson().fromJson(
					listGameImagesJsonString, ImageDetails[].class));

			for (ImageDetails imageDetails : listImages) {

				// create a new Jpanel
				JPanel panel = new JPanel(new BorderLayout());

				// create a label for name of the image
				JLabel imageName = new JLabel(imageDetails.getImage_name());

				// decode the image from base 64 to actual image again
				Image image = ImageUtility.decodeToImage(imageDetails
						.getImage_data());

				// label containing the image
				JLabel actualImage = new JLabel(new ImageIcon(image));

				// add the images to panel
				panel.add(imageName, BorderLayout.NORTH);
				panel.add(actualImage, BorderLayout.CENTER);

				// add the panel to the main panel
				mainPanel.add(panel);
			}

			// print the JSON response
			System.out.println(listGameImagesJsonString);

			// display the frame containing image
			frame.setVisible(true);

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
