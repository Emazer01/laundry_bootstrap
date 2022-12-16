import * as React from 'react';
import { Util } from "../component/Util"
import brand from "../image/UnBI.png"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import shoe from "../image/item/shoe.png"
import { Footer } from '../component/Footer';

export const Request = () => {
    const [alamatstate, setAlamatstate] = React.useState()
    const navigate = useNavigate()
    React.useEffect(() => {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id')
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/verify`, {
            token: token
        })
            .then(function (response) {
                if (response.status == 200 && id == response.data.id) {
                    console.log('sudah login')
                } else {
                    navigate('../login')
                }
            })
            .catch(function (error) {
                navigate('../login')
            });

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/addresses`, {
            token: token,
            id: id
        })
            .then(async function (response) {
                if (response.status == 200) {
                    const alamat = response.data
                    setAlamatstate(alamat)
                    var list = ``
                    for (let index = 0; index < alamat.length; index++) {
                        list +=
                            `<option value=${alamat[index].cust_id}>
                                <strong>${alamat[index].cust_name}</strong>&nbsp;-&nbsp;
                                ${alamat[index].cust_phone}&nbsp;-&nbsp;
                                ${alamat[index].cust_address}
                            </option>`
                    }
                    document.getElementById("selectAddress").innerHTML = list
                    document.getElementById("selectShoeAddress").innerHTML = list
                    for (let index = 0; index < alamat.length; index++) {
                        //document.getElementById(alamat[index].cust_id).onclick = editAddress;
                    }
                } else {
                    console.log('Tidak berhasil mengambil alamat')
                    return
                }
            })
            .catch(async function (error) {
                console.log(error)
                return
            });
    }, [])


    const calculateCloth = () => {
        const weight = document.getElementById('weight').value
        var cost = (weight * 6) + 4
        if (document.getElementById("Iron").checked == true) {
            cost = cost + (weight * 2)
        }
        if (document.getElementById("Expr").checked == true) {
            cost = cost + (weight * 5)
        }
        console.log(cost)
        document.getElementById('Cost').innerHTML = `Rp${cost}k`
    }
    const calculateShoe = () => {
        const qty = document.getElementById('qty').value
        var cost = (qty * 20) + 4
        const type = document.getElementById('shoeType').value
        if (type != 5) {
            if (type == 6) {
                cost += (qty * 10)
            } else {
                cost += (qty * 5)
            }
        }
        document.getElementById('shoeCost').innerHTML = `Rp${cost}k`
    }

    const reqCloth = async (event) => {
        document.getElementById('loadingReqCloth').classList.remove('d-none')
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const req_unit = data.get('weight')
        const req_cust = data.get('address')
        const req_notes = data.get('notes')
        const req_est = document.getElementById('Cost').innerHTML
        const plus = Number(data.get('Iron')) + Number(data.get('Expr'))
        var req_mode = 1
        if (plus > 0) {
            if (plus == 2) {
                req_mode = 2
            } else if (plus == 5) {
                req_mode = 3
            } else {
                req_mode = 4
            }
        }
        const token = localStorage.getItem('token')
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/addrequest`, {
            token: token,
            req_unit: req_unit,
            req_cust: req_cust,
            req_notes: req_notes,
            req_est: req_est,
            req_mode: req_mode,
        })
            .then(async function (response) {
                if (response.status == 200) {
                    document.getElementById('loadingReqCloth').classList.add('d-none')
                    console.log('berhasil')
                    document.getElementById('alertRequestSukses').classList.remove('d-none');
                    await sleep(2000);
                    document.getElementById('alertRequestSukses').classList.add('d-none')
                    navigate('../profile')
                } else {
                    console.log('tidak berhasil')
                    document.getElementById('loadingReqCloth').classList.add('d-none')
                    document.getElementById('alertRequestSalah').classList.remove('d-none');
                    await sleep(2000);
                    document.getElementById('alertRequestSalah').classList.add('d-none')
                }
            })
            .catch(async function (error) {
                console.log(error)
                document.getElementById('loadingReqCloth').classList.add('d-none')
                document.getElementById('alertRequestSalah').classList.remove('d-none');
                await sleep(2000);
                document.getElementById('alertRequestSalah').classList.add('d-none')
            });
    }
    const reqShoe = async (event) => {
        document.getElementById('loadingReqShoe').classList.remove('d-none')
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const req_unit = data.get('qty')
        const req_cust = data.get('address')
        const req_notes = data.get('notes')
        const req_est = document.getElementById('shoeCost').innerHTML
        const req_mode = Number(data.get('type'))
        const token = localStorage.getItem('token')
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/addrequest`, {
            token: token,
            req_unit: req_unit,
            req_cust: req_cust,
            req_notes: req_notes,
            req_est: req_est,
            req_mode: req_mode,
        })
            .then(async function (response) {
                if (response.status == 200) {
                    document.getElementById('loadingReqShoe').classList.add('d-none')
                    console.log('berhasil')
                    document.getElementById('alertRequestSukses').classList.remove('d-none');
                    await sleep(2000);
                    document.getElementById('alertRequestSukses').classList.add('d-none')
                    navigate('../profile')
                } else {
                    console.log('tidak berhasil')
                    document.getElementById('loadingReqShoe').classList.add('d-none')
                    document.getElementById('alertRequestSalah').classList.remove('d-none');
                    await sleep(2000);
                    document.getElementById('alertRequestSalah').classList.add('d-none')
                }
            })
            .catch(async function (error) {
                console.log(error)
                document.getElementById('loadingReqShoe').classList.add('d-none')
                document.getElementById('alertRequestSalah').classList.remove('d-none');
                await sleep(2000);
                document.getElementById('alertRequestSalah').classList.add('d-none')
            });
    }

    function sleep(ms) {
        return new Promise(
            resolve => setTimeout(resolve, ms)
        );
    }

    const toShoe = () => {
        document.getElementById('shoeReceipt').classList.remove('d-none')
        document.getElementById('btn-shoe').classList.add('request-active')
        document.getElementById('clothReceipt').classList.add('d-none')
        document.getElementById('btn-cloth').classList.remove('request-active')
        document.getElementById('otherReceipt').classList.add('d-none')
        document.getElementById('btn-other').classList.remove('request-active')
    }
    const toCloth = () => {
        document.getElementById('shoeReceipt').classList.add('d-none')
        document.getElementById('btn-shoe').classList.remove('request-active')
        document.getElementById('clothReceipt').classList.remove('d-none')
        document.getElementById('btn-cloth').classList.add('request-active')
        document.getElementById('otherReceipt').classList.add('d-none')
        document.getElementById('btn-other').classList.remove('request-active')
    }
    const toOther = () => {
        document.getElementById('shoeReceipt').classList.add('d-none')
        document.getElementById('btn-shoe').classList.remove('request-active')
        document.getElementById('clothReceipt').classList.add('d-none')
        document.getElementById('btn-cloth').classList.remove('request-active')
        document.getElementById('otherReceipt').classList.remove('d-none')
        document.getElementById('btn-other').classList.add('request-active')
    }

    return (
        <div>
            <header>
                <nav class="navbar navbar-expand-sm navbar-dark fixed-top bg-white border-bottom">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="/">
                            <img src={brand} alt="Avatar Logo" className="brand-logo" />
                        </a>
                        <a class="navlink" href="#"><h1>| Request</h1></a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse isinavbar" id="collapsibleNavbar">
                            <ul class="navbar-nav">
                                <li>
                                </li>
                            </ul>
                            <Util />
                        </div>
                    </div>
                </nav>
            </header>
            <main id='request_page'>
                <h1 className="text-center">Fill a Laundry Bag</h1>
                <div className="row mt-4">
                    <div className="col-md-3"></div>
                    <button onClick={toCloth} className="btn btn-request request-active col-md-2" id='btn-cloth'>Clothes</button>
                    <button onClick={toShoe} className="btn btn-request col-md-2" id='btn-shoe'>Shoe</button>
                    <button onClick={toOther} className="btn btn-request col-md-2" id='btn-other'>Other</button>
                    <div className="col-md-3"></div>
                </div>
                <div className='mt-3'>
                    <div class='alert alert-danger text-center d-none' id='alertRequestSalah'>
                        <strong>Can't Request!</strong> Request doesn't send.
                    </div>
                    <div class='alert alert-success text-center d-none' id='alertRequestSukses'>
                        <strong>Success!</strong> Request Sended.
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="container col-md-9 jenis p-3" id='clothReceipt'>
                        <h4 className="mt-2">Request Receipt&nbsp;&nbsp;&nbsp;&nbsp;
                            <div class="spinner-border d-none" role="status" id='loadingReqCloth'>
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </h4>
                        <form onSubmit={reqCloth}>
                            <table className="container-fluid m-1">
                                <tr>
                                    <th className="col-md-2">Approx Weight</th>
                                    <td className="col-md-7"><input className='form-control' onChange={() => { calculateCloth() }} type='number' step='0.05' min='1' id="weight" name='weight' defaultValue='1'></input></td>
                                    <td className="col-md-3">Kg</td>
                                </tr>
                                <tr>
                                    <td>
                                        Ironing<br></br>
                                        Express<br></br>
                                    </td>
                                    <td>
                                        <input class="form-check-input bg-dark form-control" onChange={() => { calculateCloth() }} type="checkbox" value="2" id="Iron" name='Iron' />
                                        <input class="form-check-input bg-dark form-control" onChange={() => { calculateCloth() }} type="checkbox" value="5" id="Expr" name='Expr' />
                                    </td>
                                    <td>
                                        Rp2k<br></br>
                                        Rp5k<br></br>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Estimated cost</th>
                                    <th>~</th>
                                    <th id="Cost">Rp10k</th>
                                </tr>
                                <tr>
                                    <th>Notes</th>
                                    <td><textarea className='form-control' rows='3' id='notes' name='notes'></textarea></td>
                                    <td className='text-muted'>Add a notes regarding your laundry</td>
                                </tr>
                                <tr>
                                    <th>Select Address</th>
                                    <td>
                                        <select className='form-control' id='selectAddress' name='address'>
                                            <option>No Address Found</option>
                                        </select>
                                    </td>
                                    <td><button type='submit' className="btn btn-dark">Request Pickup</button></td>
                                </tr>
                            </table>
                        </form>
                    </div>
                    <div className="container col-md-9 jenis p-3 d-none" id='shoeReceipt'>
                        <h4 className="mt-2">Request Receipt&nbsp;&nbsp;&nbsp;&nbsp;
                            <div class="spinner-border d-none" role="status" id='loadingReqShoe'>
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </h4>
                        <form onSubmit={reqShoe}>
                            <table className="container-fluid m-1">
                                <tr>
                                    <th className="col-md-2">Quantity</th>
                                    <td className="col-md-7"><input className='form-control' onChange={() => { calculateShoe() }} type='number' min='1' id="qty" name='qty' defaultValue='1'></input></td>
                                    <td className="col-md-3">Pair</td>
                                </tr>
                                <tr>
                                    <th>Type</th>
                                    <td>
                                        <select onChange={() => { calculateShoe() }} className="form-control" id='shoeType' name='type'>
                                            <option selected value="5">Regular</option>
                                            <option value="7">Deep Clean</option>
                                            <option value="6">White Shoe</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Estimated cost</th>
                                    <th>~</th>
                                    <th id="shoeCost">Rp24k</th>
                                </tr>
                                <tr>
                                    <th>Notes</th>
                                    <td><textarea className='form-control' rows='3' id='notes' name='notes'></textarea></td>
                                    <td className='text-muted'>Add a notes regarding your laundry</td>
                                </tr>
                                <tr>
                                    <th>Select Address</th>
                                    <td>
                                        <select className='form-control' id='selectShoeAddress' name='address'>
                                            <option>No Address Found</option>
                                        </select>
                                    </td>
                                    <td><button type='submit' className="btn btn-dark">Request Pickup</button></td>
                                </tr>
                            </table>
                        </form>
                    </div>
                    <div className="container col-md-9 jenis p-3 d-none" id='otherReceipt'>
                        <h4 className="mt-2">Other Receipt&nbsp;&nbsp;&nbsp;&nbsp;
                            <div class="spinner-border d-none" role="status" id='loadingReqOther'>
                                <span class="visually-hidden">Loading...</span>
                            </div>
                            <p className='text-muted'>Coming Soon</p>
                        </h4>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}