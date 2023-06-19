import chalk from "chalk";
import Gamedig, { QueryOptions, Type } from "gamedig";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { game, host, port } = req.query;

  const options: QueryOptions = {
    type: game as Type,
    host: String(host),
    port: parseInt(String(port)),
  };

  console.log(chalk.green("Attempting to query server with the following:"));
  console.log(chalk.blue("Options:"), options);
  console.log(chalk.blue("Game:"), game);
  console.log(chalk.blue("Host:"), host);
  console.log(chalk.blue("Port:"), port);

  await Gamedig.query(options)
    .then((state) => {
      console.log(chalk.green("Server is online."));
      console.log(chalk.blue("State:"), JSON.stringify(state, null, 2));
      res.json(state);
    })
    .catch((error) => {
      console.log(chalk.red("Server is offline:"), error);
      res.json({ error: `Server is offline: ${error}` });
    });

  console.log(chalk.gray("Time of query:"), new Date().toLocaleString());
}
