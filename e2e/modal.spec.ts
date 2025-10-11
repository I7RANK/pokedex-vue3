import { test, expect } from '@playwright/test'

test('should open and close the Pokemon details modal when clicking a card', async ({ page }) => {
  const modalLocator = page.getByTestId('details-modal')

  await page.goto('/pokemon')
  await page.getByTestId('pokemon-card').getByText('bulbasaur').click()

  await expect(modalLocator).toBeVisible()
  await expect(modalLocator.getByTestId('pokemon-name')).toHaveText(/bulbasaur/i)
  await expect(modalLocator.getByTestId('favorites-button')).toBeVisible()

  await page.getByTestId('close-modal-button').click()

  await expect(modalLocator).not.toBeVisible()
})
