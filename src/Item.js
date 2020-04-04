import React from 'react'


/**
 * @param {item} param0 the item to be displayed
 * @param {handleClick} param1 callback reference to the function be invoked when onClick event is triggered
 */
const Item = ({ item, handleClick }) => {
  return (
      <img src={item.img_src} alt={item.id} onClick={() => handleClick(item)}/>
    )
}

export default Item
