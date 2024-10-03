import Image from "next/image";
import Link from "next/link";
import React from "react";
import seventh from "../../../../assets/cinemark/7.PNG";

const Cinemark7 = () => {
  return (
    <Link href={"/cinemark/8"} className="w-screen h-screen">
      <Image
        src={seventh}
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

export default Cinemark7;
