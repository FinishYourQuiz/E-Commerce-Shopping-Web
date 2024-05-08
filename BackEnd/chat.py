import urllib.parse
import requests
from google_trans_new import google_translator  


#pip install urllib
#pip install requests
#pip install google_trans_new 


#Using a free website api for chatbot
def qingyunke(msg):
    url = 'http://api.qingyunke.com/api.php?key=free&appid=0&msg={}'.format(urllib.parse.quote(msg))
    html = requests.get(url)
    return html.json()["content"]

#Using translator
def chat(input):
    translator = google_translator() 
    message = translator.translate(input,lang_tgt='zh')
    result = qingyunke(message)
    translate_text = translator.translate(result,lang_tgt='en') 
    return translate_text



if __name__ == "__main__":
    input = 'Nice to meet you.'
    print(chat(input))


'''
# check for if contains Chinese
def is_contain_chinese(check_str): 
    for ch in check_str:
        if u'\u4e00' <= ch <= u'\u9fff':
            return True
    return False
'''



