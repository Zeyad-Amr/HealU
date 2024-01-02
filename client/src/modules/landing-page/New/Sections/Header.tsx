const Header = () => {
    return (
        <section className="slider">
            <div className="hero-slider">

                <div className="single-slider" style={{backgroundImage:"url('/img/slider2.jpg')"}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7">
                                <div className="text">
                                    <h1><span> HealU </span> Provides Medical Services That You Can <span>Trust!</span></h1>
                                    <p>At HealU, we prioritize your well-being by delivering dependable and quality
                                        medical services. Our commitment lies in offering trustworthy healthcare solutions
                                        that cater to your specific needs, ensuring you receive the best care possible
                                        from a team you can rely on.</p>
                                    <div className="button">
                                        <a href="#" className="btn">Get Appointment</a>
                                        <a href="#" className="btn primary">Learn More</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="single-slider" style={{backgroundImage:"url('/img/slider.jpg')"}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7">
                                <div className="text">
                                    <h1>Discover <span>Superior</span> Healthcare Solutions with <span> HealU </span>  </h1>
                                    <p>Unlock a world of exceptional healthcare at HealU. Our dedication to excellence
                                        drives us to provide superior medical solutions. Explore innovative
                                        and advanced treatments, personalized care, and a comprehensive
                                        range of services that prioritize your health and well-being.</p>
                                    <div className="button">
                                        <a href="#" className="btn">Get Appointment</a>
                                        <a href="#" className="btn primary">About Us</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="single-slider" style={{backgroundImage:"url('/img/slider3.jpg')"}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7">
                                <div className="text">
                                    <h1>Welcome to <span> HealU </span> - Your Premier Destination for <span>Tailored</span> Medical
                                        Solutions!</h1>
                                    <p>As your premier destination, we specialize in tailoring medical solutions to
                                        suit your unique requirements. Our commitment is to provide customized care,
                                        advanced treatments, and a supportive environment to address your health needs
                                        effectively.</p>
                                    <div className="button">
                                        <a href="#" className="btn">Get Appointment</a>
                                        <a href="#" className="btn primary">Conatct Now</a>
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

export default Header;
