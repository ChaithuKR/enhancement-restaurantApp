import './index.css'
import Cookies from 'js-cookie'
import {Link, useHistory} from 'react-router-dom'
import {useState, useEffect} from 'react'

import {useCartContext} from '../../Context/CartContext'

const Header = () => {
  const [itemsList, setItemList] = useState([])
  const [initial, setInitial] = useState('Salads and Soup')

  const history = useHistory()

  const {
    cartList,
    removeAllCartItems,
    addCartItem,
    removeCartItem,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
  } = useCartContext()

  useEffect(() => {
    const getData = async () => {
      const apiUrl =
        'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
      const response = await fetch(apiUrl)
      const data = await response.json()
      const updatedData = data.map(each => ({
        branchName: each.branch_name,
        nextUrl: each.nexturl,
        restaurantId: each.restaurant_id,
        restaurantImage: each.restaurant_image,
        restaurantName: each.restaurant_name,
        tableId: each.table_id,
        tableMenuList: each.table_menu_list.map(menu => ({
          categoryDishes: menu.category_dishes.map(dish => ({
            addOnCat: dish.addonCat,
            dishAvailability: dish.dish_Availability,
            dishType: dish.dish_Type,
            dishCalories: dish.dish_calories,
            dishCurrency: dish.dish_currency,
            dishDescriprion: dish.dish_description,
            dishId: dish.dish_id,
            dishImage: dish.dish_image,
            dishName: dish.dish_name,
            dishPrice: dish.dish_price,
            nextUrl: dish.nexturl,
          })),
          menuCategory: menu.menu_category,
          menuCategoryId: menu.menu_category_id,
          menuCategoryImage: menu.menu_category_image,
          nextUrl: menu.nexturl,
        })),
        tableName: each.table_name,
      }))
      setItemList(updatedData)
      console.log(updatedData)
    }
    getData()
  }, [])

  return (
    <nav className="bar">
      {itemsList.map(e => (
        <h1>
          <Link to="/">{e.restaurantName}</Link>
        </h1>
      ))}
      <ul className="header">
        <p>My Orders</p>
        <button type="button">
          <Link to="/cart">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
              alt="nav cart"
              className="cart-icon"
            />
            {cartList.length}
          </Link>
        </button>
        <button
          type="button"
          onClick={() => {
            Cookies.remove('jwt_token')
            history.push('/login')
          }}
        >
          Logout
        </button>
      </ul>
    </nav>
  )
}

export default Header
