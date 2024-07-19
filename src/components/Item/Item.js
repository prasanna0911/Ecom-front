// import ItemCarousel from './Carousel/ItemCarousel';
// import Description from './Description/Description';
// import Detail from './Detail/Detail';
// import './Item.css';
// import Related from './Related/Related';

// const Item = (props) => {
//     return (
//         <div className="item__container">
//             <div className="detail__and__carousel__container">
//                 <ItemCarousel item={props.item}/>
//                 <Detail item={props.item}/>
//             </div>
//             <div className="item__description__container">
//                 <Description item={props.item}/>
//             </div>
//             <div className="related__items__container">
//                 <Related category={props.item.category}/>
//             </div>
//         </div>
//      );
// }

// export default Item;

import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Related from "./Related/Related";
import { Col, Row } from "react-bootstrap";
import Detail from "./Detail/Detail";
import Description from "./Description/Description";
import { Divider } from "@mui/material";
import Reviews from "./Reviews";
import ItemCarousel from "./Carousel/ItemCarousel";
import { useMyContext } from "../../Context/MyContext";

const Item = (props) => {
  const [data, setData] = useState({});
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);

  const { MediumScreen } = useMyContext();

  const navigate = useNavigate();

  const fetchProductDetails = async () => {
    setData(props.item);
    setActiveImage(props.item?.primaryImage[0].URL);
    window.scrollTo(0, 0);
  };
  console.log("data", data);

  useEffect(() => {
    fetchProductDetails();
  }, [props]);

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL);
  };

  const handleZoomImage = useCallback(
    (e) => {
      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();
      console.log("coordinate", left, top, width, height);

      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      setZoomImageCoordinate({
        x,
        y,
      });
    },
    [zoomImageCoordinate]
  );

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };
  console.log("props", props);

  return (
    <div className="  p-4">
      <Row>
        {/***product Image */}
        <Col xl="6" lg="6" md="6" sm="12">
          {MediumScreen ? (
            <div className="d-flex flex-column flex-lg-row-reverse gap-2 h-96">
              <div
                className="position-relative bg-slate-200 p-2"
                style={{
                  height: "400px",
                  width: "400px",
                  lgHeight: "384px",
                  lgWidth: "384px",
                }}
              >
                <img
                  src={activeImage}
                  className="w-100 h-100"
                  style={{ objectFit: "scale-down", mixBlendMode: "multiply" }}
                  onMouseMove={handleZoomImage}
                  onMouseLeave={handleLeaveImageZoom}
                />
                {/**product zoom */}
                {zoomImage && (
                  <div
                    className="d-none d-lg-block position-absolute overflow-hidden bg-slate-200 p-1"
                    style={{
                      minWidth: "500px",
                      minHeight: "400px",
                      right: "-510px",
                      top: 0,
                      zIndex: 999,
                    }}
                  >
                    <div
                      className="w-100 h-100"
                      style={{
                        minHeight: "400px",
                        minWidth: "500px",
                        mixBlendMode: "multiply",
                        transform: "scale(1.5)",
                        backgroundImage: `url(${activeImage})`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                          zoomImageCoordinate.y * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                )}
              </div>
              <div className="h-100">
                <div className="d-flex flex-column overflow-auto h-100">
                  {data?.image?.map((imgURL) => (
                    <div
                      className="bg-slate-200 rounded p-1"
                      style={{ height: "100px", width: "100px" }}
                      key={imgURL}
                    >
                      <img
                        src={imgURL.URL}
                        className="w-100 h-100"
                        style={{
                          objectFit: "scale-down",
                          mixBlendMode: "multiply",
                          cursor: "pointer",
                        }}
                        onMouseEnter={() => handleMouseEnterProduct(imgURL.URL)}
                        onClick={() => handleMouseEnterProduct(imgURL.URL)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <ItemCarousel item={props.item} />
          )}
        </Col>
        {/***product details */}
        <Col xl="6" lg="6" md="6" sm="12">
          {/* <div className="d-flex flex-column gap-1">
            <p className="bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit">
              {data?.name}
            </p>
            <h2
              className="font-medium"
              style={{ fontSize: "2rem", lgFontSize: "4rem" }}
            >
              {data?.detail}
            </h2>
            <p className="text-capitalize text-slate-400">{data?.category}</p>
            <div className="text-red-600 d-flex align-items-center gap-1">
              ******
            </div>
            <div
              className="d-flex align-items-center gap-2 my-1"
              style={{ fontSize: "2rem", lgFontSize: "3rem" }}
            >
              <p className="text-red-600">${data.price}</p>
              <p className="text-slate-400 text-decoration-line-through">
                {data.price}
              </p>
            </div>
            <div className="d-flex align-items-center gap-3 my-2">
              <button
                className="btn btn-outline-danger rounded px-3 py-1"
                style={{ minWidth: "120px" }}
              >
                Buy
              </button>
              <button
                className="btn btn-danger rounded px-3 py-1"
                style={{ minWidth: "120px" }}
              >
                Add To Cart
              </button>
            </div>
            <div>
              <p className="text-slate-600 font-medium my-1">Description : </p>
              <ul>
                {data?.highlights?.map((desc) => (
                  <li>{desc}</li>
                ))}
              </ul>
            </div>
          </div> */}
          <Detail item={props.item} />
          <Divider />
          <Reviews item={props.item} />
        </Col>
      </Row>
      {data.category && <Related category={props.item.category} />}
    </div>
  );
};

export default Item;
