import { Button } from "@material-ui/core";
import { CartItemType } from "../App";
import { Wrapper } from './Item.styles';

type ItemProps = {
    item: CartItemType,
    handleAddToCart: (clickedItem: CartItemType) => void;
}

const Item: React.FC<ItemProps> = ({item, handleAddToCart}) => (
    <Wrapper>

        <img src={item.image} alt={item.title}/>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
    }}>
        <div style={{flexGrow: '1'}}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
        </div>
        <div style={{flexGrow: '1'}}>
        </div>
        <h3 style={{paddingLeft: '20px'}}>${item.price.toFixed(2)} </h3>

        </div>
        <Button onClick={() => handleAddToCart(item)}> Add to cart </Button>
    </Wrapper>
)

export default Item;