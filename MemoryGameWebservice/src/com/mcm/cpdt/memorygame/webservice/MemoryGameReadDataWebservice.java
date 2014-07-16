/**
 * 
 */
package com.mcm.cpdt.memorygame.webservice;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import com.google.gson.Gson;
import com.mcm.cpdt.memorygame.database.SQLQueryReadData;
import com.mcm.cpdt.memorygame.entities.GameDetails;
import com.mcm.cpdt.memorygame.entities.GameScores;
import com.mcm.cpdt.memorygame.entities.ImageDetails;

/**
 * @author Shrikant Havale
 * 
 */

@Path("/memorygameread")
public class MemoryGameReadDataWebservice {

	private SQLQueryReadData sqlQueryReadData = new SQLQueryReadData();

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/readgameslist")
	public String readListGames(@QueryParam("EmailID") String emailID) {

		List<GameDetails> gameDetails = sqlQueryReadData
				.getListGames(emailID);

		Gson gson = new Gson();
		String gsonString = gson.toJson(gameDetails);

		return gsonString;

	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/readgame")
	public String readGame(@QueryParam("GameName") String gameName,
			@QueryParam("EmailID") String emailID) {

		List<ImageDetails> gameDetails = sqlQueryReadData.getGame(
				gameName, emailID);

		Gson gson = new Gson();
		String gsonString = gson.toJson(gameDetails);

		return gsonString;

	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/readgamescores")
	public String readGameScores(@QueryParam("GameID") String gameID,
			@QueryParam("EmailID") String emailID,
			@QueryParam("DifficultyLevel") String difficultyLevel) {

		List<GameScores> gameScores = sqlQueryReadData.getGameScores(gameID,
				emailID, difficultyLevel);

		Gson gson = new Gson();
		String gsonString = gson.toJson(gameScores);

		return gsonString;

	}

}
