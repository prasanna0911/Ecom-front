import { useState, useEffect } from "react";
import RelatedCard from "../../Card/RelatedCard/RelatedCard";
import "./Related.css";
import { ApiServices } from "../../../api/api";

const Related = (props) => {
  const [menItems, setMenItems] = useState();
  const [womenItems, setWomenItems] = useState();
  const [kidsItems, setKidsItems] = useState();

  const getAllItems = async () => {
    ApiServices.GetAllProducts().then((res) => {
      console.log("res", res);
      if (res.response_code === 200) {
        // setFeaturedItems(res.Data)
        setMenItems(res.Data.filter((item) => item.category === "men"));
        setKidsItems(res.Data.filter((item) => item.category === "kids"));
        setWomenItems(res.Data.filter((item) => item.category === "women"));
      }
    });
  };

  useEffect(() => {
    getAllItems();
    // axios.get("https://shema-backend.vercel.app/api/items")
    //     .then(res => {
    //         setMenItems(res.data.filter((item) => item.category === "men"))
    //         setKidsItems(res.data.filter((item) => item.category === "kids" ))
    //         setWomenItems(res.data.filter((item) => item.category === "women"))
    //     })
    //     .catch(err => console.log(err))
  }, []);

  return (
    <div className="related__products">
      <div className="related__header__container">
        <div className="related__header">
          <h2>Recommended Products</h2>
        </div>
        <div className="related__header__line"></div>
      </div>
      <div className="related__card__container">
        <div className="related__product__card">
          {menItems &&
            props.category === "men" &&
            menItems.map((item, index) => (
              <RelatedCard item={item} key={index} />
            ))}
          {womenItems &&
            props.category === "women" &&
            womenItems.map((item) => <RelatedCard item={item} />)}
          {kidsItems &&
            props.category === "kids" &&
            kidsItems.map((item) => <RelatedCard item={item} />)}
        </div>
      </div>
    </div>
  );
};

export default Related;
