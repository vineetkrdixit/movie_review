import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import "../../components/Login/Login.css"
import axios from "axios"
export default function Login() {


    
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate();

    const handleEmail = (e) => {
        console.log("email handler");
        setEmail(e.target.value);
      };
      const handlePassword = (e) => {
        setPassword(e.target.value);
      };
    


      const handleLogin = (e) => {
        e.preventDefault();
        let data = {
          email: email,
          password: password,
        };
        console.log("login called");
        axios.post("http://localhost:3004/login", data).then((res) => {
          console.log({ res });
         if( res.data === "Invalid User"){
           alert("Invalid User")
          } else {
            sessionStorage.setItem("userId", res.data.result._id);
            sessionStorage.setItem("userEmail", res.data.result.email);
            // props.onLogin({
            //   isLoggedIn: true,
            //   userDetails: res.data.result,
            // });
            if (res.data.result) {
              navigate("/dashboard");
            } else {
            alert("No match found")
            }
          }
        })
      };
    
    
    return (
        <>
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleFormControlInput1" onChange={handleEmail} />
                    </div>
                    <div class="mb-3">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
                        <div class="col-sm-12">
                            <input type="password" class="form-control" id="inputPassword" onChange={handlePassword} />
                        </div>
                    </div>
                    <div className="d-grid">

                    </div>
                    <button type="button" class="btn btn-success " onClick={handleLogin}>Login</button>
                </div>
            </div>

        </>
    )
}
