import CartItem from "../CartItem/CartItem";
import { DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import { useState } from "react";
//styles

import { Wrapper } from "./Cart.styles";

//Types
import { CartItemType } from "../App";

type CartProps = {
    cartItems: CartItemType[];
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
    deleteFromCart: (id: number) => void;
}

const getItemStyle = (isDragging: boolean, draggableStyle: any) => (
    {
      padding: 10,
      margin: `0 50px 15px 50px`,
      background: isDragging ? "#4a2975" : "white",
      color: isDragging ? 'white' : 'black',
      border: `1px solid black`,
      fontSize: `20px`,
      borderRadius: `5px`,
  
      ...draggableStyle
  }
  )

const Cart: React.FC<CartProps> = ({cartItems, addToCart, removeFromCart, deleteFromCart}) => {
    
    const calculateTotal = (items: CartItemType[]) => {
        return items.reduce((ack:number, item) => ack + item.amount * item.price, 0)
    }


    return(     <Droppable droppableId="Cart">
        {
            (provided) => (
                <Wrapper {...provided.droppableProps} ref={provided.innerRef}>
                <h2> Your Shopping Cart</h2>
                {cartItems.length === 0 ? <p> No items in Cart</p> : null}
                {    //@ts-ignore
                                    cartItems.map((item: CartItemType, index: number) => {
                                    return (
                                        //@ts-ignore
                                        <Draggable key={item.id.toString()} draggableId={item.id.toString()} index={index}>
                                            {(provided, snapshot) => (
                                                //@ts-ignore
                                                <div index={index} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                                                    <CartItem
                                                    key={item.id}
                                                    item={item}
                                                    addToCart={addToCart}
                                                    removeFromCart={removeFromCart}
                                                    deleteFromCart={deleteFromCart}
                                                    />   
                                                </div>
                                                                        
                                            )}
                                        </Draggable>
                                    )
                                })}                            
                <h2> Total: ${calculateTotal(cartItems).toFixed(2)} </h2>
        </Wrapper>
    )}
      </Droppable>
    )
} 
export default Cart;