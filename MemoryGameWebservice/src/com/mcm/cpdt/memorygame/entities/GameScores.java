/**
 * 
 */
package com.mcm.cpdt.memorygame.entities;

/**
 * @author Shrikant Havale
 * 
 *         This class represents one of the entity in Memory Game database. It
 *         is used to store the scores of the game played by each user. Score id
 *         - just a unique number, user email id , email id of the user who
 *         played the game, game id indicating which game he played, time stamp
 *         , at what time user played the game, difficulty level - which
 *         difficulty of that particular game was played, score measured using
 *         two parameters - number of moves and time
 * 
 * 
 */
public class GameScores {

	/**
	 * SCORE ID
	 */
	private int score_id;

	/**
	 * EMAIL ID
	 */
	private String email_id;

	/**
	 * GAME ID
	 */
	private int game_id;

	/**
	 * DATE - TIME
	 */
	private String played_time;

	/**
	 * DIFFICULTY LEVEL
	 */
	private String difficultyLevel;

	/**
	 * SCORE NUMBER OF MOVEs
	 */
	private int numberMoves;

	/**
	 * TIME TAKEN SECONDS
	 */
	private int numberSeconds;

	/**
	 * Game name
	 */
	private String game_name;

	/**
	 * Flag variable for deciding if its a predefined game or custom game
	 */
	private boolean isPredefinedGame;

	/**
	 * user name
	 */
	private String user_name;

	/**
	 * @return the game_name
	 */
	public String getGame_name() {
		return game_name;
	}

	/**
	 * @param game_name
	 *            the game_name to set
	 */
	public void setGame_name(String game_name) {
		this.game_name = game_name;
	}

	/**
	 * @return the score_id
	 */
	public int getScore_id() {
		return score_id;
	}

	/**
	 * @param score_id
	 *            the score_id to set
	 */
	public void setScore_id(int score_id) {
		this.score_id = score_id;
	}

	/**
	 * @return the email_id
	 */
	public String getEmail_id() {
		return email_id;
	}

	/**
	 * @param email_id
	 *            the email_id to set
	 */
	public void setEmail_id(String email_id) {
		this.email_id = email_id;
	}

	/**
	 * @return the game_id
	 */
	public int getGame_id() {
		return game_id;
	}

	/**
	 * @param game_id
	 *            the game_id to set
	 */
	public void setGame_id(int game_id) {
		this.game_id = game_id;
	}

	/**
	 * @return the played_time
	 */
	public String getPlayed_time() {
		return played_time;
	}

	/**
	 * @param played_time
	 *            the played_time to set
	 */
	public void setPlayed_time(String played_time) {
		this.played_time = played_time;
	}

	/**
	 * @return the difficultyLevel
	 */
	public String getDifficultyLevel() {
		return difficultyLevel;
	}

	/**
	 * @param difficultyLevel
	 *            the difficultyLevel to set
	 */
	public void setDifficultyLevel(String difficultyLevel) {
		this.difficultyLevel = difficultyLevel;
	}

	/**
	 * @return the numberMoves
	 */
	public int getNumberMoves() {
		return numberMoves;
	}

	/**
	 * @param numberMoves
	 *            the numberMoves to set
	 */
	public void setNumberMoves(int numberMoves) {
		this.numberMoves = numberMoves;
	}

	/**
	 * @return the numberSeconds
	 */
	public int getNumberSeconds() {
		return numberSeconds;
	}

	/**
	 * @param numberSeconds
	 *            the numberSeconds to set
	 */
	public void setNumberSeconds(int numberSeconds) {
		this.numberSeconds = numberSeconds;
	}

	/**
	 * @return the user_name
	 */
	public String getUser_name() {
		return user_name;
	}

	/**
	 * @param user_name
	 *            the user_name to set
	 */
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}

	/**
	 * @return the isPredefinedGame
	 */
	public boolean isPredefinedGame() {
		return isPredefinedGame;
	}

	/**
	 * @param isPredefinedGame
	 *            the isPredefinedGame to set
	 */
	public void setPredefinedGame(boolean isPredefinedGame) {
		this.isPredefinedGame = isPredefinedGame;
	}

}
