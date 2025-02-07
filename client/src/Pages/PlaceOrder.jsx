import { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../Components/CartTotal";
import Title from "../Components/Title";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function PlaceOrder() {

    const [method, setMethod] = useState('cod');
    const {navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products} = useContext(ShopContext);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    })

    function onChangeHandler (event) {
        const name = event.target.name
        const value = event.target.value

        setFormData(data => ({...data,[name]:value}))
    }

    async function onSubmitHandler(event) {
        event.preventDefault()
        try {
            
            let orderItems = []

            for(const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === items))
                        if (itemInfo) {
                            itemInfo.size = item
                            itemInfo.quantity = cartItems[items][item]
                            orderItems.push(itemInfo)
                        }
                    }
                }
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee,
                paymentMethod: method, // Add this line
            }

            switch(method) {
                // API calls for COD
                case 'cod':
                    const response = await axios.post(backendUrl + "/api/order/place", orderData, {headers:{token}})  
                    console.log(response.data)
                    if (response.data.success) {
                        setCartItems({})
                        navigate("/orders")
                    } else {
                        toast.error(response.data.message)
                    }              
                break;

                case 'stripe' :
                    const responseStripe = await axios.post(backendUrl + "/api/order/stripe", orderData, {headers:{token}})
                    if (responseStripe.data.success) {
                        const {session_url} = responseStripe.data
                        window.location.replace(session_url)

                    } else {
                        toast.error(responseStripe.data.message)
                        
                    }
                break;

                default: 
                    break;
            }

        } catch (error) { 
            console.log(error)
            toast.error(error.message)
        }

    }


    return(
        <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t ">
            <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
                <div className="text-xl sm:text-2xl my-3">
                    <Title text1={"DELIVERY"} text2={"INFORMATION"} />
                </div>
                <div className="flex gap-3">
                    <input
                    onChange={onChangeHandler}
                    required
                    name="firstName"
                    value={formData.firstName}
                    className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                    placeholder="First Name"
                    type="text" />
                    <input
                    onChange={onChangeHandler}
                    name="lastName"
                    value={formData.lastName}
                    required
                    className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                    placeholder="Last Name"
                    type="text" />
                </div>
                <input
                    className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                    onChange={onChangeHandler}
                    name="email"
                    value={formData.email}
                    required
                    placeholder="Email Address"
                    type="email" />
                <input
                    className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                    onChange={onChangeHandler}
                    name="street"
                    value={formData.street}
                    required
                    placeholder="Street"
                    type="text" />
                    <div className="flex gap-3">
                        <input
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                        onChange={onChangeHandler}
                        name="city"
                        value={formData.city}
                        required
                        placeholder="City"
                        type="text" />
                        <input
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                        onChange={onChangeHandler}
                        name="state"
                        value={formData.state}
                        required
                        placeholder="State"
                        type="text" />
                    </div>
                    <div className="flex gap-3">
                        <input
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                        onChange={onChangeHandler}
                        name="zipcode"
                        value={formData.zipcode}
                        required
                        placeholder="Zipcode"
                        type="number" />
                        <input
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                        onChange={onChangeHandler}
                        name="country"
                        value={formData.country}
                        required
                        placeholder="Country"
                        type="text" />
                    </div>
                    <input
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                        onChange={onChangeHandler}
                        name="phone"
                        value={formData.phone}
                        required
                        placeholder="Phone"
                        type="number" />
            </div>

            <div className="mt-8 ">
                
                <div className="mt-8 min-w-80">
                    <CartTotal />
                </div>

                <div className="mt-12 ">
                    <Title text1={"PAYMENT"} text2={"METHOD"} />
                    <div className="flex gap-3 flex-col lg:flex-row">
                        <div 
                        onClick={()=>setMethod('stripe')}
                        className="flex items-center border p-2 px-3 cursor-pointer">
                            <p className={`min-w-3.5 h-3.5 border rounded-full  ${method === "stripe" ? "bg-green-400" : ""}`}></p>
                            <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
                        </div>
                        <div 
                        onClick={()=>setMethod('cod')}
                        className="flex items-center border p-2 px-3 cursor-pointer">
                            <p className={`min-w-3.5 h-3.5 border rounded-full  ${method === "cod" ? "bg-green-400" : ""}`}></p>
                            <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
                        </div>
                        
                    </div>
                    <div className="w-full text-end mt-8">
                        <button 
                        type="submit"
                        className="bg-black text-white px-16 py-3 text-sm">PLACE ORDER</button>
                    </div>
                </div>

            </div>

        </form>
    )
}