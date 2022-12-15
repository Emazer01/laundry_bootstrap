import axios from 'axios';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

export const DetailRequests = () => {
    const [requeststate, setRequeststate] = React.useState()

    React.useEffect(() => {
        const token = localStorage.getItem('token')
        const id = localStorage.getItem('id')
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/requests`, {
            token: token,
            id: id
        })
            .then(async function (response) {
                if (response.status == 200) {
                    const requests = response.data
                    setRequeststate(requests)
                    var list = `<tr>
                                <th>Req ID</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Laundry</th>
                                <th>Est. Price</th>
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
                        list +=
                            `<tr>
                            <td>${requests[(requests.length - 1) - index].req_id}</td>
                            <td>${String(date).slice(0,15)}</td>
                            <td>${requests[(requests.length - 1) - index].stat_label}</td>
                            <td>${requests[(requests.length - 1) - index].req_unit}&nbsp;${satuan}<br/>${requests[(requests.length - 1) - index].mode_label}</td>
                            <td>${requests[(requests.length - 1) - index].req_est_cost}</td>
                            <td>${requests[(requests.length - 1) - index].cust_name}&nbsp;-&nbsp;${requests[(requests.length - 1) - index].cust_phone}<br/>${requests[(requests.length - 1) - index].cust_address}</td>
                            <td><button class='btn btn-danger' id='req#${requests[(requests.length - 1) - index].req_id}'>Cancel</button></td>
                        </tr>`
                    }
                    if (requests.length < 1) {
                        list += `<p class='text-muted'>There aren't any Requests</p>`
                    }
                    document.getElementById("requestList").innerHTML = list
                    for (let index = 0; index < requests.length; index++) {
                        if (requests[index].stat_label != 'Pending') {
                            document.getElementById(`req#${requests[index].req_id}`).classList.add('disabled')
                        }
                        document.getElementById(`req#${requests[index].req_id}`).onclick = cancel;
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

    const cancel = (event) => {
        document.getElementById('loadingEdit').classList.remove('d-none')
        try {
            const token = localStorage.getItem('token');
            const req_id = event.srcElement.id.slice(4)
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/deleterequest`, {
                token: token,
                req_id: req_id
            })
                .then(async function (response) {
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

    return (
        <div className='container col-md-8 mt-3 pt-3 border border-dark rounded-1 d-none' id='detailRequests'>
            <div className='row me-1 mb-3'>
                <h4 className='col-md-10'>Requests</h4>
                <a href='/request' className='btn btn-dark col-md-2'>+ Add</a>
            </div>
            <div className='col-md-12'>
                <table className='container-fluid' id='requestList'>

                </table>
            </div>
        </div>
    )
}