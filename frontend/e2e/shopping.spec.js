const { test, expect } = require('@playwright/test');

test.describe('Flujo de Compra', () => {

  test('Debe poder añadir un producto al carrito desde la tienda', async ({ page }) => {
    // Vamos a ir a la tienda
    await page.goto('/shop');

    // Esperar a que carguen los productos (usar un selector más específico para evitar Navbar)
    const productCard = page.locator('div.group.relative.flex.flex-col').first();
    await expect(productCard).toBeVisible({ timeout: 10000 });

    // Click en el primer producto
    await productCard.click();

    // Esperar que la URL cambie a /product/...
    await expect(page).toHaveURL(/\/product\/\d+/);

    // Verificar que estemos en la página del producto y el botón de Añadir al carrito esté visible
    const addToCartBtn = page.locator('button', { hasText: 'Añadir al Carrito' });
    await expect(addToCartBtn).toBeVisible({ timeout: 10000 });

    // Hacer click en añadir al carrito
    await addToCartBtn.click();

    // Luego de añadir, debería redirigir a /cart
    await expect(page).toHaveURL(/\/cart/);

    // Verificar que en el carrito aparezca un resumen o botones de checkout
    const checkoutBtn = page.locator('button', { hasText: /(Checkout|Login|Buscar items)/i }).first();
    await expect(checkoutBtn).toBeVisible({ timeout: 10000 });
  });

});
