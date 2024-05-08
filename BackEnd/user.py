# useful package

import hashlib
import uuid
import jwt
import error
import numbers
import time


u_id_temp = uuid.uuid4().int >> 80
# local data
data = {
    'users': [
        {
            'u_id': u_id_temp,
            'token': jwt.encode({'u_id': u_id_temp}, 'activate', algorithm='HS256'),
            'name_first': 'a',
            'name_last': 'a',
            'email': 'a@qq.com',
            'password': hashlib.sha256('a'.encode("utf8")).hexdigest(),
            # 'age': age, use for next stage
            'is_admin': True,
            # normal user is False
            #'is_login': False,
        }
    ],
    'products':[
        
    ],
    'orders':[

    ],
    'carts':[

    ],
    'category':{

    }
}



def user_register (email, password, name_first, name_last):
    for user in data['users']:
        if email == user['email']:
            raise error.EmailTakenError("Email already used")
    # use uuid get random
    u_id = uuid.uuid4().int >> 80
    # get token from uid
    token = jwt.encode({'u_id': u_id}, 'activate', algorithm='HS256')
    # for some reason this breaks stuff on windows have to remove the  to run on windows
    password = hashlib.sha256(password.encode("utf8")).hexdigest()
    new_user = {
        'u_id': u_id,
        'token': token,
        'name_first': name_first,
        'name_last': name_last,
        'email': email,
        'password': password,
        'is_admin': False,
        #'is_login': 0,
        }
    data['users'].append(new_user)
    return {
        'u_id': u_id,
        'token': token,
    }

'''
def register_admin(email, password, name_first, name_last):
    for user in data['users']:
        if email == user['email']:
            raise error.EmailTakenError("Email already used")
        if user['is_admin'] == True:
            raise error.MultipleAdminError("only 1 admin")
    # use uuid get random
    u_id = uuid.uuid4().int >> 80
    # get token from uid
    token = jwt.encode({'u_id': u_id}, 'activate', algorithm='HS256')
    #for some reason this breaks stuff on windows have to remove the  to run on windows
    password = hashlib.sha256(password.encode("utf8")).hexdigest()
    new_user = {
        'u_id': u_id,
        'token': token,
        'name_first': name_first,
        'name_last': name_last,
        'email': email,
        'password': password,
        # 'age': age, use for next stage
        'is_admin': True,
        # normal user is False
        'is_login': 0,
        }
    data['users'].append(new_user)
    return {
        'u_id': u_id,
        'token': token,
    }
'''

def user_login(email, password):
    #print(email)
    #print(password)
    u_id = -1
    password = hashlib.sha256(password.encode("utf8")).hexdigest()
    for user in data['users']:
        if user['email'] == email:
            # Check email
            if user['password'] == password:
                #if not user['is_login']:
                    u_id = user['u_id']
                    #user['is_login'] = True
                    token = user['token']
                    return {'u_id': u_id, 'token': token}
                #raise error.AlreadyLoginError("Already Login")
            raise error.WrongPasswordError("Password Incorrect")
    raise error.NoUserError("Email entered does not belong to a user")

def admin_login(email, password):
    u_id = -1
    password = hashlib.sha256(password.encode("utf8")).hexdigest()
    for user in data['users']:
        # Check email
        if user['email'] == email and user['is_admin']:
            if user['password'] == password:
                #if not user['is_login']:
                    u_id = user['u_id']
                    #user['is_login'] = True
                    token = user['token']
                    return {'u_id': u_id,'token': token}
                #raise error.AlreadyLoginError("Already Login")
            raise error.WrongPasswordError("Password Incorrect")
    raise error.NoUserError("Email entered does not belong to admin")


def user_logout(token):
    is_logout = False
    for user in data['users']:
        if user['token'] == token:
            #user['is_login'] = False
            is_logout = True
    return is_logout

def is_admin(token):
    for user in data['users']:
        if token == user['token']:
            if user['is_admin']:
                return True
    return False

#attaches a category(String input) and will fetch or create a tag(aka categories) 
#can be used in addProduct <- no idea what front end can give me
def attach_categoryS(pid,category):
    tags = data['category'].get(category)
    if not tags:
        data['category'][category]=[]
        data['category'][category].append(pid)
    else :
        data['category'][category].append(pid)
    return True

def detach_categoryS(pid,category):
    data['category'][category].remove(pid)
    return True

