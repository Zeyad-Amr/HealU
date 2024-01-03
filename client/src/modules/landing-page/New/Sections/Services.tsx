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
                            <p>Provides guidance on dietary habits, nutrition plans, and lifestyle changes to promote better health and manage conditions through balanced diets. </p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="single-service">
                            <i>
                                <FontAwesomeIcon icon={faTooth}/>
                            </i>
                            <h4><a>Dental Care</a></h4>
                            <p>Specializes in oral health, covering teeth, gums, and related areas. Offers services like cleanings, fillings, extractions, and more. </p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="single-service">
                            <i>
                                <FontAwesomeIcon icon={faEye}/>
                            </i>
                            <h4><a>Ophthalmology</a></h4>
                            <p>Concentrates on eye health, dealing with vision care, eye diseases, surgeries like cataract removal, and corrective procedures like LASIK.</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="single-service">
                            <i>
                                <FontAwesomeIcon icon={faBone}/>
                            </i>
                            <h4><a>Orthopedic</a></h4>
                            <p>Specializes in musculoskeletal system care, treating injuries, conditions, and disorders related to bones, joints, ligaments, tendons, and muscles</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="single-service">
                            <i>
                                <FontAwesomeIcon icon={faChildren}/>
                            </i>
                            <h4><a>Pediatrics</a></h4>
                            <p>Focuses on healthcare for infants, children, and adolescents, covering a wide range of medical services specific to their age group.</p>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="single-service">
                            <i>
                                <FontAwesomeIcon icon={faHandDots}/>
                            </i>
                            <h4><a>Dermatology</a></h4>
                            <p>Focuses on skin health, diagnosing and treating various skin conditions, including acne, eczema, psoriasis, and skin cancer. </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Services
