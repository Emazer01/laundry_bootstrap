export const Process = () => {
    return(
        <div id="process" className="sub">
            <h2 className="text-center">Our Process</h2>
            <h3 className="text-center my-3">This is how we work</h3>
            <div className="row">
                <div className="col-md-1"></div>
                <div className="col text-center">
                    <div className="logo rounded-3 mx-5">
                        <i class="bi bi-envelope-exclamation-fill"></i>
                    </div>
                    <h4>Request</h4>
                    <p>We receive your request through the App that connect us easier and realtime</p>
                </div>
                <div className="col text-center">
                    <div className="logo rounded-3 mx-5">
                        <i class="bi bi-basket2-fill"></i>
                    </div>
                    <h4>Pick-up</h4>
                    <p>We pick-up your Laundry Bag so you dont have to do the work. Just sitback and relax</p>
                </div>
                <div className="col text-center">
                    <div className="logo rounded-3 mx-5">
                        <i class="bi bi-hourglass-split"></i>
                    </div>
                    <h4>Process</h4>
                    <p>We process your requested laundry with high quality procedure as soon as it arrive</p>
                </div>
                <div className="col text-center">
                    <div className="logo rounded-3 mx-5">
                        <i class="bi bi-bag-check-fill"></i>
                    </div>
                    <h4>Deliver</h4>
                    <p>We deliver your gleaming clothes to your door</p>
                </div>
                <div className="col-md-1"></div>
            </div>
            <div className="row">
                <a href="#about" className="col text-center scroll  text-decoration-none">
                    <i class="bi bi-chevron-double-up scrollup"></i>
                    <span className="scrollup">About Us</span>
                    <i class="bi bi-chevron-double-up scrollup"></i>
                </a>
            </div>
        </div>
    )
}