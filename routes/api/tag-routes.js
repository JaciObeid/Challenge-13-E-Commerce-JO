const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try{
    const dataTag = await Tag.findAll({
  // be sure to include its associated Product data
      include: [{model: Product, through: ProductTag}]
    });
    res.status(200).json(dataTag);
    } 
  catch (err){
    res.status(500).json(err);
    }
}); 

// find a single tag by its `id`
router.get('/:id', async (req, res) => {
  try {
    const dataTag = await Tag.findByPk(req.params.id, {// be sure to include its associated Product data
      include: [{ model: Product, through: ProductTag }]
    });

    if (!dataTag) {
      res.status(404).json({ message: 'No Tag with that information found' });
      return;
    }

    res.status(200).json(dataTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try{
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  }
  catch (err){
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
try{
  const updateTag = await Tag.update(req.body,{
    where:
    {id:req.params.id}
  });
  if (!updateTag[0]){
    res.status(404).json({message: 'No tag found with that information.'});
  }
  res.status(200).json({message: 'Tag has been updated'});
}
  catch (err){
    res.status(500).json(err);
  }

});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
try{
  const deleteTag = await Tag.destroy({
    where: {
      id:req.params.id}
    
    });
    if (!deleteTag){
      res.status(404).json({message: 'No tag with that information found'});
      return;
    }
    res.status(200).json({message: 'Tag has been deleted'});
  }
    catch(err){
      res.status(500).json(err);
    }
  });




module.exports = router;
