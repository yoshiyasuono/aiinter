import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

export async function getGoogleSheetsClient() {
  try {
    const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n');

    const client = new JWT({
      email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth: client });
    return sheets;
  } catch (error) {
    console.error('Error initializing Google Sheets client:', error);
    throw error;
  }
}

export async function appendToSheet(data: any) {
  try {
    const sheets = await getGoogleSheetsClient();

    // フラット化したデータの配列を作成
    const values = [
      [
        data.studentFirstName,
        data.studentLastName,
        data.dateOfBirth,
        data.gender,
        data.nationality,
        data.languages.join(', '),
        data.bloodType || '',
        JSON.stringify(data.currentAddress),
        JSON.stringify(data.permanentAddress || ''),
        JSON.stringify(data.parents),
        JSON.stringify(data.physicianDetails || ''),
        data.medicalConditions || '',
        data.allergies || '',
        JSON.stringify(data.previousSchools),
        JSON.stringify(data.emergencyContacts),
        JSON.stringify(data.bankingDetails),
        JSON.stringify(data.termsAccepted),
        new Date().toISOString(), // 申請日時
      ]
    ];

    console.log('Attempting to append data to Google Sheets:', values);

    const result = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range: 'Sheet1!A:R', // A列からR列まで
      valueInputOption: 'RAW',
      requestBody: {
        values,
      },
    });

    console.log('Data successfully appended to Google Sheets:', result.data);
    return result.data;
  } catch (error) {
    console.error('Error appending data to Google Sheets:', error);
    throw error;
  }
}