# add new product with given details
# if success, return code = 0 and pid = product id
# if price is not number, code = 1
# if price <0 , code = 2
def addproduct(token,name,price,desc,images,categories):
    for user in data['users']:
        if user['is_admin'] == True:
            if token == user['token']:
                break
            else :
                raise error.PrivilegeError("only admin can add product")
    if not isinstance(price, numbers.Number):
        raise error.WrongInputError("wrong input for product details")
        return 0
    elif price<0:
        raise error.WrongInputError("wrong input for product details")
        return 0
    p_id = uuid.uuid4().int >> 88
    new_product = {
        'p_id': p_id,
        'name': name,
        'price': price,
        'desc': desc,
        'image': images,
        'category': categories
    }
    data['products'].append(new_product)
    for category in categories:
        attach_categoryS(p_id,category)
    return p_id


# return a product with a given p_id
# return None if this product is not found
def getproduct(p_id):
    for product in data['products']:
        if product['p_id']==p_id:
            return product
    return None



def chat_bot(pid, input):
    product = getproduct(pid)
    if not product:
        return "Sorry, there is some error with this product."
    result = 'Here are the details you ask for the product: ' + product['name'] + '\n'
    price = 'price: ' + str(product['price']) + '\n'
    desc = 'descrption: ' + product ['desc']+ '\n'
    category = 'category: '+ ','.join(product['category']) +'\n'
    found = 0
    if 'price' in input:
        result = result + price
        found = 1 
    if 'desc' in input:
        result = result + desc
        found = 1 
    if 'category' in input:
        result = result + category
        found = 1 
    if not found:
        return "Sorry, please input key words like price, desc or category."
    result = result + 'Thank you for ask me, have a good day!'
    return result



#delete a product with given pid
# return true or false
def deleteproduct(token, p_id):
    for user in data['users']:
        if user['is_admin']:
            if token == user['token']:
                break
            else :
                raise error.PrivilegeError("only admin can delete product")
    product = getproduct(p_id)
    if not product:
        return False
    for category in product['category']:
        detach_categoryS(p_id, category)
    data['products'].remove(product)
    return True

def getproductlist():
    return data['products']

def updateproduct(token,p_id, name,price,desc,image,categories):
    for user in data['users']:
        if user['is_admin'] == True:
            if token == user['token']:
                break
            else :
                raise error.PrivilegeError("only admin can modify product")

    found = 0
    for product in data['products']:
        if product['p_id']==p_id:
            found = 1
            data['products'].remove(product)

    if found == 0:
        raise error.NonexistingProductError("Pid not in data")

    if not isinstance(price, numbers.Number):
        raise error.WrongInputError("wrong input for product details")
    elif price<0:
        raise error.WrongInputError("wrong input for product details")
    new_product = {
    'p_id': p_id,
    'name': name,
    'price': price,
    'desc': desc,
    'image': image,
    'category': categories
    }
    for category in categories:
        attach_categoryS(p_id,category)
    data['products'].append(new_product)

    return p_id
    
#category functions

#returns dictionary list of tags(aka categories)
def listCategories():
    return list(data['category'].keys())


#return all products in a given category
def getcategory(category):
    result = []
    for pid in data['category'][category]:
        product = getproduct(pid)
        result.append(product)
    return result




'''
Overall logic:
    Cart for every user = 1 current cart(not checkout, opencart= True) 
    + n history cart (has been checkout, opencart = False)
    1. When user first add a product in to cart,
    the current cart with address('None') will be created
    2. After that, if user add product or remove product, it will only affects the current cart
    3. Every cart may contain n orders, order = pid + quantity
       same product will merge automatically in one cart
       for example, add 1 product A * 3 will get an order with 3 product A, not 3 orders 
       delete product will be the same as add, when quantity <= 0 for an order, 
       the total order will be deleted from the cart
    4.  Before checkout
        There are two conditions 
        1. The cart can't be empty(at least 1 order)
        2. The address can't be 'None'(default address),  must add an address
        using change_address()
    5. Checkout
        If user checkout successfully, the current cart changes to history cart,
        there will be no current cart, it will jump to step 1.
    get_all_products(cart) return all products(orders) in given cart
    get_history(token) return all history cart for given user
'''




def get_user(token):
    for user in data['users']:
        if token == user['token']:
            return user
    raise error.InvalidTokenError('invalid token')

