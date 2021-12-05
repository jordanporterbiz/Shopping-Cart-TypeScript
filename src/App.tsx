import React from 'react';
import { useState } from 'react'
import { useQuery } from 'react-query';
// Components
import { Drawer, LinearProgress, Grid, Badge} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import Item from './Item/Item'
import Cart from './Cart/Cart';
// Styles
import {Wrapper, StyledButton } from './App.styles'
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
   




const App = () => {

  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);


  const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts)
  console.log(data)

  const getTotalItems = (items: CartItemType[]) => 
  items.reduce((acc: number, items) => acc + items.amount, 0)

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      // 1. is item in the cart?
      const isItemInCart = prev.find(item => item.id === clickedItem.id)
      if(isItemInCart) {
        return prev.map(item => 
          item.id === clickedItem.id ? { ...item, amount: item.amount + 1 } : item
        )
      }
      // 2. First time item is added
      return [...prev, { ...clickedItem, amount: 1}]
    })
  }

  const handleRemoveFromCart = () => null

if(isLoading) return <LinearProgress />

if(error) return <div>Error, something went wrong...</div>

  return (
    <Wrapper>
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
       <Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart}/>
      </Drawer>

      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'></Badge>
        <AddShoppingCart/>
      </StyledButton>



      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart}/>
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );

}

export default App;
