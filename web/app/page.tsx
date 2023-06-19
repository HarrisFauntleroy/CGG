import { Type } from "gamedig";
import Image from "next/image";

async function getData({
  game,
  host,
  port,
}: {
  game: string;
  host: string;
  port: string;
}) {
  const res = await fetch(
    `https://cgg.vercel.app/api/health?game=${game}&host=${host}&port=${port}}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const HOST = "202.172.109.118";

export default async function Home() {
  const minecraft: GamedigResponse = await getData({
    game: "minecraft",
    host: HOST,
    port: "25565",
  });

  const sevenDaysToDie: GamedigResponse = await getData({
    game: "7d2d",
    host: HOST,
    port: "26900",
  });

  const teamspeak3: GamedigResponse = await getData({
    game: "teamspeak3",
    host: HOST,
    port: "10011",
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Casual Gaming Group
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            &copy; 2023 Casual Gaming Group
          </a>
        </div>
      </div>
      <div className="my-8 relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
          src="/shiba.png"
          alt="CGG Logo"
          width={180}
          height={37}
          priority
        />
      </div>
      <div className="flex flex-col gap-4 justify-center items-center mb-32">
        <GenericGamedigResult data={minecraft} type="minecraft" />
        <GenericGamedigResult data={sevenDaysToDie} type="7d2d" />
        <GenericGamedigResult data={teamspeak3} type="teamspeak3" />
      </div>
    </main>
  );
}

interface Player {
  name: string;
  ping: number;
}
interface GamedigResponse {
  error: string;
  name: string;
  map: string;
  password: boolean;
  maxplayers: number;
  players: Player[];
  bots: Player[];
  connect: string;
  ping: number;
}

function getHref(data: GamedigResponse, type?: Type) {
  switch (type) {
    case "minecraft":
      return `minecraft://connect/${data?.connect}`;
    case "teamspeak3":
      return `ts3server://${data?.connect}`;
    case "7d2d":
      return `steam://connect/${data?.connect}`;
    default:
      return data?.connect;
  }
}

function GenericGamedigResult({
  data,
  type,
}: {
  data: GamedigResponse;
  type?: Type;
}) {
  return (
    <a
      href={getHref(data, type)}
      className="card flex flex-row w-[100%] gap-8 justify-between bg-zinc-900 group rounded-lg border border-transparent p-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div>
        <h2 className={`mb-3 text-2xl font-semibold`}>
          {data?.name}
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
          </span>
        </h2>
        <p className={`m-0 max-w-[30ch] text-sm opacity-50 underline`}>
          IP: {data?.connect || "N/A"}
        </p>
        <p className={`m-0 max-w-[30ch] text-sm opacity-50`}></p>
        {data?.players?.map((player) => (
          <p
            key={`player-${player?.name}`}
            className={`m-0 max-w-[30ch] text-sm opacity-50`}
          >
            {player?.name}
          </p>
        ))}
        <div className="mt-2 flex flex-row gap-2">
          {data?.ping ? (
            <span className="badge badge-success">Ping: {data?.ping}ms </span>
          ) : (
            <span className="badge badge-error">Offline</span>
          )}
          <div className="badge badge-outline">
            Players: {data?.players?.length || 0}/{data?.maxplayers || 0}
          </div>
        </div>
      </div>
      <div className="avatar">
        <div className="w-24 rounded">
          <img className="mask mask-hexagon" src={`/${type}.png`} alt="logo" />
        </div>
      </div>
    </a>
  );
}
