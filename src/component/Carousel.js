import jumbo1 from "../image/jumbo1.jpg"
import jumbo2 from "../image/jumbo2.jpg"
import jumbo3 from "../image/jumbo3.jpg"

export const Carousel = () => {
    return(
        <div id="demo" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#demo" data-bs-slide-to="0" class="active"></button>
                <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
                <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
            </div>
            <div class="carousel-inner">
                 <div class="carousel-item active">
                    <img src={jumbo1} alt="Los Angeles" class="d-block w-100"/>
                    <div class="carousel-caption">
                        <h1 id="jum1">Fresh, Clean, Enjoy</h1>
                        <h2>High Quality laundry service that works for your convenience.</h2>
                        <div className="row">
                            <a className='text-decoration-none rounded-pill quick' href='/' data-bs-toggle="tooltip" data-bs-placement="bottom" title="Explore Wide Variety of Package">
                                <span className='m-auto'>Explore Service</span>   
                            </a>
                        </div>
                        <a href="#process" className="scroll  text-decoration-none">
                            <i class="bi bi-chevron-double-up scrollup"></i>
                            <span className="scrollup">Our Process</span>
                            <i class="bi bi-chevron-double-up scrollup"></i>
                        </a>
                    </div>
                </div>
                <div class="carousel-item">
                    <img src={jumbo2} alt="Chicago" class="d-block w-100"/>
                    <div class="carousel-caption">
                        <h1>Dont waste your time</h1>
                        <h2>We offer pick up and deliver from your home or office. Just sitback and relax</h2>
                        <div className="row">
                            <a className='text-decoration-none rounded-pill quick' href='/' data-bs-toggle="tooltip" data-bs-placement="bottom" title="Make Pickup Request">
                                <span className='m-auto'>Request Now</span>   
                            </a>
                        </div>
                        <a href="#process" className="scroll  text-decoration-none">
                            <i class="bi bi-chevron-double-up scrollup"></i>
                            <span className="scrollup">Our Process</span>
                            <i class="bi bi-chevron-double-up scrollup"></i>
                        </a>
                    </div>
                </div>
                <div class="carousel-item">
                    <img src={jumbo3} alt="New York" class="d-block w-100"/>
                    <div class="carousel-caption">
                        <h1>Wallet Friendly</h1>
                        <h2>Affordable laundry service that are tough on stains and gentle on clothes.</h2>
                        <div className="row">
                            <a className='text-decoration-none rounded-pill quick' href='/pricing' data-bs-toggle="tooltip" data-bs-placement="bottom" title="Laundry Bag">
                                <span className='m-auto'>Pricing</span>   
                            </a>
                        </div>
                        <a href="#process" className="scroll  text-decoration-none">
                            <i class="bi bi-chevron-double-up scrollup"></i>
                            <span className="scrollup">Our Process</span>
                            <i class="bi bi-chevron-double-up scrollup"></i>
                        </a>
                    </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
                <span class="carousel-control-prev-icon"></span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
                <span class="carousel-control-next-icon"></span>
            </button>
        </div>
    )
}