import Gamedig, { QueryOptions, Type } from "gamedig";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { game, host, port } = req.query;

  if (!game || !host || !port) {
    res.status(400).json({
      error: "Missing required parameters: game, host, and port are required.",
    });
    return;
  }

  const options: QueryOptions = {
    type: String(game) as Type,
    host: String(host),
    port: parseInt(String(port)),
    socketTimeout: 2000,
    attemptTimeout: 10000,
    givenPortOnly: false,
    maxAttempts: 3,
  };

  try {
    console.group("Server Query");
    console.log("Options:", options);
    console.log("Game:", game);
    console.log("Host:", host);
    console.log("Port:", port);

    await Gamedig.query(options)
      .then((state) => {
        console.log("Server is online.");
        console.log("State:", JSON.stringify(state, null, 2));
        res.status(200).json(state);
      })
      .catch((error) => {
        console.error("Server is offline:", error);
        res
          .status(500)
          .json({ error: "Server is offline. Please try again later." });
      });

    console.log("Time of query:", new Date().toLocaleString());
    console.groupEnd();
  } catch (error) {
    console.error("Unexpected error occurred:", error);
    res.status(500).json({
      error: `Unexpected error occurred: ${(error as Error).message}`,
    });
  }
}
