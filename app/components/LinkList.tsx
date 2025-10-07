"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Label } from "./ui/label";
import type { ListLink } from "~/lib/types";

const LinkList = ({
  links,
  setLinks,
}: {
  links: ListLink[];
  setLinks: React.Dispatch<React.SetStateAction<ListLink[]>>;
}) => {
  const deleteLink = (id: string) => {
    const newLinks = links.filter((link) => {
      if (link.id != id) return link;
    });
    setLinks([...newLinks]);
  };
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Links</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {links &&
          links.map((link) => (
            <div key={link.id} className="flex flex-col gap-2">
              <Label>{link.label}</Label>
              <div className="flex">
                <Input defaultValue={link.value} className="flex-1" />
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => deleteLink(link.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
      </CardContent>
    </Card>
  );
};

export default LinkList;
