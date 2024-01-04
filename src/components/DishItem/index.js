import './index.css'

import {useState, useEffect} from 'react'

import {useCartContext} from '../../Context/CartContext'

const DishItem = props => {
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

  console.log('cartList', cartList)

  const onIncDishCount = dishId => {
    setDishCounts(prevCounts => ({
      ...prevCounts,
      [dishId]: (prevCounts[dishId] || 0) + 1,
    }))
  }

  const onDecDishCount = dishId => {
    setDishCounts(prevCounts => ({
      ...prevCounts,
      [dishId]: prevCounts[dishId] - 1,
    }))
  }

  return (
    <div>
      {result.map(e =>
        e.map(a =>
          a.map(b => (
            <div className="item-card" key={b.dishId}>
              <div className="text">
                <h1>{b.dishName}</h1>
                <p>
                  {b.dishCurrency} {b.dishPrice}
                </p>
                <p>{b.dishDescriprion}</p>
                {b.dishAvailability ? (
                  <div className="buttons">
                    <button
                      className="button"
                      onClick={() => {
                        if (dishCounts[b.dishId] > 0) {
                          console.log('Here')
                          onDecDishCount(b.dishId)
                        }
                      }}
                    >
                      -
                    </button>
                    <p>{dishCounts[b.dishId] || 0}</p>
                    <button
                      className="button"
                      onClick={() => onIncDishCount(b.dishId)}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <p>Not Available</p>
                )}
                {dishCounts[b.dishId] > 0 && (
                  <button
                    type="button"
                    className="add-cart"
                    onClick={() => {
                      addCartItem({...b, quantity: dishCounts[b.dishId]})
                    }}
                  >
                    ADD TO CART
                  </button>
                )}
                {b.addOnCat.length > 0 && <p>Customizations available</p>}
              </div>
              <p>{b.dishCalories} Calories</p>
              <img src={b.dishImage} alt="dish" className="item-image" />
            </div>
          )),
        ),
      )}
    </div>
  )
}

export default DishItem
