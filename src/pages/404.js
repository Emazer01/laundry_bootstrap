import { Util } from "../component/Util"
import brand from "../image/UnBI.png"
import notfound from "../image/404error2.jpg"

export const NotFound = () => {
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
                                    <a class="navlink" href="/">Home</a>
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
            <main className="pe-5" id="not">
                <div className="pe-5">
                    <img src={notfound} className='mt-4' id='nf' alt="Error" />
                </div>
            </main>
        </div>
    )
}