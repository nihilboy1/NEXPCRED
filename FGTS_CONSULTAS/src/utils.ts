import { ElementHandle, Page } from "puppeteer";

export function delay(time: number) {
  if (time < 0 || time > 60) {
    throw new Error("O tempo deve ser um número entre 1 e 60.");
  }
  const miliTime = time * 1000;
  return new Promise(function (resolve) {
    setTimeout(resolve, miliTime);
  });
}
export async function checksTheElementVisibility(
  page: Page,
  selector: string
): Promise<boolean> {
  try {
    const element = await page.waitForSelector(selector, { timeout: 2500 });
    if (element) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

export async function selectTextToOverwrite(element: ElementHandle) {
  await element.click({ count: 3 });
}

export async function waitForElementBySelector(
  page: Page,
  selector: string,
  alias?: string
): Promise<ElementHandle<Element>> {
  while (true) {
    try {
      const element = await page.waitForSelector(selector, { timeout: 3000 });
      if (element) {
        return element;
      }
    } catch (error) {
      console.log(
        `O seguinte elemento ainda não pode ser obtido: ${
          alias ? alias : selector
        }`
      );
      console.log("Tentando novamente...");
      continue;
    }
  }
}
