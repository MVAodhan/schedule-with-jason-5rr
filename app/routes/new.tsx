"use client";

import React, { useRef, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

import { DatePickerDemo } from "~/components/DatePicker";

import { pb } from "~/lib/pocketbase";
import { slugify } from "~/lib/utils";

const NewEpisode = () => {
  const titleRef = useRef<HTMLInputElement | null>(null);

  // const [tags, setTags] = useState<string[]>([])
  const [newUTCString, setNewUTCString] = useState<string | null>(null);

  const [tags, setTags] = useState<string[]>();

  const descriptionRef = useRef<HTMLInputElement | null>(null);
  const guestNameRef = useRef<HTMLInputElement | null>(null);
  const guestTwitterRef = useRef<HTMLInputElement | null>(null);
  const guestBufferRef = useRef<HTMLInputElement | null>(null);
  //   const tagsRef = useRef<HTMLInputElement | null>(null);

  const createNewEpisode = async () => {
    const slug = slugify(titleRef.current!.value);
    await pb.collection("episodes").create({
      title: titleRef.current?.value,
      slug: slug,
      date: newUTCString,
      description: descriptionRef.current?.value,
      guest_name: guestNameRef.current?.value,
      guest_buffer: guestBufferRef.current?.value,
      tags: tags,
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Episode Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-md font-bold">
                Title
              </Label>
              <Input
                id="title"
                ref={titleRef}
                placeholder="Episode title"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="guest_name" className="text-md font-bold">
                Guest Name
              </Label>
              <Input
                id="guest_name"
                ref={guestNameRef}
                placeholder="Guest name"
                className="w-full"
              />
            </div>
            <div>
              <div className="space-y-2 flex flex-col">
                <Label htmlFor="date" className="text-md font-bold">
                  Date (PST)
                </Label>
                <DatePickerDemo setNewUTCString={setNewUTCString} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex flex-col gap-1">
                <Label className="text-md font-bold" htmlFor="guest_twitter">
                  Guest Twitter
                </Label>
                <span className="text-xs italic">no @ symbol</span>
              </div>
              <Input
                id="guest_twitter"
                ref={guestTwitterRef}
                placeholder="eg. jlengstorf"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <div className="flex flex-col gap-1">
                <Label className="text-md font-bold" htmlFor="guest_buffer">
                  Guest Bluesky
                </Label>
                <span className="text-xs italic">no @ symbol</span>
              </div>
              <Input
                id="guest_buffer"
                ref={guestBufferRef}
                placeholder="eg. jlengstorf"
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-md font-bold">
              Description
            </Label>
            <Input
              id="description"
              ref={descriptionRef}
              placeholder="Episode description"
              className="w-full"
            />
          </div>

          {/* <div className="flex flex-col gap-2">
            <div>Tags</div>
            <Input ref={tagsRef} />
            <Button
              onClick={() => {
                setTags((prev) => {
                  const tag = tagsRef.current!.value;
                  if (prev != null) {
                    return [...prev, tag];
                  }
                  return [tag];
                });
                tagsRef.current!.value = "";
              }}
            >
              Add Tag
            </Button>
            <div className="flex gap-1">
              {tags &&
                tags.map((tag: string, i) => <Badge key={i}>{tag}</Badge>)}
            </div>
          </div> */}

          <Button
            type="submit"
            className="w-full"
            onClick={() => createNewEpisode()}
          >
            Create New Episode
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewEpisode;
