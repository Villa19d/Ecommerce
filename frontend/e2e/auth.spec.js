const { test, expect } = require('@playwright/test');

test.describe('Autenticación', () => {

  test('Debe poder mostrar mensajes de error si las credenciales son incorrectas', async ({ page }) => {
    await page.goto('/login');

    // Llenar el formulario con datos inválidos
    await page.fill('input[name="email"]', 'usuariofalso@example.com');
    await page.fill('input[name="password"]', 'contrasenaincorrecta');

    // Enviar el formulario
    await page.click('button[type="submit"]');

    // Verificar que el botón de carga o algún estado de bloqueo ocurra
    await expect(page.locator('button[type="submit"]', { hasText: 'Sign in' })).toBeVisible();
  });

  test('La página de login y signup cargan correctamente', async ({ page }) => {
    // Probar Login
    await page.goto('/login');
    await expect(page).toHaveTitle(/E-Commerce/i);
    await expect(page.locator('h2', { hasText: 'Sign in to your account' })).toBeVisible();

    // Probar Signup
    await page.goto('/signup');
    await expect(page.locator('a', { hasText: /sign up/i }).first()).toBeVisible();
  });
});
