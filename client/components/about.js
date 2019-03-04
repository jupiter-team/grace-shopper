import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const About = () => {
  const styles = {
    width: '700px'
  }

  return (
    <div className="container">
      <img
        className="img-fluid"
        alt="Responsive image"
        src="http://urbancreativi-tea.com/wp-content/uploads/2017/03/2017-03-13_0012.jpg"
      />
      <br />
      <br />

      <div className="mx-auto" style={styles}>
        <p />
        <p />
        <p>
          <h1 className="text-center">Our Story</h1>
        </p>
      </div>

      <div className="mx-auto" style={styles}>
        <p className="about">
          Sugar plum gummies cake brownie croissant topping marzipan danish
          lemon drops. Lemon drops dragée apple pie muffin lemon drops toffee
          tootsie roll pie cake. Muffin gingerbread icing powder jelly-o cookie.
          Apple pie cupcake bear claw cake. Dessert candy lollipop liquorice
          cheesecake. Donut gummies caramels bonbon muffin dragée cake.
        </p>
        <p className="about">
          Chupa chups cake cake jelly beans chocolate bar tart croissant. Jelly
          beans pudding ice cream macaroon fruitcake. Liquorice sweet jelly-o
          sugar plum sugar plum carrot cake muffin. Donut tiramisu cake candy.
          Pudding oat cake muffin tootsie roll cake chocolate bar. Sweet roll
          jelly sugar plum lemon drops dessert jelly-o wafer marzipan ice cream.
          Sugar plum sweet chocolate bar icing icing carrot cake tart fruitcake
          donut. Jujubes chocolate bar cake powder sugar plum cake pastry
          soufflé. Danish biscuit bear claw bear claw jelly dragée. Fruitcake
          bear claw gummi bears chupa chups gummies oat cake donut biscuit
          marshmallow.
        </p>
      </div>
    </div>
  )
}

export default About
