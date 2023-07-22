import { getDataFromGoogleSheets } from "./googlefunctions";
import { createBrowser } from "./steps";
import {
  checksTheElementVisibility,
  delay,
  waitForElementBySelector,
} from "./utils";
/*
USUARIO: "JEFFERSON TORRES";
SENHA: "X34gjbN8";
*/

const RANGE = "CLIENTES_DO_EMAIL!B445:C450";
const SPREADSHEET_ID = "12DmI7PcKBafB6H6E7skX4RIVFYbHPSidueocDXN4vUs";

async function Main() {
  const values = await getDataFromGoogleSheets(SPREADSHEET_ID, RANGE);
  console.log(values);

  const { page, browser } = await createBrowser();
  await delay(1);
  await page.goto("https://mb-ui-pcb-site-pcb.meumb.mercantil.com.br/login");
  await delay(3);
  const login = await waitForElementBySelector(page, "#mat-input-0");
  await login.click();
  await login.type("JEFFERSON TORRES");
  await delay(1);
  const senha = await waitForElementBySelector(page, "#mat-input-1");
  await senha.click();
  await senha.type("X34gjbN8");
  await delay(1);
  const novaProposta = await waitForElementBySelector(
    page,
    "body > app-root > div > app-main-layout > main > app-dashboard > div > div > section > div.titulo > button > span.mat-button-wrapper"
  );
  await delay(1);
  await novaProposta.click();
  await delay(1);
  const convenioSeletor = await waitForElementBySelector(page, "#mat-select-0");
  await convenioSeletor.click();
  await delay(1);
  const inssConvenio = await waitForElementBySelector(page, "#mat-option-6");
  await inssConvenio.click();
  await delay(2);
  const ufSeletor = await waitForElementBySelector(page, "#mat-select-2");
  await ufSeletor.click();
  await delay(1);
  const acUf = await waitForElementBySelector(page, "#mat-option-9");
  await acUf.click();
  await delay(1);
  const cpfInput = await waitForElementBySelector(page, "#mat-input-3");
  await cpfInput.click();
  await cpfInput.type("123");
  await delay(1);

  const consultarButton = await waitForElementBySelector(
    page,
    "body > app-root > div > app-main-layout > main > app-simular-proposta > div > div > mat-card > mat-card-content > div.pcb-row.card-cpf > button"
  );
  await consultarButton.click();
  await delay(3);
  const novaOperação = await waitForElementBySelector(
    page,
    "body > app-root > div > app-main-layout > main > app-simular-proposta > div > div > mat-card > mat-card-content > div.pcb-row.card-resultado.ng-star-inserted > a"
  );
  await novaOperação.click();
  await delay(5);
  let erroPadrãoContador = 0;
  while (true) {
    if (erroPadrãoContador === 10) {
      break;
    }
    const exitemProdutosDisponíveis = await checksTheElementVisibility(
      page,
      "body > app-root > div > app-main-layout > main > app-fgts > div > div > mat-card.mat-card.mat-focus-indicator.card-conteudo.ng-star-inserted > mat-card-content > div > ul > li > a"
    );
    if (exitemProdutosDisponíveis) {
      await delay(2);
      const iniciar = await waitForElementBySelector(
        page,
        "body > app-root > div > app-main-layout > main > app-fgts > div > div > mat-card.mat-card.mat-focus-indicator.card-conteudo.ng-star-inserted > mat-card-content > div > ul > li > a"
      );
      await iniciar.click();
      await delay(3);
      const valor = await waitForElementBySelector(
        page,
        "body > app-root > div > app-main-layout > main > app-simulacao > div > div > app-possibilidades-proposta > div > app-simulacao-fgts > mat-card > mat-card-content > div.rodape > div.saldoTotal > strong"
      );
      const valorTexto = await valor.evaluate((element) => {
        return element.textContent;
      });
      await page.screenshot({
        path: `src/screenshots/${"123"}.png`,
      });
      await delay(3);
      console.log(valorTexto);
      await delay(3);
      break;
    } else {
      try {
        const errorElement = await waitForElementBySelector(
          page,
          "#toast-container"
        );
        const errorText = await errorElement.evaluate((element) => {
          return element.textContent;
        });

        if (
          errorText ===
            ' Retorno inesperado  Clique em "Consultar novamente" ' ||
          errorText ===
            " Atenção  Limite de consultas excedido, aguarde e tente novamente! "
        ) {
          erroPadrãoContador += 1;
        }
      } catch (error) {
        console.log(error);
      }
      await page.reload();
      await delay(2);
      continue;
    }
  }

  console.log("Sessão encerrada!");
  await browser.close();
}

Main();
