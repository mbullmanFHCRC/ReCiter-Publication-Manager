import { findAll } from "../../../../../controllers/db/person.controller"
import type { NextApiRequest, NextApiResponse } from 'next'
import { Person } from '../../../../db/models/Person'

export default async function handler(req: NextApiRequest,
    res: NextApiResponse<Person | string>) {
    if (req.method === "GET") {
        const offset = req.query.offset as string
        const limit = req.query.limit as string
        if(offset && limit)
            await findAll(req, res, Number.parseInt(offset), Number.parseInt(limit))
        else
        await findAll(req, res, offset, limit)
    } else {
        // Default this to a bad request for now
        res.status(400).send('Bad request')
    }
}