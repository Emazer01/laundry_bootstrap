import axios from 'axios';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

export const DetailAddress = () => {
    const navigate = useNavigate()
    const [alamatstate, setAlamatstate] = React.useState({
        0: {
            cust_address: "Jalan",
            cust_id: 0,
            cust_name: "nama",
            cust_phone: "123",
            user_id: 6
        }
    })

    React.useEffect(() => {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');
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
                            `<button class='btn alamat container-fluid mb-2 text-start' id=${alamat[index].cust_id} >
                            <strong>${alamat[index].cust_name}</strong>&nbsp;&nbsp;-&nbsp;&nbsp;<span>${alamat[index].cust_phone}</span><br>
                            ${alamat[index].cust_address}
                        </button>`
                    }
                    if (list == ``) {
                        list = `<p class='text-muted'>Belum ada Alamat</p>`
                    }
                    document.getElementById("addressList").innerHTML = list

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


    const editAddress = (event) => {
        try {
            var yangmaudiedit
            for (let index = 0; index < alamatstate.length; index++) {
                if (alamatstate[index].cust_id == event.srcElement.id) {
                    yangmaudiedit = alamatstate[index]
                }

            }
            document.getElementById('cust_id').innerHTML = yangmaudiedit['cust_id']
            document.getElementById('cust_name').defaultValue = yangmaudiedit['cust_name']
            document.getElementById('cust_phone').defaultValue = yangmaudiedit['cust_phone']
            document.getElementById('cust_address').defaultValue = yangmaudiedit['cust_address']

            document.getElementById('address').classList.add('d-none')
            document.getElementById('editAddress').classList.remove('d-none')
        } catch (error) {
            console.log(error)
        }
    }


    for (let index = 0; index < alamatstate.length; index++) {
        document.getElementById(alamatstate[index].cust_id).onclick = editAddress;
    }


    const handleSubmit = async (event) => {
        document.getElementById('loadingEdit').classList.remove('d-none')
        event.preventDefault();
        const token = localStorage.getItem('token');

        const data = new FormData(event.currentTarget);
        const id = document.getElementById('cust_id').innerHTML
        const name = data.get('cust_name')
        const phone = data.get('cust_phone')
        const address = data.get('cust_address')
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/updateaddress`, {
            token: token,
            cust_id: id,
            cust_name: name,
            cust_phone: phone,
            cust_address: address
        })
            .then(async function (response) {
                if (response.status == 200) {
                    document.getElementById('loadingEdit').classList.add('d-none')
                    console.log('berhasil')
                    document.getElementById('alertAsukses').classList.remove('d-none');
                    await sleep(2000);
                    document.getElementById('alertAsukses').classList.add('d-none')
                    document.getElementById("submitAddressChanges").classList.add('disabled')
                    document.getElementById('address').classList.remove('d-none')
                    document.getElementById('editAddress').classList.add('d-none')
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

        console.log("lanjuutt")

    }

    function sleep(ms) {
        return new Promise(
            resolve => setTimeout(resolve, ms)
        );
    }

    const removeSubmitDisabled = () => {
        document.getElementById("submitAddressChanges").classList.remove('disabled')
    }
    const removeSubmitAddressDisabled = () => {
        document.getElementById("submitAddAddress").classList.remove('disabled')
    }

    const add = () => {
        document.getElementById('address').classList.add('d-none')
        document.getElementById('addAddress').classList.remove('d-none')
    }
    const addAddress = async (event) => {
        document.getElementById('loadingAdd').classList.remove('d-none')
        event.preventDefault();
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');

        const data = new FormData(event.currentTarget);
        const name = data.get('cust_name')
        const phone = data.get('cust_phone')
        const address = data.get('cust_address')
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/addaddress`, {
            token: token,
            user_id: id,
            cust_name: name,
            cust_phone: phone,
            cust_address: address
        })
            .then(async function (response) {
                if (response.status == 200) {
                    document.getElementById('loadingAdd').classList.add('d-none')
                    console.log('berhasil')
                    document.getElementById('alertBsukses').classList.remove('d-none');
                    await sleep(2000);
                    document.getElementById('alertBsukses').classList.add('d-none')
                    document.getElementById("submitAddressChanges").classList.add('disabled')
                    document.getElementById('address').classList.remove('d-none')
                    document.getElementById('addAddress').classList.add('d-none')
                } else {
                    console.log('tidak berhasil')
                    document.getElementById('loadingAdd').classList.add('d-none')
                    document.getElementById('alertBsalah').classList.remove('d-none');
                    await sleep(2000);
                    document.getElementById('alertBsalah').classList.add('d-none')
                }
            })
            .catch(async function (error) {
                console.log(error)
                document.getElementById('loadingAdd').classList.add('d-none')
                document.getElementById('alertBsalah').classList.remove('d-none');
                await sleep(2000);
                document.getElementById('alertBsalah').classList.add('d-none')
            });
    }
    const deleteAddress = async () => {
        document.getElementById('loadingEdit').classList.remove('d-none')
        console.log(document.getElementById('cust_id').innerHTML)
        const token = localStorage.getItem('token');
        const cust_id = document.getElementById('cust_id').innerHTML
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/deleteaddress`, {
            token: token,
            cust_id: cust_id
        })
            .then(async function (response) {
                if (response.status == 200) {
                    document.getElementById('loadingEdit').classList.add('d-none')
                    console.log('berhasil')
                    document.getElementById('alertAsukses').classList.remove('d-none');
                    await sleep(2000);
                    document.getElementById('alertAsukses').classList.add('d-none')
                    document.getElementById('address').classList.remove('d-none')
                    document.getElementById('editAddress').classList.add('d-none')
                    //window.location.reload()
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

    }

    return (
        <div className='container col-md-8 mt-3 pt-3 border border-dark rounded-1 d-none' id='detailAddress'>
            <div id='address'>
                <div className='row me-1 mb-3'>
                    <h4 className='col-md-10'>Addresses</h4>
                    <button onClick={() => { add() }} className='btn btn-dark col-md-2'>+ Add</button>
                </div>
                <div className='col-md-12' id='addressList'></div>
            </div>
            <div id='editAddress' className='d-none'>
                <div className='row me-1 mb-3'>
                    <h4 className='col-md-10'>Edit Address</h4>
                    <form onSubmit={handleSubmit} className="dark mb-3">
                        <table className='container m-auto mt-2' id='profileForm'>
                            <tr>
                                <th>Customer ID</th>
                                <td id="cust_id"></td>
                            </tr>
                            <tr>
                                <th>Name</th>
                                <td><input type="text" onChange={() => { removeSubmitDisabled() }} class="form-control" id="cust_name" placeholder="Enter name" name="cust_name" /></td>
                            </tr>
                            <tr>
                                <th>Phone</th>
                                <td><input type="text" onChange={() => { removeSubmitDisabled() }} class="form-control" id="cust_phone" placeholder="Enter phone" name="cust_phone" /></td>
                            </tr>
                            <tr>
                                <th>Address</th>
                                <td><textarea onChange={() => { removeSubmitDisabled() }} class="form-control" id="cust_address" placeholder="Enter address" name="cust_address" rows='3' /></td>
                            </tr>
                        </table>
                        <tr>
                            <th>
                                <button type="submit" class="btn btn-dark disabled" id='submitAddressChanges'>Save Changes</button>
                            </th>
                            <td>
                                <div class="spinner-border d-none" role="status" id='loadingEdit'>
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                                <div class='alert alert-danger d-none' id='alertAsalah'>
                                    <strong>Can't Update!</strong> Profile doesn't change.
                                </div>
                                <div class='alert alert-success d-none' id='alertAsukses'>
                                    <strong>Success!</strong> Profile has been change.
                                </div>
                            </td>
                        </tr>
                    </form>
                    <tr>
                        <th>
                            <button onClick={deleteAddress} className='btn btn-danger'>Delete Address&nbsp;&nbsp;
                                <i class="bi bi-trash3-fill"></i>
                            </button>
                        </th>
                    </tr>

                </div>
            </div>
            <div id='addAddress' className='d-none'>
                <div className='row me-1 mb-3'>
                    <h4 className='col-md-10'>Add Address</h4>
                    <form onSubmit={addAddress} className="dark mb-3">
                        <table className='container m-auto mt-2' id='profileForm'>
                            <tr>
                                <th>Name</th>
                                <td><input type="text" onChange={() => { removeSubmitAddressDisabled() }} class="form-control" id="add_cust_name" placeholder="Enter name" name="cust_name" /></td>
                            </tr>
                            <tr>
                                <th>Phone</th>
                                <td><input type="text" onChange={() => { removeSubmitAddressDisabled() }} class="form-control" id="add_cust_phone" placeholder="Enter phone" name="cust_phone" /></td>
                            </tr>
                            <tr>
                                <th>Address</th>
                                <td><textarea onChange={() => { removeSubmitAddressDisabled() }} class="form-control" id="add_cust_address" placeholder="Enter address" name="cust_address" rows='3' /></td>
                            </tr>
                        </table>
                        <tr>
                            <th>
                                <button type="submit" class="btn btn-dark disabled" id='submitAddAddress'>Save</button>
                            </th>
                            <td>
                                <div class="spinner-border d-none" role="status" id='loadingAdd'>
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                                <div class='alert alert-danger d-none' id='alertBsalah'>
                                    <strong>Can't Save!</strong> Address hasn't saved.
                                </div>
                                <div class='alert alert-success d-none' id='alertBsukses'>
                                    <strong>Success!</strong> Address have been saved.
                                </div>
                            </td>
                        </tr>
                    </form>
                </div>
            </div>
        </div>
    )
}