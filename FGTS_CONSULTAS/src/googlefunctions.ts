import { google } from "googleapis";

export async function getDataFromGoogleSheets(
  spreadsheetId: string,
  range: string
) {
  const { googleSheets, auth } = await googleSheetsAuth();
  const rows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range,
    valueRenderOption: "UNFORMATTED_VALUE",
    dateTimeRenderOption: "FORMATTED_STRING",
  });

  return rows.data.values;
}

export async function updateDataToGoogleSheets(
  spreadsheetId: string,
  range: string,
  values: string[][]
) {
  const { googleSheets, auth } = await googleSheetsAuth();
  const request = {
    auth,
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    resource: {
      values,
    },
  };

  await googleSheets.spreadsheets.values.update(request);
}

export async function googleSheetsAuth() {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  const client = await auth.getClient();

  const googleSheets = google.sheets({
    version: "v4",
    auth: client as any,
  });

  return {
    auth,
    client,
    googleSheets,
  };
}
