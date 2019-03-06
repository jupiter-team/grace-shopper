import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {logout} from '../store'

// const Carousel = () => {
//   return (
//     <div id="home-carousel" className="carousel slide" data-ride="carousel">
//       <div className="carousel-inner">
//         <div className="carousel-item active">
//           <img
//             className="d-block w-100"
//             src="https://cdn.shopify.com/s/files/1/0041/3842/t/16/assets/slideshow_3.jpg?18280894639576543473"
//             alt="First slide"
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Carousel

const Carousel = () => {
  return (
    <div id="home-carousel" className="carousel slide" data-ride="carousel">
      <ul className="carousel-indicators">
        <li data-target="#home-carousel" data-slide-to="0" className="active" />
        <li data-target="#home-carousel" data-slide-to="1" />
        <li data-target="#home-carousel" data-slide-to="2" />
      </ul>

      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="https://cdn.shopify.com/s/files/1/0041/3842/t/16/assets/slideshow_3.jpg?18280894639576543473"
            alt="Los Angeles"
            width="1100"
            height="500"
          />
        </div>

        <div className="carousel-item">
          <img
            src="https://cdn.shopify.com/s/files/1/0041/3842/t/16/assets/slideshow_5.jpg?15742007899622074986"
            alt="Chicago"
            width="1100"
            height="500"
          />
        </div>

        <div className="carousel-item">
          <img
            src="https://cdn.shopify.com/s/files/1/0041/3842/t/16/assets/slideshow_3.jpg?18280894639576543473"
            alt="New York"
            width="1100"
            height="500"
          />
        </div>
      </div>

      <a
        className="carousel-control-prev"
        href="#home-carousel"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" />
      </a>

      <a
        className="carousel-control-next"
        href="#home-carousel"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" />
      </a>
    </div>
  )
}

export default Carousel
