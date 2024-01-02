const Portfolio = () => {
    return (
        <section className="portfolio section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title">
                            <h2>Choose from variety of our services</h2>
                            <img src="/img/section-img.png" alt="#"/>
                            <p>HealU provides a lot of services in different aspects</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12 col-9">

                        <div className="owl-carousel portfolio-slider">
                            <div className="single-pf">
                                <img src="/img/pf1.jpg" alt="#"/>
                                <h2 className="btn">View Details</h2>
                            </div>
                            <div className="single-pf">
                                <img src="/img/pf2.jpg" alt="#"/>
                                <h2 className="btn">View Details</h2>
                            </div>
                            <div className="single-pf">
                                <img src="/img/pf3.jpg" alt="#"/>
                                <h2 className="btn">View Details</h2>
                            </div>
                            <div className="single-pf">
                                <img src="/img/pf4.jpg" alt="#"/>
                                <h2 className="btn">View Details</h2>
                            </div>
                            <div className="single-pf">
                                <img src="/img/pf1.jpg" alt="#"/>
                                <h2 className="btn">View Details</h2>
                            </div>
                            <div className="single-pf">
                                <img src="/img/pf2.jpg" alt="#"/>
                                <h2 className="btn">View Details</h2>
                            </div>
                            <div className="single-pf">
                                <img src="/img/pf3.jpg" alt="#"/>
                                <h2 className="btn">View Details</h2>
                            </div>
                            <div className="single-pf">
                                <img src="/img/pf4.jpg" alt="#"/>
                                <h2 className="btn">View Details</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
