"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const googlefunctions_1 = require("./googlefunctions");
const steps_1 = require("./steps");
const utils_1 = require("./utils");
/*
USUARIO: "JEFFERSON TORRES";
SENHA: "X34gjbN8";
*/
const RANGE = "CLIENTES_DO_EMAIL!B445:C450";
const SPREADSHEET_ID = "12DmI7PcKBafB6H6E7skX4RIVFYbHPSidueocDXN4vUs";
function Main() {
    return __awaiter(this, void 0, void 0, function* () {
        const values = yield (0, googlefunctions_1.getDataFromGoogleSheets)(SPREADSHEET_ID, RANGE);
        console.log(values);
        const { page, browser } = yield (0, steps_1.createBrowser)();
        yield (0, utils_1.delay)(1);
        yield page.goto("https://mb-ui-pcb-site-pcb.meumb.mercantil.com.br/login");
        yield (0, utils_1.delay)(3);
        const login = yield (0, utils_1.waitForElementBySelector)(page, "#mat-input-0");
        yield login.click();
        yield login.type("JEFFERSON TORRES");
        yield (0, utils_1.delay)(1);
        const senha = yield (0, utils_1.waitForElementBySelector)(page, "#mat-input-1");
        yield senha.click();
        yield senha.type("X34gjbN8");
        yield (0, utils_1.delay)(1);
        const novaProposta = yield (0, utils_1.waitForElementBySelector)(page, "body > app-root > div > app-main-layout > main > app-dashboard > div > div > section > div.titulo > button > span.mat-button-wrapper");
        yield (0, utils_1.delay)(1);
        yield novaProposta.click();
        yield (0, utils_1.delay)(1);
        const convenioSeletor = yield (0, utils_1.waitForElementBySelector)(page, "#mat-select-0");
        yield convenioSeletor.click();
        yield (0, utils_1.delay)(1);
        const inssConvenio = yield (0, utils_1.waitForElementBySelector)(page, "#mat-option-6");
        yield inssConvenio.click();
        yield (0, utils_1.delay)(2);
        const ufSeletor = yield (0, utils_1.waitForElementBySelector)(page, "#mat-select-2");
        yield ufSeletor.click();
        yield (0, utils_1.delay)(1);
        const acUf = yield (0, utils_1.waitForElementBySelector)(page, "#mat-option-9");
        yield acUf.click();
        yield (0, utils_1.delay)(1);
        const cpfInput = yield (0, utils_1.waitForElementBySelector)(page, "#mat-input-3");
        yield cpfInput.click();
        yield cpfInput.type("123");
        yield (0, utils_1.delay)(1);
        const consultarButton = yield (0, utils_1.waitForElementBySelector)(page, "body > app-root > div > app-main-layout > main > app-simular-proposta > div > div > mat-card > mat-card-content > div.pcb-row.card-cpf > button");
        yield consultarButton.click();
        yield (0, utils_1.delay)(3);
        const novaOperação = yield (0, utils_1.waitForElementBySelector)(page, "body > app-root > div > app-main-layout > main > app-simular-proposta > div > div > mat-card > mat-card-content > div.pcb-row.card-resultado.ng-star-inserted > a");
        yield novaOperação.click();
        yield (0, utils_1.delay)(5);
        let erroPadrãoContador = 0;
        while (true) {
            if (erroPadrãoContador === 10) {
                break;
            }
            const exitemProdutosDisponíveis = yield (0, utils_1.checksTheElementVisibility)(page, "body > app-root > div > app-main-layout > main > app-fgts > div > div > mat-card.mat-card.mat-focus-indicator.card-conteudo.ng-star-inserted > mat-card-content > div > ul > li > a");
            if (exitemProdutosDisponíveis) {
                yield (0, utils_1.delay)(2);
                const iniciar = yield (0, utils_1.waitForElementBySelector)(page, "body > app-root > div > app-main-layout > main > app-fgts > div > div > mat-card.mat-card.mat-focus-indicator.card-conteudo.ng-star-inserted > mat-card-content > div > ul > li > a");
                yield iniciar.click();
                yield (0, utils_1.delay)(3);
                const valor = yield (0, utils_1.waitForElementBySelector)(page, "body > app-root > div > app-main-layout > main > app-simulacao > div > div > app-possibilidades-proposta > div > app-simulacao-fgts > mat-card > mat-card-content > div.rodape > div.saldoTotal > strong");
                const valorTexto = yield valor.evaluate((element) => {
                    return element.textContent;
                });
                yield page.screenshot({
                    path: `src/screenshots/${"123"}.png`,
                });
                yield (0, utils_1.delay)(3);
                console.log(valorTexto);
                yield (0, utils_1.delay)(3);
                break;
            }
            else {
                try {
                    const errorElement = yield (0, utils_1.waitForElementBySelector)(page, "#toast-container");
                    const errorText = yield errorElement.evaluate((element) => {
                        return element.textContent;
                    });
                    if (errorText ===
                        ' Retorno inesperado  Clique em "Consultar novamente" ' ||
                        errorText ===
                            " Atenção  Limite de consultas excedido, aguarde e tente novamente! ") {
                        erroPadrãoContador += 1;
                    }
                }
                catch (error) {
                    console.log(error);
                }
                yield page.reload();
                yield (0, utils_1.delay)(2);
                continue;
            }
        }
        console.log("Sessão encerrada!");
        yield browser.close();
    });
}
Main();
