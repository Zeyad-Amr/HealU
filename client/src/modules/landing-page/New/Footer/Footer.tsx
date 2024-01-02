import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGithub} from '@fortawesome/free-brands-svg-icons'
import {faCaretRight} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
    return (
        <footer id="footer" className="footer ">
            <div className="footer-top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="single-footer">
                                <h2>About Us</h2>
                                <p> HealU is a polyclinic platform that provides a wide of medical services. </p>
                                <ul className="social">
                                    <li>
                                        <a href="https://github.com/Zeyad-Amr/HealU">
                                            <i>
                                                <FontAwesomeIcon icon={faGithub} />
                                            </i>
                                        </a>
                                    </li>

                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="single-footer f-link">
                                <h2>Quick Links</h2>
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-12">
                                        <ul>
                                            <li><a href="#"><i><FontAwesomeIcon icon={faCaretRight} /></i>Home</a>
                                            </li>
                                            <li><a href="#"><i><FontAwesomeIcon icon={faCaretRight} /></i>About
                                                Us</a></li>
                                            <li><a href="#"><i><FontAwesomeIcon icon={faCaretRight} /></i>Services</a>
                                            </li>
                                            <li><a href="#"><i><FontAwesomeIcon icon={faCaretRight} /></i>Our
                                                Cases</a></li>
                                            <li><a href="#"><i><FontAwesomeIcon icon={faCaretRight} /></i>Other
                                                Links</a></li>
                                        </ul>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-12">
                                        <ul>
                                            <li><a href="#"><i><FontAwesomeIcon icon={faCaretRight} /></i>Consuling</a></li>
                                            <li><a href="#"><i><FontAwesomeIcon icon={faCaretRight} /></i>FAQ</a></li>
                                            <li><a href="#"><i><FontAwesomeIcon icon={faCaretRight} /></i>Contact Us</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12">
                            <div className="single-footer">
                                <h2>Open Hours</h2>
                                <p> HealU is a available in the following times.</p>
                                <ul className="time-sidual">
                                    <li className="day">Monday - Fridayp <span>8.00-20.00</span></li>
                                    <li className="day">Saturday <span>9.00-18.30</span></li>
                                    <li className="day">Monday - Thusday <span>9.00-15.00</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyright">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-12">
                            <div className="copyright-content">
                                <p>© Copyright 2024 | All Rights Reserved by <a href="https://github.com/Zeyad-Amr/HealU"
                                                                                target="_blank">SBME Class of 2024</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
