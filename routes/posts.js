const express = require('express');
const router = express.Router();
const Post = require("../schemas/post");

router.post("/posts", async (req, res) => {
   try{
 const { user, password, title, content} = req.body;
 const date = new Date().toISOString();
  await Post.create({ user, password, title, content,date});
  res.json({"message":"게시글을 생성하였습니다."});
  } catch {return res.status(400).json("400Error")}
});

router.get("/posts",async (req, res) =>{
    try{
 const post = await Post.find({});
 const result = post.map((post)=>{return {
    "_id":post._id,
    "user":post.user,
    "title":post.title,
    "content":post.content,
    "createdAt":post.date}
});
 res.json({result})}
 catch{return res.status(400).json("400Error")}
});

router.get("/posts/:_postid",async (req,res)=>{
    try{
    const {_postid} = req.params;
    const [postplus] = await Post.find({"_id":_postid});
    console.log(typeof postplus)
    console.log(postplus.user)
    const result = {
        "_id":postplus._id,
        "user":postplus.user,
        "title":postplus.title,
        "content":postplus.content,
        "createdAt":postplus.date
    };
    res.json({result});
    
    } catch{return res.status(400).json("400Error")}
});


router.put("/posts/:_postid",async(req,res)=>{
    try{
    const {_postid} = req.params
    const {password,title,content} = req.body;
    const [post] = await Post.find({"_id":_postid});
    const postPassword = post.password;
    if(password===postPassword){
        await Post.updateOne({_id:_postid},{$set:{password:password,title:title,content:content}})
    } else{
        return res.json({"message":"잘못된 정보 입니다."})
    };
    res.json({"message":"게시글을 수정하였습니다."})
    } 
    catch{return res.status(400).json("400Error")}
});

router.delete("/posts/:_postid",async(req,res)=>{
     try{
    const{_postid} = req.params;
    const{password} = req.body;
    console.log(password)
    const [deletePost] = await Post.find({_id:_postid})
    const deletePassword = deletePost.password
    console.log(deletePost._id)
    if(deletePassword == password){
        await Post.deleteOne({_postid});
    }else {return res.json({"message":"비밀번호 오류입니다."});}
    res.json({"message":"게시글을 삭제하였습니다."})
    }
    catch{return res.status(400).json("400Error")}
});

module.exports = router;