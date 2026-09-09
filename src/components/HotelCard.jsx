

function HotelCard({ hotel, onViewDetails, onBook }) {

  return (
    <div className="card hotel-card h-100 shadow-sm">

      <div className={`hotel-image ${hotel.color}`}>

        <i className={`bi ${hotel.icon}`}></i>

        <span className="rating-badge">
          <i className="bi bi-star-fill"></i>
          {hotel.rating}
        </span>

      </div>

      <div className="card-body d-flex flex-column">

        <h5 className="card-title">
          {hotel.name}
        </h5>

        <p className="hotel-location">
          <i className="bi bi-geo-alt-fill me-1"></i>
          {hotel.location}
        </p>

        <p className="text-muted small">
          {hotel.description}
        </p>

        <div className="amenity-list mb-3">

          {hotel.amenities.slice(0, 3).map((amenity, index) => (
            <span
              className="amenity-tag"
              key={index}
            >
              {amenity}
            </span>
          ))}

        </div>

        <div className="mt-auto d-flex justify-content-between align-items-center">

          <div>
            <span className="price">
              ₹{hotel.price.toLocaleString()}
            </span>

            <small className="text-muted">
              / night
            </small>
          </div>

          <div className="d-flex gap-2">

            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => onViewDetails(hotel)}
            >
              Details
            </button>

            <button
              className="btn btn-primary btn-sm"
              onClick={() => onBook(hotel)}
            >
              Book
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default HotelCard;