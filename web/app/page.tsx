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
    port: "9987",
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

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
          src="/shiba.png"
          alt="CGG Logo"
          width={180}
          height={37}
          priority
        />
      </div>
      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
        <a
          href={`minecraft://connect/${minecraft?.connect}`}
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Minecraft Server {minecraft?.raw?.vanilla?.raw?.version?.name}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50 underline`}>
            IP: {minecraft?.connect}
          </p>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            {minecraft?.ping ? (
              <span>
                Ping: {minecraft?.ping}ms{" "}
                <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
              </span>
            ) : (
              <span>
                Offline{" "}
                <span className="inline-block w-2 h-2 rounded-full bg-red-500" />
              </span>
            )}
          </p>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Players: {minecraft?.players?.length || 0}/
            {minecraft?.maxplayers || 0}
          </p>
          {minecraft?.players?.map((player) => (
            <p
              key={`player-${player?.name}`}
              className={`m-0 max-w-[30ch] text-sm opacity-50`}
            >
              {player?.name}
            </p>
          ))}
        </a>
        <a
          href={`ts3server://${sevenDaysToDie?.connect}`}
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            7 Days to Die
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          {sevenDaysToDie?.connect && (
            <p className={`m-0 max-w-[30ch] text-sm opacity-50 underline`}>
              IP: {sevenDaysToDie?.connect}
            </p>
          )}
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            {sevenDaysToDie?.ping ? (
              <span>
                Ping: {sevenDaysToDie?.ping}ms{" "}
                <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
              </span>
            ) : (
              <span>
                Offline{" "}
                <span className="inline-block w-2 h-2 rounded-full bg-red-500" />
              </span>
            )}
          </p>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Players: {sevenDaysToDie?.players?.length || 0}/
            {sevenDaysToDie?.maxplayers || 0}
          </p>
          {sevenDaysToDie?.players?.map((player) => (
            <p
              key={`player-${player?.name}`}
              className={`m-0 max-w-[30ch] text-sm opacity-50`}
            >
              {player?.name}
            </p>
          ))}
        </a>
        <a
          href={`ts3server://${teamspeak3?.connect}`}
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Teamspeak 3
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          {teamspeak3?.connect && (
            <p className={`m-0 max-w-[30ch] text-sm opacity-50 underline`}>
              IP: {teamspeak3?.connect}
            </p>
          )}
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            {teamspeak3?.ping ? (
              <span>
                Ping: {teamspeak3?.ping}ms{" "}
                <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
              </span>
            ) : (
              <span>
                Offline{" "}
                <span className="inline-block w-2 h-2 rounded-full bg-red-500" />
              </span>
            )}
          </p>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Players: {teamspeak3?.players?.length || 0}/
            {teamspeak3?.maxplayers || 0}
          </p>
          {teamspeak3?.players?.map((player) => (
            <p
              key={`player-${player?.name}`}
              className={`m-0 max-w-[30ch] text-sm opacity-50`}
            >
              {player?.name}
            </p>
          ))}
        </a>
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: any;
}
