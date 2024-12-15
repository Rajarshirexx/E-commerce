import { useContext } from "react"
import { ShopContext } from "../Context/ShopContext"
import Title from "./Title";

export default function CartTotal() {
    
    const {currency,delivery_fee, getCartAmount} = useContext(ShopContext);
    
    return(
        <div className="w-full ">
            <div className="text-2xl ">
                <Title text1={"CART"} text2={"TOTAL"} />
            </div>

            <div className="flex flex-col gap-2 mt-2 text-sm">
                <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>{currency} {getCartAmount()}.00</p>
                </div>
                <hr/>

                <div className="flex justify-between">
                    <p>Shipping fees</p>
                    <p>{currency} {delivery_fee}.00</p>
                </div>
                <hr/>
                <div className="flex justify-between">
                    <b>Total</b>
                    <b>{currency} {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00 </b>
                </div>
            </div>
        </div>
    )
}