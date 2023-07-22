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
exports.waitForElementBySelector = exports.selectTextToOverwrite = exports.checksTheElementVisibility = exports.delay = void 0;
function delay(time) {
    if (time < 0 || time > 60) {
        throw new Error("O tempo deve ser um número entre 1 e 60.");
    }
    const miliTime = time * 1000;
    return new Promise(function (resolve) {
        setTimeout(resolve, miliTime);
    });
}
exports.delay = delay;
function checksTheElementVisibility(page, selector) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const element = yield page.waitForSelector(selector, { timeout: 2500 });
            if (element) {
                return true;
            }
            return false;
        }
        catch (error) {
            return false;
        }
    });
}
exports.checksTheElementVisibility = checksTheElementVisibility;
function selectTextToOverwrite(element) {
    return __awaiter(this, void 0, void 0, function* () {
        yield element.click({ count: 3 });
    });
}
exports.selectTextToOverwrite = selectTextToOverwrite;
function waitForElementBySelector(page, selector, alias) {
    return __awaiter(this, void 0, void 0, function* () {
        while (true) {
            try {
                const element = yield page.waitForSelector(selector, { timeout: 3000 });
                if (element) {
                    return element;
                }
            }
            catch (error) {
                console.log(`O seguinte elemento ainda não pode ser obtido: ${alias ? alias : selector}`);
                console.log("Tentando novamente...");
                continue;
            }
        }
    });
}
exports.waitForElementBySelector = waitForElementBySelector;
