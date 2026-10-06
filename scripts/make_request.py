import urllib.request
import urllib.error

req = urllib.request.Request(
    'https://ecommerce-yzsy.onrender.com/auth/users/reset_password/',
    data=b'{"email": "luisrodrigo1005@gmail.com"}',
    headers={'Content-Type': 'application/json', 'Accept': 'application/json'}
)

try:
    response = urllib.request.urlopen(req)
    print("SUCCESS:", response.read().decode())
except urllib.error.HTTPError as e:
    print("HTTP ERROR:", e.code)
    print("CONTENT:", e.read().decode())
except Exception as e:
    print("OTHER ERROR:", e)
