/**
 * 
 */
package com.mcm.cpdt.memorygame.database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.mcm.cpdt.memorygame.entities.GameDetails;
import com.mcm.cpdt.memorygame.entities.GameScores;
import com.mcm.cpdt.memorygame.entities.ImageDetails;

/**
 * @author Shrikant Havale
 * 
 *         This class is responsible for all the read operations from the
 *         database. Different methods are defined for performing the retrieval
 *         of different kinds of data.
 * 
 */
public class SQLQueryReadData {

	/**
	 * This method gives the list of games based on the email id. In case of
	 * predefined games, the email ID is stored as hard coded string
	 * "PREDEFINED" and is used to compare in the database. It is callers
	 * responsibility to send PREDEFINED as text in the email id if only
	 * predefined games are not required and not specific to any user
	 * 
	 * @param emailID
	 *            email ID of the user for which the games are to be searched
	 * 
	 * @return List of GameDetails object
	 */
	public List<GameDetails> getListGames(String emailID) {

		// list of game details
		List<GameDetails> gameDetailsList = new ArrayList<GameDetails>();
		Connection sqlConnection = null;
		PreparedStatement preparedStatement = null;
		ResultSet resultSet = null;

		try {

			// get the SQL Connection
			sqlConnection = SQLConnectionDatabase.getConnection();

			// SQL Query
			preparedStatement = sqlConnection
					.prepareStatement("SELECT GAME_ID, GAME_NAME, USER_EMAIL_ID FROM GAME_DETAILS WHERE UPPER(USER_EMAIL_ID) LIKE ? ");

			// set the parameters
			preparedStatement.setString(1, emailID.toUpperCase());

			// result set
			resultSet = preparedStatement.executeQuery();

			// iterate through result set
			while (resultSet.next()) {

				// game details
				GameDetails gameDetails = new GameDetails();

				// fill the data
				gameDetails.setGame_id(resultSet.getInt("GAME_ID"));
				gameDetails.setGame_name(resultSet.getString("GAME_NAME"));
				gameDetails.setUser_email_id(resultSet
						.getString("USER_EMAIL_ID"));

				// SQL Query for getting single image to show as thumbnail
				preparedStatement = sqlConnection
						.prepareStatement("SELECT IMAGE_DATA FROM IMAGE_DETAILS WHERE GAME_ID = ? LIMIT 1 ");

				// set the parameters
				preparedStatement.setInt(1, gameDetails.getGame_id());

				// result set
				ResultSet tempResultSet = preparedStatement.executeQuery();

				// iterate through result set
				while (tempResultSet.next()) {
					gameDetails.setImage_data(tempResultSet
							.getString("IMAGE_DATA"));
				}

				// close temporary result set
				tempResultSet.close();

				// SQL query for getting image count
				preparedStatement = sqlConnection
						.prepareStatement("SELECT COUNT(*) FROM IMAGE_DETAILS WHERE GAME_ID = ? ");

				// set the parameters
				preparedStatement.setInt(1, gameDetails.getGame_id());

				// result set
				tempResultSet = preparedStatement.executeQuery();

				// iterate through result set
				while (tempResultSet.next()) {
					gameDetails.setNumber_images(tempResultSet.getInt(1));
				}

				// add into list
				gameDetailsList.add(gameDetails);

			}

		} catch (Exception exception) {

			// if something goes wrong , create dummy Game Details with the
			// error object
			GameDetails gameDetails = new GameDetails();

			// set some dummy error code
			gameDetails.setGame_id(-100);

			// set the error message in one of the VARCHAR column, notify the
			// same to UI
			gameDetails.setGame_name("Message " + exception.getMessage() + "\n"
					+ "Localized Message " + exception.getLocalizedMessage()
					+ "\n" + "Cause " + exception.getCause());

			// add the error object
			gameDetailsList.add(gameDetails);

			// print the stack trace in TOMCAT console
			exception.printStackTrace();

		} finally {
			closeConnectionsResources(preparedStatement, resultSet,
					sqlConnection);
		}

		// return the object
		return gameDetailsList;
	}

