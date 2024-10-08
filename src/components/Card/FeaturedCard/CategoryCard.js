import { Link } from "react-router-dom";
import "./CategoryCard.css";
import { Button } from "@mui/material";

const CategoryCard = (props) => {
  return (
    <div
      className="category__card__card"
      data-aos="fade-up"
      //   data-aos-once="true"
    >
      <div className="category__image">
        <img src={props.data.image} alt="" className="product__img" />
      </div>
      <div className="category__card__detail">
        <div className="category__name">
          <span>{props.data.name}</span>
        </div>
        <div className="category__card__action">
          <Link to={props.data.url}>
            <Button
              variant="outlined"
              size="small"
              sx={[
                {
                  "&:hover": {
                    backgroundColor: "none",
                    borderColor: "var(--primary-color)",
                    color: "var(--primary-color)",
                  },
                  borderRadius: "20px",
                  borderColor: "var(--primary-color)",
                  backgroundColor: "var(--primary-color)",
                  color: "#000",
                  fontWeight: "700",
                },
              ]}
            >
              SHOP NOW
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
