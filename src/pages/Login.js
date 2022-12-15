import { Util } from "../component/Util"
import brand from "../image/UnBI.png"
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

export const Login = () => {
    const navigate = useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const email = data.get('email')
        const password = data.get('pswd')
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
            email: email,
            password: password,
        })
            .then(function (response) {
                if (response.data == 'Password Salah' || response.data == 'Email Tidak Valid') {
                    document.getElementById("alertobj").style.backgroundColor = "#790252"
                } else {
                    localStorage.setItem('user', response.data.username)
                    localStorage.setItem('id', response.data.id)
                    localStorage.setItem('email', response.data.email)
                    localStorage.setItem('token', response.data.token)
                    navigate('../profile')
                }
            })
            .catch(function (error) {
                document.getElementById("alertobj").style.backgroundColor = "#790252"
                console.log(error);
            });
    }
    const fresh = () => {
        document.getElementById("alertobj").style.backgroundColor = "white"
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
                                <li>
                                    <a class="navlink" href="#"><h1>| Login</h1></a>
                                </li>
                            </ul>
                            <Util />
                        </div>
                    </div>
                </nav>
            </header>
            <main className="mt-xl-5" id="login">
                <div className="container col-md-4">
                    <div class='alert mt-5' id='alertobj'>
                        <strong>Login Failed!</strong> Wrong Credentials.
                    </div>
                </div>
                <div class="container mt-3 col-md-4">
                    <h2>Sign In</h2>
                    <form onSubmit={handleSubmit} className="dark mb-3">
                        <div class="mb-3 mt-3">
                            <label for="email">Email:</label>
                            <input type="email" onChange={()=>{fresh()}} class="form-control" id="email" placeholder="Enter email" name="email" />
                        </div>
                        <div class="mb-3">
                            <label for="pwd">Password:</label>
                            <input type="password" class="form-control" id="pwd" placeholder="Enter password" name="pswd" />
                        </div>
                        <button type="submit" class="btn btn-dark">Submit</button>
                    </form>
                    <a href="/register">Don't have an account? Sign Up</a>
                </div>
            </main>
        </div>
    )
}