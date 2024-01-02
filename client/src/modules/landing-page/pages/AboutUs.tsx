const AboutUs = () => {
    return (
        <div>
            <div className="clients overlay">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-12">
                            <div className="owl-carousel clients-slider"></div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="why-choose section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title">
                                <h2>About Us</h2>
                                <img src="/img/section-img.png" alt="#" />
                                <p style={{ fontSize: 18 }}>
                                    HealU is a leading digital{" "}
                                    <span style={{ fontWeight: "bold" }}>
                                        PolyClinic
                                    </span>{" "}
                                    healthcare platform
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-12">
                            <div className="choose-left">
                                <h3>Who We Are</h3>
                                <p>
                                    We are a team of engineers decided to make
                                    PolyClinic digital sytems to facilitate the
                                    process of booking appointments and managing
                                    the clinic operations and service delivery
                                    for both patients and doctors.
                                </p>
                                <div className="row mt-3">
                                    <div className="col-lg-6">
                                        <ul className="list">
                                            <li>
                                                <i className=""></i>
                                                Innovative Healthcare Solutions
                                            </li>
                                            <li>
                                                <i className=""></i>
                                                Empowering Healthcare Staff
                                            </li>
                                            <li>
                                                <i className=""></i>
                                                Seamless Appointment Booking
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-lg-6">
                                        <ul className="list">
                                            <li>
                                                <i className=""></i>
                                                Clinic Management
                                            </li>
                                            <li>
                                                <i className=""></i>
                                                Patient-Centric Approach
                                            </li>
                                            <li>
                                                <i className=""></i>
                                                Engineered for Efficiency
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-12">
                            <div className="choose-right">
                                <img src="/img/clinic-about-us.jpg" alt="#" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
