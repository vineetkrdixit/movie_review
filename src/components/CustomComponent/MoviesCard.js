import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import "../CustomComponent/MovieCard.css"
import Image from "../../assets/i.webp"
import { useNavigate } from 'react-router-dom';

export default function MovieCard(props) {

  const navigate = useNavigate();

  console.log(props,"=")
  return (
props?.allMoviesData?.map((item)=>{
  const handleClick=(item)=>{
    navigate("/addReview", { state: item })
  }
return(
  <>

 <div className='card'>
 <div>
    Image
  </div>
  <h2>{item.movieName}</h2>
  <div className='cardDetail'>
  <h6>{item.movieDetail}</h6>
  </div>
  <button type="button" class="btn btn-success "  onClick={()=>handleClick(item)}>Add Review</button>
 </div>
</>
)
})
  
  );
}