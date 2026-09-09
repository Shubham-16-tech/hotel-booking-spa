

function Navbar({ currentPage, setCurrentPage, bookingCount }) {

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar sticky-top">

      <div className="container">

        <button
          className="navbar-brand border-0 bg-transparent text-white"
          onClick={() => setCurrentPage("home")}
        >
          <i className="bi bi-building me-2"></i>
          HotelEase
        </button>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarMenu"
        >

          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <button
                className={`nav-link ${
                  currentPage === "home" ? "active" : ""
                }`}
                onClick={() => setCurrentPage("home")}
              >
                Home
              </button>
            </li>

            <li className="nav-item">
              <button
                className={`nav-link ${
                  currentPage === "hotels" ? "active" : ""
                }`}
                onClick={() => setCurrentPage("hotels")}
              >
                Hotels
              </button>
            </li>

            <li className="nav-item">
              <button
                className={`nav-link ${
                  currentPage === "about" ? "active" : ""
                }`}
                onClick={() => setCurrentPage("about")}
              >
                About
              </button>
            </li>

            <li className="nav-item">
              <button
                className={`nav-link booking-link ${
                  currentPage === "bookings" ? "active" : ""
                }`}
                onClick={() => setCurrentPage("bookings")}
              >
                <i className="bi bi-calendar-check me-1"></i>
                My Bookings

                {bookingCount > 0 && (
                  <span className="badge bg-danger ms-1">
                    {bookingCount}
                  </span>
                )}
              </button>
            </li>

          </ul>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;