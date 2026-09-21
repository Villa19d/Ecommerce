const { test, expect } = require('@playwright/test');

test.describe('Olvidé mi Contraseña (Forgot Password)', () => {

  test('Debe poder navegar a reset password desde login y enviar correo', async ({ page }) => {
    // 1. Ir a la página de login
    await page.goto('/login');

    // 2. Hacer clic en "Forgot password?"
    const forgotPasswordLink = page.locator('a', { hasText: 'Forgot password?' });
    await expect(forgotPasswordLink).toBeVisible();
    await forgotPasswordLink.click();

    // 3. Verificar que navegó a /reset_password
    await expect(page).toHaveURL(/\/reset_password/);

    // 4. Verificar que se renderiza el formulario
    await expect(page.locator('h2', { hasText: 'Reset your password' })).toBeVisible();

    // 5. Llenar el formulario con un email de prueba
    const emailInput = page.locator('input[name="email"]');
    await emailInput.fill('test@example.com');

    // 6. Hacer clic en "Send Email"
    const sendButton = page.locator('button[type="submit"]', { hasText: 'Send Email' });
    await sendButton.click();

    // 7. Esperar a que redirija a /login (cuando termina el request)
    await expect(page).toHaveURL(/\/login/, { timeout: 15000 });
  });

  test('La página de Confirmar Contraseña (con tokens) debe renderizar correctamente', async ({ page }) => {
    // Probar el renderizado de la página directamente usando un uid y token falsos
    await page.goto('/password/reset/confirm/fakeuid/faketoken');

    await expect(page.locator('h2', { hasText: 'Set new password' })).toBeVisible();
    
    // Verificar que existen ambos inputs de contraseñas
    await expect(page.locator('input[name="new_password"]')).toBeVisible();
    await expect(page.locator('input[name="re_new_password"]')).toBeVisible();

    // Verificar que el botón dice Reset Password
    await expect(page.locator('button[type="submit"]', { hasText: 'Reset Password' })).toBeVisible();
  });

});
