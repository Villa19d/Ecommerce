import urllib.request
import urllib.error
import json
import re

req = urllib.request.Request(
    'https://ecommerce-yzsy.onrender.com/auth/users/reset_password/',
    data=b'{"email": "luisrodrigo1005@gmail.com"}',
    headers={'Content-Type': 'application/json', 'Accept': 'application/json'}
)

try:
    response = urllib.request.urlopen(req)
    print("Success:", response.read().decode())
except urllib.error.HTTPError as e:
    content = e.read().decode('utf-8', errors='replace')
    print('HTTP Error', e.code)
    
    match = re.search(r'<title>(.*?)</title>', content, re.IGNORECASE | re.DOTALL)
    if match:
        print('HTML Error Title:', match.group(1).strip())
        
    match2 = re.search(r'<div class="exception_value">(.*?)</div>', content, re.IGNORECASE | re.DOTALL)
    if match2:
         print('Exception Value:', match2.group(1).strip())
         
    # Also print the end of the traceback if possible
    frames = re.findall(r'<span class="code">(.*?)</span>', content, re.IGNORECASE | re.DOTALL)
    if frames:
        print('Last frame:', frames[-1])
except Exception as e:
    print('Other error:', e)
