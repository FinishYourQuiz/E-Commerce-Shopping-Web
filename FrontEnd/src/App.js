import React from 'react';
import {Button, Dropdown, Menu, Icon} from 'semantic-ui-react';
class MenuAppBar extends React.Component{
  constructor(props){
    super(props);
  }

  render() {
    console.log(localStorage.getItem('token'))
    return (
      <div position="static">
        <Menu size="large"
          style={{
            background: 'linear-gradient(45deg, #774936 30%, #deab90 90%)',
            boxShadow: '0 3px 5px 2px #ced4da',
            color: 'white',
            height: 50,
            padding: '0 10px',
        }}>
        <Menu.Item className='icon' style={{color:'white', fontWeight:'bold', fontSize:'25px'}}> ForBest</Menu.Item>
          {localStorage.getItem('token') !== null && (
          <Menu.Menu position='right'>
            <span><Icon style={{margin: '14px'}} name='user' /></span>
            <Dropdown item text='Home' style={{ color : 'white', fontWeight: 'bold' }} >
                <Dropdown.Menu>
                  <Dropdown.Item href='/'>Home</Dropdown.Item>
                  <Dropdown.Item onClick={ () => {
                    localStorage.removeItem('token');
                    console.log(localStorage.getItem('token'));
                  }}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
          )}
          {localStorage.getItem('token') === null && (
            <Menu.Menu position='right'>
              <span><Icon style={{margin: '14px'}} name='user' /></span>
              <Dropdown item text='Home' style={{ color : 'white', fontWeight: 'bold' }} >
                  <Dropdown.Menu>
                    <Dropdown.Item href='/SignIn'>Log in</Dropdown.Item>
                    <Dropdown.Item href='/SignUp'>Register</Dropdown.Item>
                  </Dropdown.Menu>
              </Dropdown>
            </Menu.Menu>
          )}
        </Menu>
      </div>
    );
  }
}

export default MenuAppBar;