import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHome, faUserAlt, faFaceSmile, faCalendar} from '@fortawesome/free-solid-svg-icons'

const Facts = () => {
    return (
        <div id="fun-facts" className="fun-facts section overlay">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-6 col-12">
                        <div className="single-fun">
                            <i>
                                <FontAwesomeIcon icon={faHome}/>
                            </i>
                            <div className="content">
                                <span className="counter">7</span>
                                <p>Clinics</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-12">
                        <div className="single-fun">
                            <i>
                                <FontAwesomeIcon icon={faUserAlt}/>
                            </i>
                            <div className="content">
                                <span className="counter">32</span>
                                <p>Specialist Doctors</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-12">
                        <div className="single-fun">
                            <i>
                                <FontAwesomeIcon icon={faFaceSmile}/>
                            </i>
                            <div className="content">
                                <span className="counter">2458</span>
                                <p>Happy Patients</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-12">
                        <div className="single-fun">
                            <i>
                                <FontAwesomeIcon icon={faCalendar}/>
                            </i>
                            <div className="content">
                                <span className="counter">0.2</span>
                                <p>Years of Experience</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Facts;
