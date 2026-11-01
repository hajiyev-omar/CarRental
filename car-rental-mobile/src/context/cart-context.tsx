import { createContext, ReactNode, useContext, useState } from 'react';

import { Car } from '@/data/cars';

export type CartItem = { car: Car; days: number };

export type Order = { total: number; location: string };

const DRIVER_FEE = 50;

type CartValue = {
  items: CartItem[];
  needsDriver: boolean;
  setNeedsDriver: (value: boolean) => void;
  location: string;
  setLocation: (value: string) => void;
  days: number;
  price: number;
  driverFee: number;
  total: number;
  addItem: (car: Car, days: number) => void;
  setDays: (carId: number, days: number) => void;
  removeItem: (carId: number) => void;
  order: Order | null;
  placeOrder: (paid: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [needsDriver, setNeedsDriver] = useState(true);
  const [location, setLocation] = useState('');
  const [order, setOrder] = useState<Order | null>(null);

  const days = items.reduce((sum, item) => sum + item.days, 0);
  const price = items.reduce((sum, item) => sum + item.car.pricePerDay * item.days, 0);
  const driverFee = needsDriver ? DRIVER_FEE * items.length : 0;
  const total = price + driverFee;

  const addItem = (car: Car, days: number) =>
    setItems((prev) =>
      prev.some((item) => item.car.id === car.id)
        ? prev.map((item) => (item.car.id === car.id ? { car, days } : item))
        : [...prev, { car, days }],
    );

  const setDays = (carId: number, days: number) =>
    setItems((prev) => prev.map((item) => (item.car.id === carId ? { ...item, days } : item)));

  const removeItem = (carId: number) =>
    setItems((prev) => prev.filter((item) => item.car.id !== carId));

  const clearCart = () => {
    setItems([]);
    setNeedsDriver(true);
    setLocation('');
  };

  const placeOrder = (paid: number) => {
    setOrder({ total: paid, location });
    clearCart();
  };

  return (
    <CartContext.Provider
      value={{
        items,
        needsDriver,
        setNeedsDriver,
        location,
        setLocation,
        days,
        price,
        driverFee,
        total,
        addItem,
        setDays,
        removeItem,
        order,
        placeOrder,
        clearCart,
      }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) {
    throw new Error('useCart нужно вызывать внутри CartProvider');
  }
  return cart;
}