	/**
	 * This gives all the images of game, based on the game name and email id of
	 * the user game belongs to
	 * 
	 * @param gameName
	 *            - Accepts the name of the game
	 * @param emailID
	 *            - Accepts the email ID
	 * 
	 * @return List of image details object from database
	 */
	public List<ImageDetails> getGame(String gameName, String emailID) {

		// list of Image details
		List<ImageDetails> imageDetailsList = new ArrayList<ImageDetails>();
		Connection sqlConnection = null;
		PreparedStatement preparedStatement = null;
		ResultSet resultSet = null;

		try {

			// get the SQL Connection
			sqlConnection = SQLConnectionDatabase.getConnection();

			// SQL Query
			preparedStatement = sqlConnection
					.prepareStatement("SELECT IMAGE_ID, IMAGE_NAME, IMAGE_DATA, GAME_ID "
							+ "			FROM IMAGE_DETAILS "
							+ "			WHERE GAME_ID IN "
							+ "							 ( SELECT GAME_ID FROM GAME_DETAILS WHERE UPPER(GAME_NAME) LIKE ? AND UPPER(USER_EMAIL_ID) LIKE ? )");

			// set the parameters
			preparedStatement.setString(1, gameName.toUpperCase());
			preparedStatement.setString(2, emailID.toUpperCase());

			// result set
			resultSet = preparedStatement.executeQuery();

			// iterate through result set
			while (resultSet.next()) {

				// Image details
				ImageDetails imageDetails = new ImageDetails();

				// fill the data
				imageDetails.setGame_id(resultSet.getInt("GAME_ID"));
				imageDetails.setImage_id(resultSet.getInt("IMAGE_ID"));
				imageDetails.setImage_data(resultSet.getString("IMAGE_DATA"));
				imageDetails.setImage_name(resultSet.getString("IMAGE_NAME"));

				// add into list
				imageDetailsList.add(imageDetails);

			}

			// close the result set
			resultSet.close();

			// close the connection
			sqlConnection.close();

		} catch (Exception exception) {

			// if something goes wrong , create dummy Game Details with the
			// error object
			ImageDetails imageDetails = new ImageDetails();

			// set some dummy error code
			imageDetails.setImage_id(-100);

			// set the error message in one of the VARCHAR column, notify the
			// same to UI
			imageDetails.setImage_name("Message " + exception.getMessage()
					+ "\n" + "Localized Message "
					+ exception.getLocalizedMessage() + "\n" + "Cause "
					+ exception.getCause());

			imageDetails.setImage_data("Message " + exception.getMessage()
					+ "\n" + "Localized Message "
					+ exception.getLocalizedMessage() + "\n" + "Cause "
					+ exception.getCause());

			// add the error object
			imageDetailsList.add(imageDetails);

			// print the stack trace in TOMCAT console
			exception.printStackTrace();

		} finally {
			closeConnectionsResources(preparedStatement, resultSet,
					sqlConnection);
		}

		// return the object
		return imageDetailsList;
	}

