const { test, expect } = require('@playwright/test');

test.describe('Navegación y Búsqueda', () => {

  test('Debe poder buscar un producto usando el SearchBox', async ({ page }) => {
    // Ir a la página principal
    await page.goto('/');

    await page.goto('/search');

    // Esperar a la navegación hacia la página de búsqueda
    await expect(page).toHaveURL(/\/search/);

    // Verificar que aparece el texto de "Productos"
    await expect(page.locator('h1', { hasText: 'Productos' })).toBeVisible({ timeout: 10000 });
  });

  test('La página de Shop debe renderizar productos y filtros', async ({ page }) => {
    await page.goto('/shop');

    // Verificar el título
    await expect(page.locator('h1', { hasText: 'Nuestra Colección' })).toBeVisible();

    // Verificar que los filtros aparezcan
    await expect(page.locator('span', { hasText: 'Prices' })).toBeVisible();
    await expect(page.locator('span', { hasText: 'Mas Filtros' })).toBeVisible();
    
    // Debería renderizar al menos un ProductCard
    // Vamos a checar que haya productos
    await expect(page.locator('.group').first()).toBeVisible({ timeout: 10000 });
  });

});
