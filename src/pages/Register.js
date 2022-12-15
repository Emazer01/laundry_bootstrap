import { Util } from "../component/Util"
import brand from "../image/UnBI.png"
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

export const Register = () => {
    const navigate = useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const username = data.get('username')
        const password = data.get('pswd')
        const email = data.get('email')
        if (username!='' && password!='' && email!='') {
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`, {
              username: username,
              email   : email,
              password: password
            })
            .then(function (response) {
              if (response.data=='Data Berhasil Ditambahkan ke Database') {
                alert(response.data)
                navigate('../login')
              } else {
                alert('Register Gagal \n'.concat(response.data)) 
              }
            })
            .catch(function (error) {
              console.log(error);
              alert('Register Gagal / Data Kurang Lengkap')
            });
          } else {
            alert('Register Gagal / Data Kurang Lengkap')
          }
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
                                    <a class="navlink" href="#"><h1>| Register</h1></a>
                                </li>
                            </ul>
                            <Util />
                        </div>
                    </div>
                </nav>
            </header>
            <main className="mt-xl-5" id="login">
                <div class="container mt-3 col-md-4">
                    <h2 className="mt-5">Sign Up</h2>
                    <form onSubmit={handleSubmit} className="dark mb-3">
                        <div class="mb-3 mt-3">
                            <label for="username">Username:</label>
                            <input type="text" class="form-control" id="username" placeholder="Enter username" name="username"/>
                        </div>
                        <div class="mb-3">
                            <label for="email">Email:</label>
                            <input type="email" class="form-control" id="email" placeholder="Enter email" name="email"/>
                        </div>
                        <div class="mb-3">
                            <label for="pwd">Password:</label>
                            <input type="password" class="form-control" id="pwd" placeholder="Enter password" name="pswd"/>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                    <a href="/login">Already have an account? Sign In</a>
                </div>
            </main>
        </div>
    )
}