import express from 'express';
import Post from '../schemas/post.js';

// Express.js의 라우터를 생성합니다.
const router = express.Router();

// 게시글 작성 API : POST
router.post("/", async (req, res) => {

    const { user, password, title, content } = req.body

    try {
        await Post.create({
            user,
            password,
            title,
            content,
        })
        res.json({ message: "게시글을 생성하였습니다." })
    } catch (err) {
        res.status(400).json({ message: "데이터 형식이 올바르지 않습니다!!!!!!" })
    }
})


// 게시글 조회 API : GET
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find({}).sort({ createdAt: -1 })
        const serchPosts = posts.map((post) => {
            return {
                "postId": post["_id"],
                "user": post["user"],
                "title": post["title"],
                "createdAt": post["createdAt"]
            }
        })
        return res.status(200).json({ data: serchPosts })
    } catch (err) {
        console.log(err);
    }
})


// 게시글 상세 조회 API : GET
router.get("/:_postId", async (req, res) => {
    try {
        const postId = req.params
        const post = await Post.findById({ _id: postId["_postId"] })

        const onePost = {
            "postId": post["_id"],
            "user": post["user"],
            "title": post["title"],
            "content": post["content"],
            "createdAt": post["createdAt"]
        }
        return res.status(200).json({ data: onePost })
    } catch (err) {
        res.status(400).json({ message: "상세조회에 실패했습니다." })
    }
})


// 게시글 수정 API : PUT
router.put("/:_postId", async (req, res) => {
    try {
        const postId = req.params._postId;
        const { password, title, content } = req.body;

        const existingPost = await Post.findOne({ _id: postId });
        if (!existingPost) {
            return res.status(404).json({ message: "게시글 조회에 실패했습니다." });
        }

        const dbPassword = existingPost.password;

        if (dbPassword === password) {
            await Post.updateOne(
                { _id: postId },
                {
                    title,
                    content,
                }
            );
            return res.status(204).json({ message: "게시글을 수정하였습니다." }); // message  가 뜨지 않은 이유는 무엇인가???
        } else {
            return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "서버 오류가 발생했습니다." });
    }
});


// 게시글 삭제 API : DELETE
router.delete("/:_postId", async (req, res) => {
    try {
        const postId = req.params

        const existPost = await Post.findOne({ _id: postId["_postId"] })
        if (!existPost) {
            return res.json({ message: "게시글 조회에 실패했습니다." })
        }

        const post = await Post.deleteOne({ _id: postId["_postId"] })

        res.json({ message: "게시글을 삭제하였습니다." })
    } catch (err) {
        res.status(400).json({ message: "데이터 형식이 올바르지 않습니다." })
    }
})

export default router;