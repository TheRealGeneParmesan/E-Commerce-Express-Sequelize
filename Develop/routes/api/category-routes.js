const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint

// get all categories
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }]
    })
    res.status(200).json(categoryData)
  } catch (error) {
    res.status(500).json(error)
  }

});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    })
    if (!categoryData) {
      res.status(404).json({ message: "No category found with that id!" });
      return;
    }
    res.status(200).json(categoryData);
  }
  catch (error) {
    res.status(500).json(error)
  }
});

router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create({
      category_name: req.body.category_name
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: "No category found with that id!" });
      return;
    }
    const updatedCategoryData = await Category.findByPk(req.params.id);
    res.status(200).json(updatedCategoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: "No category found with that id!" });
      return;
    }
    res.status(200).json(categoryData);
  }
  catch (error) {
    res.status(500).json(error)
  }
});

module.exports = router;
