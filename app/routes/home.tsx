import { useEffect, useState } from "react";
import type { Route } from "./+types/home";
import EpisodeCard from "~/components/Card";
import { pb } from "~/lib/pocketbase";
import type { Episode } from "~/lib/types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const [reccuring, setReccuring] = useState<Episode>();
  const [episodes, setEpisodes] = useState<Episode>();

  const getEpisodes = async () => {
    const episodes = (await pb
      .collection("episodes")
      .getFullList({ sort: "date" })) as unknown as Episode;
    const reccuring = (await pb
      .collection("reccuring")
      .getFullList()) as unknown as Episode;
    setEpisodes(episodes);
    setReccuring(reccuring);
  };

  useEffect(() => {
    getEpisodes();
  }, []);
  return (
    <div className="flex flex-col  items-center">
      {reccuring &&
        reccuring.map((ep: Episode) => <EpisodeCard key={ep.id} ep={ep} />)}
      <div className="my-5 w-full flex flex-col  items-center">
        {episodes &&
          episodes.map((ep: Episode) => <EpisodeCard key={ep.id} ep={ep} />)}
      </div>
    </div>
  );
}
