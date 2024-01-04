import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightLong} from "@fortawesome/free-solid-svg-icons";
const CallToAction = () => {
    return (
        <section className="call-action overlay" data-stellar-background-ratio="0.5">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-12">
                        <div className="content">
                            <h2>Do you need Emergency Medical Care? Call us at 1234 56789</h2>
                            <p>Urgent Assistance at Your Fingertips: Reach Us for Emergency Medical Care</p>
                            <div className="button">
                                <a href="/contact-us" className="btn">Contact Now</a>
                                <a href="/patient/appointments" className="btn second">Learn More<i>
                                    <FontAwesomeIcon icon={faArrowRightLong} />
                                </i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CallToAction;
