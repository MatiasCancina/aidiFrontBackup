import React from "react";
import eigth from "../../../../assets/cinemark/8.PNG";
import Link from "next/link";
import Image from "next/image";

const Cinemark8 = () => {
  return (
    <Link href={"/cinemark/9"} className="w-screen h-screen">
      <Image
        src={eigth}
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

export default Cinemark8;
