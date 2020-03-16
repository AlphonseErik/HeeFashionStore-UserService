import ProductModel from './model/product.model';
import { ICreateProduct, IProduct } from './product.interface';

class ProductRepository {
    constructor() {

    }

    async create(data: any): Promise<IProduct> {
        return ProductModel.create(data);
    }

    async update(productid: String, dataUpdate: any): Promise<IProduct | any | null> {
        const isUpdate = await ProductModel.updateOne({
            productid
        },
            dataUpdate
        );
        if (isUpdate) {
            return true;
        }
        return false;
    }

    async getList(limit: number = 6, page: number = 1) {
        return ProductModel.paginate({
            isDeleted: false,
        }, {
            sort: { createdAt: -1 },
            limit: Number(limit),
            page: Number(page),
            select: "-_id -createdAt -updatedAt -__v -isDeleted"
        });
    }

    async getNewStyleList(limit: number = 6, page: number = 1) {
        return ProductModel.paginate({
            isNewest: true,
            isDeleted: false,
        }, {
            sort: { createdAt: -1 },
            limit: Number(limit),
            page: Number(page),
            select: "-_id -createdAt -updatedAt -__v -isDeleted"
        });
    }

    async getProductByCategoryID(data: String, limit: number = 6, page: number = 1) {
        return ProductModel.paginate({
            categoryID: data,
            isDeleted: false,
        }, {
            sort: { createdAt: -1 },
            limit: Number(limit),
            page: Number(page),
            select: "-_id -createdAt -updatedAt -__v -isDeleted"
        });
    }

    async getProduct(productid: string) {
        return ProductModel.findOne({
            ID: productid,
            isDeleted: false,
        }).select('-_id -updatedAt -__v -isDeleted')
    }
}

export default ProductRepository;