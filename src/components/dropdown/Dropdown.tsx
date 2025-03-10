import React, {
  createContext,
  useRef,
  useContext,
  useState,
  useEffect,
} from "react";

// We're creating context here so that it can be shared across childrens easily.
// Important especially for deeply nested components.
// The alternative to this, while maintaining the composition is React.cloneElement
// That would have avoid prop-drilling
const DropdownContext = createContext<any>(null);

export const useDropdownContext = () => useContext(DropdownContext);

const Dropdown = ({
  children,
  shouldChangeTriggerLabel,
}: {
  children: React.ReactNode;
  shouldChangeTriggerLabel?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);
  const [selectedLabel, setSelectedLabel] = useState("");
  const contextState = {
    isOpen,
    setIsOpen,
    triggerRef,
    menuRef,
    selectedLabel,
    setSelectedLabel,
    shouldChangeTriggerLabel,
  };

  useEffect(() => {
    function handleClickOutside(event: PointerEvent) {
      if (!isOpen) {
        return;
      }

      if (
        // @ts-ignore
        !menuRef?.current?.contains(event.target) &&
        // @ts-ignore
        !triggerRef?.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handleClickOutside);

    return () =>
      document.removeEventListener("pointerdown", handleClickOutside);
  }, [isOpen]);

  return (
    <DropdownContext.Provider value={contextState}>
      {children}
    </DropdownContext.Provider>
  );
};

export default Dropdown;