# create a cart for user with an address
def create_cart(token, address):
    user = get_user(token)
    cart_id = uuid.uuid4().int >> 88
    for cart in data['carts']:
        if cart['u_id'] == user['u_id'] and cart['open']:
            raise error.DoubleCartError('You can not create a new cart before you checkout')
    new_cart = {
        'id': cart_id,
        'u_id': user['u_id'],
        'open': True,
        'address': address,
        'status': -1,
        'time': time.ctime() 
    }
    data['carts'].append(new_cart)
    return new_cart

# get current cart for a user, if no,  create a cart with address 'None'
def get_cart(token):
    user = get_user(token)
    for cart in data['carts']:
        if cart['u_id'] == user['u_id'] and cart['open']:
            return cart
    cart = create_cart(token, 'None')
    return cart

# change the address of current cart for user
def change_address(token,newaddress):
    cart = get_cart(token)
    cart['address'] = newaddress

# create a order in given cart with pid and quantity
def create_order(cart, pid, quantity):
    product = getproduct(pid)
    if not product:
        raise error.NonexistingProductError("Pid not in data")
    o_id = uuid.uuid4().int >> 88
    new_order = {
        'id': o_id,
        'c_id': cart['id'],
        'p_id': pid,
        'quantity': quantity,
    }
    data['orders'].append(new_order)
    return new_order

#check if there exists product in the cart
def product_exist_in_cart(cart,pid):
    for order in data['orders']:
        if order['c_id'] == cart['id'] and order['p_id'] == pid:
            return order
    return None


# add a product to a user's cart
def add_to_cart(token, pid, quantity):
    cart = get_cart(token)
    order = product_exist_in_cart(cart, pid)
    if order:
        quantity = order['quantity'] + quantity
        order['quantity'] = quantity
    else:
        create_order(cart,pid,quantity)
    return cart

# return all products in a given cart
def get_all_products(cart):
    result = []
    totalprice = 0
    for order in data['orders']:
        if order['c_id'] == cart['id']:
            product = getproduct(order['p_id'])
            if not product:
                raise error.NonexistingProductError("Pid not in data")
            res = {
                'p_id': product['p_id'],
                'name': product['name'],
                'price': product['price'],
                'image': product['image'],
                'desc': product['desc'],
                'c_id': order['c_id'],
                'id': order['id'],
                'quantity': order['quantity'],
            }
            totalprice = totalprice + product['price'] * order['quantity']
            result.append(res)
    cart_info = {
                'orders': result,
                'c_id': cart['id'],
                'status': cart['status'],   
                'time': cart['time'],
                'address': cart['address'], 
                'totalprice': totalprice          
            }
    return cart_info

# delete product from cart
def delete_from_cart(token, pid, quantity):
    cart = get_cart(token)
    order = product_exist_in_cart(cart,pid)
    if not order:
        raise error.NoProductinCartError('Your cart does not have this type of product hence you can not remove it')
    quantity = order['quantity'] - quantity
    if quantity > 0:
        order['quantity'] = quantity
    else:
        data['orders'].remove(order)

# checkout for a given user
def check_out(token):
    cart = get_cart(token)
    if not get_all_products(cart):
        raise error.EmptyCartError('Your cart is empty hence you cannot checkout')
    if cart['address'] == 'None':
        raise error.NoAddressError('No address for your cart, please enter an address for your cart')
    cart['open'] = False
    cart['time'] = time.ctime()
    cart['status'] = 0

# get history for given user (not include current cart )
def get_history(token):
    result = []
    user = get_user(token)
    for cart in data['carts']:
        if user['is_admin'] and not cart['open']:
            result.append(cart)
        elif cart['u_id'] == user['u_id'] and not cart['open']:
            result.append(cart)
    return result

def get_address(token):
    cart = get_cart(token)
    return cart['address']
    
def change_status(token, c_id, status):
    if not is_admin(token):
        raise error.PrivilegeError("only admin can change status")
    for cart in data['carts']:
        if cart['id'] == c_id:
            cart['status'] = status
            return True
    return False


def get_current_order(token):
    result = []
    if not is_admin(token):
        raise error.PrivilegeError("only admin can get order")
    for cart in data['carts']:
        if cart['status'] < 3 and cart['status'] > -1:
            result.append(cart)
    return result


def get_past_order(token):
    result = []
    if not is_admin(token):
        raise error.PrivilegeError("only admin can get order")
    for cart in data['carts']:
        if cart['status'] == 3:
            result.append(cart)
    return result




