const Portfolio = () => {
    return (
        <section className="portfolio section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title">
                            <h2>Choose from variety of our services</h2>
                            <img src="/serv/section-img.png" alt="#"/>
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
                                <img src="/serv/vision.jpg" alt="#"/>
                                <h2 className="btn">Vision Test</h2>
                            </div>
                            <div className="single-pf">
                                <img src="/serv/body.png" alt="#"/>
                                <h2 className="btn">Inbody</h2>
                            </div>
                            <div className="single-pf">
                                <img src="/serv/clean.jpg" alt="#"/>
                                <h2 className="btn">Teeth Cleaning</h2>
                            </div>
                            <div className="single-pf">
                                <img src="/serv/metal.jpg" alt="#"/>
                                <h2 className="btn">Metal Braces</h2>
                            </div>
                            <div className="single-pf">
                                <img src="/serv/derma.jpg" alt="#"/>
                                <h2 className="btn">Acne Treatment</h2>
                            </div>
                            <div className="single-pf">
                                <img src="/serv/baby.jpg" alt="#"/>
                                <h2 className="btn">Infections Treatment for babies</h2>
                            </div>
                            <div className="single-pf">
                                <img src="/serv/sports.jpg" alt="#"/>
                                <h2 className="btn">Sports Medicine</h2>
                            </div>
                            <div className="single-pf">
                                <img src="/serv/nut.jpg" alt="#"/>
                                <h2 className="btn"> Nutrition Plans</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
