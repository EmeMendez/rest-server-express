const Product = require('../models/product'); 
const { saveFile } = require('../helpers/save-file.js');

const createProduct = async (req, res) => {
    const { name,category,price,available } = req.body;
    const { image } = req.body.files;
    const imagePath = saveFile(image, 'products');
    const  { _id } = req.user
    const newProduct = new Product(
        { 
            name, 
            user : _id,
            category,
            price,
            available,
            image: imagePath
    });
    await newProduct.save();
   const product = await Product.findOne({'_id' : newProduct._id })
   .populate('user', ['name','lastname','email', 'avatar', 'role', 'is_active','created_in_google', 'created_at', 'updated_at'])
   .populate({
       path: 'category',
       select: ['name', 'is_active', 'user', 'created_at', 'updated_at'],
       populate: { 
           path: 'user',
           select: ['name','lastname','email', 'avatar', 'role', 'is_active','created_in_google', 'created_at', 'updated_at']
       }
     })

    res.status(201).json(product);
};

const getProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById( id )
    .populate('user', ['name','lastname','email', 'avatar', 'role', 'is_active','created_in_google', 'created_at', 'updated_at'])
    .populate({
        path: 'category',
        select: ['name', 'is_active', 'user', 'created_at', 'updated_at'],
        populate: { 
            path: 'user',
            select: ['name','lastname','email', 'avatar', 'role', 'is_active','created_in_google', 'created_at', 'updated_at']
        }
    });
    res.json(product);
};

const getProducts = async (req, res) => {
    const { limit, offset, is_active } = req.query;
    const query = { is_active};

    const [ total, products ] = await Promise.all([
        Product.count(query),
        Product.find(query)
        .populate('user', ['name','lastname','email', 'avatar', 'role', 'is_active','created_in_google', 'created_at', 'updated_at'])
        .populate({
            path: 'category',
            select: ['name', 'is_active', 'user', 'created_at', 'updated_at'],
            populate: { 
                path: 'user',
                select: ['name','lastname','email', 'avatar', 'role', 'is_active','created_in_google', 'created_at', 'updated_at']
            }
          })
        .skip(Number(offset))
        .limit(Number(limit))
    ]);
    res.json({
        total,
        products,
    });
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, { is_active : false}, {new: true});
    res.status(204).json(product);
};

const updateProduct = async (req, res) => {
    const { id } = req.params;

    const { name,category,price,available } = req.body;
    await Product.findByIdAndUpdate(id,
    { 
        name,
        category,
        price,
        available
    });
   const product = await Product.findOne({'_id' : id })
   .populate('user', ['name','lastname','email', 'avatar', 'role', 'is_active','created_in_google', 'created_at', 'updated_at'])
   .populate({
       path: 'category',
       select: ['name', 'is_active', 'user', 'created_at', 'updated_at'],
       populate: { 
           path: 'user',
           select: ['name','lastname','email', 'avatar', 'role', 'is_active','created_in_google', 'created_at', 'updated_at']
       }
     })
    res.json(product);
};


module.exports = { 
    createProduct, 
    getProduct,
    getProducts,
    deleteProduct,
    updateProduct
};