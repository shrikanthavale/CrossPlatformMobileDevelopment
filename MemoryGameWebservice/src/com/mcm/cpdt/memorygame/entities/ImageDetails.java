/**
 * 
 */
package com.mcm.cpdt.memorygame.entities;

/**
 * @author Shrikant Havale
 * 
 *         This class represents entity from the Memory Game Database. Used to
 *         represent Image Details table from database, contains Image id -
 *         unique identifier , name of the image, content of the image in form
 *         of blob data type and important game id - to which game this image
 *         belongs to.
 */
public class ImageDetails {

	/**
	 * IMAGE ID
	 */
	private int image_id;

	/**
	 * IMAGE NAME
	 */
	private String image_name;

	/**
	 * IMAGE BLOB DATA
	 */
	private String image_data;

	/**
	 * GAME ID - FOREIGN KEY
	 */
	private int game_id;

	/**
	 * @return the image_id
	 */
	public int getImage_id() {
		return image_id;
	}

	/**
	 * @param image_id
	 *            the image_id to set
	 */
	public void setImage_id(int image_id) {
		this.image_id = image_id;
	}

	/**
	 * @return the image_name
	 */
	public String getImage_name() {
		return image_name;
	}

	/**
	 * @param image_name
	 *            the image_name to set
	 */
	public void setImage_name(String image_name) {
		this.image_name = image_name;
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

}
