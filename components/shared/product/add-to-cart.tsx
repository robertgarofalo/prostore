'use client'

import { CartItem } from "@/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { addItemToCart } from "@/lib/actions/cart.actions";

const AddToCart = ({ item }: { item: Cart }) => {

    const router = useRouter()


    const handleAddToCart = async () => {
        const res = await addItemToCart(item)

        if(!res.success){
            // toast.error(res.message)
            toast.error('There was an issue', {
                style: {
                    background: 'red',
                    color: 'white'
                }
            }
            )
            return
        }

        // handle success cart

        toast.success(`${item.name} added to cart`, {
            action: (
                <Button className="bg-primary text-white hover:bg-gray-800 hover:cursor-pointer"
                onClick={() => router.push('/cart')}
                >
                    Go to cart
                </Button>
            )
        })
    }

    return ( <Button className="w-full" type='button' onClick={handleAddToCart}><Plus />Add to cart</Button> );
}
 
export default AddToCart;