/**
 * 
 */
package com.mcm.cpdt.memorygame.testcases;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.imageio.ImageIO;

import com.google.gson.Gson;
import com.mcm.cpdt.memorygame.entities.GameDetails;
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
public class InsertGamesTest {

	/**
	 * Development URL for the web service
	 */
	private static final String DEVELOPMENT_URL = "http://localhost:8080/MemoryGameWebservice/rest/memorygamewrite/insertnewgame";

	/**
	 * Production URL for the web service
	 */
	private static final String PRODUCTION_URL = "http://memorygamewebservice-shrikanthavale.rhcloud.com/MemoryGameWebservice/rest/memorygamewrite/insertnewgame";

	/**
	 * Name of the game - hard coded
	 */
	private static final String GAME_NAME = "Shrikant Facebook Photos";

	/**
	 * EMAIL ID - hard coded
	 */
	private static final String EMAIL_ID = "shrikane@gmail.com";

	/**
	 * Path of the folder where images are stored is also hard coded - images
	 * should be stored in this project
	 */
	private static final String IMAGES_PATH = "\\preinstalledgameimages\\shrikantfacebook1";

	/**
	 * @param args
	 * @throws IOException
	 */
	public static void main(String[] args) throws IOException {

		// path to working directory
		String workingDir = System.getProperty("user.dir");

		System.out.println("Production URL : " + PRODUCTION_URL);
		System.out.println("Development URL : " + DEVELOPMENT_URL);

		// create a dummy game details object
		GameDetails gameDetails = new GameDetails();
		gameDetails.setGame_name(GAME_NAME);
		gameDetails.setUser_email_id(EMAIL_ID);

		// create a list of Image details entities
		List<ImageDetails> listImageDetails = new ArrayList<ImageDetails>();

		// path for images
		File gamesFolder = new File(workingDir + IMAGES_PATH);

		for (File tempFile : gamesFolder.listFiles()) {

			// get the file name
			ImageDetails imageDetails = new ImageDetails();
			imageDetails.setImage_name(tempFile.getName());

			// get the buffered image
			BufferedImage img = ImageIO.read(tempFile);

			System.out.println(tempFile.getName());
			// convert to Base64
			String base64EncodedString = ImageUtility.encodeToString(img,
					tempFile.getName().split("\\.")[1]);

			// add it to list of image
			imageDetails.setImage_data(base64EncodedString);

			// add all the images
			listImageDetails.add(imageDetails);

		}

		// insert the data
		insertData(gameDetails, listImageDetails);

	}

	/**
	 * This method needs game details containing name of the game and email id
	 * to whom this game is associated with and also Image details with all the
	 * list of images and names of the images. It will convert all the objects
	 * into JSON and pass this to REST post URL to store the data.
	 * 
	 * @param gameDetails
	 *            - Game Details object
	 * 
	 * @param listImageDetails
	 *            - List of images
	 */
	private static void insertData(GameDetails gameDetails,
			List<ImageDetails> listImageDetails) {

		// try to get jsonResponse from the URL
		try {
			// get the object of rest client
			RestClient restClient = new RestClient(DEVELOPMENT_URL);

			// pass the parameter
			restClient.AddParam("NewGame", new Gson().toJson(gameDetails));
			restClient.AddParam("GameImages",
					new Gson().toJson(listImageDetails));

			// get the data
			String gsonResponse = restClient.execute(RequestMethod.POST);

			// print the JSON response
			System.out.println(gsonResponse);

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
