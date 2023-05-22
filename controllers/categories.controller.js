const Category = require('../models/category'); 

const getCategories = async (req, res) => {
    const { limit, offset, is_active } = req.query;
    const query = { is_active};

    const [ total, categories ] = await Promise.all([
        Category.count(query),
        Category.find(query)
            .skip(Number(offset))
            .limit(Number(limit))
    ]);
    res.json({
        total,
        categories,
    });
};

const getCategory = async (req, res) => {
    const { id } = req.params;
    const category = await Category.findOne({ '_id': id })
    .populate('user', ['name','lastname','email', 'avatar', 'role', 'is_active','created_in_google', 'created_at', 'updated_at']);
    res.json(category);
};

const createCategory = async (req, res) => {
    const { name } = req.body;
    const  { _id } = req.user
    const newCategory = new Category({ name : name.toUpperCase(), user : _id });
    await newCategory.save();
   const category = await Category.findOne({'_id' : newCategory._id })
   .populate('user', ['name','lastname','email', 'avatar', 'role', 'is_active','created_in_google', 'created_at', 'updated_at'], );

    res.status(201).json(category);
};

const updateCategory =  async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const category = await Category.findByIdAndUpdate(id,{ name : name.toUpperCase()},
        { 
            returnDocument: true,
            new: true
        });
    res.json(category);
};
const deleteCategory = async (req, res) => {
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(id, { is_active : false}, {new: true});
    res.status(204).json(category);
};

module.exports = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}

