import "./Footer.css";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import { Col, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <div className="footer__container">
        <Row className="mx-0">
          <Col xl="3" lg="3" md="6" sm="6" xs="12" className="p-4">
            <h5 className="fw-bold">About Us</h5>
            <p>
              We are a leading e-commerce platform providing a wide range of
              products to cater to all your needs. Our mission is to deliver the
              best online shopping experience.
            </p>
          </Col>
          <Col xl="3" lg="3" md="6" sm="6" xs="12" className="p-4">
            <h5 className="fw-bold">Help</h5>
            <ul className="fotter__help__links">
              <li className="help__link">
                <a href="/"> Shipping</a>
              </li>
              <li className="help__link">
                <a href="/">Refund</a>
              </li>
              <li className="help__link">
                <a href="/">FAQ</a>
              </li>
              <li className="help__link">
                <a href="/">Accessiblity</a>
              </li>
            </ul>
          </Col>
          <Col xl="3" lg="3" md="6" sm="6" xs="12" className="p-4">
            <h5 className="fw-bold">Contact Us</h5>
            <ul className="footer__contacts">
              <li className="footer__contact">
                <LocalPhoneIcon /> <span>+123 4567 890</span>
              </li>
              <li className="footer__contact">
                <EmailIcon /> <span>shop@shema.com</span>
              </li>
              <li className="footer__contact">
                <LocationOnIcon /> <span>Addis Ababa, Ethiopia</span>
              </li>
            </ul>
          </Col>
          <Col xl="3" lg="3" md="6" sm="6" xs="12" className="p-4">
            <h5 className="fw-bold">Stay Connected</h5>
            <ul className="footer__social__links">
              <li className="social__link">
                <TwitterIcon />
              </li>
              <li className="social__link">
                <InstagramIcon />
              </li>
              <li className="social__link">
                <YouTubeIcon />
              </li>
              <li className="social__link">
                <TelegramIcon />
              </li>
              <li className="social__link">
                <PinterestIcon />
              </li>
            </ul>
          </Col>
        </Row>
        {/* <div className="footer__items__container">
          <div className="w-100" style={{ maxWidth: "400px" }}>
           
          </div>
          <div className="footer__help__container">
            <div className="footer__help__header">
              <h1>Help</h1>
            </div>
            <ul className="fotter__help__links">
              <li className="help__link">
                <a href="/"> Shipping</a>
              </li>
              <li className="help__link">
                <a href="/">Refund</a>
              </li>
              <li className="help__link">
                <a href="/">FAQ</a>
              </li>
              <li className="help__link">
                <a href="/">Accessiblity</a>
              </li>
            </ul>
          </div>
          <div className="footer__contact__container">
            <div className="footer__contact__header">
              <h1>Contact Us</h1>
            </div>
            <ul className="footer__contacts">
              <li className="footer__contact">
                <LocalPhoneIcon /> <span>+123 4567 890</span>
              </li>
              <li className="footer__contact">
                <EmailIcon /> <span>shop@shema.com</span>
              </li>
              <li className="footer__contact">
                <LocationOnIcon /> <span>Addis Ababa, Ethiopia</span>
              </li>
            </ul>
          </div>
          <div className="footer__social__link__container">
            <div className="footer__social__link__header">
              <h1>Stay Connected</h1>
            </div>
            <ul className="footer__social__links">
              <li className="social__link">
                <TwitterIcon />
              </li>
              <li className="social__link">
                <InstagramIcon />
              </li>
              <li className="social__link">
                <YouTubeIcon />
              </li>
              <li className="social__link">
                <TelegramIcon />
              </li>
              <li className="social__link">
                <PinterestIcon />
              </li>
            </ul>
          </div>
        </div> */}
        <div className="fotter__copyright__container">
          <ul className="nav">
            <li className="footer__copyright">©2022 Shema Ltd. |</li>
            <li className="footer__terms__condition"> | Terms & Condition |</li>
            <li className="footer__privacy__policy">| Privacy Policy</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
