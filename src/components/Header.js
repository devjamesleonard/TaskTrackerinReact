//import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
//use location from reactrouter dom lets us see the location and for example change the header

const Header = ({title, onAdd,showAdd}) => {
    const onClick = onAdd
  return (
    
    <div>
        <header className="header">

        <h1 > {title}</h1>  
        <Button color={showAdd ? 'Red' : 'Green'} text={showAdd ? 'Close' : 'Add'} onClick={onClick}/>
        </header>

    </div>
  )
}
//style={{color:'white'} can also create a styling constant
Header.defaultProps = {
    title: 'Task Tracker',
}
Header.propTypes = {
  title: PropTypes.string,  
}
export default Header
