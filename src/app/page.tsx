"use client"; // ✅ Ensures this component runs only in the browser

import { useEffect, useState } from "react";
import FiberMap from "../../components/FiberMap";

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // ✅ Only sets this in the browser
  }, []);

  if (!isClient) return <p>Loading...</p>; // ✅ Prevents SSR errors

  return (
    <div className="h-screen">
      <FiberMap />
    </div>
  );
}
