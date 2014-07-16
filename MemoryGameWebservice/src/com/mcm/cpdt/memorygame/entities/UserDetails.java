/**
 * 
 */
package com.mcm.cpdt.memorygame.entities;

/**
 * @author Shrikant Havale
 * 
 *         This class represents the entity in database. Contains details of
 *         user like user id - unique number, user email id - mostly taken from
 *         facebook login, user name - taken from facebook login, and time of
 *         registration.
 * 
 */
public class UserDetails {

	/**
	 * USER ID
	 */
	private int user_id;

	/**
	 * USER EMAIL ID
	 */
	private String user_email_id;

	/**
	 * USER NAME
	 */
	private String user_name;

	/**
	 * TIME - REGISTRATION
	 */
	private String registration_time;

	/**
	 * @return the user_id
	 */
	public int getUser_id() {
		return user_id;
	}

	/**
	 * @param user_id
	 *            the user_id to set
	 */
	public void setUser_id(int user_id) {
		this.user_id = user_id;
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
	 * @return the registration_time
	 */
	public String getRegistration_time() {
		return registration_time;
	}

	/**
	 * @param registration_time
	 *            the registration_time to set
	 */
	public void setRegistration_time(String registration_time) {
		this.registration_time = registration_time;
	}

}
