import { Card, CardContent } from "@mui/material";
import "./RelatedCard.css";
import { Link } from "react-router-dom";

const RelatedCard = (props) => {
  return (
    <Card className="related__product__card__container">
      <CardContent className="related__product__card__inner p-1">
        <div className="related__product__image">
          <img
            src={props.item?.primaryImage[0].URL}
            alt="item"
            className="product__img"
          />
        </div>
        <div className="related__product__card__detail">
          <div className="related__product__name">
            <Link to={`/item/${props.item.category}/${props.item._id}`}>
              {props.item.name}
            </Link>
          </div>
          <div className="related__product__description">
            <span>{props.item.description}</span>
          </div>
          <div className="related__product__price">
            <span>${props.item.price}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RelatedCard;
