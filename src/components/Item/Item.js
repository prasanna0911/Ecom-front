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

import React, { useCallback, useEffect, useState } from "react";
import Related from "./Related/Related";
import { Col, Row } from "react-bootstrap";
import Detail from "./Detail/Detail";
// import Description from "./Description/Description";
import { Divider } from "@mui/material";
import Reviews from "./Reviews/Reviews";
import ItemCarousel from "./Carousel/ItemCarousel";
import { useMyContext } from "../../Context/MyContext";

const Item = (props) => {
  const [data, setData] = useState({});
  const [activeImage, setActiveImage] = useState("");

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);

  const { MediumScreen } = useMyContext();

  const fetchProductDetails = async () => {
    setData(props.item);
    setActiveImage(props.item?.primaryImage[0].URL);
    window.scrollTo(0, 0);
  };

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
      // console.log("coordinate", left, top, width, height);
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

  return (
    <div className="p-4">
      <Row>
        <Col xl="6" lg="6" md="6" sm="12">
          {MediumScreen ? (
            <div className="d-flex flex-row-reverse justify-content-center align-items-start gap-2">
              <div
                className="position-relative bg-slate-200 p-2"
                style={{
                  height: "500px",
                  width: "500px",
                  lgHeight: "384px",
                  lgWidth: "384px",
                }}
              >
                <img
                  src={activeImage}
                  className="w-100 h-100"
                  alt="alt"
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
                      key={imgURL.URL}
                    >
                      <img
                        src={imgURL.URL}
                        alt="alt"
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
        <Col xl="6" lg="6" md="6" sm="12">
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
