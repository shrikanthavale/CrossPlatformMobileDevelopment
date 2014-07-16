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
public class InsertNewUserTest {

	/**
	 * Development URL for the web service
	 */
	private static final String DEVELOPMENT_URL = "http://localhost:8080/MemoryGameWebservice/rest/memorygamewrite/insertnewuser";

	/**
	 * Production URL for the web service
	 */
	private static final String PRODUCTION_URL = "http://memorygamewebservice-shrikanthavale.rhcloud.com/MemoryGameWebservice/rest/memorygamewrite/insertnewuser";

	/**
	 * @param args
	 */
	public static void main(String[] args) {

		System.out.println("Production URL : " + PRODUCTION_URL);
		System.out.println("Development URL : " + DEVELOPMENT_URL);

		// create a dummy user details object
		String emailID1 = "shrikant.havale@yahoo.com";
		String userName1 = "Shrikant Havale";

		// create a dummy user details object
		String emailID2 = "gaber.setina@yahoo.com";
		String userName2 = "Gaber Setina";

		// create a dummy user details object
		String emailID3 = "amer.dadic@yahoo.com";
		String userName3 = "Amer Dadic";

		// create a dummy user details object
		String emailID4 = "ilias.koletsis@yahoo.com";
		String userName4 = "Ilias Koletsis";

		// create a dummy user details object
		String emailID5 = "PREDEFINED";
		String userName5 = "PREDEFINED";

		// create a dummy user details object
		String emailID6 = "professor@yahoo.com";
		String userName6 = "Professor";

		// insert data using rest call
		insertData(emailID1, userName1);
		insertData(emailID2, userName2);
		insertData(emailID3, userName3);
		insertData(emailID4, userName4);
		insertData(emailID5, userName5);
		insertData(emailID6, userName6);

	}

	/**
	 * Calls the Rest URL and tries to insert the User details, user details are
	 * converted into JSON first and then passed to REST URL as we would be
	 * getting actual JSON data.
	 * 
	 * @param userName
	 *            username will the filled data
	 * 
	 * @param emailID
	 *            email id of the user
	 */
	private static void insertData(String emailID, String userName) {

		// try to get jsonResponse from the URL
		try {
			// get the object of rest client
			RestClient restClient = new RestClient(DEVELOPMENT_URL);

			// pass the parameter
			restClient.AddParam("Username", userName);
			restClient.AddParam("EmailID", emailID);

			// get the data
			String gsonResponse = restClient.execute(RequestMethod.POST);

			// print the JSON response
			System.out.println(gsonResponse);

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
