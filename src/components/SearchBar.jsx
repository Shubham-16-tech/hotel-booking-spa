

function SearchBar({
  searchTerm,
  setSearchTerm,
  location,
  setLocation,
  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,
  guests,
  setGuests,
  onSearch
}) {

  return (
    <div className="search-box shadow">

      <div className="row g-3 align-items-end">

        <div className="col-lg-3 col-md-6">

          <label className="form-label">
            <i className="bi bi-search me-1"></i>
            Search Hotel
          </label>

          <input
            type="text"
            className="form-control"
            placeholder="Hotel name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

        </div>

        <div className="col-lg-2 col-md-6">

          <label className="form-label">
            <i className="bi bi-geo-alt me-1"></i>
            Location
          </label>

          <select
            className="form-select"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >

            <option value="All">All Locations</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Goa">Goa</option>
            <option value="Pune">Pune</option>
            <option value="Lonavala">Lonavala</option>
            <option value="Nashik">Nashik</option>

          </select>

        </div>

        <div className="col-lg-2 col-md-6">

          <label className="form-label">
            Check-in
          </label>

          <input
            type="date"
            className="form-control"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />

        </div>

        <div className="col-lg-2 col-md-6">

          <label className="form-label">
            Check-out
          </label>

          <input
            type="date"
            className="form-control"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />

        </div>

        <div className="col-lg-1 col-md-6">

          <label className="form-label">
            Guests
          </label>

          <select
            className="form-select"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
          >

            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>

          </select>

        </div>

        <div className="col-lg-2 col-md-6">

          <button
            className="btn btn-primary w-100 search-btn"
            onClick={onSearch}
          >
            <i className="bi bi-search me-1"></i>
            Search
          </button>

        </div>

      </div>

    </div>
  );
}

export default SearchBar;