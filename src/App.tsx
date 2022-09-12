import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
//components
import { Drawer } from '@material-ui/core';
import LinearProgress from '@material-ui/core';
import {Grid} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import {Badge} from '@material-ui/core';
import Item from './Item/Item';
import Cart from './Cart/Cart';
//styles
import { Wrapper, StyledButton } from './App.styles';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
//Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number
}

const fetchOptions = {
  method: 'GET',

}

const initial = Array.from({length: 10}, (v,k) => k)


const App = () => {
  const [data, setData] = useState<any>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const [testCss, setTestCss] = useState(false);

  const dragAndDropFlag: boolean = false;
  fetch('https://fakestoreapi.com/products', fetchOptions).then(response => response.json()).then((responseJSON) => setData(responseJSON))
  
  const getTotalItems = (items: CartItemType[]) => {
    return ( 
          items.reduce((ack: number, item) => ack + item.amount, 0)
      )
  }
    

  const handleAddToCart = (clickedItem: CartItemType) => {
    // const newCartItems = [clickedItem, ...cartItems];
    // setCartItems(newCartItems);
    // @ts-ignore
    setCartItems(prev => {
      const isItemInCart = prev.find(item => item.id === clickedItem.id);

      if (isItemInCart){
        return prev.map(item =>
          item.id === clickedItem.id 
          ? {...item, amount: item.amount + 1}
          : item
        )
      }
      return [...prev, {...clickedItem, amount: 1}]
  })};

  const handleRemoveFromCart = (id: number) => {
        // @ts-ignore
        setCartItems(prev => {
          const isItemInCart = prev.find(item => (item.id === id && item.amount > 0));
          if(isItemInCart){
            return(
            prev.map(item => item.id === id
            ? {...item, amount: item.amount -= 1}
            : item))
          }else{
            return prev;
          }}
          )        
  };

  const deleteFromCart = (id: number) => {
    const newCartItems = cartItems;
    const idx = cartItems.findIndex(item => item.id === id);
    if(idx !== -1){
      newCartItems.splice(idx, 1);
    }
    setCartItems(newCartItems);
  }

  const onDragEnd = (result: DropResult) => {
    const {source, destination} = result;
    if(!destination) return 

    const items = Array.from(cartItems);
    const [newOrder] = items.splice(source.index, 1);
    items.splice(destination.index, 0, newOrder);
    setCartItems(items);
  }

  return (
    <>
      <Wrapper>
        <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
            <DragDropContext onDragEnd={onDragEnd}>
                  <Cart 
                  cartItems={cartItems} 
                  addToCart={handleAddToCart} 
                  removeFromCart={handleRemoveFromCart}
                  deleteFromCart={deleteFromCart}
                  />
            </DragDropContext>
        </Drawer>
        <StyledButton onClick={() => setCartOpen(true)}>
          <Badge badgeContent={getTotalItems(cartItems)} color='error' style={{marginBottom: '20px'}}>
            <AddShoppingCart/>
          </Badge>
        </StyledButton>
        <Grid container spacing={3}>
          {
          data?.map((item: CartItemType) => (
          <Grid item key={item.id} xs={12} sm={3}>
            <Item item={item} handleAddToCart={handleAddToCart}/>
          </Grid>
          ))
          }
        </Grid>
      </Wrapper> 
     
    </>
  );
}

export default App;
