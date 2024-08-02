import React from 'react'

const t = () => {
  return (
    <div>
<head>
    <title>Product Grid</title>
</head>

<body className="bg-gray-100">
    
    <div className="container mx-auto py-12">
        <div className="flex flex-col lg:flex-row items-center mb-6">
            <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Antique Shop</h1>
                <p className="text-lg text-gray-700">Discover unique antique pieces and start bidding today!</p>
            </div>
            <div className="flex-1 mt-6 lg:mt-0 transition-transform duration-200 hover:-translate-y-1">
                <img src="https://www.adpushup.com/blog/wp-content/uploads/2020/05/post-bidding.jpg" alt="Bidding" className="transition-transform duration-200 hover:scale-105 w-full h-auto rounded-lg shadow-lg" />
            </div>
        </div>
    </div>

    <div className="container mx-auto mb-6 flex justify-center">
        <input type="text" placeholder="Search products..." className="py-2 px-4 border border-gray-300 rounded-full w-2/3 md:w-1/3" />
        <button className="py-2 px-4 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition duration-300">Search</button>
    </div>


    <div className="container mx-auto">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Antique Pieces</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            <div className="bg-white shadow-lg rounded-lg overflow-hidden product-card transition duration-300">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfm4oyVieHVLaTJMGsYAgr-EH1BetaxwXTOdkgclHG9aafmLuOcJQalOX6kZMXVcHi9VM&usqp=CAU" alt="Product 1" className="w-full h-56 object-cover object-center transition duration-300"/>
                <div className="p-4">
                    <h2 className="font-semibold text-lg text-gray-800 mb-2">Product 1</h2>
                    <p className="text-gray-700">Price: $120</p>
                    <p className="text-gray-700">Categories: Necklace</p>
                    <p className="text-gray-700">Size: Long</p>
                    <p className="text-gray-700">Weight: 500g</p>
                    <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300">Start Bid</button>
                </div>
            </div>

        
 
            <div className="bg-white shadow-lg rounded-lg overflow-hidden product-card transition duration-300">
                <img src="https://whitegold.money/content/cms/gold-jewellery-holds-banner1-scaled.jpg" alt="Product 2" className="w-full h-56 object-cover object-center transition duration-300"/>
                <div className="p-4">
                    <h2 className="font-semibold text-lg text-gray-800 mb-2">Product 2</h2>
                    <p className="text-gray-700">Price: $80</p>
                    <p className="text-gray-700">Categories: Bangle</p>
                    <p className="text-gray-700">Size: L</p>
                    <p className="text-gray-700">Weight: 250g</p>
                    <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300">Start Bid</button>
                </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg overflow-hidden product-card transition duration-300">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV3rQtTxUc7diWvOAVE2l1Q7bd2mMGW-DW-A&s" alt="Product 3" className="w-full h-56 object-cover object-center transition duration-300"/>
                <div className="p-4">
                    <h2 className="font-semibold text-lg text-gray-800 mb-2">Product 3</h2>
                    <p className="text-gray-700">Price: $70</p>
                    <p className="text-gray-700">Categories: Sofa set</p>
                    <p className="text-gray-700">Size: L</p>
                    <p className="text-gray-700">Weight: 20KG</p>
                    <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300">Start Bid</button>
                </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg overflow-hidden product-card transition duration-300">
                <img src="https://www.royalzig.com/uploads/2020/10/NCR-classNameic-Style-Antique-Walnut-Finish-Dining-Room-Furniture.jpg" alt="Product 4" className="w-full h-56 object-cover object-center transition duration-300"/>
                <div className="p-4">
                    <h2 className="font-semibold text-lg text-gray-800 mb-2">Product 4</h2>
                    <p className="text-gray-700">Price: $120</p>
                    <p className="text-gray-700">Categories: Dining table</p>
                    <p className="text-gray-700">Size: L</p>
                    <p className="text-gray-700">Weight: 25kg</p>
                    <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300">Start Bid</button>
                </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg overflow-hidden product-card transition duration-300">
                <img src="https://static.prinseps.com/media/uploads/photos_2020/antiques_2021.jpg" alt="Product 5" className="w-full h-56 object-cover object-center transition-transform duration-200 hover:scale-105"/>
                   <div className="p-4">
                    <h2 className="font-semibold text-lg text-gray-800 mb-2">Product 5</h2>
                    <p className="text-gray-700">Price: $50</p>
                    <p className="text-gray-700">Categories: Prinseps</p>
                    <p className="text-gray-700">Size: L</p>
                    <p className="text-gray-700">Weight: 300g</p>
                    <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300">Start Bid</button>
                </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg overflow-hidden product-card transition duration-300">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmCUw3SQ06lLLsTsrfI93NI_dOEgmsvn24Z_TXBsk1YvUejaOEGRlXBoe0izx6KgWQqbI&usqp=CAU" alt="Product 6" className="w-full h-56 object-cover object-center transition duration-300"/>
                <div className="p-4">
                    <h2 className="font-semibold text-lg text-gray-800 mb-2">Product 6</h2>
                    <p className="text-gray-700">Price: $60</p>
                    <p className="text-gray-700">Categories: Coffee set</p>
                    <p className="text-gray-700">Size: L</p>
                    <p className="text-gray-700">Weight: 500g</p>
                    <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300">Start Bid</button>
                </div>
            </div>

        </div>
    </div>
</body>
</div>
  )
}

export default t