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
exports.googleSheetsAuth = exports.updateDataToGoogleSheets = exports.getDataFromGoogleSheets = void 0;
const googleapis_1 = require("googleapis");
function getDataFromGoogleSheets(spreadsheetId, range) {
    return __awaiter(this, void 0, void 0, function* () {
        const { googleSheets, auth } = yield googleSheetsAuth();
        const rows = yield googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range,
            valueRenderOption: "UNFORMATTED_VALUE",
            dateTimeRenderOption: "FORMATTED_STRING",
        });
        return rows.data.values;
    });
}
exports.getDataFromGoogleSheets = getDataFromGoogleSheets;
function updateDataToGoogleSheets(spreadsheetId, range, values) {
    return __awaiter(this, void 0, void 0, function* () {
        const { googleSheets, auth } = yield googleSheetsAuth();
        const request = {
            auth,
            spreadsheetId,
            range,
            valueInputOption: "USER_ENTERED",
            resource: {
                values,
            },
        };
        yield googleSheets.spreadsheets.values.update(request);
    });
}
exports.updateDataToGoogleSheets = updateDataToGoogleSheets;
function googleSheetsAuth() {
    return __awaiter(this, void 0, void 0, function* () {
        const auth = new googleapis_1.google.auth.GoogleAuth({
            keyFile: "credentials.json",
            scopes: "https://www.googleapis.com/auth/spreadsheets",
        });
        const client = yield auth.getClient();
        const googleSheets = googleapis_1.google.sheets({
            version: "v4",
            auth: client,
        });
        return {
            auth,
            client,
            googleSheets,
        };
    });
}
exports.googleSheetsAuth = googleSheetsAuth;
