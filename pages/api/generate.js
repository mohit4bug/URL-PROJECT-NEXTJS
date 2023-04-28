import dbConnect from "@/lib/mongo"
import Link from "@/models/Link"

export default async function handler(req, res) {
    await dbConnect()

    if (req.method === 'POST') {
        try {
            const source = req.body.source.toLowerCase()
            const keyword = req.body.keyword.toLowerCase()

            if (!source || !keyword || source === keyword) {
                return res.status(400).json({
                    error: 'Incorrect fields!'
                })
            }

            const sourceRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i
            if (!sourceRegex.test(source)) {
                return res.status(400).json({
                    error: 'Invalid source url!'
                })
            }

            const keywordRegex = /^(?!.*(?:https?|ftp):\/\/)(?!.*\.)[^\s]+$/
            if (!keywordRegex.test(keyword)) {
                return res.status(400).json({
                    error: 'Invalid keyword!'
                })
            }

            const isExists = await Link.findOne({
                keyword: keyword
            })

            if (isExists) {
                return res.status(400).json({
                    error: 'Keyword already present!'
                })
            }

            const newKeyword = await Link.create({
                keyword,
                source
            })
            await newKeyword.save()

            return res.status(200).json({
                message: 'Link created!',
                link: process.env.DOMAIN + 'api/' + keyword
            })

        } catch (error) {
            return res.status(500).json({
                error: 'Something went wrong!'
            })
        }

    }
}