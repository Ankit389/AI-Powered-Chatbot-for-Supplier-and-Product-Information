export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  description: string;
  supplierId: string;
}

export interface Supplier {
  id: string;
  name: string;
  contactInfo: string;
  productCategories: string[];
}

export interface ChatMessage {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
  type?: 'product' | 'supplier' | 'error' | 'text';
  data?: Product | Supplier | Product[] | Supplier[];
}

export interface RecentQuery {
  id: string;
  query: string;
  timestamp: Date;
}