import { useMemo, useState } from "react";
import "./App.css";
import gamesData from "./data.json";

type Game = {
  id: number;
  name: string;
  playerCount: number | number[];
  platform: string;
  coverUrl: string;
};

type Platform = "Local Multiplayer" | "Seperate Devices";

function App() {
  const [playerCount, setPlayerCount] = useState(4);
  const [platform, setPlatform] = useState<Platform>("Local Multiplayer");

  const filteredGames = useMemo(() => {
    const supportsPlayers = (g: Game, count: number) =>
      Array.isArray(g.playerCount)
        ? g.playerCount.includes(count)
        : g.playerCount === count;

    const playerCountFilter = gamesData.filter((g) =>
      supportsPlayers(g, playerCount)
    );

    const supportsPlatform = (g: Game, p: Platform) => g.platform === p;

    const platformFilter = playerCountFilter.filter((g) =>
      supportsPlatform(g, platform)
    );

    const sortedASC = platformFilter
      .slice()
      .sort((a, b) =>
        a.name.localeCompare(b.name, "nl", { sensitivity: "base" })
      );

    return sortedASC;
  }, [playerCount, platform]);

  const handleSwitchPlayerCount = (count: number) => {
    console.log("Switching player count:", count);
    setPlayerCount(count);
  };

  const handleSwitchPlatform = (platform: Platform) => {
    console.log("Switching platform", platform);
    setPlatform(platform);
  };

  return (
    <>
      <header>
        <h1 className="title">Game Collection</h1>
      </header>
      <main>
        <div className="filters">
          <menu>
            <li className={playerCount === 1 ? "activePlayer" : "non-active"}>
              1
            </li>
            <li
              className={playerCount === 2 ? "activePlayer" : "non-active"}
              onClick={() => handleSwitchPlayerCount(2)}
            >
              2
            </li>
            <li
              className={playerCount === 3 ? "activePlayer" : "non-active"}
              onClick={() => handleSwitchPlayerCount(3)}
            >
              3
            </li>
            <li
              className={playerCount === 4 ? "activePlayer" : "non-active"}
              onClick={() => handleSwitchPlayerCount(4)}
            >
              4
            </li>
          </menu>
          <p className="player-count">Players</p>
          <div className="platform-toggle">
            <img
              src={`src/assets/local_multiplayer.png`}
              className={
                platform === "Local Multiplayer" ? "activePlayer" : "non-active"
              }
              onClick={() => handleSwitchPlatform("Local Multiplayer")}
            />
            <img
              src={`src/assets/seperated_devices.png`}
              className={
                platform === "Seperate Devices" ? "activePlayer" : "non-active"
              }
              onClick={() => handleSwitchPlatform("Seperate Devices")}
            />
          </div>
        </div>
        <div className="game-container">
          {filteredGames.map((game) => (
            <img
              src={`src/assets/${game.coverUrl}`}
              key={game.id}
              alt={game.name}
            />
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
