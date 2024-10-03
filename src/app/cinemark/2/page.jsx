import Image from 'next/image'
import React from 'react'
import second from "../../../../assets/cinemark/2.PNG";
import Link from 'next/link';

const Cinemark2 = () => {
  return (
    <Link href={'/cinemark/3'} className="w-screen h-screen">
    <Image
      src={second}
      alt="Cinemark Image 2"
      layout="responsive"
      width={1920}
      height={1080}
      className="w-full h-full overflow-y-hidden"
      quality={100}
    />
  </Link>  )
}

export default Cinemark2