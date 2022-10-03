const express = require('express');
const router = express.Router();
const Comment = require("../schemas/comment");
const Post = require("../schemas/post");

router.post("/comments/:_postid", async (req, res) => {
    try{
  const { user, password,content} = req.body;
  const {_postid} = req.params;
  const findpost = await Post.find({"_id":_postid})
  if(findpost.length){
  const date = new Date().toISOString();
   await Comment.create({user, password,content,date,_postid});
   res.json({"message":"댓글을 생성하였습니다."});
  }else{return res.json({"message":"존재하지 않는 게시글 입니다."})}
   } 
   catch {return res.status(400).json("400Error")}
 });

router.get("/comments/:_postid", async (req, res) =>{
    try{
    const {_postid} = req.params;
    const getid = await Post.find({"_id":_postid});
    if(getid.length > 0){
        getResult = await Comment.find({"_postid":_postid});
        
        data = getResult.map((result) =>{return {
            "commentid":result._id,
            "user":result.user,
            "content":result.content,
            "createdAt":result.date
    }})
        res.json({data})
    } else {return res.json({"message":"존재하지 않는 게시글 입니다."})}
     } 
     catch {return res.status(400).json("400Error")}

});

router.put("/comments/:_commentid",async(req,res)=>{
    try{
    const {_commentid} = req.params;
    const {password,content} = req.body;
    const getcomment = await Comment.find({"_id":_commentid});
    const commentPassword = getcomment[0].password;
    if(getcomment.length > 0 && password===commentPassword){
        await Comment.updateOne({"_id":_commentid},{$set:{password:password,content:content}});
        res.json({"message":"댓글을 수정하였습니다."});
    } else {
        return res.json({"message":"잘못된 정보 입니다."})
    };
    }
    catch {return res.status(400).json("400Error")}
})

router.delete("/comments/:_commentid",async(req,res)=>{
    try{
    const{_commentid} = req.params;
    const{password} = req.body;
    const [findComment] = await Comment.find({"_id":_commentid});
    const commentPassword = findComment.password
    console.log(findComment)
    console.log(commentPassword)
    console.log(password)
    if(commentPassword === password){
        await Comment.deleteOne({_id:_commentid});
    }else{return res.json({"message":"비밀번호 오류입니다."});}
    res.json({"message":"댓글을 삭제하였습니다."})
    }
    catch {return res.status(400).json("400Error")}
})

module.exports = router;

