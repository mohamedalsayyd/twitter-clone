import { usePathname } from "next/navigation";

const SideBarMenuItem = ({ text, Icon, active, handleClick }) => {
  const pathname = usePathname();
  return (
    <button
      onClick={handleClick}
      className="hoverEffect flex items-center text-gray-700 justify-center xl:justify-start text-lg space-x-3"
    >
      <Icon className={`h-7 ${pathname === active ? "text-sky-600" : ""}`} />
      <span
        className={`${
          pathname === active ? "font-bold text-sky-600" : "font-normal"
        } hidden xl:inline`}
      >
        {text}
      </span>
    </button>
  );
};

export default SideBarMenuItem;
