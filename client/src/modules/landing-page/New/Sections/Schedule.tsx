/* eslint-disable jsx-a11y/anchor-is-valid */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faAmbulance,
  faCalendar,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";

const Schedule = () => {
  return (
    <section className="schedule">
      <div className="container">
        <div className="schedule-inner">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-12 ">
              <div className="single-schedule first">
                <div className="inner">
                  <div className="icon">
                    <i>
                      <FontAwesomeIcon icon={faAmbulance} />
                    </i>
                  </div>
                  <div className="single-content">
                    <h4>New Way for Healthcare</h4>
                    <p>
                      {" "}
                      Embrace a New Era of Accessible, Innovative Solutions
                      according to Your Needs
                    </p>
                    <a href="#">
                      LEARN MORE
                      <i>
                        <FontAwesomeIcon icon={faArrowRightLong} />
                      </i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-12">
              <div className="single-schedule middle">
                <div className="inner">
                  <div className="icon">
                    <i>
                      <FontAwesomeIcon icon={faClock} />
                    </i>
                  </div>
                  <div className="single-content">
                    <h4>Opening Hours</h4>
                    <ul className="time-sidual">
                      <li className="day">
                        Saturday - Thursday <span>8.00-20.00</span>
                      </li>
                      <li className="day">
                        Friday <span>9.00-18.30</span>
                      </li>
                    </ul>
                    <a href="/patient/appointments">
                      LEARN MORE
                      <i>
                        <FontAwesomeIcon icon={faArrowRightLong} />
                      </i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-12">
              <div className="single-schedule middle">
                <div className="inner">
                  <div className="icon">
                    <i>
                      <FontAwesomeIcon icon={faCalendar} />
                    </i>
                  </div>
                  <div className="single-content">
                    <h4>Doctors Timetable</h4>
                    <p>
                      Stay informed about our dedicated doctors' schedules with
                      our comprehensive Doctors Timetable.
                    </p>
                    <a href="/patient/appointments">
                      LEARN MORE
                      <i>
                        <FontAwesomeIcon icon={faArrowRightLong} />
                      </i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
