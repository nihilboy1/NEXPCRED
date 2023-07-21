import puppeteer, { Browser, ElementHandle, Page } from 'puppeteer'

export function delay(time: number) {
  if (time < 0 || time > 60) {
    throw new Error('O tempo deve ser um número entre 1 e 60.')
  }
  const miliTime = time * 1000
  return new Promise(function (resolve) {
    setTimeout(resolve, miliTime)
  })
}
async function checksTheElementVisibility(page: Page, selector: string): Promise<boolean> {
  try {
    const element = await page.waitForSelector(selector, { timeout: 2500 })
    if (element) {
      return true
    }
    return false
  } catch (error) {
    return false
  }
}

async function selectTextToOverwrite(element: ElementHandle) {
  await element.click({ count: 3 })
}

async function waitForElementBySelector(
  page: Page,
  selector: string,
  alias?: string
): Promise<ElementHandle<Element>> {
  while (true) {
    try {
      const element = await page.waitForSelector(selector, { timeout: 3000 })
      if (element) {
        return element
      }
    } catch (error) {
      console.log(`O seguinte elemento ainda não pode ser obtido: ${alias ? alias : selector}`)
      console.log('Tentando novamente...')
      continue
    }
  }
}

async function createBrowser() {
  const browser: Browser = await puppeteer.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    defaultViewport: null,
    headless: false
  })
  const [page] = await browser.pages()
  return { page, browser }
}
async function Main() {
  const { page, browser } = await createBrowser()
  await delay(1)
  await page.goto('https://mb-ui-pcb-site-pcb.meumb.mercantil.com.br/login')
  const novaProposta = await waitForElementBySelector(
    page,
    'body > app-root > div > app-main-layout > main > app-dashboard > div > div > section > div.titulo > button > span.mat-button-wrapper'
  )
  await delay(5)
  await novaProposta.click()
  await delay(5)
  const convenioSeletor = await waitForElementBySelector(page, '#mat-select-0')
  await convenioSeletor.click()
  await delay(1)
  const inssConvenio = await waitForElementBySelector(page, '#mat-option-6')
  await inssConvenio.click()
  await delay(3)
  const ufSeletor = await waitForElementBySelector(page, '#mat-select-2')
  await ufSeletor.click()
  await delay(1)
  const acUf = await waitForElementBySelector(page, '#mat-option-9')
  await acUf.click()
  const cpfInput = await waitForElementBySelector(page, '#mat-input-3')
  await cpfInput.click()
  await delay(1)
  await cpfInput.type('12454722402')
  await delay(5)
  console.log('Sessão encerrada!')
  await browser.close()
}

document.addEventListener('DOMContentLoaded', () => {
  // Associando a função Main() ao evento de clique do botão
  const button = document.getElementById('start')
  if (button) {
    button.addEventListener('click', () => {
      console.log('123')
    })
  }
})
