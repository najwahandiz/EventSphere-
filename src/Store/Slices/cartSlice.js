import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	items: []
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const event = action.payload;
			const existingItem = state.items.find(
				(item) => item.id === event.id);

			if (existingItem) {
				existingItem.quantity += 1;
			} else {
				state.items.push({
					...event,
					quantity: 1
				});
			}
		},

		increaseQuantity: (state, action) => {
			const id = action.payload;
			const item = state.items.find(event => event.id === id);
			if (item) {
				item.quantity += 1;
			}
		},

		decreaseQuantity : (state, action)=>{
			const id = action.payload;
			const item = state.items.find(evnt=>evnt.id===id);
			if(item){
				if(item.quantity > 1){
					item.quantity -= 1;
				}else{
					state.items = state.items.filter(item=>item.id !== id)
				}	
			}
		},

		removeItem : (state,action)=>{
			const id = action.payload;
			state.items = state.items.filter(item=>item.id !== id)
		}
	}
})

	export const {
		addToCart,
		increaseQuantity,
		decreaseQuantity,
		removeItem,
	} = cartSlice.actions;

	export default cartSlice.reducer;