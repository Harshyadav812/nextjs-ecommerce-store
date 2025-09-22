import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full flex justify-center items-center mt-20">
      <Button className="active:scale-95 transition-transform">Hello</Button>
    </div>
  );
}
