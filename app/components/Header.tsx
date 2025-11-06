import type { AuthRecord } from "pocketbase";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { pb } from "~/lib/pocketbase";
import { Button } from "./ui/button";

export default function Header() {
  const [user, setUser] = useState<AuthRecord | null>(null);
  const getUser = async () => {
    let authSore = pb.authStore.record;

    if (authSore && user === null) {
      setUser(authSore);
    } else {
      setUser(null);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <nav className="flex flex-row p-2  gap-2 bg-white text-black justify-between">
      <div className="px-2 font-bold flex w-full justify-between">
        <Link to="/">Home</Link>

        <div className="flex gap-2 items-center">
          {!user && <Link to="/login">Login</Link>}
          {user && (
            <Button
              onClick={() => {
                pb.authStore.clear();
              }}
            >
              Log out
            </Button>
          )}
          <Link to="/new">New</Link>
        </div>
      </div>
    </nav>
  );
}
