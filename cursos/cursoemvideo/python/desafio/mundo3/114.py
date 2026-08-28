import urllib.request

try:
    site = urllib.request.urlopen('http://pudim.com.br/')
except urllib.error.URLError:
    print('O site Pudim não está acessível no momento.')
else:
    print('Conseguimos acessar o site Pudim!')
