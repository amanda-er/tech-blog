const router = require('express').Router();
const { Posts } = require('../../../project-2/models');
const withAuth = require("../../../project-2/utils/auth")
// /api/posts

// Creates a post
router.post('/', async (req, res) => {
    try {
        const newPost = await Posts.create({
            ...req.body,
            user_id: req.session.user_id
        });
        res.status(200).json(newPost);
    } catch (err) {
        console.log(err);
        res.status(500).json(err.message);
    }
});

router.delete("/:id", withAuth, async (req, res) => {
    try {
     const dbRes = await Posts.destroy({
        where: {
            id: req.params.id
        }
     })   

     res.status(200).json(dbRes);
    } catch (err) {
        console.log(err);
        res.status(500).json(err.message);  
    }
})

module.exports = router;  