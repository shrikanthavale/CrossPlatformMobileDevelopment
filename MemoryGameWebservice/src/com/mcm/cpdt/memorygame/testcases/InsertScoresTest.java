/**
 * 
 */
package com.mcm.cpdt.memorygame.testcases;

import com.mcm.cpdt.memorygame.restclient.RestClient;
import com.mcm.cpdt.memorygame.restclient.RestClient.RequestMethod;

/**
 * @author Shrikant Havale
 * 
 *         This class is test case with main method and production and
 *         development URL with the call to webservice. if the webservice is not
 *         working or giving some error message, this could be used to test or
 *         debug.
 */
public class InsertScoresTest {

	/**
	 * Development URL for the web service
	 */
	private static final String DEVELOPMENT_URL = "http://localhost:8080/MemoryGameWebservice/rest/memorygamewrite/insertscores";

	/**
	 * Production URL for the web service
	 */
	private static final String PRODUCTION_URL = "http://memorygamewebservice-shrikanthavale.rhcloud.com/MemoryGameWebservice/rest/memorygamewrite/insertscores";

	/**
	 * @param args
	 */
	public static void main(String[] args) {

		System.out.println("Production URL : " + PRODUCTION_URL);
		System.out.println("Development URL : " + DEVELOPMENT_URL);

		// create a dummy scores object
		String emailID1 = "shrikant.havale@yahoo.com";
		String difficultyLevel1 = "EASY";
		String gameName1 = "The Simpsons";
		int scoreMove1 = 60;
		int scoreTimerSeconds1 = 120;
		String customGame1 = "PREDEFINED";

		// create a dummy scores object
		String emailID2 = "gaber.setina@yahoo.com";
		String difficultyLevel2 = "NORMAL";
		String gameName2 = "The Simpsons";
		int scoreMove2 = 100;
		int scoreTimerSeconds2 = 240;
		String customGame2 = "PREDEFINED";

		// create a dummy scores object
		String emailID3 = "amer.dadic@yahoo.com";
		String difficultyLevel3 = "HARD";
		String gameName3 = "Alphabets";
		int scoreMove3 = 150;
		int scoreTimerSeconds3 = 360;
		String customGame3 = "PREDEFINED";

		// create a dummy scores object
		String emailID4 = "ilias.koletsis@yahoo.com";
		String difficultyLevel4 = "HELL";
		String gameName4 = "Alphabets";
		int scoreMove4 = 200;
		int scoreTimerSeconds4 = 450;
		String customGame4 = "PREDEFINED";

		// create a dummy scores object
		String emailID5 = "professor@yahoo.com";
		String difficultyLevel5 = "NORMAL";
		String gameName5 = "Animals";
		int scoreMove5 = 80;
		int scoreTimerSeconds5 = 200;
		String customGame5 = "PREDEFINED";

		// insert data using rest call
		insertData(emailID1, gameName1, difficultyLevel1, scoreMove1,
				scoreTimerSeconds1, customGame1);
		insertData(emailID2, gameName2, difficultyLevel2, scoreMove2,
				scoreTimerSeconds2, customGame2);
		insertData(emailID3, gameName3, difficultyLevel3, scoreMove3,
				scoreTimerSeconds3, customGame3);
		insertData(emailID4, gameName4, difficultyLevel4, scoreMove4,
				scoreTimerSeconds4, customGame4);
		insertData(emailID5, gameName5, difficultyLevel5, scoreMove5,
				scoreTimerSeconds5, customGame5);

	}

	/**
	 * This method accepts important parameters of the scores and calls the rest
	 * client URL to update the data in database.
	 * 
	 * @param emailID
	 *            email ID of the user , playing the game
	 * @param gameName
	 *            name of the game
	 * @param difficultyLevel
	 *            difficulty level of the game
	 * @param scoreMove
	 *            moves required to complete the game
	 * @param scoreTimerSeconds
	 *            time required in seconds to complete the game
	 */
	private static void insertData(String emailID, String gameName,
			String difficultyLevel, int scoreMove, int scoreTimerSeconds,
			String customGame) {

		// try to get jsonResponse from the URL
		try {
			// get the object of rest client
			RestClient restClient = new RestClient(DEVELOPMENT_URL);

			// pass the parameter
			restClient.AddParam("EmailID", emailID);
			restClient.AddParam("GameName", gameName);
			restClient.AddParam("DifficultyLevel", difficultyLevel);
			restClient.AddParam("ScoreMove", scoreMove + "");
			restClient.AddParam("ScoreTimerSeconds", scoreTimerSeconds + "");
			restClient.AddParam("CustomPredefineGame", customGame);

			// get the data
			String gsonResponse = restClient.execute(RequestMethod.POST);

			// print the JSON response
			System.out.println(gsonResponse);

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
