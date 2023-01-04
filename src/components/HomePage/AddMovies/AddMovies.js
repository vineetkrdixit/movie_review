import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import "../../components/Login/Login.css"
import axios from "axios"
export default function Login() {


    const fileInputRef = React.useRef();
    const [file, setFile] = useState();
    const [movieName, setMovieName] = useState();
    const [movieDetail, setMoveDetail] = useState();
    const [profilImage, setProfileImage] = useState(
        "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
      );

    const navigate = useNavigate();

  
console.log("poster",file)

    const imgHandler = (e) => {
        const file = e.target.files[0];
        setFile(file);
      };
    const handleName = (e) => {
        console.log("email handler");
        setMovieName(e.target.value);
    };
    const handleDetail = (e) => {
        setMoveDetail(e.target.value);
    };

      const handleAddMovie = (e) => {
        e.preventDefault();
        let data = {
          movieName: movieName,
          movieDetail: movieDetail,
          poster:file

        };
        axios.post("http://localhost:3004/addmovie", data).then((res) => {
          console.log({ res });
          alert(res.data)
        })
      };
    return (
        <>
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Movie Name</label>
                        <input type="email" class="form-control" id="exampleFormControlInput1" onChange={handleName} />
                    </div>
                    <div class="mb-3">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Poster</label>
                        <input
                        type="file"
                        name="imgFile"
                        id="imgFile"
                        className="form-control-file hide-element"
                        ref={fileInputRef}
                        onChange={imgHandler}
                        // onClick={triggerFileSelector}
                      />
                    </div>
                    <div class="mb-3">
                        <label for="inputPassword" class="col-sm-2 col-form-label">Detail</label>
                        <div class="col-sm-12">
                        <textarea class="form-control" aria-label="With textarea" onChange={handleDetail}></textarea>
                        </div>
                    </div>
                   
                    <button type="button" class="btn btn-success " onClick={handleAddMovie}>Add Movie</button>
                </div>
            </div>
        </>
    )
}
