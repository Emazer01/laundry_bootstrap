import { Util } from "../component/Util"
import brand from "../image/UnBI.png"
import shirt from "../image/item/tshirt.png"
import trousers from "../image/item/trousers.png"
import jeans from "../image/item/jeans.png"
import jacket from "../image/item/jacket.png"
import tie from "../image/item/tie.png"
import shoe from "../image/item/shoe.png"
import { Footer } from "../component/Footer"

export const Pricing = () => {
    var totalshoe = 1;
    const calculateCloth = () => {
        const shirt = Number(document.getElementById("shirt").value) * 0.25
        const pants = Number(document.getElementById("pants").value) * 0.5
        const jeans = Number(document.getElementById("jeans").value) * 0.75
        const jacket = Number(document.getElementById("jacket").value) * 0.6
        const tie = Number(document.getElementById("tie").value) * 0.2
        const totalWeight = shirt + pants + jeans + jacket + tie
        document.getElementById("totalWeight").innerHTML = `${totalWeight} Kg`

        var cost = (totalWeight * 6) + 4
        if (Number(cost < 10)) {
            cost = 10
        }
        if (document.getElementById("Ironing").checked == true) {
            cost = cost + (totalWeight*2)
        }
        if (document.getElementById("Express").checked == true) {
            cost = cost + (totalWeight*5)
        }
        document.getElementById("totalCost").innerHTML = `Rp${cost}k`
    }
    const calculateShoe = () => {
        var shoeCost = 4
        for (let index = 1; index <= totalshoe; index++) {
            shoeCost = shoeCost + 20 + Number(document.getElementById(`type${index}`).value)
            if (document.getElementById(`shoe${index}`).value != "") {
                shoeCost += 5
            }
        }
        document.getElementById("Price").innerHTML = `Rp${shoeCost}k`
    }

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
                                <li class="nav-item">
                                    <a class="navlink" href="/">Home</a>
                                </li>
                                <li class="nav-item active">
                                    <a class="navlink" href="#">Pricing</a>
                                </li>
                                <li class="nav-item">
                                    <a class="navlink" href="#contact">Contact</a>
                                </li>
                            </ul>
                            <Util />
                        </div>
                    </div>
                </nav>
            </header>
            <main className="pricing">
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-4 rounded-2 kotak text-center">
                        <h2>Cloth Laundry</h2>
                        <h3>Priced per kg</h3>
                        <i class="bi bi-basket2-fill"></i>
                        <h3><strong>Rp6k Per kg</strong></h3>
                        <p>
                            + Rp2k Ironing<br></br>
                            + Rp5k Express<br></br>
                            (Rp4k Delivery fee)
                        </p>
                    </div>
                    <div className="col-md-6 rounded-2 kotak">
                        <h2>Weight Estimator</h2>
                        <table className="container-fluid">
                            <tr>
                                <th className="col-md-6">Items</th>
                                <th>Weight(kg)</th>
                                <th>How Many?</th>
                            </tr>
                            <tr>
                                <td className="col-md-6">
                                    <img className="ps-md-2" src={shirt}></img>
                                    <span className="ps-md-4 d-none d-sm-inline">Shirt / T-shirt</span>
                                </td>
                                <td>0.25</td>
                                <td><input className="quantity" onChange={() => { calculateCloth() }} type="number" id="shirt" name="quantity" min="0" /></td>
                            </tr>
                            <tr>
                                <td>
                                    <img className="ps-md-2" src={trousers}></img>
                                    <span className="ps-md-4 d-none d-sm-inline">Trousers / Pants</span>
                                </td>
                                <td>0.5</td>
                                <td><input className="quantity" onChange={() => { calculateCloth() }} type="number" id="pants" name="quantity" min="0" /></td>
                            </tr>
                            <tr>
                                <td>
                                    <img className="ps-md-2" src={jeans}></img>
                                    <span className="ps-md-4 d-none d-sm-inline">Jeans</span>
                                </td>
                                <td>0.75</td>
                                <td><input className="quantity" onChange={() => { calculateCloth() }} type="number" id="jeans" name="quantity" min="0" /></td>
                            </tr>
                            <tr>
                                <td>
                                    <img className="ps-md-2" src={jacket}></img>
                                    <span className="ps-md-4 d-none d-sm-inline">Jacket / Sweater</span>
                                </td>
                                <td>0.6</td>
                                <td><input className="quantity" onChange={() => { calculateCloth() }} type="number" id="jacket" name="quantity" min="0" /></td>
                            </tr>
                            <tr>
                                <td>
                                    <img className="ps-md-2" src={tie}></img>
                                    <span className="ps-md-4 d-none d-sm-inline">Tie / Underware / Socks</span>
                                </td>
                                <td>0.2</td>
                                <td><input className="quantity" onChange={() => { calculateCloth() }} type="number" id="tie" name="quantity" min="0" /></td>
                            </tr>
                            <tr>
                                <th>Total Weight (Approx.)</th>
                                <th></th>
                                <th id="totalWeight">1 Kg</th>
                            </tr>
                            <tr>
                                <td>
                                    Ironing<br></br>
                                    Express<br></br>
                                </td>
                                <td>
                                    <input class="form-check-input bg-dark" onChange={() => { calculateCloth() }} type="checkbox" value="2" id="Ironing" /><br></br>
                                    <input class="form-check-input bg-dark" onChange={() => { calculateCloth() }} type="checkbox" value="5" id="Express" />
                                </td>
                                <td>
                                    Rp2k<br></br>
                                    Rp5k<br></br>
                                </td>
                            </tr>
                            <tr>
                                <th>Estimated cost</th>
                                <th>

                                </th>
                                <th id="totalCost">Rp10k</th>
                            </tr>
                        </table>
                    </div>
                    <div className="col-md-1">
                        <a href="#shoe" className="text-center text-decoration-none dark" id="toShoe">
                            <span>Shoe</span><br></br>
                            <i className="bi bi-arrow-down-square-fill" />
                        </a>
                    </div>
                </div>
                <div className="row" id="shoe">
                    <div className="col-md-1"></div>
                    <div className="col-md-4 rounded-2 kotak text-center">
                        <h2>Shoe Laundry</h2>
                        <h3>Priced per pair</h3>
                        <i class="bi bi-archive-fill"></i>
                        <h3><strong>Rp20k Per pair</strong></h3>
                        <p>
                            + Rp5k Deep Clean<br></br>
                            + Rp10k White Shoe<br></br>
                            (Rp4k Delivery fee)<br></br>
                            (&plusmn; 5k Requested special treatment)
                        </p>
                    </div>
                    <div className="col-md-6 rounded-2 kotak">
                        <h2>Price Estimator</h2>
                        <table className="container-fluid" id="shoeItem">
                            <tr>
                                <th className="col-md-3">Items</th>
                                <th className="col-md-3">Type</th>
                                <th className="col-md-6">Request treatment</th>
                            </tr>
                            <tr id="item">
                                <td>
                                    <img className="ps-md-2" src={shoe}></img>
                                    <span className="ps-md-4 d-none d-sm-inline">Shoe #{totalshoe}</span>
                                </td>
                                <td>
                                    <select className="type" id={`type${totalshoe}`}>
                                        <option selected value="0">Regular</option>
                                        <option value="5">Deep Clean</option>
                                        <option value="10">White Shoe</option>
                                    </select>
                                </td>
                                <td><textarea rows='3' className="special col-md-12" type="text" id={`shoe${totalshoe}`} /></td>
                            </tr>

                        </table>
                        <table className="container-fluid">
                            <tr>
                                <th className="col-md-6">Estimated cost</th>
                                <th className="col-md-5">
                                    <button type="button" onClick={() => {
                                        totalshoe += 1
                                        document.getElementById("shoeItem").innerHTML +=
                                            `<tr>
                                            <td>
                                            <img class='ps-md-2' src=${shoe}></img>
                                            <span class="ps-md-4 d-none d-sm-inline">Shoe #${totalshoe}</span>
                                        </td>
                                        <td>
                                            <select class="type" id="type${totalshoe}">
                                                <option selected value="0">Regular</option>
                                                <option value="5">Deep Clean</option>
                                                <option value="10">White Shoe</option>
                                            </select>
                                        </td>
                                        <td>
                                            <textarea rows='3' class='special col-md-12' type="text" id="shoe${totalshoe}"></textarea>
                                        </td>
                                        </tr>`
                                        console.log(totalshoe)
                                    }} class="btn btn-dark">Add Item</button>&nbsp;|&nbsp;
                                    <button type="button" onClick={() => {calculateShoe()}} class="btn btn-dark">Calculate</button>
                                </th>
                                <th className="col-md-1" id="Price">Rp24k</th>
                            </tr>
                        </table>
                    </div>
                    <div className="col-md-1">
                        <a href="#" className="text-center text-decoration-none dark" id="toShoe">
                            <span>Cloth</span><br></br>
                            <i className="bi bi-arrow-up-square-fill" />
                        </a>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}