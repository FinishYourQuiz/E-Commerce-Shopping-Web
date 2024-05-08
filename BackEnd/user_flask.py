from json import dumps
from flask_cors import CORS
from flask import Flask, request
from user import *


#from flask_sqlalchemy import SQLAlchemy
#from sqlalchemy import Boolean

def defaultHandler(err):
    response = err.get_response()
    print('response', err, err.get_response())
    response.data = dumps({
        "code": err.code,
        "name": "System Error",
        "message": err.get_description(),
    })
    response.content_type = 'application/json'
    return response

APP = Flask(__name__)
CORS(APP)

APP.config['TRAP_HTTP_EXCEPTIONS'] = True
APP.register_error_handler(Exception, defaultHandler)

@APP.route("/login", methods=['POST'])
def login():
    """ return u_id and token"""
    info = request.get_json()
    r = user_login(info["email"], info["password"])
    return dumps(r)


@APP.route("/logout", methods=['POST'])
def logout():
    """ return true and flase"""
    info = request.get_json()
    r = user_logout(info["token"])
    return dumps(r)


@APP.route("/register", methods=['POST'])
def register():
    """ return u_id and token"""
    info = request.get_json()
    r = user_register(info["email"], info["password"], info["name_first"], info["name_last"])
    return dumps(r)

@APP.route("/admin_login", methods=['POST'])
def adminLogin():
    """ return u_id and token"""
    info = request.get_json()
    r = admin_login(info["email"], info["password"])
    return dumps(r)

#product stuff
# categories: list of strings
@APP.route("/addProduct", methods=['POST','PUT'])
def addProduct():
    info = request.get_json()
    r = addproduct(info["token"],info["name"],info["price"],info["desc"],info["image"],info["categories"])
    return dumps(r)

@APP.route("/getProduct", methods=['POST'])
def getOne():
    """ return product dict if pid exists or none if pid missing"""
    info = request.get_json()
    r = getproduct(info["p_id"])
    return dumps(r)

@APP.route("/deleteProduct", methods=['DELETE'])
def deleteProduct():
    """ return True if deletion successful or false"""
    info = request.get_json()
    r = deleteproduct(info["token"],info["p_id"])
    return dumps(r)

@APP.route("/getProductList", methods=['GET'])
def allProduct():
    """ just fetches list of products could be empty"""
    request.get_json()
    r = getproductlist()
    return dumps(r)

@APP.route("/modifyProduct", methods=['POST'])
def modifyProduct():
    """ just fetches list of products could be empty"""
    info = request.get_json()
    r = updateproduct(info["token"],info["p_id"],info["name"],info["price"],info["desc"],info["image"],info["categories"])
    return dumps(r)

# return all categories name, (list of strings)
@APP.route("/getallcategory", methods=['POST'])
def get_all_category():
    request.get_json()
    r = listCategories()
    return dumps(r)



# return all products in given category , list of products(dict) 
@APP.route("/getcategory", methods=['POST'])
def get_category():
    info = request.get_json()
    r = getcategory(info['category'])
    return dumps(r)

# attach product with category, need admin
@APP.route("/attachcategory", methods=['POST'])
def attach_category():
    info = request.get_json()
    if not is_admin(info['token']):
        raise error.PrivilegeError("only admin can do this")
    r = attach_categoryS(info['pid'],info['category'])
    return dumps(r)


# Chatbot, get pid and input(string), return string
@APP.route("/chat", methods=['POST'])
def chatbot():
    info = request.get_json()
    r = chat_bot(info['pid'],info['input'])
    return dumps(r)



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

# following route is the sample route for order and cart part
# need to modify to connect with frontend

# change the address of the user, using token and new address
# return value need to be decide (Don't need return value, no exception means success)
@APP.route("/changeAddress", methods=['POST'])
def changeAddress():
    info = request.get_json()
    r = change_address(info['token'], info['address'])
    return dumps(r)

# return all products and their quantity in the current cart
# return list of orders
''' new_order = {
        'id': o_id,
        'c_id': cart['id'],
        'p_id': pid,
        'quantity': quantity,
    }'''
@APP.route("/cart", methods=['POST'])
def cart():
    info = request.get_json()
    cart = get_cart(info['token'])
    r = get_all_products(cart)
    return dumps(r)

# add and delete given products to the cart
# return value need to be decide (Don't need return value, no exception means success)
@APP.route("/addToCart", methods=['POST'])
def addToCart():
    info = request.get_json()
    r = add_to_cart(info['token'], info['pid'], info['quantity'])
    return dumps(r)

@APP.route("/deleteFromCart", methods=['POST'])
def deleteFromCart():
    info = request.get_json()
    r = delete_from_cart(info['token'], info['pid'], info['quantity'])
    return dumps(r)

# This is the function for checkout,(move the current cart to history)
# return value need to be decide (Don't need return value, no exception means success)
@APP.route("/checkout", methods=['POST'])
def checkout():
    info = request.get_json()
    r = check_out(info['token'])
    return dumps(r)


# This is the route to get history, it will return a list of carts(history)
# The return value is a list of value in route /cart
@APP.route("/getHistory", methods=['POST'])
def getHistory():
    info = request.get_json()
    carts = get_history(info['token'])
    r = []
    for cart in carts:
        dic = get_all_products(cart)
        r.append(dic)
    return dumps(r)

@APP.route("/getAddress", methods=['POST'])
def getAddress():
    info = request.get_json()
    r = get_address(info['token'])
    return dumps(r)


#admin only
@APP.route("/getCurrent", methods=['POST'])
def getCurrent():
    info = request.get_json()
    carts = get_current_order(info['token'])
    r = []
    for cart in carts:
        dic = get_all_products(cart)
        r.append(dic)
    return dumps(r)

#admin only
@APP.route("/getPast", methods=['POST'])
def getPast():
    info = request.get_json()
    carts = get_past_order(info['token'])
    r = []
    for cart in carts:
        dic = get_all_products(cart)
        r.append(dic)
    return dumps(r)
'''
status{
    0: before checkout, should not be displayed
    1: just checkout
    2: to be decided
    3: to be decided
}
Only admin token can change address
'''
@APP.route("/changestatus", methods=['POST'])
def changestatus():
    info = request.get_json()
    r = change_status(info['token'], info['c_id'], info['newstatus'])
    return dumps(r)


if __name__ == "__main__":
    APP.run(port=5000)
