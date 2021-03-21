import { get, isEmpty, forIn, isBuffer } from "lodash";

export function makeRequestAction({ commit, ...rest }, payload) {
  // if (!process.client) return;
  try {
    const { nextActions, errorActions, ...data } =
      get(payload, "data", {}) || {};
    return this._vm.$request
      .makeRequestAPI({
        ...payload,
        data
      })
      .then(
        response => {
          if (response && response.data) {
            const responseData = get(response, "data", null);
            const status = get(responseData, "status", null);
            if (status === 0 && typeof errorActions === "function") {
              errorActions(responseData);
            }

            // normal request
            if (status === 1 && typeof nextActions === "function") {
              nextActions(responseData);
            }
          }
          return response;
        },
        error => {
          if (process.env.NODE_ENV == "development") {
            console.log("%cerror", "color: red; font-weight: bold;", error);
            if (get(error, "response.Status", "") === 401) {
              //place your reentry code
              console.log("Unauthorized");
            }
          }
          return false;
        }
      );
  } catch (ex) {
    if (process.env.NODE_ENV == "development")
      console.log(
        "%cmakeRequestAction error:",
        "color: red; font-weight: bold;",
        ex
      );
    // Handle error
    return;
  }
}

// getcategories *
export function getCategories({ dispatch }, { ...data }) {
  return dispatch("makeRequestAction", {
    url: `${process.env.BASE_API}/public/category`,
    method: "GET",
    data
  });
}

//getDetailCategory *
export function getDetailCategory({ dispatch }, { id, ...data }) {
  return dispatch("makeRequestAction", {
    url: `${process.env.BASE_API}/public/category/${id}`,
    method: "GET",
    data
  });
}

//getTopHotNewsByCategory *
export function getTopHotNewsByCategory({ dispatch }, { ...data }) {
  return dispatch("makeRequestAction", {
    url: `${process.env.BASE_API}/public/hotNews`,
    method: "GET",
    data
  });
}

//getNewsInCategoryPage *
export function getNewsInCategoryPage({ dispatch }, { ...data }) {
  return dispatch("makeRequestAction", {
    url: `${process.env.BASE_API}/public/newsInCategory`,
    method: "GET",
    data
  });
}

// getNewsInCategoryPage *
// export function getNewsInCategoryPage({
//   dispatch
// }, {
//   id,
//   ...data
// }) {
//   return dispatch("makeRequestAction", {
//     url: `${process.env.BASE_API}/public/newsInCategory/${id}`,
//     method: "GET",
//     data
//   });
// }

//  getDetailNew *
export function getDetailNew({ dispatch }, { id, ...data }) {
  return dispatch("makeRequestAction", {
    url: `${process.env.BASE_API}/public/news/${id}`,
    method: "GET",
    data
  });
}

// search
export function searchPosts({ dispatch }, { id, ...data }) {
  return dispatch("makeRequestAction", {
    url: `${process.env.BASE_API}/public/search`,
    method: "GET",
    data
  });
}

// get comment in post
export function getComments({ dispatch }, { id, ...data }) {
  return dispatch("makeRequestAction", {
    url: `${process.env.BASE_API}/public/news/comments/${id}`,
    method: "GET",
    data
  });
}

// get reply comments
export function getReplyComments({ dispatch }, { commentId, ...data }) {
  return dispatch("makeRequestAction", {
    url: `${process.env.BASE_API}/public/news/replies/${commentId}`,
    method: "GET",
    data
  });
}

//  getLayout *
export function getLayout({ dispatch }, { page, ...data }) {
  return dispatch("makeRequestAction", {
    url: `${process.env.BASE_API}/public/layout/${page}`,
    method: "GET",
    data
  });
}

// get ads by layout
export function getAds({ dispatch }, { page, ...data }) {
  return dispatch("makeRequestAction", {
    url: `${process.env.BASE_API}/public/ads/${page}`,
    method: "GET",
    data
  });
}

/*===================*/

// get weather api

export function getCurrentWeather({ dispatch }, data) {
  return dispatch("makeRequestAction", {
    url: "http://api.openweathermap.org/data/2.5/weather",
    method: "GET",
    data
  });
}

// export function getCategories({ dispatch }) {
//   return dispatch('makeRequestAction', {
//     url: `https://glados.boo.vn/v1/api/portal/news/${id}`,
//     method: "GET",
//   })
// }

// export async function getCurrentWeather({
//   commit
// }) {
//   try {
//     const weatherData = await this.$axios.get(
//       "http://api.openweathermap.org/data/2.5/weather?id=1566083&appid=060d473d45f1d22478455e48f344f211"
//     );

//     if (weatherData.status === 200) {
//       console.log(weatherData.data, "data");
//       commit("SET_WEATHER", weatherData.data);
//     } else return;
//   } catch (error) {
//     console.log(e);
//   }
// }

// custom fetch gold api

export async function getGoldRates({ commit }) {
  try {
    const priceData = await this.$axios.get(
      "https://www.goldapi.io/api/XAU/USD",
      {
        headers: {
          "x-access-token": "goldapi-9kd4ukeqvy6ss-io",
          "Content-Type": "application/json"
        }
      }
    );

    commit("SET_GOLD_RATES", priceData.data);
  } catch (e) {
    console.log(e);
  }
}

// auth

export async function login({ commit }, authData) {
  try {
    // fetch user
    const user = await this.$axios.post(
      `${process.env.BASE_API}/public/login`,
      {
        email: authData.email,
        password: authData.password
      }
    );
    const { result } = user.data;
    console.log(result);
    // setlocal storage
    localStorage.setItem("token", result.loginToken);

    // set user to store
    commit("SET_USER", {
      ...result
    });

    // close modal
    commit("setActiveSignin", false);

    // success
    commit("SET_AUTH_ERROR", null);
  } catch (e) {
    // status 400
    if (e.response && e.response.status === 400) {
      commit("SET_AUTH_ERROR", "Sai email hoặc mật khẩu");
    } else {
      console.log(e);
    }
  }
}

export async function register({ dispatch, commit }, authData) {
  const { email, name, password } = authData;
  try {
    // register
    await this.$axios.post(`${process.env.BASE_API}/public/register`, {
      email,
      name,
      password
    });

    // if success
    commit("SET_AUTH_ERROR", null);
    // try login before register
    dispatch("login", {
      email,
      password
    });
  } catch (e) {
    console.log(e);
    if (e.response && e.response.status === 400) {
      commit("SET_AUTH_ERROR", "Email đã có người sử dụng");
    } else {
      console.log("lỗi khác");
    }
  }
}

export function logout({ commit }) {
  commit("SET_USER", null);

  localStorage.removeItem("token");
  localStorage.removeItem("userId");
}

export function tryAutoLogin({ commit }) {
  const token = localStorage.getItem("token");

  if (!token) return;

  const user = JSON.parse(localStorage.getItem("user"));

  commit("SET_USER", {
    ...user
  });
}

export async function forgetPassword({ commit }, email) {
  try {
    const request = await this.$axios.post(
      `${process.env.BASE_API}/public/forgotPassword`,
      {
        email
      }
    );
    console.log(request);
    if (request.status === 1) {
      commit("SET_AUTH_ERROR", null);
    }
  } catch (e) {
    if (e.response && e.response.status === 400) {
      commit("SET_AUTH_ERROR", "Email không chính xác");
    }
  }
}
