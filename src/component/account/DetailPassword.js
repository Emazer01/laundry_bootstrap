import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const DetailPassword = () => {
    const changePw = async (event) => {
        document.getElementById('loadingPw').classList.remove('d-none')
        event.preventDefault();
        const token = localStorage.getItem('token');

        const data = new FormData(event.currentTarget);
        const oldpw = data.get('oldpw')
        const newpw = data.get('newpw')
        const conpw = data.get('conpw')
        if (newpw != conpw) {
            document.getElementById('alertpwsalah').classList.remove('d-none')
            await sleep(2000);
            document.getElementById('alertpwsalah').classList.add('d-none')
            return
        }
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/changepw`, {
            token: token,
            oldpw: oldpw,
            newpw: newpw
        })
            .then(async function (response) {
                if (response.status == 200) {
                    document.getElementById('loadingPw').classList.add('d-none')
                    console.log("Logged In")
                    document.getElementById('alertpwsukses').classList.remove('d-none');
                    await sleep(2000);
                    document.getElementById('alertsukses').classList.add('d-none')
                    localStorage.clear()
                    window.location.reload()
                } else {
                    document.getElementById('loadingPw').classList.add('d-none')
                    document.getElementById('alertpwsalah').classList.remove('d-none')
                    await sleep(2000);
                    document.getElementById('alertpwsalah').classList.add('d-none')
                }
            })
            .catch(async function (error) {
                document.getElementById('loadingPw').classList.add('d-none')
                document.getElementById('alertpwsalah').classList.remove('d-none')
                await sleep(2000);
                document.getElementById('alertpwsalah').classList.add('d-none')
            });
    }

    const removeSubmitPwDisabled = () => {
        document.getElementById("submitPwChanges").classList.remove('disabled')
    }

    function sleep(ms) {
        return new Promise(
            resolve => setTimeout(resolve, ms)
        );
    }

    return (
        <div className='container col-md-8 mt-3 pt-3 border border-dark rounded-1 d-none' id='detailPassword'>
            <h4>Password</h4>
            <form onSubmit={changePw} className="dark mb-3">
                <table className='container m-auto mt-2' id='profileForm'>
                    <tr>
                        <th className='col-md-3'>Old Password</th>
                        <td><input type="password" onChange={() => { removeSubmitPwDisabled() }} class="form-control" id="oldpw" placeholder="Enter Old Password" name="oldpw" /></td>
                    </tr>
                    <tr>
                        <th>New Password</th>
                        <td><input type="password" onChange={() => { removeSubmitPwDisabled() }} class="form-control" id="newpw" placeholder="Enter New Password" name="newpw" /></td>
                    </tr>
                    <tr>
                        <th>Confirm Password</th>
                        <td><input type="password" onChange={() => { removeSubmitPwDisabled() }} class="form-control" id="conpw" placeholder="Confirm New Password" name="conpw" /></td>
                    </tr>
                </table>
                <tr>
                    <th>
                        <button type="submit" class="btn btn-dark disabled" id='submitPwChanges'>Save Changes</button>
                    </th>
                    <td>
                        <div class="spinner-border d-none" role="status" id='loadingPw'>
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <div class='alert alert-danger d-none' id='alertpwsalah'>
                            <strong>Wrong Password!</strong> Password doesn't change.
                        </div>
                        <div class='alert alert-success d-none' id='alertpwsukses'>
                            <strong>Success!</strong> Profile has been change.
                        </div>
                    </td>
                </tr>
            </form>
        </div>
    )
}