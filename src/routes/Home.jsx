import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Landing from "../components/Landing/Landing";
import FeaturedItems from "../components/Featured/Items/FetauredItems";
import FeaturedCategories from "../components/Featured/Categories/FeaturedCategories";
import { TabTitle } from "../utils/General";
import { Box, Grid } from "@radix-ui/themes";


const Home = () => {
    const [featuredItems, setFeaturedItems] = useState()
    TabTitle("Home - Shema");

    useEffect(() => {
        axios.get("https://shema-backend.vercel.app/api/items")
            .then(res => setFeaturedItems(res.data))
            .catch(err => console.log(err))

        window.scrollTo(0, 0)
    }, [])

    return (
        <Fragment>
            <Landing />
            <FeaturedCategories />
            <FeaturedItems items={featuredItems} />
            {/* <Grid gap="3" columns={{ xl: "300px 250px 1fr", lg: "250px 200px 1fr", md: "200px 150px 1fr", sm: "150px 100px 1fr", xs: "1fr" }} width="auto">
                <Box className="custom-box" >1</Box>
                <Box className="custom-box" >2</Box>
                <Box className="custom-box" >3</Box>
                <Box className="custom-box" >4</Box>
                <Box className="custom-box" >5</Box>
                <Box className="custom-box" >6</Box>

            </Grid> */}
        </Fragment>
    );
}

export default Home;