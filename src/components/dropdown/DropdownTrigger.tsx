import React, { ReactNode, useEffect } from "react";
import { useDropdownContext } from "./Dropdown";

const DropdownTrigger = ({ children }: { children: ReactNode }) => {
  const { setIsOpen, triggerRef, setSelectedLabel, selectedLabel } =
    useDropdownContext();
  const onToggle = () => setIsOpen((prevState: boolean) => !prevState);

  useEffect(() => {
    setSelectedLabel(children);
    // only on mount we are setting this value
  }, []);

  return (
    <button ref={triggerRef} onClick={onToggle}>
      {selectedLabel}
    </button>
  );
};

export default DropdownTrigger;
