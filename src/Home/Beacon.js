import { useEffect } from "react";
export default function useUnloadBeacon({ url }) {
  const eventHandler = async () =>
    await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "include",
      keepalive: true,
      body: JSON.stringify({ front: "react", val: 2 }),
    });
  useEffect(() => {
    window.addEventListener("unload", eventHandler, true);
    return () => {
      window.removeEventListener("unload", eventHandler, true);
    };
  }, []);
}