export const initialCartState = {
  cartId: null,
  items: [],
  drawerOpen: false,
  toast: null
};

export function cartReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_DRAWER':
      return { ...state, drawerOpen: action.payload };
    case 'SET_CART_ID':
      return { ...state, cartId: action.payload };
    case 'SET_TOAST':
      return { ...state, toast: action.payload };
    case 'CLEAR_TOAST':
      return { ...state, toast: null };
    case 'SET_ITEMS':
      return { ...state, items: action.payload };
    case 'ADD_ITEM': {
      const existing = state.items.find(item => item.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, cantidad: item.cantidad + 1, subtotal: (item.cantidad + 1) * item.precio }
              : item
          )
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, cantidad: 1, subtotal: action.payload.precio }]
      };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(item => item.id !== action.payload) };
    case 'INCREMENT_ITEM':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload
            ? { ...item, cantidad: item.cantidad + 1, subtotal: (item.cantidad + 1) * item.precio }
            : item
        )
      };
    case 'DECREMENT_ITEM':
      return {
        ...state,
        items: state.items
          .map(item =>
            item.id === action.payload
              ? { ...item, cantidad: Math.max(1, item.cantidad - 1), subtotal: Math.max(1, item.cantidad - 1) * item.precio }
              : item
          )
          .filter(item => item.cantidad > 0)
      };
    case 'CLEAR_CART':
      return { ...state, items: [], cartId: null };
    default:
      return state;
  }
}
