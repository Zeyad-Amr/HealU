import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faPrescriptionBottle,
    faTooth,
    faHeart,
    faBowlFood,
    faEye,
    faBone,
    faChildren, faHandDots
} from '@fortawesome/free-solid-svg-icons'


const Services = () => {
    return (
        <section className="services section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title">
                            <h2>We Offer Different Services To Improve Your Health</h2>
                            <img src="/img/section-img.png" alt="#"/>
                            <p>Explore our diverse range of specialized services tailored to enhance and optimize your
                                overall health and well-being.</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="single-service">
                            <i>
                                <FontAwesomeIcon icon={faBowlFood}/>
                            </i>
                            <h4><a>Nutrition</a></h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus dictum eros ut
                                imperdiet. </p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="single-service">
                            <i>
                                <FontAwesomeIcon icon={faTooth}/>
                            </i>
                            <h4><a>Dental Care</a></h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus dictum eros ut
                                imperdiet. </p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="single-service">
                            <i>
                                <FontAwesomeIcon icon={faEye}/>
                            </i>
                            <h4><a>Ophthalmology</a></h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus dictum eros ut
                                imperdiet. </p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="single-service">
                            <i>
                                <FontAwesomeIcon icon={faBone}/>
                            </i>
                            <h4><a>Orthopedic</a></h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus dictum eros ut
                                imperdiet. </p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="single-service">
                            <i>
                                <FontAwesomeIcon icon={faChildren}/>
                            </i>
                            <h4><a>Pediatrics</a></h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus dictum eros ut
                                imperdiet. </p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="single-service">
                            <i>
                                <FontAwesomeIcon icon={faHandDots}/>
                            </i>
                            <h4><a>Dermatology</a></h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus dictum eros ut
                                imperdiet. </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Services
