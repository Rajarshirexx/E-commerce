import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../Context/ShopContext"
import { assets } from "../assets/frontend_assets/assets";
import Title from "../Components/Title";
import ProductItem from "../Components/ProductItem";

export default function Collection() {
    
    const {products, search, showSearch} = useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(false); 
    const [filterProducts, setFilterProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [subcategory, setSubcategory] = useState([]);
    const [sortType, setSortType] = useState('relevant')

    function toggleCategory(e) {
        
        if (category.includes(e.target.value)) {
            setCategory(prev=> prev.filter(item => item !== e.target.value))
        }
        else {
            setCategory(prev => [...prev, e.target.value])
        }
    } 

    function toggleSubcategory(e) {
        if (subcategory.includes(e.target.value)) {
            setSubcategory(prev=> prev.filter(item => item !== e.target.value))
        } else {
            setSubcategory(prev => [...prev, e.target.value])
        }
    }

    function applyFilter() {
        let productsCopy = products.slice();

        if (showSearch && search) {
            productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        }

        if (category.length > 0) {
            productsCopy = productsCopy.filter(item => category.includes(item.category));
        }

        if (subcategory.length > 0) {
            productsCopy = productsCopy.filter(item => subcategory.includes(item.subcategory))
        }

        setFilterProducts(productsCopy)
    }

     function sortProduct() {
        
        let fpCopy = filterProducts.slice();

        switch (sortType) {
            case 'low-high':
                setFilterProducts(fpCopy.sort((a,b)=>(a.price - b.price)));
                break;
            
            case 'high-low':
                setFilterProducts(fpCopy.sort((a,b)=>(b.price - a.price)));
                break;

            default:
                applyFilter();
                break;
        }

    }       

    useEffect(() => {
        applyFilter();
    }, [category, subcategory, search, showSearch, products]);

    useEffect(() => {
        sortProduct();
    }, [sortType]); 

    useEffect(() => {
        let filtered = products;
    
        if (showSearch && search) {
            filtered = filtered.filter((item) => 
                item.name && item.name.toLowerCase().includes(search.toLowerCase())
            );
        }
    
        if (category.length > 0) {
            filtered = filtered.filter((item) => category.includes(item.category));
        }
    
        if (subcategory.length > 0) {
            filtered = filtered.filter((item) => subcategory.includes(item.subcategory));
        }
    
        if (sortType === 'low-high') {
            filtered = filtered.slice().sort((a, b) => a.price - b.price);
        } else if (sortType === 'high-low') {
            filtered = filtered.slice().sort((a, b) => b.price - a.price);
        }
    
        setFilterProducts(filtered);
    }, [products, category, subcategory, sortType, search, showSearch]);
    
    
    return(
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
            
            <div className="min-w-60">
                <p onClick={()=>setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2">FILTERS
                    <img className={`h-3 sm:hiddden ${showFilter ? "rotate-90" : ""}`} src={assets.dropdown_icon} alt="" />
                </p>
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
                    <p className="mb-3 text-sm font-medium">CATEGORIES</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                        <p className="flex gap-2 ">
                            <input 
                            className="w-3"
                            type="checkbox" 
                            value={'Men'}
                            onChange={toggleCategory}
                            /> Men
                        </p>
                        <p className="flex gap-2 ">
                            <input 
                            className="w-3"
                            type="checkbox" 
                            value={'Women'}
                            onChange={toggleCategory}
                            /> Women
                        </p>
                        <p className="flex gap-2 ">
                            <input 
                            className="w-3"
                            type="checkbox" 
                            value={'Kids'}
                            onChange={toggleCategory}
                            /> Kids
                        </p>
                    </div>
                </div>
                {/* Subcategory Filter */}
                <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? "" : "hidden"} sm:block`}>
                    <p className="mb-3 text-sm font-medium">TYPE</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                        <p className="flex gap-2 ">
                            <input 
                            className="w-3"
                            type="checkbox" 
                            value={'Topwear'}
                            onChange={toggleSubcategory}
                            /> Topwear
                        </p>
                        <p className="flex gap-2 ">
                            <input 
                            className="w-3"
                            type="checkbox" 
                            value={'Bottomwear'}
                            onChange={toggleSubcategory}
                            /> Bottomwear
                        </p>
                        <p className="flex gap-2 ">
                            <input 
                            className="w-3"
                            type="checkbox" 
                            value={'Winterwear'}
                            onChange={toggleSubcategory}
                            /> Winterwear
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex-1 ">

                <div className="flex justify-between text-base sm:text-2xl mb-4">
                    <Title text1={"All"} text2={"COLLECTIONS"}/>
                    <select 
                    onChange={(e)=>setSortType(e.target.value)}
                    className="border-2 border-gray-300 text-sm px-2">
                        <option value="relevant">Sort by: Relevant</option>
                        <option value="low-high">Sort by: Low to High</option>
                        <option value="high-low">Sort by: High to Low</option>
                    </select>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
                    {
                        filterProducts.map((item, index)=> (
                            <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
                        ))
                    }
                </div>

            </div>

        </div>
    )
}