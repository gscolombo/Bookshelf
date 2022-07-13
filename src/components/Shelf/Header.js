import user from "../../img/user.svg";
import logout from "../../img/logout.svg";

export default function Header({ userName }) {
  return (
    <>
      <header>
        <nav className="header-menu">
          <h3>Bookshelf</h3>
          <div className="user-header-menu">
            <span>{userName}</span>
            <img src={user} alt="User icon" />
            <img src={logout} alt="Logout icon" />
          </div>
        </nav>
      </header>
    </>
  );
}
