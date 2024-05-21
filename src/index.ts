import { ProductManager, IProduct } from "./interfaces";

class ProductList implements ProductManager{
    private productList: IProduct[] = [];
    private id: number = 1;

    createProduct(data:{name: string, price: number}){
        const {name, price} = data;
        
        const newProduct: IProduct = {
            id: this.id++,
            name: name,
            price: price,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        this.productList.push(newProduct);
        return newProduct;
    }

    getProducts(): IProduct[] {
        return this.productList;
    }

    getOneProduct(id: number): IProduct | undefined {
        return this.productList.find(product => product.id === id);
    }

    updateProduct(id: number, data: { name?: string; price?: number }): IProduct {
        const index = this.productList.findIndex(product => product.id === id);
        if (index === -1) {
            throw new Error('Product not found');
        }
        const currentProduct = this.productList[index];
        const updatedProduct: IProduct = {
            ...currentProduct,
            updatedAt: new Date(),
            ...data
        };
        this.productList[index] = updatedProduct;
        return updatedProduct;
    }

    deleteProduct(id: number): { message: string } {
        const index = this.productList.findIndex(product => product.id === id);
        if (index === -1) {
            throw new Error('Product not found');
        }
        this.productList.splice(index, 1);
        return { message: 'Product successfully deleted.' };
    }
}

export const productList = new ProductList();