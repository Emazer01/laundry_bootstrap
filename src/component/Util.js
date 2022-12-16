import * as React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import SettingsIcon from '@mui/icons-material/Settings';

export const Util = () => {
    const userUtil = localStorage.getItem("user")
    React.useEffect(() => {
        if (userUtil!=null) {
            document.getElementById('btn-logout').classList.remove('d-none')
        }
    }, [])

    const logout = () => {
        localStorage.clear()
        window.location.reload()
    }

    return(
            <div className="util navbar-collapse justify-content-end">
                <a href='/profile' data-bs-toggle="tooltip" data-bs-placement="bottom" title="Account">
                    <PersonIcon sx={{ fontSize:30}}/><span className='ms-2' id='username'>{userUtil}</span>
                </a>
                <button onClick={logout} className='btn btn-dark me-2 d-none' id='btn-logout'>Logout</button>
                <a href='/' data-bs-toggle="tooltip" data-bs-placement="bottom" title="Setting">
                    <SettingsIcon sx={{ fontSize:30}}/>
                </a>
                <a className='fill text-decoration-none' href='/request' data-bs-toggle="tooltip" data-bs-placement="bottom" title="Laundry Bag">
                    <ShoppingBasketIcon sx={{ fontSize:30}}/>
                    <span className='ps-2'>Fill Your Laundry Bag Now!</span>   
                </a>
            </div>
    )
}