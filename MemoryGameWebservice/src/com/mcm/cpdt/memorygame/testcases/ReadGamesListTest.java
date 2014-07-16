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
public class ReadGamesListTest {

	/**
	 * Development URL for the web service
	 */
	private static final String DEVELOPMENT_URL = "http://localhost:8080/MemoryGameWebservice/rest/memorygameread/readgameslist";

	/**
	 * Production URL for the web service
	 */
	private static final String PRODUCTION_URL = "http://memorygamewebservice-shrikanthavale.rhcloud.com/MemoryGameWebservice/rest/memorygameread/readgameslist";

	/**
	 * EMAIL ID - hard coded
	 */
	private static final String EMAIL_ID = "PREDEFINED";

	/**
	 * @param args
	 */
	public static void main(String[] args) {

		// get the object of rest client
		RestClient restClient = new RestClient(DEVELOPMENT_URL);

		// pass the require parameter
		restClient.AddParam("EmailID", EMAIL_ID);

		System.out.println("Production URL : " + PRODUCTION_URL);
		System.out.println("Development URL : " + DEVELOPMENT_URL);

		// try to get jsonResponse from the URL
		try {

			// get the data
			String gsonResponse = restClient.execute(RequestMethod.GET);

			// print the JSON response
			System.out.println(gsonResponse);

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
