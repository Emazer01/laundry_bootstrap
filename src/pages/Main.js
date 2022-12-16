import { Carousel } from "../component/Carousel"
import { Process } from "../component/Process"
import { Util } from "../component/Util"
import brand from "../image/UnBI.png"
import aboutimg from "../image/about.jpg"
import { Footer } from "../component/Footer"

export const Main = () => {
    return (
        <div>
            <header>
                <nav class="navbar navbar-expand-sm navbar-dark fixed-top bg-white border-bottom">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="/">
                            <img src={brand} alt="Avatar Logo" className="brand-logo" />
                        </a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse isinavbar" id="collapsibleNavbar">
                            <ul class="navbar-nav">
                                <li class="nav-item active">
                                    <a class="navlink" href="#">Home</a>
                                </li>
                                <li class="nav-item">
                                    <a class="navlink" href="/pricing">Pricing</a>
                                </li>
                                <li class="nav-item">
                                    <a class="navlink" href="/#contact">Contact</a>
                                </li>
                            </ul>
                            <Util />
                        </div>
                    </div>
                </nav>
            </header>
            <main>
                <Carousel />
                <Process />
                <div id="about" className="sub grey">
                    <h2>About Us</h2>
                    <div className="row">
                        <div className="col-md-8 pe-xl-5">
                            <h5>
                                Laundry day is a necessity for every household, but it can be such a huge time-sink. Let us help you redeem some of those priceless hours.<br></br>
                                UnBI is a revolutionary, eco-friendly valet service that :
                            </h5>
                            <ul>
                                <li><h6>Picks up your dirty clothing from the location of your choice.</h6></li>
                                <li><h6>Get it washed with a high standard procedure and a professional laundromat.</h6></li>
                                <li><h6>Delivers your garments back to you washed, fluffed, and folded.</h6></li>
                            </ul>
                            <h5>
                                Our technology handles all of the complex logistics quickly and cost-effectively, allowing you to enjoy freshly done laundry without having to take time out of your day.
                            </h5>
                        </div>
                        <div className="col">
                            <img src={aboutimg}></img>
                        </div>
                    </div>
                    <br></br><br></br>
                    <div className="row">
                        <a href="#contact" className="col text-center scroll  text-decoration-none">
                            <i class="bi bi-chevron-double-up scrollup"></i>
                            <span className="scrollup">Stay in touch</span>
                            <i class="bi bi-chevron-double-up scrollup"></i>
                        </a>
                    </div>
                </div>
                <div id="contact" className="sub">
                    <div className="row">
                        <div className="col-md-1"></div>
                        <h2 className="col-md-6">Contact</h2>
                    </div><br/>
                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-6">
                            <h5 className="text-muted">Thank you for considering our laundry services. We would love to hear from you and assist with any questions or concerns you may have.</h5>
                            <table>
                                <tr>
                                    <th>Instagram</th>
                                    <td><a className="btn btn-contact container-fluid p-2" href="https://www.instagram.com/gary_ferdinand/">@gary_ferdinand</a></td>
                                    <td><a className="btn btn-contact container-fluid p-2" href="https://www.instagram.com/prasashtiazz__/">@prasashtiazz__</a></td>
                                    <td><a className="btn btn-contact container-fluid p-2" href="https://www.instagram.com/adzs72/">@adzs72</a></td>
                                </tr>
                                <tr>
                                    <th>E-mail</th>
                                    <td><a className="btn btn-contact container-fluid p-2" href="https://garyferdinand15@gmail.com">garyferdinand15@gmail.com</a></td>
                                    <td><a className="btn btn-contact container-fluid p-2" href="https://prasashtialyaanjani@gmail.com">prasashtialyaanjani@gmail.com</a></td>
                                    <td><a className="btn btn-contact container-fluid p-2" href="https://ayumasqonita@gmail.com">ayumasqonita@gmail.com</a></td>
                                </tr>
                                <tr>
                                    <th>WhatsApp</th>
                                    <td><a className="btn btn-contact container-fluid p-2" href="https://wa.me/0881026704385">0881026704385</a></td>
                                    <td><a className="btn btn-contact container-fluid p-2" href="https://wa.me/089658719634">089658719634</a></td>
                                    <td><a className="btn btn-contact container-fluid p-2" href="https://wa.me/ 081211944168"> 081211944168</a></td>
                                </tr>
                                <tr>
                                    <th>Address</th>
                                    <td><a className="btn btn-contact container-fluid p-2" href="https://goo.gl/maps/N63jWvt94SbHBee3A">Location</a></td>
                                </tr>
                            </table>
                        </div>
                        <div className="col-md-1"></div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}