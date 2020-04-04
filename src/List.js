import React from 'react'
import Item from './Item'


/**
 * @param {object} param0 List of items to be displayed and the reference to the handler callback to be invoked for each item
 */
const List = ({items, setActivePhotoHandler}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        maxHeight: 400,
      }}
    >
      {items.map((item, index) => <Item key={index} item={item} handleClick={setActivePhotoHandler} />)}
    </div>
  )
}

export default List
