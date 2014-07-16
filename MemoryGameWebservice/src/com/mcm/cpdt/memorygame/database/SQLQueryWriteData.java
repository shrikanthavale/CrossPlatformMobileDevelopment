/**
 * 
 */
package com.mcm.cpdt.memorygame.database;

import java.awt.image.BufferedImage;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import com.mcm.cpdt.memorygame.entities.GameDetails;
import com.mcm.cpdt.memorygame.entities.GameScores;
import com.mcm.cpdt.memorygame.entities.ImageDetails;
import com.mcm.cpdt.memorygame.entities.UserDetails;
import com.mcm.cpdt.memorygame.utility.ImageUtility;

/**
 * @author Shrikant Havale
 * 
 *         This class is responsible for all the write operations into the
 *         database. Different methods are defined for performing the insertion
 *         of different kinds of data.
 */
public class SQLQueryWriteData {

	/**
	 * This method accepts the details of single user and tries to store in
	 * database. if user already exist no entry is made and appropriate message
	 * is returned.
	 * 
	 * @param userName
	 *            name name of the user accepted from facebook
	 * @param userEmailID
	 *            email id of the user
	 * 
	 * @return {@link UserDetails} returns the same inserted user details but
	 *         with the user id generated
	 */
	public UserDetails insertNewUser(String userName, String userEmailID) {

		Connection sqlConnection = null;
		PreparedStatement preparedStatement = null;
		ResultSet resultSet = null;
		UserDetails userDetails = new UserDetails();

		try {

			// get the SQL connection
			sqlConnection = SQLConnectionDatabase.getConnection();

			// create the SQL query for checking if email id already exists
			String checkEmailAddressQuery = "SELECT USER_ID FROM USER_DETAILS WHERE UPPER(USER_EMAIL_ID) LIKE ? ";

			// prepare statement
			preparedStatement = sqlConnection
					.prepareStatement(checkEmailAddressQuery);

			// set the parameters
			preparedStatement.setString(1, userEmailID.toUpperCase());

			// execute query
			resultSet = preparedStatement.executeQuery();

			// user already exists in database
			if (resultSet != null && resultSet.next()) {

				// user id already exists message
				userDetails.setUser_id(-101);

				// set the some random message
				userDetails.setUser_name("User Email ID is already registered");

				// set the some random message
				userDetails
						.setUser_email_id("User Email ID is already registered");

				// return the details
				return userDetails;
			}

			// insert the user details query
			String insertUserDetailsQuery = "INSERT INTO USER_DETAILS (USER_EMAIL_ID, USER_NAME, REGISTRATION_TIME) VALUES (?, ? ,?)";

			// create the prepared statement
			preparedStatement = sqlConnection.prepareStatement(
					insertUserDetailsQuery, Statement.RETURN_GENERATED_KEYS);

			// set the parameters
			preparedStatement.setString(1, userEmailID);
			preparedStatement.setString(2, userName);

			// convert date to SQL time stamp
			// get the current date in string format
			Calendar cal = Calendar.getInstance();
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String currentDateTime = sdf.format(cal.getTime());
			Date date = sdf.parse(currentDateTime);
			Timestamp timestamp = new Timestamp(date.getTime());

			// set it to time stamp
			preparedStatement.setTimestamp(3, timestamp);

			// execute the statement
			preparedStatement.executeUpdate();

			// get the generated table keys
			resultSet = preparedStatement.getGeneratedKeys();

			// navigate to next table and get the table key
			resultSet.next();

			// get the auto generated id and store and send back
			userDetails.setUser_id(resultSet.getInt(1));
			userDetails.setUser_name(userName);
			userDetails.setUser_email_id(userEmailID);
			userDetails.setRegistration_time(currentDateTime);

			// return the user details
			return userDetails;

		} catch (Exception exception) {

			// if something goes wrong , create dummy User Details with the
			// error object
			// set some dummy error code
			userDetails.setUser_id(-100);

			// set the error message in one of the VARCHAR column, notify the
			// same to UI
			userDetails.setUser_name("Message " + exception.getMessage() + "\n"
					+ "Localized Message " + exception.getLocalizedMessage()
					+ "\n" + "Cause " + exception.getCause());

			// print the stack trace in TOMCAT console
			exception.printStackTrace();

			// return the user details
			return userDetails;

		} finally {

			// close the connection and release the resources
			closeConnectionsResources(preparedStatement, resultSet,
					sqlConnection);
		}
	}

