import './styles.css';
import Link from "next/link";

export default function Product({ products }: { products: any }) {
    return (
        <div>
            <Link href={`/product/${products.id}`}>
                {products?.url ? (
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-auto h-auto md:h-[550px] lg:h-[465px] md:w-[400px] transition-transform duration-200 hover:-translate-y-1 mb-8">
                        <img src={products?.url} alt="Product" className="w-full h-[300px] lg:h-[200px] object-cover object-center transition-transform duration-200 hover:scale-105"/>
                        <div className="p-4 lg:p-6">
                            <h2 className="font-semibold text-lg lg:text-xl text-gray-800 mb-2 lg:mb-4">{products?.title}</h2>
                            <p className="text-gray-700 mb-1 lg:mb-1">Categories : {products?.category} </p>
                            <p className="text-gray-700 mb-1 lg:mb-1">Price : ${products?.price}</p>
                            <p className="text-gray-700 mb-1 lg:mb-1">Owner: {products?.createdByUsername}</p>
                        </div>
                    </div>
                ) : null}
            </Link>
        </div>
    );
}
