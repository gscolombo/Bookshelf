import { useState } from "react";
import SearchModal from "./SearchModal";
import plus from "../../../img/plus-sign.svg";
import "../../../styles/Shelf/BooksDashboard/AddBookButton.css";

export default function AddBookButton() {
  const [searchModal, setSearchModal] = useState(false);

  return (
    <>
      <button
        className="add-book"
        type="button"
        onClick={() => setSearchModal(true)}
      >
        <img src={plus} alt="Plus sign icon" />
        <span>Adicionar livro</span>
      </button>
      {searchModal && <SearchModal setSearchModal={setSearchModal} />}
    </>
  );
}
