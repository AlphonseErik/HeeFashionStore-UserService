import CategoryModel from './model/category.model';
import { ICreateCategory, ICategory } from './category.interface';

class CategoryRepository {
    constructor() {

    }

    async create(data: any): Promise<ICreateCategory | null | any> {
        return CategoryModel.create(data);
    }

    async update(ID: String, dataUpdate: any): Promise<ICategory | any | null> {
        const isUpdate = await CategoryModel.updateOne({
            ID
        },
            dataUpdate
        );
        if (isUpdate) {
            return true;
        }
        return false;
    }

    async findCategory(ID: string) {
        return CategoryModel.findOne({
            ID
        })
    }

    async getList(limit: number = 12, page: number = 1) {
        return CategoryModel.find({
            isDeleted: false,
        }).select('-_id, -__v');
    }

    async getCategory(productid: string) {
        return CategoryModel.findOne({
            ID: productid,
            isDeleted: false,
        }).select('-_id -updatedAt -__v -isDeleted')
    }
}

export default CategoryRepository;