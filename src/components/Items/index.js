import './index.css'

const Items = props => {
  const {data, setCategoryD} = props
  const {menuCategory} = data
  const onSetItem = () => {
    setCategoryD(menuCategory)
  }

  return (
    <li>
      <button type="button" onClick={onSetItem} className="item">
        {menuCategory}
      </button>
    </li>
  )
}

export default Items
