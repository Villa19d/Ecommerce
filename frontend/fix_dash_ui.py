import os, re
d = r'c:\Users\Rodrigo\Dropbox\Nitro 5\ECommerceV2.0.0\frontend\src\containers\pages'

new_img = '''{profile && profile.photo ? (
                        <img
                          className="h-8 w-8 rounded-full object-cover"
                          src={`${process.env.REACT_APP_API_URL}${profile.photo}`}
                          alt=""
                        />
                      ) : (
                        <span className="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100">
                          <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </span>
                      )}'''

for f in ['Dashboard.jsx', 'DashboardPayments.jsx', 'DashboardPaymentDetail.jsx', 'DashboardProfile.jsx']:
    p = os.path.join(d, f)
    with open(p, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Replace the img block
    content = re.sub(r'<img\s+className="h-8 w-8 rounded-full"\s+src=\{profile && profile\.photo \? `\$\{process\.env\.REACT_APP_API_URL\}\$\{profile\.photo\}` : "https://images\.unsplash\.com/photo-[^"]+"\}\s+alt=""\s+/>', new_img, content, flags=re.DOTALL)
    
    # Remove dummy products array
    content = re.sub(r'const products = \[\s*\{.*?\}(?:\s*// More products\.\.\.)?\s*\]', '', content, flags=re.DOTALL)
    
    with open(p, 'w', encoding='utf-8') as file:
        file.write(content)
