import grid from "../../../img/grid.svg";
import table from "../../../img/table.svg";

export default function ToggleViewModeButtons() {
  return (
    <div style={{ display: "flex" }}>
      <button style={{ padding: "0", cursor: "pointer" }}>
        <img src={grid} alt="Grid icon" />
      </button>
      <button style={{ padding: "0", cursor: "pointer" }}>
        <img src={table} alt="Table icon" />
      </button>
    </div>
  );
}
