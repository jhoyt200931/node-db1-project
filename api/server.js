const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get('/', async (req, res) => {
    try {
        const accounts = await db('accounts')
        res.status(200).json(accounts)
    } catch (error) {
        res.status(500).json({message: 'There was an error retrieving the accounts'})
    }
})

server.post('/', async (req, res) => {
    const body = req.body;
    try {
        const account = await db.insert(body).into('accounts')
        res.status(201).json(account)
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'There was an error creating the account'})
    }
})

server.put('/:id', async (req, res) => {
    const {id} = req.params;
    const changes = req.body;
    try {
       const account = await db('accounts').where({id}).update(changes)
       res.status(200).json(account)
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'There was an error updating the account'})
    }
})

server.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try {
       const count = await db.del().from('accounts').where({id});
       count ? res.status(200).json({message: 'Account deleted'}) : res.status(404).json({message: 'Unable to delete account'})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'There was an error deleting the account from the database'})
    }
})

module.exports = server;
