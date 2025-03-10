import Dropdown from "./components/dropdown/Dropdown";
import DropdownMenu from "./components/dropdown/DropdownMenu";
import DropdownMenuItem from "./components/dropdown/DropdownMenuItem";
import DropdownTrigger from "./components/dropdown/DropdownTrigger";

function App() {
  return (
    <div className="m-4">
      <p>Testing dropdown</p>
      <Dropdown shouldChangeTriggerLabel>
        <DropdownTrigger>Menu</DropdownTrigger>
        <DropdownMenu>
          <DropdownMenuItem onClick={() => console.log("clicked Menu 1")}>
            Menu 1
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log("clicked Menu 2")}>
            Menu 2
          </DropdownMenuItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default App;
