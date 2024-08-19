const Dealer = () => {
  const [dealer, setDealer] = useState({});
  const [reviews, setReviews] = useState([]);
  const [unreviewed, setUnreviewed] = useState(false);
  const [postReview, setPostReview] = useState(<></>);

  let curr_url = window.location.href;
  let root_url = curr_url.substring(0, curr_url.indexOf("dealer"));
  let params = useParams();
  let id = params.id;
  let dealer_url = root_url + `djangoapp/dealer/${id}`;
  let reviews_url = root_url + `djangoapp/reviews/dealer/${id}`;
  let post_review = root_url + `postreview/${id}`;

  const get_dealer = async () => {
    try {
      const res = await fetch(dealer_url, { method: "GET" });
      if (!res.ok) {
        throw new Error(`Failed to fetch dealer: ${res.statusText}`);
      }
      const retobj = await res.json();
      if (retobj.status === 200) {
        setDealer(retobj.dealer);
      }
    } catch (error) {
      console.error("Error fetching dealer:", error);
    }
  };

  const get_reviews = async () => {
    try {
      const res = await fetch(reviews_url, { method: "GET" });
      if (!res.ok) {
        throw new Error(`Failed to fetch reviews: ${res.statusText}`);
      }
      const retobj = await res.json();
      if (retobj.status === 200) {
        if (retobj.reviews.length > 0) {
          setReviews(retobj.reviews);
        } else {
          setUnreviewed(true);
        }
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const senti_icon = (sentiment) => {
    let icon = sentiment === "positive" ? positive_icon : sentiment === "negative" ? negative_icon : neutral_icon;
    return icon;
  };

  useEffect(() => {
    alert("Fetching dealer and reviews data...");
    get_dealer();
    get_reviews();
    if (sessionStorage.getItem("username")) {
      setPostReview(
        <a href={post_review}>
          <img src={review_icon} style={{ width: "10%", marginLeft: "10px", marginTop: "10px" }} alt="Post Review" />
        </a>
      );
    }
  }, []);  // Dependency array: Runs once on component mount

  return (
    <div style={{ margin: "20px" }}>
      <Header />
      <div style={{ marginTop: "10px" }}>
        <h1 style={{ color: "grey" }}>{dealer.full_name}{postReview}</h1>
        <h4 style={{ color: "grey" }}>{dealer.city},{dealer.address}, Zip - {dealer.zip}, {dealer.state} </h4>
      </div>
      <div className="reviews_panel">
        {reviews.length === 0 && unreviewed === false ? (
          <span>Loading Reviews....</span>
        ) : unreviewed === true ? (
          <div>No reviews yet!</div>
        ) : (
          reviews.map(review => (
            <div className="review_panel" key={review.id}>
              <img src={senti_icon(review.sentiment)} className="emotion_icon" alt="Sentiment" />
              <div className="review">{review.review}</div>
              <div className="reviewer">{review.name} {review.car_make} {review.car_model} {review.car_year}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dealer;
