import { test, expect } from "@playwright/test";

test.describe("appointment create flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/appointments");

    await page.evaluate(() => {
      window.localStorage.clear();
    });

    await page.goto("/appointments");
  });

  test("予約を作成して詳細ページで内容を確認できる", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "予約一覧" })).toBeVisible();

    await page.getByRole("link", { name: "新しい予約" }).click();

    await expect(
      page.getByRole("heading", { name: "新しい予約" })
    ).toBeVisible();

    await page.getByLabel("顧客名").fill("山田 花子");
    await page.getByLabel("サービス名").fill("カウンセリング");
    await page.getByLabel("予約日時").fill("2026-04-20T10:30");
    await page.getByLabel("予約メモ").fill("初回相談です");

    await page.getByRole("button", { name: "項目を追加" }).click();
    await expect
      .poll(async () => {
        return page.locator('input[id^="preparation-item-"]').count();
      })
      .toBe(1);

    const preparationItemInput = page
      .locator('input[id^="preparation-item-"]')
      .first();

    await expect(preparationItemInput).toBeVisible();
    await preparationItemInput.fill("ヒアリングシート準備");

    await page.getByRole("button", { name: "予約を作成" }).click();

    await expect(page).toHaveURL(/\/appointments\/.+/);

    await expect(page.getByRole("heading", { name: "予約詳細" })).toBeVisible();
    await expect(page.getByText("山田 花子")).toBeVisible();
    await expect(page.getByText("カウンセリング")).toBeVisible();
    await expect(page.getByText("初回相談です")).toBeVisible();
    await expect(page.getByText("ヒアリングシート準備")).toBeVisible();
  });
});
