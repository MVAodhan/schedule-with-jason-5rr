import { useEffect, useState } from "react";
import Caldendar from "~/components/Calendar";
import Edit from "~/components/Edit";
import Streamyard from "~/components/Streamyard";
import Buffer from "~/components/Buffer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import Website from "~/components/Website";
import { pb } from "~/lib/pocketbase";
import type { Episode } from "~/lib/types";
import Discord from "~/components/Discord";
import LinksAndChapters from "~/components/LinksAndChapters";
import CopyText from "~/components/CopyText";

const episode = ({ params }: { params: { slug: string } }) => {
  const [episode, setEpisode] = useState<Episode>();
  const getEpisode = async () => {
    let episode;
    if (params.slug === "building-web-demos") {
      episode = (await pb
        .collection("reccuring")
        .getFirstListItem(`slug="${params.slug}"`)) as unknown as Episode;
    } else {
      episode = (await pb
        .collection("episodes")
        .getFirstListItem(`slug="${params.slug}"`)) as unknown as Episode;
    }
    setEpisode(episode);
  };

  useEffect(() => {
    getEpisode();
  }, []);
  return (
    <div className="my-5 w-full flex flex-col  items-center">
      {/* <Button onClick={() => saveEpisode(episode)}>Save</Button> */}
      {episode && (
        <Tabs defaultValue="edit">
          <TabsList>
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="streamyard">Streamyard</TabsTrigger>
            <TabsTrigger value="website">Website</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="buffer">Buffer</TabsTrigger>
            <TabsTrigger value="discord">Discord</TabsTrigger>
            <TabsTrigger value="links">Links & Chapters</TabsTrigger>
            <TabsTrigger value="copy-btns">Copy Text</TabsTrigger>
          </TabsList>
          <TabsContent value="edit">
            <Edit episode={episode} />
          </TabsContent>
          <TabsContent value="streamyard">
            <Streamyard episode={episode} />
          </TabsContent>
          <TabsContent value="website">
            <Website episode={episode} />
          </TabsContent>
          <TabsContent value="calendar">
            <Caldendar episode={episode} />
          </TabsContent>
          <TabsContent value="buffer">
            <Buffer episode={episode} />
          </TabsContent>
          <TabsContent value="discord">
            <Discord episode={episode} />
          </TabsContent>
          <TabsContent value="links">
            <LinksAndChapters episode={episode} />
          </TabsContent>
          <TabsContent value="copy-btns">
            <CopyText episode={episode} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default episode;
