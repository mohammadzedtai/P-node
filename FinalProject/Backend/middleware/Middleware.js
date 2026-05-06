import jwt from 'jsonwebtoken';
import { Post } from "../model/Model.js"
/// authMiddleware
export const authMiddle = async (req, res, next) => {
    try {
        const authToken = req.headers.authorization;
        if (!authToken || !authToken.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Unauthorized- Token Missing"
            })
        }

        const token = authToken.split(" ")[1];


        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

        req.user = decoded

        next()
    } catch (error) {
        return res.status(401).json({
            message: `Unauthorized- Token Error ${error.message}`

        })
    }
}



/// ownerShipMiddleware
export const ownMiddle = async (req, res, next) => {
    try {

        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).json({
                message: "not found"
            })
        }
        if (post.autherId.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You can only modify your own posts"
            });
        }

        req.post = post

        next()
    } catch (error) {
        return res.status(500).json({
            message: `Ownership check failed${error.message}`

        });
    }
}