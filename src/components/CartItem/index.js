import './index.css'

import {useState, useEffect} from 'react'

import {useCartContext} from '../../Context/CartContext'

const CartItem = props => {
  const {result} = props
  const [dishCounts, setDishCounts] = useState({})

  const {
    cartList,
    removeAllCartItems,
    addCartItem,
    removeCartItem,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
  } = useCartContext()

  console.log('cartList', cartList.length)

  return (
    <div>
      {cartList.length > 0 && (
        <button className="remove-all" onClick={() => removeAllCartItems()}>
          Remove All
        </button>
      )}
      {result.map(b => (
        <div className="item-card" key={b.dishId}>
          <div className="text">
            <h1>{b.dishName}</h1>
            <p>
              {b.dishCurrency} {b.dishPrice}
            </p>
            <p>{b.dishDescriprion}</p>
            <div className="buttons">
              <button
                className="button"
                onClick={() => decrementCartItemQuantity(b.dishId)}
              >
                -
              </button>
              <p>{b.quantity}</p>
              <button
                className="button"
                onClick={() => incrementCartItemQuantity(b.dishId)}
              >
                +
              </button>
            </div>
            <button
              type="button"
              className="add-cart"
              onClick={() => {
                removeCartItem(b.dishId)
              }}
            >
              Remove
            </button>
            <p className="price">Price: {b.dishPrice * b.quantity}$</p>
          </div>
          <p>{b.dishCalories} Calories</p>
          <img src={b.dishImage} alt="dish" className="item-image" />
        </div>
      ))}
    </div>
  )
}

export default CartItem
