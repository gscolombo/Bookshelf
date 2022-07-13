import arrowLeft from "../../../img/caret-left.svg";
import arrowRight from "../../../img/caret-right.svg";

export default function Pagination({ index, setIndex }) {
  return (
    <section
      style={{ gridColumn: "3 / 4", display: "flex", alignItems: "center" }}
      className="pagination"
    >
      <button
        style={{
          border: "none",
          background: "none",
          minWidth: "min-content",
          opacity: index ? 1 : 0.5,
          cursor: index ? "pointer" : "default",
        }}
        disabled={index ? false : true}
        onClick={() => setIndex(index - 1)}
      >
        <img src={arrowLeft} alt="Seta para a esquerda" />
      </button>
      <p
        style={{
          color: "black",
          fontFamily: "var(--sec-font)",
          textAlign: "center",
        }}
      >
        Página {index + 1}
      </p>
      <button
        style={{
          border: "none",
          background: "none",
          minWidth: "min-content",
          opacity: index === 3 ? 0.5 : 1,
          cursor: index === 3 ? "default" : "pointer",
        }}
        onClick={() => setIndex(index + 1)}
        disabled={index === 3 ? true : false}
      >
        <img src={arrowRight} alt="Seta para a direita" />
      </button>
    </section>
  );
}
