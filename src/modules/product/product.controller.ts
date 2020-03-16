import BaseController from '../../common/base/controller.base';
import ProductRepository from './product.repository';
import { BadRequestException } from '../../common/error';
import { ERR_CREATE_PRODUCT, ERR_GET_PRODUCT_LIST, ERR_UPDATE_PRODUCT, ERR_DELETE_PRODUCT, ERR_MISSING_INPUT } from './product.message';
import CategoryRepository from '../category/category.repository';
import { ERR_GET_CATEGORY_LIST } from '../category/category.message';

class ProductController extends BaseController {
    productRepository: ProductRepository;
    categoryRepository: CategoryRepository;
    constructor() {
        super();
        this.productRepository = new ProductRepository();
        this.categoryRepository = new CategoryRepository();
    }

    //create product
    async createProduct(req: any, res: any, next: any) {
        try {
            let { productName, categoryID } = req.body;
            if (!productName || !categoryID) {
                throw new BadRequestException(ERR_MISSING_INPUT)
            }
            let productCreate = await this.productRepository.create(req.body);
            if (!productCreate) {
                throw new BadRequestException(ERR_CREATE_PRODUCT);
            }
            return res.json(
                productCreate,
            )
        } catch (err) {
            next(err);
        }
    }

    async getProductByCategoryID(req: any, res: any, next: any) {
        let { categoryname, limit, page } = req.params;
        try {
            let findCategory = await this.categoryRepository.findCategory(categoryname);
            if (!findCategory) {
                throw new BadRequestException(ERR_GET_CATEGORY_LIST);
            }
            let categoryID = findCategory.ID;
            let getProduct = await this.productRepository.getProductByCategoryID(categoryID, limit, page);
            if (!getProduct) {
                throw new BadRequestException(ERR_GET_PRODUCT_LIST);
            }
            return res.json(
                getProduct
            )
        } catch (err) {
            next(err)
        }
    }

    //get list
    async getAllProduct(req: any, res: any, next: any) {
        let { limit, page } = req.params;
        try {
            let productList = await this.productRepository.getList(limit, page);
            if (!productList) {
                throw new BadRequestException(ERR_GET_PRODUCT_LIST);
            }
            return res.json(
                productList
            )
        } catch (err) {
            next(err);
        }
    }

    async getNewStyle(req: any, res: any, next: any) {
        let { limit, page } = req.params;
        try {
            let productList = await this.productRepository.getNewStyleList(limit, page);
            if (!productList) {
                throw new BadRequestException(ERR_GET_PRODUCT_LIST);
            }
            return res.json(
                productList
            )
        } catch (err) {
            next(err);
        }
    }

    //get product
    async getProduct(req: any, res: any, next: any) {
        let { id } = req.params;
        try {
            console.log(id)
            if (!id) {
                throw new BadRequestException(ERR_MISSING_INPUT);
            }
            let productData = await this.productRepository.getProduct(id);
            if (!productData) {
                throw new BadRequestException(ERR_GET_PRODUCT_LIST);
            }
            return res.json(
                productData
            )
        } catch (err) {
            next(err);
        }
    }

    //update product
    async updateProduct(req: any, res: any, next: any) {
        try {
            let { productid } = req.params;
            let data = req.body;
            delete data["id"]
            let updateProduct = await this.productRepository.update(productid, data);
            if (!updateProduct) {
                throw new BadRequestException(ERR_UPDATE_PRODUCT);
            }
            return res.json(
                updateProduct
            )
        } catch (err) {
            next(err);
        }
    }

    //delete product
    async deleteProduct(req: any, res: any, next: any) {
        try {
            let { productid } = req.params;
            let deleteProduct = await this.productRepository.update(productid, { isDeleted: true });
            if (!deleteProduct) {
                throw new BadRequestException(ERR_DELETE_PRODUCT);
            }
            return res.json(
                deleteProduct,
            )
        } catch (err) {
            next(err)
        }
    }
}

export default ProductController;