	/**
	 * This method accepts the filtering parameters for searching scores in the
	 * database, and return the scores based on the email id , game id and
	 * difficulty level. if all the parameters are passed null none of the
	 * filtering criteria are applied
	 * 
	 * @param gameID
	 *            ID of the game , can come as null
	 * @param emailID
	 *            email ID for which scores are expected, can come as null
	 * @param difficultyLevel
	 *            difficulty level filtering , can come as null
	 * 
	 * @return {@link GameScores} entities of game scores from database.
	 */
	public List<GameScores> getGameScores(String gameID, String emailID,
			String difficultyLevel) {

		// list of score details
		List<GameScores> gameScoresList = new ArrayList<GameScores>();
		Connection sqlConnection = null;
		PreparedStatement preparedStatement = null;
		ResultSet resultSet = null;
		String basicSQLQuery = "SELECT "
				+ "				game_scores.SCORE_ID, "
				+ "				game_scores.USER_EMAIL_ID, "
				+ "				game_scores.GAME_ID, "
				+ "				game_scores.TIMESTAMP, "
				+ "				game_scores.DIFFICULTY_LEVEL, "
				+ "				game_scores.SCORE_MOVE, "
				+ "				game_scores.SCORE_TIMER_SECONDS, "
				+ "				game_details.GAME_NAME,"
				+ "				game_details.USER_EMAIL_ID, "
				+ "				user_details.USER_NAME "
				+ "				FROM GAME_SCORES game_scores, GAME_DETAILS game_details, USER_DETAILS user_details"
				+ "				WHERE game_scores.GAME_ID = game_details.GAME_ID AND UPPER(game_scores.USER_EMAIL_ID) LIKE UPPER(user_details.USER_EMAIL_ID) ";

		try {

			// get the SQL Connection
			sqlConnection = SQLConnectionDatabase.getConnection();

			// none of the parameters were sent
			if (gameID == null && emailID == null && difficultyLevel == null) {

				// SQL Query
				String sqlQuery = basicSQLQuery;
				preparedStatement = sqlConnection.prepareStatement(sqlQuery);

			} else if (gameID != null && emailID == null
					&& difficultyLevel == null) {

				// SQL Query
				String sqlQuery = basicSQLQuery
						+ " AND game_scores.GAME_ID = ?";
				preparedStatement = sqlConnection.prepareStatement(sqlQuery);

				// set the parameters
				preparedStatement.setInt(1, Integer.parseInt(gameID));

			} else if (gameID == null && emailID != null
					&& difficultyLevel == null) {

				// SQL Query
				String sqlQuery = basicSQLQuery
						+ " AND UPPER(game_scores.USER_EMAIL_ID) LIKE ?";
				preparedStatement = sqlConnection.prepareStatement(sqlQuery);

				// set the parameters
				preparedStatement.setString(1, emailID.toUpperCase());

			} else if (gameID == null && emailID == null
					&& difficultyLevel != null) {

				// SQL Query
				String sqlQuery = basicSQLQuery
						+ " AND UPPER(game_scores.DIFFICULTY_LEVEL) = ?";
				preparedStatement = sqlConnection.prepareStatement(sqlQuery);

				// set the parameters
				preparedStatement.setString(1, difficultyLevel.toUpperCase());

			} else if (gameID != null && emailID != null
					&& difficultyLevel == null) {

				// SQL Query
				String sqlQuery = basicSQLQuery
						+ " AND game_scores.GAME_ID = ? AND UPPER(game_scores.USER_EMAIL_ID) LIKE ?";
				preparedStatement = sqlConnection.prepareStatement(sqlQuery);

				// set the parameters
				preparedStatement.setInt(1, Integer.parseInt(gameID));
				preparedStatement.setString(2, emailID.toUpperCase());

			} else if (gameID == null && emailID != null
					&& difficultyLevel != null) {

				// SQL Query
				String sqlQuery = basicSQLQuery
						+ " AND UPPER(game_scores.USER_EMAIL_ID) LIKE ? AND  UPPER(game_scores.DIFFICULTY_LEVEL) = ?";
				preparedStatement = sqlConnection.prepareStatement(sqlQuery);

				// set the parameters
				preparedStatement.setString(1, emailID.toUpperCase());
				preparedStatement.setString(2, difficultyLevel.toUpperCase());

			} else if (gameID != null && emailID == null
					&& difficultyLevel != null) {

				// SQL Query
				String sqlQuery = basicSQLQuery
						+ " AND game_scores.GAME_ID = ? AND  UPPER(game_scores.DIFFICULTY_LEVEL) = ?";
				preparedStatement = sqlConnection.prepareStatement(sqlQuery);

				// set the parameters
				preparedStatement.setInt(1, Integer.parseInt(gameID));
				preparedStatement.setString(2, difficultyLevel.toUpperCase());

			} else if (gameID != null && emailID != null
					&& difficultyLevel != null) {

				// SQL Query
				String sqlQuery = basicSQLQuery
						+ " AND game_scores.GAME_ID = ? AND  UPPER(game_scores.USER_EMAIL_ID) LIKE ? AND UPPER(game_scores.DIFFICULTY_LEVEL) = ?";
				preparedStatement = sqlConnection.prepareStatement(sqlQuery);

				// set the parameters
				preparedStatement.setInt(1, Integer.parseInt(gameID));
				preparedStatement.setString(2, emailID.toUpperCase());
				preparedStatement.setString(3, difficultyLevel.toUpperCase());

			}

			// result set
			resultSet = preparedStatement.executeQuery();

			// iterate through result set
			while (resultSet.next()) {

				// Score details
				GameScores gameScores = new GameScores();

				// fill the data
				gameScores.setScore_id(resultSet.getInt("SCORE_ID"));
				gameScores.setEmail_id(resultSet
						.getString("game_scores.USER_EMAIL_ID"));
				gameScores.setGame_id(resultSet.getInt("GAME_ID"));
				gameScores.setPlayed_time(resultSet.getTimestamp("TIMESTAMP")
						.toString());
				gameScores.setDifficultyLevel(resultSet
						.getString("DIFFICULTY_LEVEL"));
				gameScores.setNumberMoves(resultSet.getInt("SCORE_MOVE"));
				gameScores.setNumberSeconds(resultSet
						.getInt("SCORE_TIMER_SECONDS"));
				gameScores.setGame_name(resultSet.getString("GAME_NAME"));
				gameScores.setPredefinedGame(resultSet
						.getString("game_details.USER_EMAIL_ID").toUpperCase()
						.equals("PREDEFINED"));
				gameScores.setUser_name(resultSet.getString("USER_NAME"));

				// add into list
				gameScoresList.add(gameScores);

			}

		} catch (Exception exception) {

			// if something goes wrong , create dummy Game Score Details with
			// the
			// error object
			GameScores gameScores = new GameScores();

			// set some dummy error code
			gameScores.setScore_id(-100);

			// set the error message in one of the VARCHAR column, notify the
			// same to UI
			gameScores.setEmail_id("Message " + exception.getMessage() + "\n"
					+ "Localized Message " + exception.getLocalizedMessage()
					+ "\n" + "Cause " + exception.getCause());

			// add the error object
			gameScoresList.add(gameScores);

			// print the stack trace in TOMCAT console
			exception.printStackTrace();

		} finally {
			closeConnectionsResources(preparedStatement, resultSet,
					sqlConnection);
		}

		// return the object
		return gameScoresList;
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
