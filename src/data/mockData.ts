export const categories = [
  'Electronics',
  'Clothing',
  'Home & Kitchen',
  'Sports',
  'Books',
];

export const products = [
  {
    id: '1',
    name: 'Wireless Noise-Cancelling Headphones',
    price: 299.99,
    discount: 15,
    rating: 4.8,
    reviews: 124,
    category: 'Electronics',
    image: 'https://picsum.photos/seed/headphones/800/800',
    description: 'Experience pure sound with our industry-leading noise cancellation technology.',
    isNew: true,
  },
  {
    id: '2',
    name: 'Minimalist Smartwatch',
    price: 199.50,
    discount: 0,
    rating: 4.5,
    reviews: 89,
    category: 'Electronics',
    image: 'https://picsum.photos/seed/smartwatch/800/800',
    description: 'Track your fitness and stay connected with this sleek, modern smartwatch.',
    isNew: false,
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    price: 29.99,
    discount: 0,
    rating: 4.2,
    reviews: 45,
    category: 'Clothing',
    image: 'https://picsum.photos/seed/tshirt/800/800',
    description: 'Comfortable, breathable, and sustainably sourced organic cotton t-shirt.',
    isNew: true,
  },
  {
    id: '4',
    name: 'Professional Chef Knife',
    price: 89.99,
    discount: 20,
    rating: 4.9,
    reviews: 210,
    category: 'Home & Kitchen',
    image: 'https://picsum.photos/seed/knife/800/800',
    description: 'High-carbon stainless steel chef knife for precision cutting.',
    isNew: false,
  },
  {
    id: '5',
    name: 'Yoga Mat with Alignment Lines',
    price: 45.00,
    discount: 0,
    rating: 4.6,
    reviews: 156,
    category: 'Sports',
    image: 'https://picsum.photos/seed/yogamat/800/800',
    description: 'Eco-friendly, non-slip yoga mat with alignment markers for perfect poses.',
    isNew: false,
  },
  {
    id: '6',
    name: 'Bestselling Sci-Fi Novel',
    price: 14.99,
    discount: 0,
    rating: 4.7,
    reviews: 342,
    category: 'Books',
    image: 'https://picsum.photos/seed/book/800/800',
    description: 'A thrilling journey through space and time in this award-winning novel.',
    isNew: false,
  },
  {
    id: '7',
    name: '4K Ultra HD Smart TV',
    price: 799.00,
    discount: 10,
    rating: 4.4,
    reviews: 88,
    category: 'Electronics',
    image: 'https://picsum.photos/seed/tv/800/800',
    description: 'Stunning 4K resolution with built-in smart features and streaming apps.',
    isNew: true,
  },
  {
    id: '8',
    name: 'Running Shoes',
    price: 129.99,
    discount: 0,
    rating: 4.3,
    reviews: 67,
    category: 'Sports',
    image: 'https://picsum.photos/seed/shoes/800/800',
    description: 'Lightweight, responsive running shoes for your daily miles.',
    isNew: false,
  }
];

export const users = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Customer', status: 'Active' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Admin', status: 'Active' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'Customer', status: 'Inactive' },
];

export const orders = [
  { 
    id: 'ORD-001', 
    customer: 'John Doe', 
    date: '2023-10-25', 
    total: 329.98, 
    status: 'Delivered',
    items: [
      { name: 'Wireless Noise-Cancelling Headphones', quantity: 1, price: 299.99 },
      { name: 'Organic Cotton T-Shirt', quantity: 1, price: 29.99 },
    ]
  },
  { 
    id: 'ORD-002', 
    customer: 'Alice Brown', 
    date: '2023-10-26', 
    total: 89.99, 
    status: 'Shipped',
    items: [
      { name: 'Professional Chef Knife', quantity: 1, price: 89.99 },
    ]
  },
  { 
    id: 'ORD-003', 
    customer: 'Charlie Davis', 
    date: '2023-10-27', 
    total: 199.50, 
    status: 'Pending',
    items: [
      { name: 'Minimalist Smartwatch', quantity: 1, price: 199.50 },
    ]
  },
  { 
    id: 'ORD-004', 
    customer: 'Eva Green', 
    date: '2023-10-28', 
    total: 45.00, 
    status: 'Processing',
    items: [
      { name: 'Yoga Mat with Alignment Lines', quantity: 1, price: 45.00 },
    ]
  },
];
