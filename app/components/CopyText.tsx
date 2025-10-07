import { useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import {
  captionsBlurb,
  generateYoutubeDescription,
  getHighlightText,
} from "~/lib/utils";
import type { Episode } from "~/lib/types";

import { Textarea } from "./ui/textarea";

const CopyText = ({ episode }: { episode: Episode }) => {
  const formatTags = (tags: string) => {
    const tagsArr = JSON.parse(tags);
    const formattedTags = tagsArr.join(",");

    return formattedTags;
  };

  const techRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const tweet = getHighlightText(
      "<TECHNOLOGY>",
      episode.slug,
      episode.guest_twitter,
      episode.guest_name
    );

    techRef.current!.value = tweet;
  });

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>{episode.title}</CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 pt-2">
          {episode.links && (
            <Button
              onClick={() =>
                navigator.clipboard.writeText(
                  generateYoutubeDescription(episode, episode.links!)
                )
              }
            >
              Youtube Description
            </Button>
          )}
          <Button onClick={() => navigator.clipboard.writeText(captionsBlurb)}>
            Captions disclaimer
          </Button>
          {episode.tags && (
            <Button
              onClick={() => {
                const formattedTags = formatTags(JSON.stringify(episode.tags));
                navigator.clipboard.writeText(formattedTags!);
              }}
            >
              Copy Tags
            </Button>
          )}

          <div className="flex flex-col gap-2">
            <Textarea
              ref={techRef}
              defaultValue={techRef.current?.value}
              className=" flex flex-grow"
            ></Textarea>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(techRef.current!.value);
              }}
            >
              Copy Tweet
            </Button>
          </div>
          {/* {tech && (
            <Button
              className="my-5"
              onClick={() => {
                const tweet = getHighlightText(
                  tech,
                  episode.slug,
                  episode.guest_twitter,
                  episode.guest_name,
                )
                navigator.clipboard.writeText(tweet)
              }}
            >
              Copy Tweet
            </Button>
          )} */}
        </div>
      </CardContent>
    </Card>
  );
};

export default CopyText;
