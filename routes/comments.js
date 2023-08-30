import express from 'express';
import mongoose from 'mongoose';
import comment from '../schemas/comment.js';

// Express.js의 라우터를 생성합니다.
const router = express.Router();

// 댓글 생성 API : POST
router.post("/:postId/comments", async (req, res) => {

    try {
        const { postId } = req.params
        const { user, password, content } = req.body

        if (!content) {
            return res.status(400).json({ message: "댓글 내용 입력 필요!" })
        }

        const comments = await comment.create({
            postId,
            user,
            password,
            content,
        })

        return res.status(200).json({ message: "댓글을 생성하였습니다." })

    } catch (err) {
        res.status(400).json({ message: "데이터 형식이 올바르지 않습니다!" })
    }
})


// 댓글 조회 API : GET
router.get("/:postId/comments", async (req, res) => {
    try {
        const comments = await comment.find({}).sort({ createdAt: -1 })
        const serchComments = comments.map((post) => {
            return {
                "postId": post["_id"],
                "user": post["user"],
                "content": post["content"],
                "createdAt": post["createdAt"]
            }
        })
        return res.status(200).json({ data: serchComments })
    } catch (err) {
        res.status(400).json({ message: "데이터 형식이 올바르지 않아요!!" })
    }
})


// 댓글 수정 API : PUT
router.put("/:postId/comments/:_commentId", async (req, res) => {
    try {
        const commentId = req.params
        const existingComment = await comment.findById(commentId._commentId)
        
        if(!existingComment) {
            return res.status(404).json({message : "댓글 조회에 실패하였습니다."})
        }

        const {password, content} = req.body
        if (!content) {
            return res.status(400).json({ message: "댓글 내용을 입력해주세요." })
        }

        const comments = await comment.updateOne(
            { _id: commentId._commentId },
            {
                password,
                content,
            }
        )

        res.json({ message: "댓글을 수정하였습니다." })
    } catch (err) {
        res.status(500).json({ message: "데이터 형식이 올바르지 않습니다." })
    }
})

// 댓글 삭제 API : DELETE
router.delete("/:postId/comments/:_commentId", async (req, res) => {
    try {
        const {_commentId} = req.params
        const {password} = req.body
        // const existComment = await comment.findOne({ _id: _commentId })


        if (!password) {
            return res.status(400).json({ message: "비밀번호가 틀렸습니다" })
        }
    
        // 댓글 삭제를 시도
        const deletedComment = await comment.deleteOne({ _id: _commentId })
    
        if (deletedComment.deletedCount === 0) {
            return res.status(400).json({ message: "이미 삭제된 댓글입니다." })
        }
    
        res.json({ message: "댓글을 삭제하였습니다." })
    } catch (err) {
        res.status(500).json({ message: "서버 오류가 발생했습니다." })
    }
})

export default router;