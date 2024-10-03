import React from "react";
import third from "../../../../assets/cinemark/3.PNG";
import Link from "next/link";
import Image from "next/image";

const Cinemark3 = () => {
  return (
    <Link href={"/cinemark/4"} className="w-screen h-screen">
      <Image
        src={third}
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

export default Cinemark3;
