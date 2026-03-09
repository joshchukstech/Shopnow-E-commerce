import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { ref, get, set } from 'firebase/database';
import { db, realtimeDb } from '@/src/lib/firebase';
import { useAuth } from './AuthContext';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();

  const syncCartToFirestore = useCallback(async (cartItems: CartItem[]) => {
    if (!user) return;
    try {
      await setDoc(doc(db, 'carts', user.id), { items: cartItems, updatedAt: new Date() });
    } catch (error) {
      console.error('Error syncing cart to Firestore:', error);
    }
  }, [user]);

  const syncCartToRealtimeDb = useCallback(async (cartItems: CartItem[]) => {
    if (!user) return;
    try {
      await set(ref(realtimeDb, `carts/${user.id}`), { items: cartItems, updatedAt: Date.now() });
    } catch (error) {
      console.error('Error syncing cart to Realtime Database:', error);
    }
  }, [user]);

  useEffect(() => {
    const loadCart = async () => {
      setLoading(true);
      
      if (isAuthenticated && user) {
        try {
          const cartDoc = await getDoc(doc(db, 'carts', user.id));
          if (cartDoc.exists()) {
            const data = cartDoc.data();
            setItems(data.items || []);
          } else {
            setItems([]);
          }
        } catch (error) {
          console.error('Error loading cart from Firestore:', error);
          try {
            const snapshot = await get(ref(realtimeDb, `carts/${user.id}`));
            if (snapshot.exists()) {
              setItems(snapshot.val().items || []);
            } else {
              setItems([]);
            }
          } catch (rtError) {
            console.error('Error loading cart from Realtime DB:', rtError);
            setItems([]);
          }
        }
      } else {
        const stored = localStorage.getItem('cart');
        setItems(stored ? JSON.parse(stored) : []);
      }
      setLoading(false);
    };

    loadCart();
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated && user) {
        syncCartToFirestore(items);
        syncCartToRealtimeDb(items);
      } else {
        localStorage.setItem('cart', JSON.stringify(items));
      }
    }
  }, [items, isAuthenticated, user, loading, syncCartToFirestore, syncCartToRealtimeDb]);

  const addToCart = (item: Omit<CartItem, 'quantity'>, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { ...item, quantity }];
    });
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
