import urllib.request, urllib.error
try:
    urllib.request.urlopen('http://127.0.0.1:8000/api/reviews/get-reviews/3')
except urllib.error.HTTPError as e:
    print(e.read().decode())
