import {
	GET_LIST_MENU,
	GET_LIST_MENU_ORDER,
	GET_LIST_MENU_READY,
	GET_ITEM_MENU,
	CREATE_MENU,
	UPDATE_MENU,
	DELETE_MENU
} from 'redux/constants'

const initialState = {
	item_menu:{},
	list_menu_order:[],
	list_menu_ready:[],
	list_menu:[]
}

export default function(state = initialState, action) {
	switch (action.type) {
	
	case GET_LIST_MENU:
		return {
			...state,
			list_menu: action.payload
		}
	case GET_LIST_MENU_ORDER:
		return {
			...state,
			list_menu_order: action.payload
		}
	case GET_LIST_MENU_READY:
		return {
			...state,
			list_menu_ready: action.payload
		}
	case GET_ITEM_MENU:
		return {
			...state,
			item_menu: action.payload
		}
	case CREATE_MENU:
		return {
			...state,
			item_menu: action.payload
		}
	case UPDATE_MENU:
		return {
			...state,
			item_menu: action.payload
		}
	case DELETE_MENU:
		return {
			...state,
		}
	default:
		return state
	}
}
