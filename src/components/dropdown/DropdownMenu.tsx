import React from "react";
import { useDropdownContext } from "./Dropdown";
import ReactDOM from "react-dom";

const DropdownMenu = ({ children }: { children: React.ReactNode }) => {
  const { triggerRef, menuRef, isOpen } = useDropdownContext();

  if (!isOpen) {
    return null;
  }

  const triggerRect = triggerRef.current?.getBoundingClientRect();

  const styles: React.CSSProperties = {
    position: "absolute",
    top: triggerRect?.bottom + "px",
    left: triggerRect?.left + "px",
    border: "1px solid black",
  };

  return ReactDOM.createPortal(
    <div ref={menuRef} style={styles}>
      {children}
    </div>,
    document.body
  );
};

export default DropdownMenu;
