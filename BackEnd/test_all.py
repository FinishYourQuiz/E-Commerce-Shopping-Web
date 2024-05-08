import pytest
import error
from user import *

def test_all():
    
    # the user list is empty
    with pytest.raises(error.NoUserError) as e:
        user_login("empty@email.com", "1q2q3e4r")
       
    # successful test
    user_dic = user_register('username', 'password', 'test', 'user')


    # wrong email
    with pytest.raises(error.NoUserError) as e:
        user_login("wrong@email.com", "1q2w3e4r")

    # wrong password
    with pytest.raises(error.WrongPasswordError) as e:
        user_login('username', 'wrongpassword')

    #login and get token
    login_dic = user_login('a@qq.com', 'a')
    token = login_dic['token']
    assert token
    #add product for test
    pid_a =  addproduct(token,'a',1,'aa','aa')
    pid_b =  addproduct(token,'b',1,'bb','bb')
    
  
    cart = get_cart(token)
    user = get_user(token)
    assert cart['u_id'] == user['u_id']
    assert not get_all_products(cart)
   
    # test add to cart
    add_to_cart(token,pid_a, 1)
    add_to_cart(token,pid_b, 2)
    with pytest.raises(error.NonexistingProductError) as e:
        add_to_cart(token, 'wrongpid',1)
    assert get_all_products(cart)
    #delete product a, if delete quantity > current quantity, it will be same as delete qu = current qu
    delete_from_cart(token,pid_a,10)
    #delete product a again when there is no product a in cart
    with pytest.raises(error.NoProductinCartError) as e:
        delete_from_cart(token,pid_a,1)
    #delete product b one by one
    delete_from_cart(token,pid_b,1)
    #empty cart now
    delete_from_cart(token,pid_b,1)
    assert not get_all_products(cart)


    # test checkout
    # the history will be empty at first
    assert not get_history(token)
    with pytest.raises(error.EmptyCartError) as e:
        checkout(token)

    # add product and checkout
    add_to_cart(token,pid_a, 1)
    add_to_cart(token,pid_b, 2)
    with pytest.raises(error.NoAddressError) as e:
        checkout(token)
    change_address(token, 'address')
    checkout(token)
    assert get_history(token)
   