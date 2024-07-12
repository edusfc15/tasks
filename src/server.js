import http from 'node:http'

import { json } from './middlewares/json.js'

const server = http.createServer(async (req, res) => {
    const { method, url } = req

    if (method === 'GET' && url === '/users') {
        res.end('Lista de usuarios')
        return
    }

    if (method === 'POST' && url === '/users') {
        res.end('Criacao de usuarios')
        return
    }


    await json(req, res)

}

)

server.listen(3333)