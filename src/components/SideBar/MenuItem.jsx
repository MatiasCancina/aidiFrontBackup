import React from "react";

const MenuItem = ({ href, icon: Icon, label, isActive }) => {
  return (
    <a
      href={href}
      className={`flex items-center rounded-lg px-4 py-2 text-black ${isActive ? "bg-gray-100" : "hover:bg-gray-100"
        }`}
    >
      <Icon className="text-2xl" />
      <span className="ml-2 text-sm font-medium">{label}</span>
    </a>
  );
};

export default MenuItem;
