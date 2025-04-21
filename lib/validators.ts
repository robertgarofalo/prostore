import { z } from 'zod';
import { formatNumberWithDecimal } from './utils';

const currency = z
.string()
.refine((value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))), 'Price must have exactly two decimal')

// Schema for inserting products
export const insertProductSchema = z.object({
    name: z.string().min(3, 'Name must be atleast 3 character'),
    slug: z.string().min(3, 'Slug must be atleast 3 character'),
    category: z.string().min(3, 'Category must be atleast 3 character'),
    brand: z.string().min(3, 'Brand must be atleast 3 character'),
    description: z.string().min(3, 'Description must be atleast 3 character'),
    stock: z.coerce.number(),
    images: z.array(z.string()).min(1, 'Product must have at least one image'),
    isFeatured: z.boolean(),
    banner: z.string().nullable(),
    price: currency,
})

// Schema for signing in
export const signInFormSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be atleast 6 characters'),
})

// Schema for signing up a user
export const signUpFormSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be atleast 6 characters'),
    confirmPassword: z.string().min(6, 'Confirm password must be atleast 6 characters'),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'] // display in the confirm password field
} )

// Cart Schemas
export const cartItemsSchema = z.object({
    productId: z.string().min(1, 'Product is required'),
    name: z.string().min(1, 'Name is required'),
    slug: z.string().min(1, 'Slug is required'),
    qty: z.number().int().nonnegative('Quantity must be a positive number'),
    image: z.string().min(1, 'Image is required'),
    price: currency
})

export const insertCartSchema = z.object({
    items: z.array(cartItemsSchema),
    itemsPrice: currency,
    totalPrice: currency,
    shippingPrice: currency,
    taxPrice: currency,
    sessionCartId: z.string().min(1, 'Session cart id is required'),
    userId: z.string().optional().nullable()
})