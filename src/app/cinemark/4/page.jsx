import Image from "next/image";
import Link from "next/link";
import React from "react";
import fourth from "../../../../assets/cinemark/4.PNG";

const Cinemark4 = () => {
  return (
    <Link href={"/cinemark/5"} className="w-screen h-screen">
      <Image
        src={fourth}
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

export default Cinemark4;
