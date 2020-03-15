import BaseController from '../../common/base/controller.base';
import CategoryRepository from './category.repository';
import { BadRequestException } from '../../common/error';
import { ERR_CREATE_CATEGORY, ERR_DELETE_CATEGORY, ERR_GET_CATEGORY_LIST, ERR_UPDATE_CATEGORY } from './category.message';

class ProductController extends BaseController {
    categoryRepository: CategoryRepository
    constructor() {
        super();
        this.categoryRepository = new CategoryRepository();
    }

    //create product
    async createCategory(req: any, res: any, next: any) {
        try {
            let data = req.body;
            let categoryCreate = await this.categoryRepository.create(data);
            if (!categoryCreate) {
                throw new BadRequestException(ERR_CREATE_CATEGORY);
            }
            return res.json(
                categoryCreate,
            )
        } catch (err) {
            next(err);
        }
    }

    //get list
    async getAllCategory(req: any, res: any, next: any) {
        let { limit, page } = req.params;
        try {
            let categoryList = await this.categoryRepository.getList(limit, page);
            if (!categoryList) {
                throw new BadRequestException(ERR_GET_CATEGORY_LIST);
            }
            return res.json(
                categoryList
            )
        } catch (err) {
            next(err);
        }
    }

    async getCategoryByID(req: any, res: any, next: any) {
        try {

        } catch (err) {
            next(err)
        }
    }

    //update product
    async updateCategory(req: any, res: any, next: any) {
        try {
            let { categoryid } = req.params;
            let data = req.body;
            delete data["id"]
            let updateCategory = await this.categoryRepository.update(categoryid, data);
            if (!updateCategory) {
                throw new BadRequestException(ERR_UPDATE_CATEGORY);
            }
            return res.json({
                updateCategory
            })
        } catch (err) {
            next(err);
        }
    }

    //delete product
    async deleteCategory(req: any, res: any, next: any) {
        try {
            let { categoryid } = req.params;
            let categoryProduct = await this.categoryRepository.update(categoryid, { isDeleted: true });
            if (!categoryProduct) {
                throw new BadRequestException(ERR_DELETE_CATEGORY);
            }
            return res.json({
                categoryProduct,
            })
        } catch (err) {
            next(err)
        }
    }
}

export default ProductController;

