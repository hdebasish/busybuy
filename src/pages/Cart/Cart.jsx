import { useEffect, useState } from "react";
import styles from "./cart.module.css"
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userSelector } from "../../redux/reducers/authReducer";
import { cartSelector } from "../../redux/reducers/cartReducer";
import { useSelector, useDispatch } from "react-redux";
import { setCartAsync } from "../../redux/reducers/cartReducer";
import { setOrderAsync } from "../../redux/reducers/orderReducer";
import { resetCartAsync } from "../../redux/reducers/cartReducer";
import { orderSelector } from "../../redux/reducers/orderReducer";

export default function Cart() {

    const navigate = useNavigate();
    const [total, setTotal] = useState(0);

    const { cart } = useSelector(cartSelector);
    const { user } = useSelector(userSelector);
    const { order } = useSelector(orderSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        let total = 0;
        if (cart && cart.length > 0) {
            cart.forEach((item) => {
                total += item.price * item.quantity
            });
            setTotal(total);
        } else {
            setTotal(0);
        }
    },[cart]);

    if (!user) {
        return navigate('/signin')
    }


    const removeFromCart = async (product) => {
        let newCart = cart;
        const index = newCart.findIndex((item) => item.id === product.id);
        if (index >= 0) {
            newCart = newCart.filter((item, i) => {
                if (i === index) {
                    return false;
                } else {
                    return true;
                }
            })
            const payload = {
                cart: newCart,
                uid: user.uid
            }
            dispatch(setCartAsync(payload));
            toast.success("Item Deleted Successfully!", {
                position: "top-center"
            })
        }

    }

    const increaseQuantity = async (product) => {
        let newCart = cart;
        const index = newCart.findIndex((item) => item.id === product.id);
        if (index >= 0) {
            newCart = newCart.map((item, i) => {
                if (i === index) {
                    return { ...item, quantity: item.quantity + 1 };
                } else {
                    return item;
                }
            });
            const payload = {
                cart: newCart,
                uid: user.uid
            }
            dispatch(setCartAsync(payload));
        }
    }

    const decreaseQuantity = async (product) => {
        let newCart = cart;
        const index = newCart.findIndex((item) => item.id === product.id);
        if (index >= 0) {
            if (newCart[index].quantity > 1) {
                newCart = newCart.map((item, i) => {
                    if (i === index) {
                        return { ...item, quantity: item.quantity - 1 };
                    } else {
                        return item;
                    }
                });
                const payload = {
                    cart: newCart,
                    uid: user.uid
                }
                dispatch(setCartAsync(payload));
            } else {
                removeFromCart(product);
            }
        }
    }

    const purchase = async (cart, total) => {

        if (cart.length > 0) {

            let newOrder = order;



            newOrder = [...newOrder,
            {
                cart: cart,
                customerId: user.uid,
                customerEmail: user.email,
                date: new Date().toLocaleString(),
                status: "Successful",
                total: total

            }];

            dispatch(setOrderAsync({ uid: user.uid, order: newOrder }));

            dispatch(resetCartAsync({ uid: user.uid }));

            navigate('/orders');
        } else {
            toast.error('Your cart is empty', {
                position: "top-center"
            });
        }
    }



    return (<div className={styles.container}>

        <div className={styles.cartContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cart &&
                        cart.length > 0 &&
                        cart.map((item, index) => {
                            return (
                                <tr key={item.id}>
                                    <td>
                                        <div className={styles.productInfo}>
                                            <img src={item.image} alt={item.name} />
                                            <span>{item.name}</span>
                                        </div>
                                    </td>
                                    <td>₹{parseFloat(item.price).toFixed(2)}</td>
                                    <td style={{ fontWeight: '600' }}><div className={styles.productQuantity}><span onClick={() => decreaseQuantity(item)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-dash-circle-fill" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1z" />
                                    </svg></span> {item.quantity} <span onClick={() => increaseQuantity(item)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                                    </svg></span></div></td>
                                    <td>₹{parseFloat(item.price * item.quantity).toFixed(2)}</td>
                                    <td><div className={styles.removeButton} onClick={() => removeFromCart(item)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                                    </svg></div></td>
                                </tr>
                            )
                        })
                    }

                </tbody>

            </table>

        </div>

        <div className={styles.summaryWrapper}>
            <div className={styles.summary}>
                <h2>Summary</h2>
                <div className={styles.summaryText}><span>Subtotal</span><span style={{ textAlign: 'right' }}>₹{parseFloat(total).toFixed(2)}</span></div>
                <div className={styles.summaryText}><span>Shipping</span><span style={{ textAlign: 'right' }}>₹{parseFloat(0).toFixed(2)}</span></div>
                <div className={styles.summaryText}><span>Tax</span><span style={{ textAlign: 'right' }}>₹{parseFloat(0).toFixed(2)}</span></div>
                <div className={styles.line}></div>
                <div className={styles.summaryText} style={{ fontWeight: 'bold' }}><span>Total</span><span style={{ textAlign: 'right' }}>₹{total}</span></div>
                <div className={styles.purchaseContainer}>
                    <button className={styles.purchase} onClick={() => purchase(cart, total)}>Purchase</button>
                </div>
            </div>

        </div>
    </div>);
}