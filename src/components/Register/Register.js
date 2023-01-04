import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import "../../components/Login/Login.css"
import axios from "axios"
import { Alert } from '@mui/material';

export default function Register() {


    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const[phoneNo,setPhoneNo]=useState()

    const navigate = useNavigate();

    const handleEmail = (e) => {
        console.log("email handler");
        setEmail(e.target.value);
      };
      const handlePassword = (e) => {
        setPassword(e.target.value);
      };
      const handlePhoneNo = (e) => {
        setPhoneNo(e.target.value);
      };


      const handleRegister = (e) => {
        e.preventDefault();
        let data = {
          email: email,
          password: password,
          phoneNo:phoneNo
        };
        axios.post("http://localhost:3004/adminregister", data).then((res) => {
          console.log({ res });
        //   Alert("user registered successfully")
          alert(res.data);
          navigate("/sign-in")
        })
      };
    


    return (
        <>
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleFormControlInput1"  onChange={handleEmail} />
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Phone No</label>
                        <input type="email" class="form-control" id="exampleFormControlInput1"  onChange={handlePhoneNo} />
                    </div>
                    <div class="mb-3">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
                        <div class="col-sm-12">
                            <input type="password" class="form-control" id="inputPassword"  onChange={handlePassword} />
                        </div>
                    </div>
                    <div className="d-grid">

                    </div>
                    <button type="button" class="btn btn-success "  onClick={handleRegister}>Register</button>
                </div>
            </div>

        </>
    )
}