

function BookingItem({ booking, onRemove }) {

  return (
    <div className="card booking-card mb-3 shadow-sm">

      <div className="card-body">

        <div className="row align-items-center">

          <div className="col-md-5">

            <h5 className="mb-1">
              <i className="bi bi-building me-2"></i>
              {booking.hotel.name}
            </h5>

            <p className="text-muted mb-0">
              <i className="bi bi-geo-alt me-1"></i>
              {booking.hotel.location}
            </p>

          </div>

          <div className="col-md-4 mt-3 mt-md-0">

            <p className="mb-1">
              <strong>Check-in:</strong> {booking.checkIn}
            </p>

            <p className="mb-1">
              <strong>Check-out:</strong> {booking.checkOut}
            </p>

            <p className="mb-0">
              <strong>Guests:</strong> {booking.guests}
            </p>

          </div>

          <div className="col-md-3 text-md-end mt-3 mt-md-0">

            <h5 className="text-primary">
              ₹{booking.total.toLocaleString()}
            </h5>

            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => onRemove(booking.id)}
            >
              <i className="bi bi-trash3 me-1"></i>
              Cancel
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default BookingItem;