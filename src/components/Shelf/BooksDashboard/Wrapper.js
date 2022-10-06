import books from '../../../img/books.svg';
import '../../../styles/Shelf/BooksDashboard/Wrapper.css';

import AddBookButton from './AddBookButton';
import ToggleViewModeButtons from './ToggleViewModeButtons';
import Pagination from './Pagination';
import SearchField from './SearchField';
import Books from './Books';

export default function Wrapper() {
  return (
    <div className="books-dashboard">
      <header>
        <h2>Meus livros</h2>
        <img src={books} alt="Books icon" />
      </header>
      <section className="books-dashboard-menu">
        <AddBookButton />
        <ToggleViewModeButtons />
        {/* <Pagination /> */}
        <SearchField />
      </section>
      <Books />
    </div>
  );
}
