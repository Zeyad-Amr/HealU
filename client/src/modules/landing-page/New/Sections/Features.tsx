import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandHoldingMedical,
  faPeopleArrows,
  faStethoscope,
} from "@fortawesome/free-solid-svg-icons";

const Features = () => {
  return (
    <section className="Feautes section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <h2>We Are Always Ready to Help You & Your Loved Ones</h2>
              <img src="/img/section-img.png" alt="#" />
              <p>
                Count on Us Anytime, Our Dedicated Team is Here to Support You
                and Your Loved Ones, Ensuring Prompt and Compassionate Care.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-12">
            <div className="single-features">
              <div className="signle-icon">
                <i className="">
                  <FontAwesomeIcon icon={faPeopleArrows} />
                </i>
              </div>
              <h3>Professional Consultation</h3>
              <p>
                Our Consultation Services Provide Professional Insights and
                Tailored Solutions for Your Health Concerns.
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-12">
            <div className="single-features">
              <div className="signle-icon">
                <i className="">
                  <FontAwesomeIcon icon={faStethoscope} />
                </i>
              </div>
              <h3>Medical Checkups</h3>
              <p>
                Our Comprehensive Assessments and Screenings Are Designed to
                Monitor, Prevent, and Maintain Your Well-being
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-12">
            <div className="single-features last">
              <div className="signle-icon">
                <i className="">
                  <FontAwesomeIcon icon={faHandHoldingMedical} />
                </i>
              </div>
              <h3>Specialized Treatment</h3>
              <p>
                Experience Comprehensive Medical Care Tailored to Your Needs:
                From Diagnostics to Specialized Treatments, We Prioritize Your
                Health and Well-being.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
