import React from 'react'
import { useLocation } from 'react-router-dom'
import ReviewStars from '../reviewStar/ReviewStar';
import axios from "axios"

export default function UserView() {

    const[name,setName]=React.useState()
    const[email,setEmail]=React.useState()
    const[review,setReview]=React.useState()
    let itemData= useLocation();

    console.log("-----------",itemData)


    const handleName = (e) => {
        console.log("email handler");
        setName(e.target.value);
    };
    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleReview = (e) => {
        setReview(e.target.value);
    };

      const handleAddReview = (e) => {
        e.preventDefault();
        let data = {
          name: name,
          email: email,
          review:review,
          id:itemData?.state?._id


        };
        axios.post("http://localhost:3004/addReview", data).then((res) => {
          console.log({ res });
          alert(res.data)
        })
      };

  return (
    <div>
        <div>
            <h5>image</h5>
        </div>
        <div>
            <h2>{itemData?.state?.movieName}</h2>
        </div>
        <div>
            <h5>{itemData?.state?.movieDetail}</h5>
        </div>
        Give Review
        <div>
      <div className="container w-50">
        <h3 className="mb-5 mt-3">Feedback</h3>
        <form>
          <div className="mb-3">
            <label for="exampleInputName" className="form-label">
              Name :
            </label>
            <input type="text" className="form-control" id="exampleInputName" onChange={handleName} />
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Email :
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={handleEmail}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputFeedback" className="form-label">
              Review :
            </label>
            <textarea
              type="text"
              className="form-control"
              id="exampleInputFeedback"
              onChange={handleReview}
            ></textarea>
          </div>
          <ReviewStars />


          <button type="submit" className="btn btn-primary mt-5 mb-3" onClick={handleAddReview}>
            Submit
          </button>
        </form>
      </div>
        </div>
    </div>
  )
}
