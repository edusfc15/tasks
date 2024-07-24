import http from 'node:http'
import { json } from './middlewares/json.js'
import { title } from 'node:process';

const users = [];
const tasks = [];

const server = http.createServer(async (req, res) => {
    const { method, url } = req
    await json(req, res)

    if (method === 'GET' && url === '/users') {
        return res
            .setHeader('Content-Type', 'application/json')
            .end(JSON.stringify(users))
    }

    if (method === 'POST' && url === '/users') {

        const { name, email } = req.body
        users.push({
            id: 1,
            name,
            email
        })
        return res.writeHead(201).end()

    }

    
    if (method === 'GET' && url === '/tasks') {

        return res
            .setHeader('Content-Type', 'application/json')
            .end(JSON.stringify(tasks))
    }

    if (method === 'POST' && url === '/tasks') {

        const { title, description } = req.body
        tasks.push({
            id: tasks.length + 1,
            title,
            description,
            completed_at: null,
            created_at: new Date(),
            updated_at: new Date()
        })
        return res.writeHead(201).end()

    }

    if (method === 'PUT' && url === '/tasks/:id') {

        const { title, description } = req.body
        const { id } = req.params;
        const taskIndex = tasks.findIndex(task => task.id === id);
        if (title && description) {
            tasks[taskIndex].title = title
            tasks[taskIndex].description = description
        }
        return res.writeHead(200).end()

    }


    if (method === 'DELETE' && url === '/tasks/:id') {

        const { id } = req.body
        const taskIndex = tasks.findIndex(task => task.id === id)
        tasks.splice(taskIndex, 1)

        return res.writeHead(200).end()
    }

    if (method === 'PATCH' && url === '/tasks/:id/complete') {

        const { id } = req.body
        const taskIndex = tasks.findIndex(task => task.id === id)

        if (tasks[taskIndex].completed_at) {
            tasks[taskIndex].completed_at = null
        } else{
            tasks[taskIndex].completed_at = new Date()
        }

        return res.writeHead(200).end()
        
    }
    return res.writeHead(404).end()
}

)

server.listen(3333)