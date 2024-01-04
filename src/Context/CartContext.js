import React, {createContext, useContext, useState} from 'react'

const CartContext = createContext()

export const useCartContext = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider')
  }
  return context
}

export const CartProvider = ({children}) => {
  const [cartList, setCartList] = useState([])

  const removeAllCartItems = () => {
    setCartList([])
  }

  const addCartItem = item => {
    console.log('item', item)
    setCartList(prevCartList => {
      // Check if the item already exists in the cartList
      const existingItem = prevCartList.find(
        cartItem => cartItem.dishId === item.dishId,
      )

      console.log('existingItem', existingItem, item.dishId)

      if (existingItem) {
        // If the item exists, increment its quantity
        return prevCartList.map(cartItem =>
          cartItem.dishId === item.dishId
            ? {...cartItem, quantity: cartItem.quantity + item.quantity}
            : cartItem,
        )
      }
      return [...prevCartList, {...item, quantity: item.quantity}]
    })
  }

  const removeCartItem = itemId => {
    setCartList(prevCartList =>
      prevCartList.filter(item => item.dishId !== itemId),
    )
  }

  const incrementCartItemQuantity = itemId => {
    setCartList(prevCartList =>
      prevCartList.map(item =>
        item.dishId === itemId ? {...item, quantity: item.quantity + 1} : item,
      ),
    )
  }

  const decrementCartItemQuantity = itemId => {
    const existingItem = cartList.find(cartItem => cartItem.dishId === itemId)
    console.log('existingItem>>', existingItem)
    if (existingItem.quantity === 1) {
      removeCartItem(itemId)
    } else {
      setCartList(prevCartList =>
        prevCartList.map(item =>
          item.dishId === itemId && item.quantity > 1
            ? {...item, quantity: item.quantity - 1}
            : item,
        ),
      )
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartList,
        removeAllCartItems,
        addCartItem,
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartContext
