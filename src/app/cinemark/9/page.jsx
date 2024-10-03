import Image from "next/image";
import React from "react";
import nineth from "../../../../assets/cinemark/9.PNG";
import Link from "next/link";

const Cinemaark9 = () => {
  return (
    <Link href={"/cinemark/10"} className="w-screen h-screen">
      <Image
        src={nineth}
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

export default Cinemaark9;
