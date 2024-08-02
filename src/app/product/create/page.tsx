"use client";
import React, { useState } from 'react';
import './styles.css';
import axios from 'axios';
import * as z from 'zod';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebaseConfig';

import { useSession } from 'next-auth/react';

// Define a schema for form validation
const productSchema = z.object({
  title: z.string().min(1, 'Product title is required').max(100),
  price: z.string().min(0, 'Price is required'),
  description: z.string().min(1, 'Description is required'),
  url: z.string().min(1, 'Product URL is required').url('Invalid URL format'),
  weight: z.string().min(1, 'Product weight is required'),
  category: z.string().min(1, 'Product category is required'),
});

type ProductFormValues = z.infer<typeof productSchema>;

const AddProductForm: React.FC = () => {

  const { data: session } = useSession();

  const [file, setFile] = useState<File | null>(null); // file state
  const [uploading, setUploading] = useState(false); // uploading state
  const [formData, setFormData] = useState<ProductFormValues>({
    title: '',
    price: '',
    description: '',
    url: '',
    weight: '',
    category: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return; // Check if file is null
    setUploading(true);
    const storageRef = ref(storage, `images/${file.name}`);
    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setFormData((prevFormData) => ({
        ...prevFormData,
        url: url,
      }));
      console.log('File uploaded successfully');
    } catch (error) {
      console.error('Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Validate form data with Zod
      productSchema.parse(formData);

      // Clear any previous errors
      setErrors({});
      const createdByUsername = session?.user?.username;
      if (!createdByUsername) {
        throw new Error('User username not found in session');
      }
      console.log(createdByUsername);
      console.log(formData);
      const response = await axios.post('/api/createprod', { ...formData, createdByUsername });
      console.log(response.data);
      alert('Product added successfully!');
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
        alert('Failed to add product.');
      }
    }
  };

  return (
    <div className="bg-gradient flex items-center justify-center mt-[300px]">
      <div className="h-full w-[400px] max-w-200xl mx-auto p-8 bg-white shadow-lg rounded-lg animate-fadeIn">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Product Form</h2>
        <form id="productForm" className='h-full' onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Title</label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.title}
              onChange={handleChange}
              required
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.price}
              onChange={handleChange}
              required
            />
            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              id="description"
              name="description"
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Product image</label>
            <input type="file" onChange={handleFileChange} />
            <input
              type="text"
              name="url"
              value={formData.url}
              onChange={handleChange}
              readOnly
              className="mt-2 text-opacity-0"
            />
            <button type="button" onClick={handleUpload} disabled={uploading}>
              {uploading ? 'Uploading...' : 'Upload Image'}
            </button>
            {errors.url && <p className="text-red-500 text-xs mt-1">{errors.url}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Weight</label>
            <input
              type="text"
              id="weight"
              name="weight"
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.weight}
              onChange={handleChange}
              required
            />
            {errors.weight && <p className="text-red-500 text-xs mt-1">{errors.weight}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.category}
              onChange={handleChange}
              required
            />
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
