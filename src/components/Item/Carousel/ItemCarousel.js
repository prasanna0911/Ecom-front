import Carousel from "react-bootstrap/Carousel";
import "./ItemCarousel.css";

const ProductCarousel = (props) => {
  return (
    <div>
      <div className="product__carousel gap-2">
        <Carousel variant="dark" interval={4000}>
          {props?.item?.image?.map((img) => (
            <Carousel.Item>
              <div className="carousel__image__container">
                <img className="carousel__image" src={img.URL} alt="item" />
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default ProductCarousel;
