import { useReducer, useState } from "react";

import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import HotelCard from "./components/HotelCard";
import BookingItem from "./components/BookingItem";

import hotels from "./data/hotels";


/* =========================
   BOOKING REDUCER
========================= */

function bookingReducer(state, action) {

  switch (action.type) {

    case "ADD_BOOKING":
      return [...state, action.payload];

    case "REMOVE_BOOKING":
      return state.filter(
        (booking) => booking.id !== action.payload
      );

    case "CLEAR_BOOKINGS":
      return [];

    default:
      return state;
  }
}


/* =========================
   APP COMPONENT
========================= */

function App() {

  const [currentPage, setCurrentPage] = useState("home");

  const [selectedHotel, setSelectedHotel] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [location, setLocation] = useState("All");

  const [checkIn, setCheckIn] = useState("");

  const [checkOut, setCheckOut] = useState("");

  const [guests, setGuests] = useState(2);

  const [bookings, dispatch] = useReducer(
    bookingReducer,
    []
  );


  /* =========================
     FILTER HOTELS
  ========================= */

  const filteredHotels = hotels.filter((hotel) => {

    const matchesSearch =
      hotel.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesLocation =
      location === "All" ||
      hotel.location === location;

    return matchesSearch && matchesLocation;
  });


  /* =========================
     CALCULATE NIGHTS
  ========================= */

  const calculateNights = () => {

    if (!checkIn || !checkOut) {
      return 1;
    }

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    const difference =
      end.getTime() - start.getTime();

    const nights =
      Math.ceil(
        difference / (1000 * 60 * 60 * 24)
      );

    return nights > 0 ? nights : 1;
  };


  /* =========================
     SEARCH FUNCTION
  ========================= */

  const handleSearch = () => {

    setCurrentPage("hotels");

  };


  /* =========================
     VIEW HOTEL DETAILS
  ========================= */

  const handleViewDetails = (hotel) => {

    setSelectedHotel(hotel);

    setCurrentPage("details");

  };


  /* =========================
     BOOK HOTEL
  ========================= */

  const handleBookHotel = (hotel) => {

    setSelectedHotel(hotel);

    setCurrentPage("details");

  };


  /* =========================
     CONFIRM BOOKING
  ========================= */

  const confirmBooking = () => {

    if (!selectedHotel) {
      return;
    }

    if (!checkIn || !checkOut) {

      alert(
        "Please select check-in and check-out dates."
      );

      return;
    }

    const nights = calculateNights();

    const total =
      selectedHotel.price *
      nights;

    const newBooking = {

      id: Date.now(),

      hotel: selectedHotel,

      checkIn: checkIn,

      checkOut: checkOut,

      guests: guests,

      nights: nights,

      total: total
    };


    dispatch({

      type: "ADD_BOOKING",

      payload: newBooking

    });


    alert(
      `Booking confirmed for ${selectedHotel.name}!`
    );


    setCurrentPage("bookings");

  };


  /* =========================
     REMOVE BOOKING
  ========================= */

  const removeBooking = (id) => {

    dispatch({

      type: "REMOVE_BOOKING",

      payload: id

    });

  };


  /* =========================
     HOME PAGE
  ========================= */

  const HomePage = () => (

    <>

      <section className="hero-section">

        <div className="container">

          <div className="hero-content">

            <span className="hero-label">
              <i className="bi bi-stars me-1"></i>
              Find your perfect stay
            </span>

            <h1>
              Book Hotels.
              <br />
              Create Memories.
            </h1>

            <p>
              Discover comfortable hotels and resorts
              at the best prices.
            </p>

          </div>

          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            location={location}
            setLocation={setLocation}
            checkIn={checkIn}
            setCheckIn={setCheckIn}
            checkOut={checkOut}
            setCheckOut={setCheckOut}
            guests={guests}
            setGuests={setGuests}
            onSearch={handleSearch}
          />

        </div>

      </section>


      <section className="py-5">

        <div className="container">

          <div className="section-heading">

            <div>
              <h2>Popular Hotels</h2>

              <p className="text-muted">
                Explore our most popular stays
              </p>
            </div>

            <button
              className="btn btn-outline-primary"
              onClick={() => setCurrentPage("hotels")}
            >
              View All
              <i className="bi bi-arrow-right ms-2"></i>
            </button>

          </div>


          <div className="row g-4">

            {hotels.slice(0, 3).map((hotel) => (

              <div
                className="col-lg-4 col-md-6"
                key={hotel.id}
              >

                <HotelCard
                  hotel={hotel}
                  onViewDetails={handleViewDetails}
                  onBook={handleBookHotel}
                />

              </div>

            ))}

          </div>

        </div>

      </section>


      <section className="features-section py-5">

        <div className="container">

          <div className="text-center mb-5">

            <h2>Why Choose HotelEase?</h2>

            <p className="text-muted">
              Everything you need for a comfortable stay
            </p>

          </div>

          <div className="row g-4">

            <div className="col-md-4">

              <div className="feature-card">

                <i className="bi bi-shield-check"></i>

                <h5>Secure Booking</h5>

                <p>
                  Your booking information is handled
                  through a simple and secure interface.
                </p>

              </div>

            </div>


            <div className="col-md-4">

              <div className="feature-card">

                <i className="bi bi-tags"></i>

                <h5>Best Prices</h5>

                <p>
                  Compare different hotels and choose
                  the option that fits your budget.
                </p>

              </div>

            </div>


            <div className="col-md-4">

              <div className="feature-card">

                <i className="bi bi-headset"></i>

                <h5>Easy Experience</h5>

                <p>
                  Search, select and manage your hotel
                  booking from one application.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

    </>
  );


  /* =========================
     HOTELS PAGE
  ========================= */

  const HotelsPage = () => (

    <section className="py-5">

      <div className="container">

        <div className="page-title">

          <h1>Find Your Hotel</h1>

          <p className="text-muted">
            Search and choose from available hotels.
          </p>

        </div>


        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          location={location}
          setLocation={setLocation}
          checkIn={checkIn}
          setCheckIn={setCheckIn}
          checkOut={checkOut}
          setCheckOut={setCheckOut}
          guests={guests}
          setGuests={setGuests}
          onSearch={handleSearch}
        />


        <div className="d-flex justify-content-between mb-4">

          <span className="text-muted">
            {filteredHotels.length} hotels found
          </span>

        </div>


        <div className="row g-4">

          {filteredHotels.length > 0 ? (

            filteredHotels.map((hotel) => (

              <div
                className="col-lg-4 col-md-6"
                key={hotel.id}
              >

                <HotelCard
                  hotel={hotel}
                  onViewDetails={handleViewDetails}
                  onBook={handleBookHotel}
                />

              </div>

            ))

          ) : (

            <div className="col-12">

              <div className="empty-state">

                <i className="bi bi-search"></i>

                <h4>No hotels found</h4>

                <p>
                  Try another hotel name or location.
                </p>

              </div>

            </div>

          )}

        </div>

      </div>

    </section>
  );


  /* =========================
     DETAILS PAGE
  ========================= */

  const DetailsPage = () => {

    if (!selectedHotel) {
      return null;
    }

    const nights = calculateNights();

    const total =
      selectedHotel.price * nights;


    return (

      <section className="py-5">

        <div className="container">

          <button
            className="btn btn-outline-secondary mb-4"
            onClick={() => setCurrentPage("hotels")}
          >
            <i className="bi bi-arrow-left me-2"></i>
            Back to Hotels
          </button>


          <div className="row g-4">

            <div className="col-lg-7">

              <div className="details-image">

                <i
                  className={`bi ${selectedHotel.icon}`}
                ></i>

              </div>


              <div className="mt-4">

                <h1>{selectedHotel.name}</h1>

                <p className="hotel-location">

                  <i className="bi bi-geo-alt-fill me-1"></i>

                  {selectedHotel.location}

                  <span className="rating-badge ms-3">
                    <i className="bi bi-star-fill"></i>
                    {selectedHotel.rating}
                  </span>

                </p>

                <p className="text-muted">
                  {selectedHotel.description}
                </p>


                <h5 className="mt-4">
                  Amenities
                </h5>

                <div className="amenities-large">

                  {selectedHotel.amenities.map(
                    (amenity, index) => (

                      <span
                        key={index}
                        className="amenity-tag"
                      >
                        <i className="bi bi-check-circle me-1"></i>
                        {amenity}
                      </span>

                    )
                  )}

                </div>

              </div>

            </div>


            <div className="col-lg-5">

              <div className="booking-form card shadow">

                <div className="card-body">

                  <h4>
                    Book Your Stay
                  </h4>

                  <hr />

                  <div className="mb-3">

                    <label className="form-label">
                      Check-in
                    </label>

                    <input
                      type="date"
                      className="form-control"
                      value={checkIn}
                      onChange={(e) =>
                        setCheckIn(e.target.value)
                      }
                    />

                  </div>


                  <div className="mb-3">

                    <label className="form-label">
                      Check-out
                    </label>

                    <input
                      type="date"
                      className="form-control"
                      value={checkOut}
                      onChange={(e) =>
                        setCheckOut(e.target.value)
                      }
                    />

                  </div>


                  <div className="mb-3">

                    <label className="form-label">
                      Guests
                    </label>

                    <select
                      className="form-select"
                      value={guests}
                      onChange={(e) =>
                        setGuests(
                          Number(e.target.value)
                        )
                      }
                    >

                      <option value="1">
                        1 Guest
                      </option>

                      <option value="2">
                        2 Guests
                      </option>

                      <option value="3">
                        3 Guests
                      </option>

                      <option value="4">
                        4 Guests
                      </option>

                      <option value="5">
                        5 Guests
                      </option>

                      <option value="6">
                        6 Guests
                      </option>

                    </select>

                  </div>


                  <div className="price-summary">

                    <div className="d-flex justify-content-between">

                      <span>
                        ₹{selectedHotel.price.toLocaleString()}
                        {" "}× {nights} night(s)
                      </span>

                      <strong>
                        ₹{total.toLocaleString()}
                      </strong>

                    </div>

                    <hr />

                    <div className="d-flex justify-content-between">

                      <strong>
                        Total
                      </strong>

                      <strong className="total-price">
                        ₹{total.toLocaleString()}
                      </strong>

                    </div>

                  </div>


                  <button
                    className="btn btn-primary w-100 mt-4"
                    onClick={confirmBooking}
                  >
                    <i className="bi bi-calendar-check me-2"></i>
                    Confirm Booking
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

    );
  };


  /* =========================
     BOOKINGS PAGE
  ========================= */

  const BookingsPage = () => (

    <section className="py-5">

      <div className="container">

        <div className="page-title">

          <h1>My Bookings</h1>

          <p className="text-muted">
            Manage your hotel reservations.
          </p>

        </div>


        {bookings.length === 0 ? (

          <div className="empty-state">

            <i className="bi bi-calendar-x"></i>

            <h4>No bookings yet</h4>

            <p>
              Your confirmed hotel bookings will appear here.
            </p>

            <button
              className="btn btn-primary"
              onClick={() => setCurrentPage("hotels")}
            >
              Explore Hotels
            </button>

          </div>

        ) : (

          <>

            {bookings.map((booking) => (

              <BookingItem
                key={booking.id}
                booking={booking}
                onRemove={removeBooking}
              />

            ))}


            <div className="booking-total card shadow-sm mt-4">

              <div className="card-body">

                <div className="d-flex justify-content-between">

                  <h5>
                    Total Booking Amount
                  </h5>

                  <h4 className="text-primary">

                    ₹
                    {bookings
                      .reduce(
                        (sum, booking) =>
                          sum + booking.total,
                        0
                      )
                      .toLocaleString()}

                  </h4>

                </div>

                <button
                  className="btn btn-outline-danger"
                  onClick={() => {

                    if (
                      window.confirm(
                        "Clear all bookings?"
                      )
                    ) {

                      dispatch({
                        type: "CLEAR_BOOKINGS"
                      });

                    }

                  }}
                >
                  Clear All Bookings
                </button>

              </div>

            </div>

          </>

        )}

      </div>

    </section>

  );


  /* =========================
     ABOUT PAGE
  ========================= */

  const AboutPage = () => (

    <section className="py-5">

      <div className="container">

        <div className="about-box">

          <i className="bi bi-building about-icon"></i>

          <h1>
            About HotelEase
          </h1>

          <p>
            HotelEase is a React-based single-page hotel
            booking application designed to provide a simple
            and interactive hotel reservation experience.
          </p>

          <p>
            Users can search hotels, filter hotels by location,
            view hotel details, select booking dates and guests,
            confirm reservations and manage their bookings.
          </p>


          <div className="row mt-5 g-4">

            <div className="col-md-4">

              <div className="about-feature">

                <i className="bi bi-search"></i>

                <h5>Easy Search</h5>

                <p>
                  Quickly find hotels using search and location filters.
                </p>

              </div>

            </div>


            <div className="col-md-4">

              <div className="about-feature">

                <i className="bi bi-calendar-check"></i>

                <h5>Simple Booking</h5>

                <p>
                  Select dates and guests and confirm your reservation.
                </p>

              </div>

            </div>


            <div className="col-md-4">

              <div className="about-feature">

                <i className="bi bi-phone"></i>

                <h5>Responsive Design</h5>

                <p>
                  Works across mobile, tablet and desktop screens.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

  );


  /* =========================
     DYNAMIC PAGE SWITCHING
  ========================= */

  const renderPage = () => {

    switch (currentPage) {

      case "home":
        return <HomePage />;

      case "hotels":
        return <HotelsPage />;

      case "details":
        return <DetailsPage />;

      case "bookings":
        return <BookingsPage />;

      case "about":
        return <AboutPage />;

      default:
        return <HomePage />;

    }

  };


  return (

    <div className="app">

      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        bookingCount={bookings.length}
      />

      <main>
        {renderPage()}
      </main>


      <footer className="footer">

        <div className="container">

          <div className="row">

            <div className="col-md-6">

              <h5>
                <i className="bi bi-building me-2"></i>
                HotelEase
              </h5>

              <p>
                Your simple hotel booking solution.
              </p>

            </div>

            <div className="col-md-6 text-md-end">

              <p>
                © 2026 HotelEase. All Rights Reserved.
              </p>

              <p className="small">
                Built using React.js & Bootstrap 5
              </p>

            </div>

          </div>

        </div>

      </footer>

    </div>

  );
}

export default App;