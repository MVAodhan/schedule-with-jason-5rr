import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { liveLink, returnNZSTString, updateEpisode } from "~/lib/utils";
import { Clipboard } from "lucide-react";
import type { Episode } from "~/lib/types";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";

const Discord = ({ episode }: { episode: Episode }) => {
  const [discordChecked, setDiscordChecked] = useState(episode.discord);

  const updateDiscordStatus = async () => {
    updateEpisode(episode, {
      discord: discordChecked,
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent>
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex items-center ">
            <div className="">{`${episode.title}`}</div>
            <Button variant="ghost">
              <Clipboard
                onClick={() => {
                  navigator.clipboard.writeText(episode.title);
                }}
              />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <div className="">Location</div>
            <Button
              variant="ghost"
              onClick={() => {
                navigator.clipboard.writeText(liveLink);
              }}
            >
              <Clipboard />
            </Button>
          </div>
          <div className="space-y-2 ">
            <Label htmlFor="date" className="text-md ">
              Date (NZST)
            </Label>

            <div>{returnNZSTString(episode.date)}</div>
            {/* <DatePicker date={date!} setDate={setDate} /> */}
          </div>

          <div className="space-y-2">
            <Textarea value={episode.description} className="w-full" readOnly />
          </div>
          <div>
            <div>Scheduled</div>
            <Checkbox
              defaultChecked={discordChecked}
              onCheckedChange={() => setDiscordChecked((prev) => !prev)}
            />
          </div>
          <Button onClick={updateDiscordStatus}>Update Discord Status</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Discord;
