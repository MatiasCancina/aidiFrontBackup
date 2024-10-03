import { GoHome } from "react-icons/go";
import { PiBookLight, PiPlayFill, PiTicketFill } from "react-icons/pi";
import { HiOutlineUsers } from "react-icons/hi2";

export const menuItems = [
    { href: "#", icon: GoHome, label: "Inicio", subItems: [] },
    { href: "#", icon: PiTicketFill, label: "Tus interacciones", subItems: [] },
    { href: "#", icon: PiBookLight, label: "Tus datos personales", subItems: [] },
    { href: "/validate-identity", icon: HiOutlineUsers, label: "Validar identidad de un tercero", subItems: [] },
    { href: "/cinemark", icon: PiPlayFill, label: "Demo", subItems: [] },
];
