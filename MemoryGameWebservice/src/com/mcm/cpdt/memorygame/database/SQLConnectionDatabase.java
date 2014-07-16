/**
 * 
 */
package com.mcm.cpdt.memorygame.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * @author Shrikant Havale
 * 
 *         This class is responsible for establishing the connection with the
 *         database. Connects to the database at the given cloud server with the
 *         user credentials.
 * 
 */
public class SQLConnectionDatabase {

	/**
	 * database server name
	 */
	private static final String DATABASE_SERVER_NAME = "127.6.68.2";
	// private static final String DATABASE_SERVER_NAME = "127.0.0.1";

	/**
	 * database name
	 */
	private static final String DATABASE_NAME = "memorygamewebservice";

	/**
	 * port number
	 */
	private static final int PORT_NUMBER = 3306;
	// private static final int PORT_NUMBER = 64290;

	/**
	 * user name
	 */
	private static final String USERNAME = "adminKW8ip3z";

	/**
	 * password
	 */
	private static final String PASSWORD = "BJYWGCkVKZxQ";

	/**
	 * This methods tries to create the connection with the database.
	 * 
	 * @return Connection SQL connection object
	 * @throws Exception
	 *             in case if errors occurs in establishing the connection.
	 */
	public static Connection getConnection() throws Exception {

		try {

			// connection URL
			String connectionURL = "jdbc:mysql://" + DATABASE_SERVER_NAME + ":"
					+ PORT_NUMBER + "/" + DATABASE_NAME;

			// connection object
			Connection connection = null;

			// SQL driver
			Class.forName("com.mysql.jdbc.Driver").newInstance();

			// get connection
			connection = DriverManager.getConnection(connectionURL, USERNAME,
					PASSWORD);

			// return connection
			return connection;

		} catch (SQLException e) {

			e.printStackTrace();
			throw e;

		} catch (Exception e) {

			e.printStackTrace();
			throw e;

		}
	}

	/**
	 * Test Method for checking the connection with the database.
	 * 
	 * @param args
	 * @throws Exception
	 */
	public static void main(String[] args) throws Exception {
		System.out.println(getConnection().toString());
	}
}
