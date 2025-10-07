import type { AuthRecord } from "pocketbase";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { pb } from "~/lib/pocketbase";
import { Button } from "./ui/button";

export default function Header() {
  const [user, setUser] = useState<AuthRecord | null>(null);
  const getUser = async () => {
    let authSore = pb.authStore.record;

    if (!authSore && user != null) {
      setUser(null);
    } else {
      setUser(authSore);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <nav className="flex flex-row p-2  gap-2 bg-white text-black justify-between">
      <div className="px-2 font-bold flex w-full justify-between">
        <Link to="/">Home</Link>

        <div>
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
        </div>
      </div>
    </nav>
  );
}
