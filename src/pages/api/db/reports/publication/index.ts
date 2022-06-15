import type { NextApiRequest, NextApiResponse } from 'next';
import { reciterConfig } from '../../../../../../config/local';
import { generatePubsRtf } from '../../../../../../controllers/db/reports/publication.report.controller';
import { GeneratePubsApiBody } from '../../../../../../types/publication.report.body';

export default async function handler(req: NextApiRequest,
    res: NextApiResponse<Buffer | string>) {
    if (req.method === "POST") {
        if(req.headers.authorization !== undefined && req.headers.authorization === reciterConfig.backendApiKey) {
            const apiBody: GeneratePubsApiBody = req.body;
            const generatePubsRtfOutput: any = await generatePubsRtf(req, res)
            try{
                const fileBuffer = Buffer.from(generatePubsRtfOutput, 'utf-8')
                res.setHeader('Content-Type', 'application/rtf')
                res.setHeader('Content-Disposition', 'attachment; filename=' + apiBody.personIdentifiers + '.rtf');
                console.log('Creating the file buffer for generatePubsRtf with params: ' + apiBody)
                res.status(200).send(fileBuffer)
            } catch(err) {
                console.log('Error with the file for generatePubsRtf for ' + apiBody + ': ' + err)
                res.status(500).send('Error with the file for generatePubsRtf for ' + apiBody + ': ' + err)
            }
        } else if(req.headers.authorization === undefined) {
            res.status(400).send("Authorization header is needed")
        } else {
            res.status(401).send("Authorization header is incorrect")
        }
    } else {
         // Default this to a bad request for now
         res.status(400).send('HTTP Method supported is POST')
    }
}