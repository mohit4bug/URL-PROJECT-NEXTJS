import Link from "@/models/Link"

export default async function handler(req, res) {
    try {
        const keyword = req.query.keyword.toLowerCase();
        if (!keyword) {
            return res.status(400).json({
                error: 'Invalid request!'
            })
        }
        const isExists = await Link.findOne({
            keyword: keyword
        })

        console.log(isExists, keyword)

        if (!isExists) {
            return res.redirect('/404')
        }
        return res.redirect(isExists.source)
    }
    catch (error) {
        return res.redirect('/404')
    }
}