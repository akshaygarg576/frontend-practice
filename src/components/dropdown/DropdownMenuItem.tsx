import React from "react";
import { useDropdownContext } from "./Dropdown";

const DropdownMenuItem = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  const { setIsOpen, setSelectedLabel, shouldChangeTriggerLabel } =
    useDropdownContext();

  const handleClick = () => {
    onClick && onClick();

    // clicking on any item, should close the dropdown
    setIsOpen(false);
    shouldChangeTriggerLabel && setSelectedLabel(children);
  };

  return (
    <div
      className="w-[200]px bg-gray-200 border-gray-500 border-b-2 m-1 cursor-pointer"
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default DropdownMenuItem;
