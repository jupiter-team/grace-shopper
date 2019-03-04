import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {logout} from '../store'

export const Carousel = () => {
  return (
    <div id="home-carousel" className="carousel slide" data-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            className="d-block w-100"
            src="https://cdn.shopify.com/s/files/1/0041/3842/t/16/assets/slideshow_3.jpg?18280894639576543473"
            alt="First slide"
          />
        </div>

        <div className="carousel-item active">
          <img
            className="d-block w-100"
            src="https://cdn.shopify.com/s/files/1/0041/3842/t/16/assets/slideshow_3.jpg?18280894639576543473"
            alt="Second slide"
          />
        </div>
      </div>
    </div>
  )
}
