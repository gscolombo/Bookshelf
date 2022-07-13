import "../../styles/Shelf/Shelf.css";
import BooksDashboard from "./BooksDashboard/Wrapper";
import Header from "./Header";
import ShelfList from "./ShelfList/Wrapper";

export default function Shelf({ credentials, userName }) {
  return (
    <>
      <Header userName={userName} />
      <div className="dashboard-container">
        <ShelfList />
        <BooksDashboard credentials={credentials} />
      </div>
    </>
  );
}
