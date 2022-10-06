/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable default-case */
import { useState, useEffect } from 'react';
import useFetch from '../../../hooks/useFetch';
import LoadingModal from '../../LoadingModal';
import loadingIconBlack from '../../../img/loadingIconBlack.svg';

export default function Books({ credentials, viewMode }) {
  const [books, setBooks] = useState([]);
  const { get, loading, response, setLoading, setErrors } = useFetch();

  // Handle fetch's response
  useEffect(() => {
    const noBooks = response.message === 'No books were found';

    if (noBooks) {
      setLoading(false);
    }
  }, [response]);

  // Fetch user's books right after login
  useEffect(() => {
    get('http://localhost:81/api/books');
  }, []);

  function setViewMode() {
    switch (viewMode) {
      case 'table':
        return (
          <table>
            <tr>
              <th>Título</th>
              <th>Autor</th>
              <th>Editora</th>
              <th>Nº de páginas</th>
              <th>Categoria</th>
            </tr>
            {books.map((book) => {
              return (
                <tr>
                  <td>{book.name}</td>
                  <td>{book.author}</td>
                  <td>{book.editor}</td>
                  <td>{book.pages}</td>
                  <td>{book.shelf}</td>
                </tr>
              );
            })}
          </table>
        );
    }
  }

  return (
    <>
      {loading && books && (
        <LoadingModal
          customStyle={{
            backgroundColor: 'white',
            position: 'relative',
            minHeight: '100%',
            minWidth: '0',
            gridColumn: '1 / 4',
          }}
          customIcon={loadingIconBlack}
          customParagraphStyle={{ color: 'black' }}
          message="Carregando livros..."
        />
      )}
      {!loading && books.length === 0 && (
        <p
          style={{
            color: 'black',
            gridColumn: '1 / 4',
            fontFamily: 'var(--sec-font)',
            margin: '0 auto',
            alignSelf: 'center',
            fontSize: '3rem',
          }}
        >
          Nenhum livro adicionado.
        </p>
      )}
    </>
  );
}