	/**
	 * This method inserts the game details , newly created game , containing
	 * the game name and user who created the game. Along with the game details
	 * its images are also captured in listImages are stored in database in base
	 * 64 format. First it creates a game and its id is captured and referenced
	 * with images in separate table
	 * 
	 * @param gameDetails
	 *            Game Details object
	 * @param listImages
	 *            List of images object
	 * @return
	 */
	public GameDetails insertNewGame(GameDetails gameDetails,
			List<ImageDetails> listImages) {

		Connection sqlConnection = null;
		PreparedStatement preparedStatement = null;
		ResultSet resultSet = null;

		try {

			// do the pre processing on the image, make sure all the images of
			// same and consistent size

			for (ImageDetails imageDetails : listImages) {

				// convert it to buffered image
				BufferedImage tempImage = ImageUtility
						.decodeToImage(imageDetails.getImage_data());

				// resize the image
				BufferedImage resizedImage = ImageUtility.resizeImageWithHint(
						tempImage, BufferedImage.TYPE_INT_RGB);

				// convert back to base64 for saving into database
				String resizedBase64 = ImageUtility.encodeToString(
						resizedImage, "PNG");

				// set the data back again
				imageDetails.setImage_data(resizedBase64);

			}

			// get the SQL connection
			sqlConnection = SQLConnectionDatabase.getConnection();

			// create the SQL query for checking if email id already exists
			String insertGameDetails = "INSERT INTO GAME_DETAILS (GAME_NAME, USER_EMAIL_ID) VALUES (?, ?)";

			// prepare statement
			preparedStatement = sqlConnection.prepareStatement(
					insertGameDetails, Statement.RETURN_GENERATED_KEYS);

			preparedStatement.setString(1, gameDetails.getGame_name());
			preparedStatement.setString(2, gameDetails.getUser_email_id());

			// execute the statement
			preparedStatement.executeUpdate();

			// get the generated table keys
			resultSet = preparedStatement.getGeneratedKeys();

			// navigate to next table and get the table key
			resultSet.next();

			// get the reference game ID
			int referenceGameID = resultSet.getInt(1);

			// prepare statement for inserting images
			for (ImageDetails imageDetails : listImages) {

				String insertImageQuery = "INSERT INTO IMAGE_DETAILS ( IMAGE_NAME , IMAGE_DATA, GAME_ID ) VALUES ( ?, ?, ?)";
				preparedStatement = sqlConnection
						.prepareStatement(insertImageQuery);
				preparedStatement.setString(1, imageDetails.getImage_name());
				preparedStatement.setString(2, imageDetails.getImage_data());
				preparedStatement.setInt(3, referenceGameID);
				preparedStatement.execute();

			}

			// if everything is successful set the game id and return the object
			gameDetails.setGame_id(referenceGameID);

			// return the object
			return gameDetails;

		} catch (Exception exception) {

			// if something goes wrong , create dummy User Details with the
			// error object
			// set some dummy error code
			gameDetails.setGame_id(-100);

			// set the error message in one of the VARCHAR column, notify the
			// same to UI
			gameDetails.setGame_name("Message " + exception.getMessage() + "\n"
					+ "Localized Message " + exception.getLocalizedMessage()
					+ "\n" + "Cause " + exception.getCause());

			// set the error message in one of the VARCHAR column, notify the
			// same to UI
			gameDetails.setUser_email_id("Message " + exception.getMessage()
					+ "\n" + "Localized Message "
					+ exception.getLocalizedMessage() + "\n" + "Cause "
					+ exception.getCause());

			// print the stack trace in TOMCAT console
			exception.printStackTrace();

			// rollback in case of exception
			try {
				if (sqlConnection != null)
					sqlConnection.rollback();
			} catch (SQLException e) {
				e.printStackTrace();
			}

			// return the game details
			return gameDetails;

		} finally {

			// close the connection and release the resources
			closeConnectionsResources(preparedStatement, resultSet,
					sqlConnection);
		}

	}

