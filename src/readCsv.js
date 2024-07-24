import { parse } from 'csv-parse'
import fs from 'fs'

async function readCsvAndSendPost() {
    try {
        const csvData = await fs.promises.readFile('./src/files/tasks.csv', 'utf-8')
        const parser = parse(csvData, { columns: true })

        for await (const task of parser) {
            const postData = task

            const response = await fetch('http://localhost:3333/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            })

            if (response.ok) {
                const responseData = await response.json()
                console.log('POST request sent successfully:', responseData)
            } else {
                console.error('Error:', response.status)
            }
        }
    } catch (error) {
        console.error('Error:', error.message)
    }
}

readCsvAndSendPost()
