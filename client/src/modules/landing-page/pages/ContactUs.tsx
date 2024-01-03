const ContactUs = () => {
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
            <section className="appointment">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title">
                                <h2>Contact Us</h2>
                                <img src="/img/section-img.png" alt="#" />
                                <p>
                                    We will be happy to receive your inquiries
                                    and suggestions.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-md-12 col-12">
                            <form className="form" action="#">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <input
                                                name="name"
                                                type="text"
                                                placeholder="Name"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <input
                                                name="email"
                                                type="email"
                                                placeholder="Email"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <input
                                                name="phone"
                                                type="text"
                                                placeholder="Phone"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-12">
                                        <div className="form-group">
                                            <textarea
                                                name="message"
                                                placeholder="Write Your Message Here....."
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-5 col-md-4 col-12">
                                        <div className="form-group">
                                            <div className="button">
                                                <button
                                                    type="submit"
                                                    className="btn"
                                                >
                                                    Send
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-lg-6 col-md-12 ">
                            <div className="appointment-image">
                                <img src="/img/contact-img.png" alt="#" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactUs;
