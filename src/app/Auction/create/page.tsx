"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as z from 'zod';
import { useSession } from 'next-auth/react';

// Define a schema for form validation
const auctionSchema = z.object({
  productId: z.number().min(1, 'Product ID is required'),
  startBid: z.string().min(1, 'Start bid is required').regex(/^\d+(\.\d{1,2})?$/, 'Invalid bid amount format'),
  auctionDeadline: z.string().min(1, 'Auction end date is required').refine(date => !isNaN(Date.parse(date)), 'Invalid date format'),
});

type AuctionFormValues = z.infer<typeof auctionSchema>;

const CreateAuctionForm: React.FC = () => {
  const { data: session } = useSession(); // Fetch the session object from next-auth

  const [formData, setFormData] = useState<AuctionFormValues>({
    productId: 0,
    startBid: '',
    auctionDeadline: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [products, setProducts] = useState<{ id: number; title: string }[]>([]);

  useEffect(() => {
    // Fetch products from the API
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/prodlist'); // Adjust the endpoint as needed
        setProducts(response.data.products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "productId" ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Validate form data with Zod
      auctionSchema.parse(formData);

      // Clear any previous errors
      setErrors({});


      // Retrieve user username from session
      const userUsername = session?.user?.username;
      if (!userUsername) {
        throw new Error('User username not found in session');
      }

      // Send auction data to create endpoint
      const createAuctionResponse = await axios.post('/api/createauction', { ...formData, userUsername });

      console.log(createAuctionResponse.data);
      alert('Auction created successfully!');
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            formattedErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(formattedErrors);
      } else {
        console.error(error);
        alert('Failed to create auction.');
      }
    }
  };

  if (!session) {
    return <p>Please sign in to create an auction.</p>;
  }

  return (
    <div className="bg-gradient flex items-center justify-center mt-40">
      <div className="h-full w-[400px] max-w-200xl mx-auto p-8 bg-white shadow-lg rounded-lg animate-fadeIn">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Auction</h2>
        <form id="auctionForm" className='h-full' onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Product</label>
            <select
              id="productId"
              name="productId"
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.productId}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select a product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {`${product.title} (ID: ${product.id})`}
                </option>
              ))}
            </select>
            {errors.productId && <p className="text-red-500 text-xs mt-1">{errors.productId}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Bid</label>
            <input
              type="text"
              id="startBid"
              name="startBid"
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.startBid}
              onChange={handleChange}
              required
            />
            {errors.startBid && <p className="text-red-500 text-xs mt-1">{errors.startBid}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Auction End Date</label>
            <input
              type="datetime-local"
              id="auctionDeadline"
              name="auctionDeadline"
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.auctionDeadline}
              onChange={handleChange}
              required
            />
            {errors.auctionDeadline && <p className="text-red-500 text-xs mt-1">{errors.auctionDeadline}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
          >
            Create Auction
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAuctionForm;
