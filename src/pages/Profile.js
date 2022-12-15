import * as React from 'react';
import { Util } from "../component/Util"
import brand from "../image/UnBI.png"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { DetailPassword } from '../component/account/DetailPassword';
import { DetailAddress } from '../component/account/DetailAddress';
import { Footer } from '../component/Footer';
import { DetailRequests } from '../component/account/DetailRequests';
import { DetailOrders } from '../component/account/DetailOrders';

export const Profile = () => {
    const navigate = useNavigate()
    // State untuk mengecek apakah user sudah login atau belum
    const [isLogin, setIsLogin] = React.useState(false)

    // Default user, ganti dengan data user yang didapat dari localstorage
    const [user, setUser] = React.useState({
        id: localStorage.getItem('id'),
        name: localStorage.getItem('user'),
        email: localStorage.getItem('email')
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
                    if (response.status == 200 && id == response.data.id) {
                        if (response.data.priv == 1) {
                            document.getElementById('btn-admin').classList.remove('d-none')
                        }
                        setIsLogin(true)
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
    }, [])


    const handleSubmit = async (event) => {
        document.getElementById('loadingUpdate').classList.remove('d-none')
        event.preventDefault();
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');

        const data = new FormData(event.currentTarget);
        const username = data.get('username')
        const email = data.get('email')
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/updateprofile`, {
            token: token,
            id: id,
            user: username,
            email: email
        })
            .then(async function (response) {
                if (response.status == 200) {
                    document.getElementById('loadingUpdate').classList.add('d-none')
                    console.log("Logged In")
                    localStorage.setItem('user', username)
                    localStorage.setItem('email', email)
                    document.getElementById('alertsukses').classList.remove('d-none');
                    await sleep(2000);
                    document.getElementById('alertsukses').classList.add('d-none')
                    document.getElementById("submitChanges").classList.add('disabled')
                    setUser({
                        username: username,
                        email: email
                    })
                } else {
                    document.getElementById('loadingUpdate').classList.add('d-none')
                    document.getElementById('alertsalah').classList.remove('d-none');
                    await sleep(2000);
                    document.getElementById('alertsalah').classList.add('d-none')
                    document.getElementById("submitChanges").classList.add('disabled')
                }
            })
            .catch(async function (error) {
                document.getElementById('loadingUpdate').classList.add('d-none')
                document.getElementById('alertsalah').classList.remove('d-none');
                await sleep(2000);
                document.getElementById('alertsalah').classList.add('d-none')
                document.getElementById("submitChanges").classList.add('disabled')
            });

    }

    function sleep(ms) {
        return new Promise(
            resolve => setTimeout(resolve, ms)
        );
    }

    const removeSubmitDisabled = () => {
        document.getElementById("submitChanges").classList.remove('disabled')
    }

    const toPassword = () => {
        //password
        document.getElementById("btn-password").classList.add('sideActive')
        document.getElementById("detailPassword").classList.remove('d-none')
        //profile
        document.getElementById("btn-profile").classList.remove('sideActive')
        document.getElementById("detailProfile").classList.add('d-none')
        //address
        document.getElementById("btn-address").classList.remove('sideActive')
        document.getElementById("detailAddress").classList.add('d-none')
        //requests
        document.getElementById("btn-requests").classList.remove('sideActive')
        document.getElementById("detailRequests").classList.add('d-none')
        //orders
        document.getElementById("btn-orders").classList.remove('sideActive')
        document.getElementById("detailOrders").classList.add('d-none')
    }
    const toProfile = () => {
        //password
        document.getElementById("btn-password").classList.remove('sideActive')
        document.getElementById("detailPassword").classList.add('d-none')
        //profile
        document.getElementById("btn-profile").classList.add('sideActive')
        document.getElementById("detailProfile").classList.remove('d-none')
        //address
        document.getElementById("btn-address").classList.remove('sideActive')
        document.getElementById("detailAddress").classList.add('d-none')
        //requests
        document.getElementById("btn-requests").classList.remove('sideActive')
        document.getElementById("detailRequests").classList.add('d-none')
        //orders
        document.getElementById("btn-orders").classList.remove('sideActive')
        document.getElementById("detailOrders").classList.add('d-none')
    }
    const toAddress = () => {
        //password
        document.getElementById("btn-password").classList.remove('sideActive')
        document.getElementById("detailPassword").classList.add('d-none')
        //profile
        document.getElementById("btn-profile").classList.remove('sideActive')
        document.getElementById("detailProfile").classList.add('d-none')
        //address
        document.getElementById("btn-address").classList.add('sideActive')
        document.getElementById("detailAddress").classList.remove('d-none')
        document.getElementById('address').classList.remove('d-none')
        document.getElementById('editAddress').classList.add('d-none')
        document.getElementById('addAddress').classList.add('d-none')
        //requests
        document.getElementById("btn-requests").classList.remove('sideActive')
        document.getElementById("detailRequests").classList.add('d-none')
        //orders
        document.getElementById("btn-orders").classList.remove('sideActive')
        document.getElementById("detailOrders").classList.add('d-none')
    }
    const toRequests = () => {
        //password
        document.getElementById("btn-password").classList.remove('sideActive')
        document.getElementById("detailPassword").classList.add('d-none')
        //profile
        document.getElementById("btn-profile").classList.remove('sideActive')
        document.getElementById("detailProfile").classList.add('d-none')
        //address
        document.getElementById("btn-address").classList.remove('sideActive')
        document.getElementById("detailAddress").classList.add('d-none')
        //requests
        document.getElementById("btn-requests").classList.add('sideActive')
        document.getElementById("detailRequests").classList.remove('d-none')
        //orders
        document.getElementById("btn-orders").classList.remove('sideActive')
        document.getElementById("detailOrders").classList.add('d-none')
    }
    const toOrders = () => {
        //password
        document.getElementById("btn-password").classList.remove('sideActive')
        document.getElementById("detailPassword").classList.add('d-none')
        //profile
        document.getElementById("btn-profile").classList.remove('sideActive')
        document.getElementById("detailProfile").classList.add('d-none')
        //address
        document.getElementById("btn-address").classList.remove('sideActive')
        document.getElementById("detailAddress").classList.add('d-none')
        //requests
        document.getElementById("btn-requests").classList.remove('sideActive')
        document.getElementById("detailRequests").classList.add('d-none')
        //orders
        document.getElementById("btn-orders").classList.add('sideActive')
        document.getElementById("detailOrders").classList.remove('d-none')
    }

    console.log(user)

    return (
        <div>
            <header>
                <nav class="navbar navbar-expand-sm navbar-dark fixed-top bg-white border-bottom">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="/">
                            <img src={brand} alt="Avatar Logo" className="brand-logo" />
                        </a>
                        <a class="navlink" href="#"><h1>| Account</h1></a>
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
            <main id="profile">
                <h2 className="text-center" id='judul'>Hi, {user.username} </h2>
                <div className='text-center'><a href='/admin' className='btn d-none' id='btn-admin'>Admin Dashboard</a></div>
                <div className='row my-4'>
                    <div className='col-md-1'></div>
                    <div className='container col-md-2 mt-3 pt-3 side' id='asideList'>
                        <button onClick={() => { toProfile() }} className='btn sideActive' id='btn-profile'><i class="bi bi-person-fill"></i><span className='ms-2'>Profile</span></button><br></br>
                        <button onClick={() => { toAddress() }} className='btn' id='btn-address'><i class="bi bi-house-add-fill"></i><span className='ms-2'>Addresses</span></button><br></br>
                        <button onClick={() => { toPassword() }} className='btn' id='btn-password'><i class="bi bi-lock-fill"></i><span className='ms-2'>Password</span></button><br></br>
                        <button onClick={() => { toRequests() }} className='btn' id='btn-requests'><i class="bi bi-basket2-fill"></i><span className='ms-2'>Requests</span></button><br></br>
                        <button onClick={() => { toOrders() }} className='btn' id='btn-orders'><i class="bi bi-bag-check-fill"></i><span className='ms-2'>Orders</span></button><br></br>
                    </div>
                    <div className='container col-md-8 mt-3 pt-3 border border-dark rounded-1' id='detailProfile'>
                        <h4>Profile</h4>
                        <form onSubmit={handleSubmit} className="dark mb-3">
                            <table className='container m-auto mt-2' id='profileForm'>
                                <tr>
                                    <th className='col-md-3'>Username</th>
                                    <td><input type="text" onChange={() => { removeSubmitDisabled() }} class="form-control" id="username" placeholder="Enter username" name="username" defaultValue={user.username} /></td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td><input type="email" onChange={() => { removeSubmitDisabled() }} class="form-control" id="email" placeholder="Enter email" name="email" defaultValue={user.email} /></td>
                                </tr>
                                <tr>
                                    <th>Password</th>
                                    <td>************&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" onClick={() => { toPassword() }} class="btn btn-dark">Change Password</button></td>
                                </tr>
                            </table>
                            <tr>
                                <th>
                                    <button type="submit" class="btn btn-dark disabled" id='submitChanges'>Save Changes</button>
                                </th>
                                <td>
                                    <div class="spinner-border d-none" role="status" id='loadingUpdate'>
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                    <div class='alert alert-danger d-none' id='alertsalah'>
                                        <strong>Can't Update!</strong> Profile doesn't change.
                                    </div>
                                    <div class='alert alert-success d-none' id='alertsukses'>
                                        <strong>Success!</strong> Profile has been change.
                                    </div>
                                </td>
                            </tr>
                        </form>
                    </div>
                    <DetailAddress />
                    <DetailPassword />
                    <DetailRequests />
                    <DetailOrders />
                    <div className='col-md-1'></div>
                </div>
            </main>
            <Footer />
        </div>
    )
}