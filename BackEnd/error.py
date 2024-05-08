from werkzeug.exceptions import HTTPException


'''Register'''

class EmailTakenError(HTTPException):
    code = 400
    message = 'Email already used'

'''Login'''
'''
class AlreadyLoginError(HTTPException):
    code = 400
    message = 'Already Login'
'''
class WrongPasswordError(HTTPException):
    code = 400
    message = 'Password Incorrect'

class NoUserError(HTTPException):
    code = 400
    message = 'Email entered does not belong to a user'

class MultipleAdminError(HTTPException):
    code = 400
    message = 'only one admin can exist'

'''product'''

class WrongInputError(HTTPException):
    code = 400
    message = 'Input Incorrect'

class NonexistingProductError(HTTPException):
    code = 400
    message = 'Pid not in data'

class PrivilegeError(HTTPException):
    code = 400
    message = 'not admin'

class InvalidTokenError(HTTPException):
    code = 400
    message = 'invalid token'

class DoubleCartError(HTTPException):
    code = 400
    message = 'You can not create a new cart before you checkout'

class NoAddressError(HTTPException):
    code = 400
    message = 'No address for your cart, please enter an address for your cart'

class NoProductinCartError(HTTPException):
    code = 400
    message = 'Your cart does not have this type of product hence you can not remove it'

class EmptyCartError(HTTPException):
    code = 400
    message = 'Your cart is empty hence you cannot checkout'