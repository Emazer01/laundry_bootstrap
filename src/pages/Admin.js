import * as React from 'react';
import { Util } from "../component/Util"
import brand from "../image/UnBI.png"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Admin = () => {
    const navigate = useNavigate()
    // Default user, ganti dengan data user yang didapat dari localstorage
    const [user, setUser] = React.useState({
        id: localStorage.getItem('id'),
        name: localStorage.getItem('user'),
        email: localStorage.getItem('email')
    })
    const [requeststate, setRequeststate] = React.useState({
        0: {
            cust_address: "Jl. Danau tigi",
            cust_name: "sekolah",
            cust_phone: "1249789237",
            mode_label: "Ironing Clothes",
            mode_type: 1,
            req_date: "2022-12-07T17:00:00.000Z",
            req_est_cost: "Rp22k",
            req_id: 5,
            req_unit: 2.25,
            stat_label: "Processing",
            user_id: 7
        }

    })

    const [orderstate, setOrderstate] = React.useState({
        0: {
            order_id: 4,
            order_date: "2022-12-13T17:00:00.000Z",
            order_bill: "Rp24k",
            order_unit: 1,
            order_cust: "gary ferdinand&nbsp;-&nbsp;0881026704385<br>Mess Kadet Mahasiswa",
            order_mode: "Regular Shoes",
            order_notes: "",
            stat_label: "On Process"
        }

    })

    // Modifikasi kode di bawah ini untuk mengambil data dari localstorage
    React.useEffect(() => {
        // 1. Ambil data user dari localstorage
        const user = localStorage.getItem('user');
        const id = localStorage.getItem('id');
        const email = localStorage.getItem('email');
        const token = localStorage.getItem('token');
        // 2. buat fungsi verifikasi token yang sama seperti di halaman home
        function verifikasi(user, token) {
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/verify`, {
                token: token
            })
                .then(function (response) {
                    console.log(response.data)
                    if (response.status == 200 && id == response.data.id) {
                        if (response.data.priv != 1) {
                            navigate('../profile')
                        }
                    } else {
                        navigate('../login')
                    }
                })
                .catch(function (error) {
                    navigate('../login')
                });
        }
        // panggil fungsi verifikasi token di bawah sini
        verifikasi(user, token)
        // 3. Lakukan setUser dengan data user yang didapat dari localstorage
        setUser({
            id: id,
            username: user,
            email: email
        })

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/requests`, {
            token: token,
            id: ''
        })
            .then(async function (response) {
                console.log(response)
                if (response.status == 200) {
                    const requests = response.data
                    console.log(requests)
                    setRequeststate(requests)
                    var list = `<tr>
                                <th>Req ID</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Laundry</th>
                                <th>Est. Price</th>
                                <th>Notes</th>
                                <th>Address</th>
                            </tr>`
                    var satuan = ''
                    for (let index = 0; index < requests.length; index++) {
                        if (requests[(requests.length - 1) - index].mode_type == 1) {
                            satuan = 'Kg'
                        } else if (requests[(requests.length - 1) - index].mode_type == 2) {
                            satuan = 'Pair'
                        }
                        const date = new Date(requests[(requests.length - 1) - index].req_date)
                        console.log(date.getMonth() + 1)
                        list +=
                            `<tr>
                            <td>${requests[(requests.length - 1) - index].req_id}</td>
                            <td>${String(date).slice(0, 15)}</td>
                            <td>${requests[(requests.length - 1) - index].stat_label}</td>
                            <td>${requests[(requests.length - 1) - index].req_unit}&nbsp;${satuan}<br/>${requests[(requests.length - 1) - index].mode_label}</td>
                            <td>${requests[(requests.length - 1) - index].req_est_cost}</td>
                            <td>${requests[(requests.length - 1) - index].req_notes}</td>
                            <td id='addr#${requests[(requests.length - 1) - index].req_id}'>${requests[(requests.length - 1) - index].cust_name}&nbsp;-&nbsp;${requests[(requests.length - 1) - index].cust_phone}<br/>${requests[(requests.length - 1) - index].cust_address}</td>
                            <td id='reqcancel#${requests[(requests.length - 1) - index].req_id}'><button class='btn btn-danger' id='reqcancel#${requests[(requests.length - 1) - index].req_id}'>Cancel</button></td>
                            <td id='reqpickup#${requests[(requests.length - 1) - index].req_id}'><button class='btn btn-secondary' id='reqpickup#${requests[(requests.length - 1) - index].req_id}'>Picked</button></td>
                            <td id='reqapprove#${requests[(requests.length - 1) - index].req_id}'><button class='btn btn-success' id='reqapprove#${requests[(requests.length - 1) - index].req_id}'>Approve</button></td>
                        </tr>`
                    }
                    if (requests.length < 1) {
                        list += `<p class='text-muted'>There aren't any Requests</p>`
                    }
                    document.getElementById("requestList").innerHTML = list
                    for (let index = 0; index < requests.length; index++) {
                        if (requests[index].stat_label != 'Pending') {
                            document.getElementById(`reqcancel#${requests[index].req_id}`).classList.add('d-none')
                            document.getElementById(`reqpickup#${requests[index].req_id}`).classList.add('d-none')
                        } else {
                            document.getElementById(`reqapprove#${requests[index].req_id}`).classList.add('d-none')
                        }
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

    function sleep(ms) {
        return new Promise(
            resolve => setTimeout(resolve, ms)
        );
    }

    const picked = (event) => {
        document.getElementById('loadingEdit').classList.remove('d-none')
        try {
            const token = localStorage.getItem('token');
            const req_id = event.srcElement.id.slice(10)
            console.log(req_id)
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/pickedrequest`, {
                token: token,
                req_id: req_id
            })
                .then(async function (response) {
                    console.log(response)
                    if (response.status == 200) {
                        document.getElementById('loadingEdit').classList.add('d-none')
                        console.log('berhasil')
                        document.getElementById('alertAsukses').classList.remove('d-none');
                        await sleep(2000);
                        document.getElementById('alertAsukses').classList.add('d-none')
                        window.location.reload()
                    } else {
                        console.log('tidak berhasil')
                        document.getElementById('loadingEdit').classList.add('d-none')
                        document.getElementById('alertAsalah').classList.remove('d-none');
                        await sleep(2000);
                        document.getElementById('alertAsalah').classList.add('d-none')
                    }
                })
                .catch(async function (error) {
                    console.log(error)
                    document.getElementById('loadingEdit').classList.add('d-none')
                    document.getElementById('alertAsalah').classList.remove('d-none');
                    await sleep(2000);
                    document.getElementById('alertAsalah').classList.add('d-none')
                });
        } catch (error) {
            console.log(error)
        }
    }

    const cancel = (event) => {
        document.getElementById('loadingEdit').classList.remove('d-none')
        try {
            const token = localStorage.getItem('token');
            const req_id = event.srcElement.id.slice(10)
            console.log(req_id)
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/deleterequest`, {
                token: token,
                req_id: req_id
            })
                .then(async function (response) {
                    console.log(response)
                    if (response.status == 200) {
                        document.getElementById('loadingEdit').classList.add('d-none')
                        console.log('berhasil')
                        document.getElementById('alertAsukses').classList.remove('d-none');
                        await sleep(2000);
                        document.getElementById('alertAsukses').classList.add('d-none')
                        window.location.reload()
                    } else {
                        console.log('tidak berhasil')
                        document.getElementById('loadingEdit').classList.add('d-none')
                        document.getElementById('alertAsalah').classList.remove('d-none');
                        await sleep(2000);
                        document.getElementById('alertAsalah').classList.add('d-none')
                    }
                })
                .catch(async function (error) {
                    console.log(error)
                    document.getElementById('loadingEdit').classList.add('d-none')
                    document.getElementById('alertAsalah').classList.remove('d-none');
                    await sleep(2000);
                    document.getElementById('alertAsalah').classList.add('d-none')
                });
        } catch (error) {
            console.log(error)
        }
    }

    const approve = (event) => {
        try {
            var reqA
            for (let index = 0; index < requeststate.length; index++) {
                if (requeststate[index].req_id == event.srcElement.id.slice(11)) {
                    reqA = requeststate[index]
                }
            }
            console.log(reqA)
            var satuan = 'Kg'
            document.getElementById('qty').step = '0.05'
            if (reqA['mode_type'] == 2) {
                satuan = 'Pair'
                document.getElementById('qty').step = '1'
            }
            document.getElementById('qty').value = reqA['req_unit']
            document.getElementById('satuan').innerHTML = satuan
            document.getElementById('type').innerHTML = reqA['mode_label']
            document.getElementById('plus').innerHTML = `+${reqA['plus_price']}k`
            document.getElementById('notes').innerHTML = reqA['req_notes']
            document.getElementById('cost').innerHTML = reqA['req_est_cost']
            document.getElementById('req_id_hidden').innerHTML = reqA['req_id']
            document.getElementById('user_id_hidden').innerHTML = reqA['user_id']
            document.getElementById('address').innerHTML = document.getElementById(`addr#${reqA['req_id']}`).innerHTML
            document.getElementById('approveReq').classList.remove('d-none')
            document.getElementById('requestsPage').classList.add('d-none')
        } catch (error) {
            console.log(error)
        }
    }

    for (let index = 0; index < requeststate.length; index++) {
        document.getElementById(`reqpickup#${requeststate[index].req_id}`).onclick = picked;
        document.getElementById(`reqcancel#${requeststate[index].req_id}`).onclick = cancel;
        document.getElementById(`reqapprove#${requeststate[index].req_id}`).onclick = approve;
    }

    const deliver = (event) => {
        document.getElementById('loadingOrder').classList.remove('d-none')
        try {
            var ordA
            console.log(event.srcElement.id.slice(8))
            for (let index = 0; index < orderstate.length; index++) {
                if (orderstate[index].order_id == event.srcElement.id.slice(8)) {
                    ordA = orderstate[index]
                }
            }
            console.log(ordA)
            const token = localStorage.getItem('token');
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/updateorder`, {
                token: token,
                order_id: ordA['order_id'],
                order_stat: 2
            })
                .then(async function (response) {
                    console.log(response)
                    if (response.status == 200) {
                        document.getElementById('loadingOrder').classList.add('d-none')
                        console.log('berhasil')
                        document.getElementById('alertBsukses').classList.remove('d-none');
                        await sleep(2000);
                        document.getElementById('alertBsukses').classList.add('d-none')
                        window.location.reload()
                    } else {
                        console.log('tidak berhasil')
                        document.getElementById('loadingOrder').classList.add('d-none')
                        document.getElementById('alertBsalah').classList.remove('d-none');
                        await sleep(2000);
                        document.getElementById('alertBsalah').classList.add('d-none')
                    }
                })
                .catch(async function (error) {
                    console.log(error)
                    document.getElementById('loadingOrder').classList.add('d-none')
                    document.getElementById('alertBsalah').classList.remove('d-none');
                    await sleep(2000);
                    document.getElementById('alertBsalah').classList.add('d-none')
                });
        } catch (error) {
            console.log(error)
        }
    }

    const complete = (event) => {
        document.getElementById('loadingOrder').classList.remove('d-none')
        try {
            var ordB
            console.log(event.srcElement.id.slice(9))
            for (let index = 0; index < orderstate.length; index++) {
                if (orderstate[index].order_id == event.srcElement.id.slice(9)) {
                    console.log(index)
                    ordB = orderstate[index]
                }
            }
            console.log(ordB)
            
            const token = localStorage.getItem('token');
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/updateorder`, {
                token: token,
                order_id: ordB['order_id'],
                order_stat: 3
            })
                .then(async function (response) {
                    console.log(response)
                    if (response.status == 200) {
                        document.getElementById('loadingOrder').classList.add('d-none')
                        console.log('berhasil')
                        document.getElementById('alertBsukses').classList.remove('d-none');
                        await sleep(2000);
                        document.getElementById('alertBsukses').classList.add('d-none')
                        window.location.reload()
                    } else {
                        console.log('tidak berhasil')
                        document.getElementById('loadingOrder').classList.add('d-none')
                        document.getElementById('alertBsalah').classList.remove('d-none');
                        await sleep(2000);
                        document.getElementById('alertBsalah').classList.add('d-none')
                    }
                })
                .catch(async function (error) {
                    console.log(error)
                    document.getElementById('loadingOrder').classList.add('d-none')
                    document.getElementById('alertBsalah').classList.remove('d-none');
                    await sleep(2000);
                    document.getElementById('alertBsalah').classList.add('d-none')
                });
        } catch (error) {
            console.log(error)
        }
        document.getElementById('loadingOrder').classList.add('d-none')
    }

    const toOrders = () => {
        document.getElementById('btn-requests').classList.remove('sideActive')
        document.getElementById('requestsPage').classList.add('d-none')
        document.getElementById('btn-orders').classList.add('sideActive')
        document.getElementById('ordersPage').classList.remove('d-none')
        document.getElementById('approveReq').classList.add('d-none')
        const token = localStorage.getItem('token');
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/orders`, {
            token: token,
            id: ''
        })
            .then(async function (response) {
                console.log(response)
                if (response.status == 200) {
                    const orders = response.data
                    console.log(orders)
                    setOrderstate(orders)
                    var list = `<tr>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Laundry</th>
                            <th>Price</th>
                            <th>Notes</th>
                            <th>Address</th>
                        </tr>`
                    var satuan = ''

                    for (let index = 0; index < orders.length; index++) {
                        const date = new Date(orders[(orders.length - 1) - index].order_date)
                        console.log(date.getMonth() + 1)
                        if (orders[(orders.length - 1) - index].order_mode.slice(-5) == 'Shoes') {
                            satuan = 'Pair'
                        } else if (orders[(orders.length - 1) - index].order_mode.slice(-7) == 'Clothes') {
                            satuan = 'Kg'
                        }
                        console.log(orders[(orders.length - 1) - index].order_mode.slice(-7))
                        list +=
                            `<tr>
                                <td>${orders[(orders.length - 1) - index].order_id}</td>
                                <td>${String(date).slice(0, 15)}</td>
                                <td><div class='text-light text-center p-1' id='status#${orders[(orders.length - 1) - index].order_id}'><i class="bi bi-circle-fill text-danger icon-stat"></i>&nbsp;<span>${orders[(orders.length - 1) - index].stat_label}</span></div></td>
                                <td>${orders[(orders.length - 1) - index].order_unit}&nbsp;${satuan}<br/>${orders[(orders.length - 1) - index].order_mode}</td>
                                <td>${orders[(orders.length - 1) - index].order_bill}</td>
                                <td>${orders[(orders.length - 1) - index].order_notes}</td>
                                <td>${orders[(orders.length - 1) - index].order_cust}</td>
                                <td id='deliver#${orders[(orders.length - 1) - index].order_id}'><button id='deliver#${orders[(orders.length - 1) - index].order_id}' class='btn btn-secondary'>Deliver</button></td>
                                <td id='complete#${orders[(orders.length - 1) - index].order_id}'><button id='complete#${orders[(orders.length - 1) - index].order_id}' class='btn btn-success'>Complete</button></td>
                            </tr>`
                    }
                    if (orders.length < 1) {
                        list += `<p class='text-muted'>There aren't any Requests</p>`
                    }
                    document.getElementById("orderList").innerHTML = list

                    for (let index = 0; index < orders.length; index++) {
                        if (orders[index].stat_label == 'On Delivery') {
                            document.getElementById(`deliver#${orders[index].order_id}`).classList.add('d-none')
                            document.getElementById(`status#${orders[index].order_id}`).classList.add('bg-warning')
                        } else if (orders[index].stat_label == 'On Process') {
                            document.getElementById(`complete#${orders[index].order_id}`).classList.add('d-none')
                            document.getElementById(`status#${orders[index].order_id}`).classList.add('bg-secondary')
                        } else if (orders[index].stat_label == 'Delivered'){
                            document.getElementById(`status#${orders[index].order_id}`).classList.add('bg-success')
                            document.getElementById(`deliver#${orders[index].order_id}`).classList.add('d-none')
                            document.getElementById(`complete#${orders[index].order_id}`).classList.add('d-none')
                        }

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
    }

    for (let index = 0; index < orderstate.length; index++) {
        document.getElementById(`deliver#${orderstate[index].order_id}`).onclick = deliver;
        document.getElementById(`complete#${orderstate[index].order_id}`).onclick = complete;
    }

    const toRequests = () => {
        document.getElementById('btn-requests').classList.add('sideActive')
        document.getElementById('requestsPage').classList.remove('d-none')
        document.getElementById('btn-orders').classList.remove('sideActive')
        document.getElementById('ordersPage').classList.add('d-none')
        document.getElementById('approveReq').classList.add('d-none')
    }

    const calculate = () => {
        const qty = document.getElementById('qty').value
        var cost = 0
        var plus = document.getElementById('plus').innerHTML.slice(1).slice(0, -1)
        if (document.getElementById('satuan').innerHTML == 'Kg') {
            cost = qty * (6 + Number(plus))
        } else if (document.getElementById('satuan').innerHTML == 'Pair') {
            cost = qty * (20 + Number(plus))
        }
        cost += 4
        document.getElementById('cost').innerHTML = `Rp${cost}k`
        console.log(cost)
    }

    const submitApprove = async (event) => {
        document.getElementById('loadingApprove').classList.remove('d-none')
        event.preventDefault();
        const token = localStorage.getItem('token');
        const data = new FormData(event.currentTarget);
        const qty = data.get('qty')
        const type = document.getElementById('type').innerHTML
        const cost = document.getElementById('cost').innerHTML
        const notes = document.getElementById('notes').innerHTML
        const address = document.getElementById('address').innerHTML
        const req_id = document.getElementById('req_id_hidden').innerHTML
        const user = document.getElementById('user_id_hidden').innerHTML
        console.log(qty, type, cost, notes, address, user)

        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/addorder`, {
            token: token,
            qty: qty,
            type: type,
            cost: cost,
            notes: notes,
            address: address,
            user: user
        })
            .then(async function (response) {
                console.log(response)
                if (response.status == 200) {
                    document.getElementById('loadingApprove').classList.add('d-none')
                    console.log('berhasil')
                    document.getElementById('alertCsukses').classList.remove('d-none');
                    await sleep(2000);
                    document.getElementById('alertCsukses').classList.add('d-none')
                } else {
                    console.log('tidak berhasil')
                    document.getElementById('loadingApprove').classList.add('d-none')
                    document.getElementById('alertCsalah').classList.remove('d-none');
                    await sleep(2000);
                    document.getElementById('alertCsalah').classList.add('d-none')
                }
            })
            .catch(async function (error) {
                console.log(error)
                document.getElementById('loadingApprove').classList.add('d-none')
                document.getElementById('alertCsalah').classList.remove('d-none');
                await sleep(2000);
                document.getElementById('alertCsalah').classList.add('d-none')
            });

        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/deleterequest`, {
            token: token,
            req_id: req_id
        })
            .then(async function (response) {
                console.log(response)
                if (response.status == 200) {
                    console.log('berhasil')
                    window.location.reload()
                } else {
                    console.log('tidak berhasil')
                }
            })
            .catch(async function (error) {
                console.log(error)
            });
    }

    return (
        <div>
            <header>
                <nav class="navbar navbar-expand-sm navbar-dark fixed-top bg-white border-bottom">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="/">
                            <img src={brand} alt="Avatar Logo" className="brand-logo" />
                        </a>
                        <a class="navlink" href="#"><h1>| Admin Dashboard</h1></a>
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
            <main id='admin'>
                <div className='row my-5'>
                    <div className='col-md-1'></div>
                    <div className='container col-md-2 mt-5 pt-3 side' id='asideList'>
                        <button className='btn sideActive' onClick={toRequests} id='btn-requests'><i class="bi bi-basket2-fill"></i><span className='ms-2'>Requests</span></button><br></br>
                        <button className='btn' onClick={toOrders} id='btn-orders'><i class="bi bi-bag-check-fill"></i><span className='ms-2'>Orders</span></button><br></br>
                    </div>
                    <div className='col-md-8 mt-5 pt-3 border border-dark rounded-1' id='requestsPage'>
                        <div className='row me-1 mb-3'>
                            <h4 className='col-md-10'>Requests</h4>
                            <div class="spinner-border d-none" role="status" id='loadingEdit'>
                                <span class="visually-hidden">Loading...</span>
                            </div>
                            <div class='alert alert-danger d-none' id='alertAsalah'>
                                <strong>Can't Update!</strong> Profile doesn't change.
                            </div>
                            <div class='alert alert-success d-none' id='alertAsukses'>
                                <strong>Success!</strong> Profile has been change.
                            </div>
                        </div>
                        <div className='col-md-12 container-fluid'>
                            <table className='container-fluid' id='requestList'>

                            </table>
                        </div>
                    </div>
                    <div className='col-md-8 mt-5 pt-3 border border-dark rounded-1 d-none' id='ordersPage'>
                        <div className='row me-1 mb-3'>
                            <h4 className='col-md-10'>Orders</h4>
                            <div class="spinner-border d-none" role="status" id='loadingOrder'>
                                <span class="visually-hidden">Loading...</span>
                            </div>
                            <div class='alert alert-danger d-none' id='alertBsalah'>
                                <strong>Can't Update!</strong> Status doesn't change.
                            </div>
                            <div class='alert alert-success d-none' id='alertBsukses'>
                                <strong>Success!</strong> Status has been change.
                            </div>
                        </div>
                        <div className='col-md-12 container-fluid'>
                            <table className='container-fluid' id='orderList'>

                            </table>
                        </div>
                    </div>
                    <div className='col-md-8 mt-5 pt-3 border border-dark rounded-1 d-none' id='approveReq'>
                        <div className='row me-1 mb-3'>
                            <h4 className='col-md-10'>Approve Request <span id='req_id_hidden'></span><span id='user_id_hidden'></span></h4>
                            <div class="spinner-border d-none" role="status" id='loadingApprove'>
                                <span class="visually-hidden">Loading...</span>
                            </div>
                            <div class='alert alert-danger d-none' id='alertCsalah'>
                                <strong>Can't Update!</strong> Order doesn't approved.
                            </div>
                            <div class='alert alert-success d-none' id='alertCsukses'>
                                <strong>Success!</strong> Order has been approved.
                            </div>
                        </div>
                        <div className='col-md-12 container-fluid'>
                            <form onSubmit={submitApprove}>
                                <table className="container-fluid m-1">
                                    <tr>
                                        <th className="col-md-2">Quantity</th>
                                        <td className="col-md-7"><input className='form-control' onChange={() => { calculate() }} type='number' step='0.05' min='1' id="qty" name='qty'></input></td>
                                        <td className="col-md-3" id='satuan'>Kg</td>
                                    </tr>
                                    <tr>
                                        <th>Type</th>
                                        <td id='type' name='type'></td>
                                        <td id='plus'></td>
                                    </tr>
                                    <tr>
                                        <th>Cost</th>
                                        <th>~</th>
                                        <th id="cost" name="cost">Rp10k</th>
                                    </tr>
                                    <tr>
                                        <th>Notes</th>
                                        <td id='notes' name='notes'></td>
                                        <td className='text-muted'>Laundry Notes</td>
                                    </tr>
                                    <tr>
                                        <th>Address</th>
                                        <td id='address' name='address'></td>
                                        <td><button type='submit' className="btn btn-success">Approve</button></td>
                                    </tr>
                                </table>
                            </form>
                        </div>
                    </div>
                    <div className='col-md-1'></div>
                </div>
            </main>
        </div>
    )
}