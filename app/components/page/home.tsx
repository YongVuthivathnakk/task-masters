import React from "react";
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="container-x container-y flex ">
        <div className="flex gap-4 self-start">
            <Image width={42} height={42} src={"/Logo.svg"} alt={"logo-image"} />
      <h1 className=" text-title"> My Task Board</h1>
            <Image width={24} height={24} src={"/Edit_duotone.svg"} alt={"logo-image"} />

        </div>
    </div>
  );
}
