import React from "react";
import fifth from "../../../../assets/cinemark/5.PNG";
import Image from "next/image";
import Link from "next/link";

const Cinemark5 = () => {
  return (
    <Link href={"/cinemark/6"} className="w-screen h-screen">
      <Image
        src={fifth}
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

export default Cinemark5;
