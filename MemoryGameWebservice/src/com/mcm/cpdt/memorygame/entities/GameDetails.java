/**
 * 
 */
package com.mcm.cpdt.memorygame.entities;

/**
 * @author Shrikant Havale
 * 
 *         This class represents entity from the Memory Game Database. Used to
 *         store game details like game id, game name, and user id who created
 *         this game. In case if the game is not created by users and is pre
 *         installed then user id is left blank.
 * 
 */
public class GameDetails {

	/**
	 * GAME ID
	 */
	private int game_id;

	/**
	 * GAME NAME
	 */
	private String game_name;

	/**
	 * USER EMAIL ID
	 */
	private String user_email_id;

	/**
	 * image data
	 */
	private String image_data;

	/**
	 * number of images for particular game
	 */
	private int number_images;

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
	 * @return the user_email_id
	 */
	public String getUser_email_id() {
		return user_email_id;
	}

	/**
	 * @param user_email_id
	 *            the user_email_id to set
	 */
	public void setUser_email_id(String user_email_id) {
		this.user_email_id = user_email_id;
	}

	/**
	 * @return the image_data
	 */
	public String getImage_data() {
		return image_data;
	}

	/**
	 * @param image_data
	 *            the image_data to set
	 */
	public void setImage_data(String image_data) {
		this.image_data = image_data;
	}

	/**
	 * @return the number_images
	 */
	public int getNumber_images() {
		return number_images;
	}

	/**
	 * @param number_images
	 *            the number_images to set
	 */
	public void setNumber_images(int number_images) {
		this.number_images = number_images;
	}

}
