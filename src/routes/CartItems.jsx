import React from 'react'
import { useMyContext } from '../Context/MyContext'
import { Box, Button, ButtonGroup, Card, CardContent, Chip, IconButton, Rating, TextField, ToggleButtonGroup, Typography } from '@mui/material'
import { TabTitle } from '../utils/General';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import { ApiServices } from '../api/api';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Star from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';


export const CartItems = () => {
    TabTitle("Cart Items - Shema");
    const { cartItems, getCartItems, setCartItems } = useMyContext()

    const removeFromCart = async (id) => {
        var json = {
            Id: id
        }
        console.log('json', json);
        ApiServices.RemoveFromCart(json).then(res => {
            console.log('res', res);
            if (res.response_code === 200) {
                getCartItems()
            }
        })
    }
    return (
        <div className='p-5  d-flex justify-content-center align-items-center flex-column' >
            {cartItems?.map((item) => (
                <Card
                    key={item._id} // Ensure each Card has a unique key
                    className="mb-3 py-2 px-1 d-flex justify-content-between align-items-start flex-wrap w-100"
                    style={{ maxWidth: '900px' }}
                // data-aos="fade-left"
                >
                    <CardContent >
                        <div className="d-flex gap-4 flex-wrap align-items-start">
                            <div className='d-flex flex-column gap-2 align-items-center'>
                                <img
                                    src={item.primaryImage[0]?.URL}
                                    alt="item"
                                    width={80}
                                    className="product__img"
                                />
                                <div className='d-flex gap-1 align-items-center'>
                                    <IconButton size='small'>
                                        <RemoveIcon fontSize='small' />
                                    </IconButton>
                                    <Typography className='px-3 py-2 rounded-pill border' fontSize='small' >3</Typography>
                                    <IconButton size='small'>
                                        <AddIcon fontSize='small' />
                                    </IconButton>
                                </div>
                            </div>
                            <div style={{ maxWidth: "400px" }}>
                                <h5>{item.name}</h5>
                                <p className="mb-1">{item.description}</p>
                                <div className="d-flex gap-2 my-1">
                                    <Rating value='4.5' precision='0.5' readOnly />
                                    <span>(1,453)</span>
                                </div>
                                <p className="mb-1">
                                    Size: {item.size[0]} | color: {item.color}
                                </p>
                                <p className="mb-1">Total: ${item.price}</p>

                            </div>
                        </div>
                        <div className='d-flex gap-2 mt-3'>
                            <IconButton style={{ backgroundColor: '#ffe26e' }}><FavoriteIcon style={{ color: 'white' }} /></IconButton>
                            <Button startIcon={<ShoppingCartIcon />} variant='contained'>Buy now</Button>
                            <Button startIcon={<CloseIcon />} variant='outlined' color='error' onClick={() => removeFromCart(item._id)}>Remove from cart</Button>
                        </div>
                    </CardContent>
                    <CardContent>
                        <p>Delivery by Thu Jul 25 | Free</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