	/**
	 * This method accepts important parameters of the scores and creates a
	 * insert SQL queries and insert scores in database
	 * 
	 * @param userEmailID
	 *            email ID of the user , playing the game
	 * @param gameName
	 *            name of the game
	 * @param difficultyLevel
	 *            difficulty level of the game
	 * @param scoreMove
	 *            moves required to complete the game
	 * @param scoreTimerSeconds
	 *            time required in seconds to complete the game
	 * @param flagCustom
	 *            flag variable indicating if the score is to be recorded for
	 *            custom or predefined game
	 */
	public GameScores insertScores(String userEmailID, String gameName,
			String difficultyLevel, String scoreMove, String scoreTimerSeconds,
			String customString) {

		Connection sqlConnection = null;
		PreparedStatement preparedStatement = null;
		ResultSet resultSet = null;
		GameScores scoreDetails = new GameScores();

		try {

			// get the SQL connection
			sqlConnection = SQLConnectionDatabase.getConnection();

			// create the SQL query for checking if email id already exists
			String findGameIdFromGameName = "SELECT GAME_ID FROM GAME_DETAILS WHERE UPPER(GAME_NAME) LIKE ? AND UPPER(USER_EMAIL_ID) LIKE ? ";

			// prepare statement
			preparedStatement = sqlConnection
					.prepareStatement(findGameIdFromGameName);

			// set the parameters
			preparedStatement.setString(1, gameName.toUpperCase());
			preparedStatement.setString(2, customString.toUpperCase());

			// execute query
			resultSet = preparedStatement.executeQuery();

			// move the cursor
			resultSet.next();

			// get the game id from result set
			int gameID = resultSet.getInt("GAME_ID");

			// create the SQL query for checking if email id already exists
			String insertGameDetails = "INSERT INTO GAME_SCORES (USER_EMAIL_ID, GAME_ID, TIMESTAMP, DIFFICULTY_LEVEL , SCORE_MOVE, SCORE_TIMER_SECONDS) VALUES (?, ?, ?, ?, ?, ? )";

			// prepare statement
			preparedStatement = sqlConnection.prepareStatement(
					insertGameDetails, Statement.RETURN_GENERATED_KEYS);

			// set the parameters
			preparedStatement.setString(1, userEmailID);
			preparedStatement.setInt(2, gameID);

			// convert date to SQL time stamp
			// get the current date in string format
			Calendar cal = Calendar.getInstance();
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String currentDateTime = sdf.format(cal.getTime());
			Date date = sdf.parse(currentDateTime);
			Timestamp timestamp = new Timestamp(date.getTime());

			// set it to time stamp
			preparedStatement.setTimestamp(3, timestamp);

			preparedStatement.setString(4, difficultyLevel.toUpperCase());
			preparedStatement.setInt(5, Integer.parseInt(scoreMove));
			preparedStatement.setInt(6, Integer.parseInt(scoreTimerSeconds));

			// execute the statement
			preparedStatement.executeUpdate();

			// get the generated table keys
			resultSet = preparedStatement.getGeneratedKeys();

			// navigate to next table and get the table key
			resultSet.next();

			// get the reference score ID
			int referenceScoreID = resultSet.getInt(1);

			// if everything is successful set the score id and return the
			// object
			scoreDetails.setScore_id(referenceScoreID);
			scoreDetails.setEmail_id(userEmailID);
			scoreDetails.setDifficultyLevel(difficultyLevel);
			scoreDetails.setGame_id(gameID);
			scoreDetails.setNumberMoves(Integer.parseInt(scoreMove));
			scoreDetails.setNumberSeconds(Integer.parseInt(scoreTimerSeconds));
			scoreDetails.setPlayed_time(currentDateTime);

			// return the object
			return scoreDetails;

		} catch (Exception exception) {

			// if something goes wrong , create dummy User Details with the
			// error object
			// set some dummy error code
			scoreDetails.setScore_id(-100);

			// set the error message in one of the VARCHAR column, notify the
			// same to UI
			scoreDetails.setEmail_id("Message " + exception.getMessage() + "\n"
					+ "Localized Message " + exception.getLocalizedMessage()
					+ "\n" + "Cause " + exception.getCause());

			// set the error message in one of the VARCHAR column, notify the
			// same to UI
			scoreDetails.setDifficultyLevel("Message " + exception.getMessage()
					+ "\n" + "Localized Message "
					+ exception.getLocalizedMessage() + "\n" + "Cause "
					+ exception.getCause());

			// print the stack trace in TOMCAT console
			exception.printStackTrace();

			// return the score details
			return scoreDetails;

		} finally {

			// close the connection and release the resources
			closeConnectionsResources(preparedStatement, resultSet,
					sqlConnection);
		}
	}

	/**
	 * Close all the connection and resources
	 * 
	 * @param preparedStatement
	 *            Prepared statement if any - null can be passed
	 * @param resultSet
	 *            Result set if any - null can be passed
	 * @param sqlConnection
	 *            - SQL connection to be closed - null can be passed
	 */
	private void closeConnectionsResources(PreparedStatement preparedStatement,
			ResultSet resultSet, Connection sqlConnection) {

		// check for null, if not close
		if (preparedStatement != null) {
			try {
				preparedStatement.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}

		// check for null, if not close
		if (resultSet != null) {
			try {
				resultSet.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}

		// check for null, if not close
		if (sqlConnection != null) {
			try {
				sqlConnection.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
}
