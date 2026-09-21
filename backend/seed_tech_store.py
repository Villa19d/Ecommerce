import os
import django
from datetime import datetime
import urllib.request

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from category.models import Category
from product.models import Product
from django.core.files import File
from django.core.files.temp import NamedTemporaryFile

def create_category(name, parent=None):
    cat, created = Category.objects.get_or_create(name=name, parent=parent)
    return cat

def seed():
    print("Creating Categories...")
    tech = create_category("Technology")
    
    computers = create_category("Computers", parent=tech)
    laptops = create_category("Laptops", parent=computers)
    desktops = create_category("Desktops", parent=computers)
    
    peripherals = create_category("Peripherals", parent=tech)
    keyboards = create_category("Keyboards", parent=peripherals)
    mice = create_category("Mice", parent=peripherals)
    monitors = create_category("Monitors", parent=peripherals)
    
    audio = create_category("Audio", parent=tech)
    headphones = create_category("Headphones", parent=audio)
    mics = create_category("Microphones", parent=audio)

    # Product list
    products_data = [
        # Laptops
        {"name": "Nitro 5 Gaming Laptop", "cat": laptops, "price": 1099.99, "compare": 1299.99},
        {"name": "Predator Helios 300", "cat": laptops, "price": 1499.99, "compare": 1699.99},
        {"name": "ZenBook Pro Duo", "cat": laptops, "price": 2499.99, "compare": 2799.99},
        {"name": "MacBook Pro 16 M3 Max", "cat": laptops, "price": 3499.00, "compare": 3499.00},
        {"name": "Dell XPS 15", "cat": laptops, "price": 1899.50, "compare": 1999.00},
        {"name": "Razer Blade 14", "cat": laptops, "price": 1999.99, "compare": 2199.99},
        
        # Desktops
        {"name": "Alienware Aurora R15", "cat": desktops, "price": 2499.00, "compare": 2799.00},
        {"name": "HP Omen 45L", "cat": desktops, "price": 1899.00, "compare": 2100.00},
        {"name": "Corsair Vengeance i7400", "cat": desktops, "price": 2199.99, "compare": 2499.99},
        {"name": "Mac Studio M2 Ultra", "cat": desktops, "price": 3999.00, "compare": 3999.00},

        # Keyboards
        {"name": "Logitech G Pro X TKL", "cat": keyboards, "price": 199.99, "compare": 229.99},
        {"name": "Razer Huntsman V3 Pro", "cat": keyboards, "price": 249.99, "compare": 249.99},
        {"name": "Keychron Q1 Pro", "cat": keyboards, "price": 199.00, "compare": 199.00},
        {"name": "SteelSeries Apex Pro", "cat": keyboards, "price": 179.99, "compare": 199.99},
        {"name": "Wooting 60HE+", "cat": keyboards, "price": 174.99, "compare": 174.99},

        # Mice
        {"name": "Logitech G Pro X Superlight 2", "cat": mice, "price": 159.99, "compare": 159.99},
        {"name": "Razer DeathAdder V3 Pro", "cat": mice, "price": 149.99, "compare": 169.99},
        {"name": "Finalmouse Starlight-12", "cat": mice, "price": 189.99, "compare": 189.99},
        {"name": "Zowie EC2-CW", "cat": mice, "price": 119.99, "compare": 149.99},

        # Monitors
        {"name": "Alienware AW3423DWF OLED", "cat": monitors, "price": 999.99, "compare": 1099.99},
        {"name": "LG UltraGear 27GR95QE", "cat": monitors, "price": 849.99, "compare": 999.99},
        {"name": "Samsung Odyssey G9 Neo", "cat": monitors, "price": 1499.99, "compare": 1799.99},
        {"name": "ASUS ROG Swift PG27AQDM", "cat": monitors, "price": 899.00, "compare": 1049.00},

        # Headphones
        {"name": "Sony WH-1000XM5", "cat": headphones, "price": 348.00, "compare": 399.00},
        {"name": "Sennheiser HD 800 S", "cat": headphones, "price": 1599.00, "compare": 1699.00},
        {"name": "Audeze Maxwell", "cat": headphones, "price": 299.00, "compare": 299.00},
        {"name": "Beyerdynamic DT 990 Pro", "cat": headphones, "price": 149.00, "compare": 179.00},
        {"name": "AirPods Max", "cat": headphones, "price": 549.00, "compare": 549.00},

        # Microphones
        {"name": "Shure SM7B", "cat": mics, "price": 399.00, "compare": 399.00},
        {"name": "Rode NT1 5th Gen", "cat": mics, "price": 249.00, "compare": 269.00},
        {"name": "HyperX QuadCast S", "cat": mics, "price": 139.99, "compare": 159.99},
        {"name": "Elgato Wave:3", "cat": mics, "price": 149.99, "compare": 149.99},
    ]

    print(f"Creating {len(products_data)} products...")
    
    # Download a placeholder
    colors = ['2563eb', 'dc2626', '16a34a', '9333ea', 'ea580c', '0f172a']
    
    for i, pdata in enumerate(products_data):
        print(f"[{i+1}/{len(products_data)}] Updating {pdata['name']}...")
        
        desc = f"Experience top-tier performance with the {pdata['name']}. Ideal for professionals and enthusiasts alike. Designed to elevate your setup."
        safe_name = pdata['name'].replace(' ', '_').lower() + '.jpg'
        
        product, created = Product.objects.update_or_create(
            name=pdata['name'],
            defaults={
                'description': desc,
                'price': pdata['price'],
                'compare_price': pdata['compare'],
                'category': pdata['cat'],
                'quantity': 100,
            }
        )
        
        product.photo.name = f"photos/2024/09/{safe_name}"
        product.save()

    print("\n--- ¡LISTA DE IMÁGENES A DESCARGAR! ---")
    print("Por favor descarga imágenes para los siguientes productos y guárdalas en:")
    print("backend/media/photos/2024/09/\n")
    for pdata in products_data:
        safe_name = pdata['name'].replace(' ', '_').lower() + '.jpg'
        print(f"- {safe_name} (Para: {pdata['name']})")
        
    print("\nSeeding completed successfully!")

if __name__ == '__main__':
    seed()
