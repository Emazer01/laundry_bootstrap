import axios from 'axios';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

export const DetailOrders = () => {
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

    function sleep(ms) {
        return new Promise(
            resolve => setTimeout(resolve, ms)
        );
    }

    React.useEffect(() => {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id')
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/orders`, {
            token: token,
            id: id
        })
            .then(async function (response) {
                if (response.status == 200) {
                    const orders = response.data
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
                        if (orders[(orders.length - 1) - index].order_mode.slice(-5) == 'Shoes') {
                            satuan = 'Pair'
                        } else if (orders[(orders.length - 1) - index].order_mode.slice(-7) == 'Clothes') {
                            satuan = 'Kg'
                        }
                        list +=
                            `<tr>
                                <td>${orders[(orders.length - 1) - index].order_id}</td>
                                <td>${String(date).slice(0, 15)}</td>
                                <td><div class='text-light text-center p-1' id='status#${orders[(orders.length - 1) - index].order_id}'><i class="bi bi-circle-fill text-danger icon-stat"></i>&nbsp;<span>${orders[(orders.length - 1) - index].stat_label}</span></div></td>
                                <td>${orders[(orders.length - 1) - index].order_unit}&nbsp;${satuan}<br/>${orders[(orders.length - 1) - index].order_mode}</td>
                                <td>${orders[(orders.length - 1) - index].order_bill}</td>
                                <td>${orders[(orders.length - 1) - index].order_notes}</td>
                                <td>${orders[(orders.length - 1) - index].order_cust}</td>
                                <td id='complete#${orders[(orders.length - 1) - index].order_id}'><button id='complete#${orders[(orders.length - 1) - index].order_id}' class='btn btn-success'>Complete</button></td>
                            </tr>`
                    }
                    if (orders.length < 1) {
                        list += `<p class='text-muted'>There aren't any Orders</p>`
                    }
                    document.getElementById("orderList").innerHTML = list

                    for (let index = 0; index < orders.length; index++) {
                        if (orders[index].stat_label == 'On Delivery') {
                            document.getElementById(`status#${orders[index].order_id}`).classList.add('bg-warning')
                        } else if (orders[index].stat_label == 'On Process') {
                            document.getElementById(`status#${orders[index].order_id}`).classList.add('bg-secondary')
                        } else if (orders[index].stat_label == 'Delivered') {
                            document.getElementById(`status#${orders[index].order_id}`).classList.add('bg-success')
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
    }, [])

    
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

            const token = localStorage.getItem('token');
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/updateorder`, {
                token: token,
                order_id: ordB['order_id'],
                order_stat: 3
            })
                .then(async function (response) {
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

    for (let index = 0; index < orderstate.length; index++) {
        document.getElementById(`complete#${orderstate[index].order_id}`).onclick = complete;
    }

    return (
        <div className='container col-md-8 mt-3 pt-3 border border-dark rounded-1 d-none' id='detailOrders'>
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
            <div className='col-md-12'>
                <table className='container-fluid' id='orderList'>

                </table>
            </div>
        </div>
    )
}