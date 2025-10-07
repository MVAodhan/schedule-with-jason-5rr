import PocketBase from "pocketbase";

const globalForPB = globalThis as unknown as { pb: PocketBase | undefined };

const pb =
  globalForPB.pb ??
  new PocketBase(
    "https://schedule-with-jason-4-pocketbase-production.up.railway.app"
  );

pb.autoCancellation(false);

if (process.env.NODE_ENV !== "production") globalForPB.pb = pb;

export { pb };
