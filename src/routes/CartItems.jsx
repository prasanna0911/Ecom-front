import React from 'react'
import { useMyContext } from '../Context/MyContext'
import { Box, Button, Card, CardContent, Chip, IconButton, Typography } from '@mui/material'
import { TabTitle } from '../utils/General';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import { ApiServices } from '../api/api';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Star from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import './routestyles/CartItems.css'
import AccountHeader from '../components/Account/AccountHeader';
import EmptyComponent from '../components/EmptyComponent';
import { toast } from 'react-toastify';


export const CartItems = () => {
    TabTitle("Cart Items - Shema");
    const { cartItems, getCartItems, wishListItems, getWishlistItems, MobileScreen } = useMyContext()
    const navigate = useNavigate()
    const removeFromCart = async (id) => {
        var json = {
            Id: id
        }
        console.log('json', json);
        ApiServices.RemoveFromCart(json).then(res => {
            console.log('res', res);
            if (res.response_code === 200) {
                getCartItems()
                toast.success("Product successfully removed from your cart!");
            }
        })
    }

    const addToFavourite = async (id) => {
        var json = {
            Id: id
        }
        console.log('json', json);
        ApiServices.AddToFavourites(json).then(res => {
            console.log('res', res);
            if (res.response_code === 200) {
                getWishlistItems()
                toast.success("Product successfully added to your wishlist!");
            }
        })
    }

    const handelRemoveItem = (id) => {
        var json = {
            Id: id,
        };
        ApiServices.RemoveFromFavourites(json).then((res) => {
            console.log("res", res);
            if (res.response_code === 200) {
                getWishlistItems();
                toast.success("Product successfully removed from your wishlist!");
            }
        });
    };

    const increaseCartItemCount = async (id) => {
        var json = {
            Id: id
        }
        console.log('json', json);
        ApiServices.IncreaseCartItemCount(json).then(res => {
            console.log('res', res);
            if (res.response_code === 200) {
                getCartItems()
            }
        })
    }

    const decreaseCartItemCount = async (id) => {
        var json = {
            Id: id
        }
        console.log('json', json);
        ApiServices.DecreaseCartItemCount(json).then(res => {
            console.log('res', res);
            if (res.response_code === 200) {
                getCartItems()
            }
        })
    }

    const handleCheckoutRoute = (id) => {
        navigate(`/checkout/${id}`)
    }

    return (
        <>
            {cartItems?.length > 0 ? (

                <div className='cart_container' style={{ padding: MobileScreen ? "3rem" : "10px" }}>
                    {!MobileScreen && (
                        <AccountHeader head="My Cart" breadcrumb="" />
                    )}
                    <div className='d-flex justify-content-center align-items-center flex-column' >
                        {cartItems?.map((item) => (
                            <Card
                                key={item._id}
                                className='mb-3  w-100'
                                style={{ maxWidth: '900px' }}
                            // data-aos="fade-left"
                            >
                                <CardContent className="d-flex justify-content-between align-items-start flex-wrap">
                                    <div className="d-flex product">
                                        <div className='d-flex flex-column gap-1 align-items-center'>
                                            <img
                                                src={item.primaryImage[0]?.URL}
                                                alt="item"
                                                className="product_image"
                                            />
                                            <div className='d-flex gap-1 align-items-center'>
                                                <IconButton onClick={() => decreaseCartItemCount(item._id)} disabled={item.count <= 1}>
                                                    <RemoveIcon fontSize='small' />
                                                </IconButton>
                                                <Typography className='rounded-pill border product_count'  >{item.count}</Typography>
                                                <IconButton onClick={() => increaseCartItemCount(item._id)}>
                                                    <AddIcon fontSize='small' />
                                                </IconButton>
                                            </div>
                                        </div>
                                        <div style={{ maxWidth: "400px" }} className='product_details cursor-pointer' onClick={() => navigate(`/item/${item.category}/${item._id}`)}>
                                            <h5>{item.name}</h5>
                                            <h6 className="mb-1">{item.description}</h6>
                                            <p className="mb-1" style={{ fontSize: 'small' }}>
                                                Size: {item.size[0]} | color: {item.color}
                                            </p>
                                            <div className="d-flex gap-2 my-2">
                                                <Chip
                                                    color="success"
                                                    size="small"
                                                    className="rounded"
                                                    style={{ height: "auto" }}
                                                    label={
                                                        <Box
                                                            className="d-flex align-items-center justify-content-center gap-1"
                                                            style={{ fontSize: "small" }}
                                                        >
                                                            4.1 <Star fontSize="1rem" />
                                                        </Box>
                                                    }
                                                />
                                                <span style={{ fontSize: "small" }}>(1,453)</span>
                                            </div>

                                            <p className="mb-1 fw-bold product__price">Total : ${item.count * item.price}</p>

                                        </div>
                                    </div>
                                    <p className='mb-0'>Delivery by Thu Jul 25 | Free</p>
                                </CardContent>
                                <CardContent className='pt-0'>
                                    <div className='d-flex gap-2 flex-wrap align-items-center'>
                                        {wishListItems?.some((product) => product._id === item._id) ? (
                                            <IconButton size='small' onClick={() => handelRemoveItem(item._id)} className='not-fav-icon-button' ><FavoriteIcon className='fav-icon' /></IconButton>
                                        ) : (
                                            <IconButton size='small' onClick={() => addToFavourite(item._id)} className='fav-icon-button' ><FavoriteIcon className='fav-icon' /></IconButton>
                                        )}

                                        <Button className='product_action_button' startIcon={<ShoppingCartIcon />} variant='contained' onClick={() => handleCheckoutRoute(item.cartItemId)}>Buy now</Button>
                                        <Button className='product_action_button' startIcon={<CloseIcon />} variant='outlined' color='error' onClick={() => removeFromCart(item._id)}>Remove from cart</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            ) : (
                <EmptyComponent height='100vh' text='Cart Item empty' />
            )}
        </>

    )
}
