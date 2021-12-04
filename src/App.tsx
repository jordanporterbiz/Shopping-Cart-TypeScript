import React from 'react';
import { useState } from 'react'
import { useQuery } from 'react-query';
// Components
import { Drawer, LinearProgress, Grid, Badge} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
// Styles
//import Wrapper from './App.styles'
// Types 
export type CartItemType = {
  id: number; 
  category: string;
  description: string;
  image: string; 
  price: number;
  title: string;
  amount: number;

}

const getProducts = async (): Promise<CartItemType[]> => 
await (await fetch('https://fakestoreapi.com/products')).json()
   

const getTotalItems = () => null

const handleAddToCart = () => null

const handleRemoveFromCart = () => null




const App = () => {

  const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts)
  console.log(data)
  return (
    <div className="App">
      <h1>Hello Jordan!</h1>
    </div>
  );
}

export default App;
