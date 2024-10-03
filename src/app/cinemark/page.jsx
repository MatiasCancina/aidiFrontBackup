import Image from "next/image";
import React from "react";
import first from "../../../assets/cinemark/1.PNG";
import Link from "next/link";

const Cinemark = () => {
  return (
    <Link href={'/cinemark/2'} className="w-screen h-screen">
      <Image
        src={first}
        alt="Cinemark Image"
        layout="responsive"
        width={1920}
        height={1080}
        className="w-full h-full overflow-y-hidden"
        quality={100}
      />
    </Link>
  );
};

export default Cinemark;
