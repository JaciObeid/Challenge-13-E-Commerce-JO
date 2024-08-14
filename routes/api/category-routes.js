const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try{
    const dataCategory = await Category.findAll({include:[{model : Product}],});// be sure to include its associated Products

    res.status(200).json(dataCategory);
  }
  catch(err){
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }], // be sure to include its associated Products
    });
    if (!categoryData) {
      res.status(404).json({ message: 'Category can not be found with this information' });
      return;
    }
    res.status(200).json(categoryData);
  }
  catch (err) {
    res.status(500).json(err);
  }
  
  
});


router.post('/', async(req, res) => {
  // create a new category
  try{
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch(err){
    res.status(400).json(err);
  }
});

router.put('/:id', async(req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!updateCategory[0]) {
      res.status(404).json({ message: 'Category can not be found with this information' });
      return;
    }
    res.status(200).json({ message: 'Category has been updated!' });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // Delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deleteCategory) {
      res.status(404).json({ message: 'Category can not be found with this information' });
      return;
    }

    res.status(200).json({ message: 'Category has been deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
