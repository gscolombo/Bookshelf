import shelf from "../../../img/book-shelf.svg";
import "../../../styles/Shelf/ShelfList/Wrapper.css";

export default function Wrapper() {
  return (
    <div className="shelf-list">
      <header>
        <h2>Minhas estantes</h2>
        <img src={shelf} alt="Books icon" />
      </header>
    </div>
  );
}
