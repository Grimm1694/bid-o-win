// components/AddProductForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';

// Define a schema for form validation
const productSchema = z.object({
  title: z.string().min(1, 'Product title is required').max(100),
  price: z.number().positive('Price must be a positive number'),
  description: z.string().min(1, 'Description is required'),
  url: z.string().min(1, 'Product URL is required').url('Invalid URL format'),
  weight: z.string().min(1, 'Product weight is required'),
});

type ProductFormValues = z.infer<typeof productSchema>;

const AddProductForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      const response = await axios.post('/api/add-product', data);
      console.log(response.data);
      alert('Product added successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to add product.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="title">Title</label>
        <input id="title" {...register('title')} />
        {errors.title && <p>{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="price">Price</label>
        <input id="price" type="number" {...register('price')} />
        {errors.price && <p>{errors.price.message}</p>}
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea id="description" {...register('description')} />
        {errors.description && <p>{errors.description.message}</p>}
      </div>

      <div>
        <label htmlFor="url">Product URL</label>
        <input id="url" type="url" {...register('url')} />
        {errors.url && <p>{errors.url.message}</p>}
      </div>

      <div>
        <label htmlFor="weight">Weight</label>
        <input id="weight" {...register('weight')} />
        {errors.weight && <p>{errors.weight.message}</p>}
      </div>

      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProductForm;
