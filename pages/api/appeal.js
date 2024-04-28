import { google } from 'googleapis'

const toCamelCase = (str) => {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase())
}

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed')
  }

  try {
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT)
    const client = new google.auth.JWT(
      credentials.client_email,
      null,
      credentials.private_key.replace(/\\n/g, '\n'),
      ['https://www.googleapis.com/auth/spreadsheets']
    )

    const sheets = google.sheets({ version: 'v4', auth: client })
    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID
    const sheetName = 'Submissions'

    // Read the first row (headers) to dynamically create the mapping
    const headerResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!1:1`,
    })

    const headers = headerResponse.data.values[0]
    const rowData = new Array(headers.length).fill('')

    // Generate a reverse map from camelCase to original header
    const headerMap = headers.reduce((acc, header) => {
      acc[toCamelCase(header)] = header
      return acc
    }, {})

    // Populate rowData based on the request body and headerMap
    Object.keys(req.body).forEach((key) => {
      const headerIndex = headers.indexOf(headerMap[key])
      if (headerIndex !== -1) {
        rowData[headerIndex] = req.body[key]
      }
    })

    // Append the current date to the "Date Added" column
    const dateAddedIndex = headers.indexOf('Date Added')
    if (dateAddedIndex !== -1) {
      rowData[dateAddedIndex] = new Date().toISOString() // Formats the date as "YYYY-MM-DDTHH:MM:SS.sssZ"
    } else {
      console.log('Date Added column not found')
    }

    // Append the new row
    const appendResponse = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:Z`,
      valueInputOption: 'USER_ENTERED',
      resource: { values: [rowData] },
    })

    res.status(200).json({ status: 'success', data: appendResponse.data })
  } catch (error) {
    console.error('Error connecting to Google Sheets', error)
    res.status(500).json({ status: 'error', message: error.message })
  }
}

export default handler
