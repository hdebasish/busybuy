import { useState, useEffect } from "react";
import styles from "./home.module.css"
import { db } from "../../database/firebaseConfig";
import { onSnapshot, collection } from "firebase/firestore";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { cartSelector } from "../../redux/reducers/cartReducer";
import { userSelector } from "../../redux/reducers/authReducer";
import { useSelector, useDispatch } from "react-redux";
import { setCartAsync } from "../../redux/reducers/cartReducer";


export default function Home() {

    const { cart } = useSelector(cartSelector);
    const { user } = useSelector(userSelector);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [products, setProduct] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [price, setPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [category, setCategory] = useState([]);


    useEffect(() => {

        const getData = async () => {
            return onSnapshot(collection(db, "products"), (snapshot) => {
                const data = snapshot.docs.map((doc) => {
                    return { id: doc.id, ...doc.data() }
                })
                setProduct(data);
                setFilteredProducts(data);
                const max = Math.max.apply(null, data.map((item) => item.price));
                setMaxPrice(max);
                setPrice(max);
            });
        }

        getData();

    }, []);

    useEffect(() => {

        if (category.length > 0 || searchTerm !== "" || price < maxPrice) {
            let filteredData = products;
            if (category.length > 0) {
                filteredData = filteredData.filter((product) => {
                    return category.find(c => product.category === c);
                });
            }

            if (price < maxPrice) {
                filteredData = filteredData.filter((product) => {
                    return product.price <= price;
                });
            }

            if (searchTerm !== "") {
                filteredData = filteredData.filter((product) => {
                    return product.name.toLowerCase().includes(searchTerm.toLowerCase());
                });
            }

            setFilteredProducts(filteredData);

        } else {
            setFilteredProducts(products);
        }

    }, [category, searchTerm, price, maxPrice, products]);

    const searchProducts = (e) => {
        setSearchTerm(e.target.value);
    }

    const filterPrice = (e) => {
        setPrice(e.target.value);
    }

    const filterCategory = (e) => {
        if (e.target.checked) {
            setCategory([...category, e.target.value]);
        } else {
            setCategory(category.filter(item => item !== e.target.value));
        }
    }


    const addToCart = async (product) => {

        if (user) {

            let newCart = [ ...cart ];
            
            const index = newCart.findIndex((item) => item.id === product.id);
            if (index >= 0) {
                newCart = newCart.map((item, i) => {
                    if (i === index) {
                        return { ...item, quantity: item.quantity + 1 };
                    } else {
                        return item;
                    }
                });
            } else {
                product.quantity = 1;
                newCart = [...newCart, product];
            }
            const payload = {
                cart: newCart,
                uid: user.uid
            }
            dispatch(setCartAsync(payload));

            toast.success("Item Added to Cart Successfully!", {
                position: "top-center"
            })

        } else {
            navigate('/signin');
        }


    }



    return (<div className={styles.container}>
        <div className={styles.productWrapper}>
            <div className={styles.filterWrapper}>

                <div className={styles.searchWrapper}>
                    <div className={styles.search}>
                        <input type="text" placeholder="Search for Products" className={styles.searchTerm} value={searchTerm} onChange={searchProducts} />
                        <button type="submit" className={styles.searchButton}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                        </svg></button>
                    </div>
                </div>

                <div className={styles.filterContainer}>

                    <div className={styles.filter}>
                        <h3>Filter</h3>
                        <p>Price ₹{price}</p>
                        <div>
                            <input type="range" min={0} max={maxPrice + 1000} value={price} onChange={filterPrice} />
                        </div>
                    </div>
                    <div className={styles.category}>
                        <h3>Category</h3>
                        <div>
                            <div>
                                <input type="checkbox" value="Fashion & Apparel" id="Fashion" onChange={filterCategory} />
                                <label htmlFor="Fashion"> Fashion & Apparel</label>
                            </div>
                            <div>
                                <input type="checkbox" value="Electronics & Gadgets" id="Electronics" onChange={filterCategory} />
                                <label htmlFor="Electronics"> Electronics & Gadgets</label>
                            </div>
                            <div>
                                <input type="checkbox" value="Health & Beauty" id="Health" onChange={filterCategory} />
                                <label htmlFor="Health"> Health & Beauty</label>
                            </div>
                            <div>
                                <input type="checkbox" value="Home & Kitchen" id="Home" onChange={filterCategory} />
                                <label htmlFor="Home"> Home & Kitchen</label>
                            </div>
                            <div>
                                <input type="checkbox" value="Books, Music & Entertainment" id="Books" onChange={filterCategory} />
                                <label htmlFor="Books"> Books, Music & Entertainment</label>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <div className={styles.productContainer}>
                {filteredProducts.map(((product) => {
                    return (
                        <div className={styles.product} key={product.id}>
                            <img src={product.image} alt="" />
                            <div className={styles.productInfo}>
                                <div className={styles.productName}>{product.name}</div>
                                <div className={styles.productPriceContainer}>
                                    <span className={styles.productPrice}>₹{product.price}</span><span style={{ fontSize: 14, color: 'grey' }}> onwards</span>
                                </div>
                                <div className={styles.badgeContainer}>
                                    <span className={styles.badge}>Free Delivery</span>
                                </div>
                                <div className={styles.productRatingContainer}>
                                    <span className={styles.productRating}> {product.rating} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                    </svg></span>
                                    <span style={{ fontSize: 14, color: 'grey' }}> 44 reviews</span>
                                </div>
                                <div className={styles.addToCartContainer}>
                                    <button className={styles.addToCart} onClick={() => addToCart(product)}>Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    )
                }))}
            </div>
        </div>
    </div>);
}