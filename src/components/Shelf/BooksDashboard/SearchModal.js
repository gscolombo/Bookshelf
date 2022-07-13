/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import useFetch from "../../../hooks/useFetch";
import LoadingModal from "../../LoadingModal";
import Pagination from "./Pagination";
import loadingIconBlack from "../../../img/loadingIconBlack.svg";
import close from "../../../img/close-sign.svg";
import closeBlack from "../../../img/close-black-sign.svg";
import "../../../styles/Shelf/BooksDashboard/SearchModal.css";

export default function SearchModal({ setSearchModal }) {
  const [filter, setFilter] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [index, setIndex] = useState(0);
  const [detailsModal, setDetailsModal] = useState(null);
  const { get, loading, setLoading, response, errors, setErrors } = useFetch();
  const modal = useRef();

  useEffect(() => {
    switch (filter) {
      case "title":
        setPlaceholder("Insira o título do livro");
        break;
      case "author":
        setPlaceholder("Insira o nome do autor/autora");
        break;
      case "publisher":
        setPlaceholder("Insira o nome da editora");
      // no default
    }
  }, [filter]);

  useEffect(() => {
    setLoading(false);

    const hasBooks = response.items && response.items.length > 0;
    if (hasBooks) {
      let i = index * 10;
      let f = i + 10;
      let booksToShow = [];
      while (i < f) {
        booksToShow.push(response.items[i]);
        i++;
      }
      setBooks(booksToShow);
    }
  }, [response, index]);

  async function handleSearch() {
    setBooks([]);
    const sanitizedQuery = query.replace(" ", "+");
    const googleBooksURL = `https://www.googleapis.com/books/v1/volumes?q=in${filter}:${sanitizedQuery}&printType=books&maxResults=40`;

    setLoading(true);
    await get(googleBooksURL);
    setIndex(0);
  }

  function showDetails(book) {
    const { title, description, publisher, authors, pageCount, infoLink } =
      book;

    return (
      <div className="book-info-modal-container">
        <div className="book-info-modal">
          <header>
            <div className="text-info-book-modal">
              <h3>{title}</h3>
              <div className="book-authors">
                {authors.map((author, i, arr) => {
                  return i === arr.length - 1 ? (
                    <p>{author}</p>
                  ) : (
                    <p>{author}, </p>
                  );
                })}
              </div>
              <p className="publisher">
                <b>{publisher}</b>
              </p>
            </div>
            <button
              onClick={(e) => {
                e.currentTarget.parentElement.parentElement.classList.add(
                  "inactive"
                );
                e.currentTarget.parentElement.parentElement.parentElement.classList.add(
                  "inactive"
                );
                setTimeout(() => {
                  setDetailsModal(null);
                }, 500);
              }}
            >
              <img src={close} alt="Close icon" />
            </button>
          </header>
          <p className="description">
            {description ? description : "Descrição indisponível"}
          </p>
          <p>
            N<sup>&ordm;</sup> de páginas:{" "}
            <b>{pageCount > 0 ? pageCount : "Não informado"}</b>
          </p>
          <a href={infoLink} target="_blank" rel="noreferrer">
            Mais informações
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="search-modal-container">
      <div className="search-modal" ref={modal}>
        <header>
          <div className="header-title">
            <h2>Busca de livros</h2>
            <p className="subtitle">pelo Google Books</p>
          </div>
          <button
            onClick={() => {
              modal.current.classList.add("unshow");
              modal.current.parentElement.classList.add("unshow");

              setTimeout(() => {
                setSearchModal(false);
              }, 500);
            }}
          >
            <img src={closeBlack} alt="Close icon" />
          </button>
        </header>
        <section className="query-form">
          <div className="filter-selection">
            <input
              type="radio"
              id="title_opt"
              name="filter"
              value="title"
              onInput={() => setFilter("title")}
            />
            <label htmlFor="title_opt">Por título</label>
            <input
              type="radio"
              id="author_opt"
              name="filter"
              value="author"
              onInput={() => setFilter("author")}
            />
            <label htmlFor="author_opt">Por autor</label>
            <input
              type="radio"
              id="publisher_opt"
              name="filter"
              value="publisher"
              onInput={() => setFilter("publisher")}
            />
            <label htmlFor="publisher_opt">Por editora</label>
          </div>
          {!filter && <p>Selecione um filtro</p>}
          {filter && (
            <>
              <input
                className="search-field"
                type="text"
                id="search"
                name="search"
                placeholder={placeholder}
                value={query}
                onInput={(e) => setQuery(e.currentTarget.value)}
              />
              <button type="button" onClick={handleSearch}>
                Procurar
              </button>
            </>
          )}
        </section>
        {loading && (
          <LoadingModal
            customStyle={{
              backgroundColor: "white",
              position: "relative",
              minHeight: "100%",
              minWidth: "0",
              alignSelf: "center",
              margin: "12.5% 0",
            }}
            customIcon={loadingIconBlack}
            customParagraphStyle={{ color: "black" }}
            message="Procurando livros..."
          />
        )}
        <section className="query-results">
          {books.length > 0 && (
            <>
              <p>Clique na capa do livro para mais detalhes</p>
              <ul className="book-list">
                {books.map((book, i) => (
                  <li
                    key={book.id + book.etag}
                    style={{
                      animation: `FadeInGrowing 0.2s ${i * 0.1}s ease forwards`,
                      opacity: "0",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      setDetailsModal(showDetails(book.volumeInfo));
                    }}
                  >
                    {book.volumeInfo.imageLinks ? (
                      <img
                        src={
                          book.volumeInfo.imageLinks.thumbnail
                            ? book.volumeInfo.imageLinks.thumbnail
                            : book.volumeInfo.imageLinks.smallThumbnail
                        }
                        alt={`${book.volumeInfo.title} thumbnail`}
                      />
                    ) : (
                      <p>
                        Nenhuma <br />
                        imagem <br />
                        disponível
                      </p>
                    )}
                  </li>
                ))}
                {detailsModal}
              </ul>
              <Pagination index={index} setIndex={setIndex} />
            </>
          )}
        </section>
      </div>
    </div>
  );
}
