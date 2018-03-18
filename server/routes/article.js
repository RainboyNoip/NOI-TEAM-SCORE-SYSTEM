var express = require('express');
var router = express.Router();
var Promise = require('bluebird')
var gen_id = require('shortid').generate

var MA = M['article']
/* GET article listing. */
router.get('/',async function(req, res, next) {

  debug('query:',req.query)
  let page = req.query.page || 1
  let pageSize = req.query.pageSize || 10
  
  page = parseInt(page)
  pageSize = parseInt(pageSize)

  let query = MA.find({hidden:false})
  let query_data = {hidden:false}

  if( req.query.tags){
    debug( req.query.tags)
    let tags = []
    tags.push( req.query.tags)
    debug("tags:",tags)
    query  = query.where("tags").in(tags)
    query_data.tags = {"$in":tags}
  }

  if( req.query.author){
    debug('query author:',req.query.author)
    query_data.author = req.query.author
    query = query.where('author').equals(req.query.author)
  }

  if( req.query.title){
    debug('query title:',req.query.title)
    let title = req.query.title
    query_data.title = {"$regex":title,"$options":"si"}
    query = query.where({title:{"$regex":title,"$options":"si"}})
  }


  let sort = "-update"
  if(req.query.sort == '1'){
    sort = "update"
    debug("sort:",sort)
    query = query.sort(sort)
  }

  let count = await MA.find(query_data).count()

  let skip= Math.ceil(page-1)*pageSize
  let limit = pageSize
  let data = await query.sort(sort).skip(skip).limit(limit).select("-content")

  res.json({
    page:page,
    pageSize:pageSize,
    count:count,
    data:data
  })

});

router.get('/:id',async function(req, res, next) {
  //let doc = await MA.findOne({_id:req.params.id,hidden:false})
  //let nn = await MA.findOneAndUpdate({_id:req.params.id},{"$inc":{visits:1}})
  let doc = await MA.findOneAndUpdate({_id:req.params.id,hidden:false},{"$inc":{visits:1}})

  if(doc == null){
    res.json({
      status:-1,
      message:"not found"
    })
  }
  else {
    res.json({
      status:0,
      doc:doc
    })
  }
});


router.get('/opt/ta',async function(req,res,next){
  let docs = await MA.find({hidden:false}).select("tags author")
  let tags_set = new Set();
  let authors_set = new Set();

  await Promise.map(docs,function(data){
    if( typeof(data.tags) == 'object')
    data.tags.forEach(function(_data){ tags_set.add(_data)})

    if(data.author)
    authors_set.add(data.author)
  })
  res.json({
    status:0,
    tags:Array.from(tags_set),
    authors:Array.from(authors_set)
  })
})


router.post('/opt/upload',verifyToken,async function(req, res, next) {
  let body = req.body
  body.author = body.author || 'unkown'

  if( body._id == null || body._id == undefined) // 未定义_id的时候
    body._id = gen_id()
  let _id = body._id
  //let doc = await MA.findOne({_id:_id})

  //if(doc == null){
    //doc = await MA.create(body)
    //res.json({
      //status:0,
      //doc:doc
    //})
    //return 
  //}

  //if( doc.md5 === body.md5){
    //res.json({
      //status:0,
      //doc:doc
    //})
    //return 
  //}

  delete body._id
  doc = await MA.findOneAndUpdate({_id:_id},body,{upsert:true,setDefaultsOnInsert:true})
  res.json({
    status:0,
    doc:doc
  })

})

module.exports = router;
