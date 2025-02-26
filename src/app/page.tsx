"use client"; // ✅ Ensures this component runs only in the browser
import dynamic from "next/dynamic";

// ✅ Lazy load FiberMap and disable SSR
const FiberMap = dynamic(() => import("../../components/FiberMap"), { ssr: false });

export default function Home() {
  return (
    <div className="h-screen">
      <FiberMap />
    </div>
  );
}
