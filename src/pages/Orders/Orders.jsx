import styles from "./orders.module.css"
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/reducers/authReducer";
import { orderSelector } from "../../redux/reducers/orderReducer";
import { useNavigate } from "react-router-dom";

export default function Orders() {

    const navigate = useNavigate();

    const { order } = useSelector(orderSelector);
    const { user } = useSelector(userSelector);

    if (!user) {
        return navigate('/signin')
    }

    return (<div className={styles.container}>
        <h1>Your Orders</h1>
        <div className={styles.orders}>

            {
                order &&
                order.length > 0 &&
                order.map((item, index) => (
                    <div className={`${styles.order} ${styles.orderTableWrapper}`} key={index}>
                        <div className={styles.orderInfo}>
                            <h2>Order #{(index + 1).toString().padStart(4, "0")}</h2>
                            <table cellSpacing="0" cellPadding="0">
                                <tr>
                                    <th>Customer Email</th>
                                    <td style={{ border: 'none' }}>{item.customerEmail}</td>
                                </tr>
                                <tr>
                                    <th>Order Status</th>
                                    <td style={{ color: 'green', fontWeight: '600', border: 'none' }}>{item.status}</td>
                                </tr>
                                <tr>
                                    <th>Date</th>
                                    <td style={{ border: 'none' }}>{item.date}</td>
                                </tr>
                                <tr>
                                    <th>Total</th>
                                    <td style={{ fontWeight: '600', border: 'none' }}>₹{parseFloat(item.total).toFixed(2)}</td>
                                </tr>
                            </table>
                        </div>
                        <div>
                            <table className={styles.orderTable}>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        item.cart &&
                                        item.cart.length > 0 &&
                                        item.cart.map((product, index) => (
                                            <tr key={product.id}>
                                                <td>{product.name}</td>
                                                <td>₹{parseFloat(product.price).toFixed(2)}</td>
                                                <td>{product.quantity}</td>
                                                <td>₹{parseFloat(product.price * product.quantity).toFixed(2)}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan="3" style={{ textAlign: 'end' }}>Total</td>
                                        <td>₹{parseFloat(item.total).toFixed(2)}</td>
                                    </tr>
                                </tfoot>
                            </table>

                        </div>
                    </div>
                ))
            }

        </div>
    </div>);
}