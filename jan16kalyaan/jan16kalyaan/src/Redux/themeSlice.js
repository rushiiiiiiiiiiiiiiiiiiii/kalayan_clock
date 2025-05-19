// Redux slice to toggle dark mode
const initialState = {
    theme: "light", // default
  };
  
  // Action types
  const TOGGLE_THEME = "TOGGLE_THEME";
  
  // Reducer
  export const themeReducer = (state = initialState, action) => {
    switch (action.type) {
      case TOGGLE_THEME:
        return {
          theme: state.theme === "light" ? "dark" : "light",
        };
      default:
        return state;
    }
  };
  
  // Action creator
  export const toggleTheme = () => ({
    type: TOGGLE_THEME,
  });
  