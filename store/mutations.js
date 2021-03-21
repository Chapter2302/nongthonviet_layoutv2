import lodash from 'lodash'
import state from './state';

// export const updateViews = (state, {payload, action}) => {
//     const views = lodash.get(payload.module, 'views', []);

//     if (views && views.length) {
//         let newViews = [];
//         const currentViewName = state.views.map(view => view.name);
//         let newViewName = [];
//         newViewName = views.map(view => view.name);
//         // clear old views
//         newViews = state.views.filter(view => !newViewName.includes(view.name));
//         // add new views
//         newViews = [...newViews, ...views];

//         state.views = newViews;
//     }
// }

// export const clearViews = (state, views) => {
//     state.views = state.views.filter(view => !views.includes(view.name));
// }

// export const updateMessages = (state, { payload, action }) => {
//     const messages = lodash.get(payload, 'message', '');

//     if (messages) {
//         state.messages = messages.map(m => ({ ...m, action }));
//     }
// }

// export const clearMessages = (state) => {
//     state.messages = [];
// }

// export const loginStatus = (state, status) => {
//     state.loginStatus = status
// }

// export const setAuth = (state, hasAuth = false) => {
//     state.isAuth = hasAuth
// }

// active signin modal

export const setActiveSignin = (state, payload) => {
  state.signinModal = payload;
}



// categories 

export const SET_CATEGORIES = (state, payload) => {
  state.categories = payload;
}

// weather

export const SET_WEATHER = (state, payload) => {
  state.weather = payload
}

// set gold
export const SET_GOLD_RATES = (state, payload) => {
  state.goldRates = payload
}

// Set default posts on menu

export const SET_DEFAULTPOSTSONMENU = (state, payload) => {
  state.defaultPostOnMenu = payload
}

export const setPostMenuDesktop = (state, payload) => {
  state.postMenuDesktop = payload
}

export const SET_USER = (state, payload) => {
  state.user = payload;
}

export const SET_AUTH_ERROR = (state, payload) => {
  state.authError = payload;
}
