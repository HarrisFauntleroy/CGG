import { Type } from "gamedig";
import Image from "next/image";
import { Fragment } from "react";

const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://cgg.vercel.app";
async function getData({
  game,
  host,
  port,
}: {
  game: string;
  host: string;
  port?: string;
}) {
  try {
    const res = await fetch(
      `${API_URL}/api/health?game=${game}&host=${host}&port=${port}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        cache: "no-store",
      }
    );
    return res.json();
  } catch (error) {
    console.log(`Error fetching ${game} data: ${error}`);
  }
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
    port: "9987",
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-16">
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
      <div className="my-16 relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
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
        <GenericGamedigResult data={teamspeak3} type="teamspeak3" />
        <GenericGamedigResult data={minecraft} type="minecraft" />
        <GenericGamedigResult data={sevenDaysToDie} type="7d2d" />
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
      className="card flex flex-row w-full gap-2 sm:gap-4 justify-between bg-zinc-900 group rounded-lg border border-transparent p-2 sm:p-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex flex-col flex-grow sm:items-start items-center">
        <h2
          className={`mb-3 text-xl sm:text-2xl font-semibold text-center sm:text-left`}
        >
          {data?.name || type}
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
          </span>
        </h2>
        <p
          className={`m-0 max-w-[30ch] text-xs sm:text-sm opacity-50 underline text-center sm:text-left`}
        >
          IP: {data?.connect || "N/A"}
        </p>
        <p className={`m-0 max-w-[30ch] text-xs sm:text-sm opacity-50`}></p>
        {data?.players?.map((player) => (
          <p
            key={`player-${player?.name}`}
            className={`m-0 max-w-[30ch] text-xs sm:text-sm opacity-50`}
          >
            {player?.name}
          </p>
        ))}
        <div className="mt-2 flex flex-row flex-wrap gap-2 items-center justify-center sm:justify-start">
          {data?.ping ? (
            <span className="badge badge-success">Ping: {data?.ping}ms </span>
          ) : (
            <span className="badge badge-error">Offline</span>
          )}
          <div className="badge badge-outline gap-1">
            <UserIcon count={data?.players?.length} />
            {data?.players?.length || 0}/{data?.maxplayers || 0}
          </div>
        </div>
      </div>
      <div className="avatar w-16 h-16 sm:w-24 sm:h-24">
        <div className="rounded">
          <img className="mask mask-squircle" src={`/${type}.png`} alt="logo" />
        </div>
      </div>
    </a>
  );
}

const User = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-3 h-3"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
    />
  </svg>
);

const Users = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-3 h-3"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
    />
  </svg>
);

const UserGroup = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-3 h-3"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
    />
  </svg>
);

const UserIcon = ({ count }: { count: number }) => {
  if (count === 1) return <User />;
  if (count === 2) return <Users />;
  if (count > 3) return <UserGroup />;
  return <Fragment />;
};
