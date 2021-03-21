import axios from "axios";

//---------------CATEGORY---------------//
export async function getCategories(
  { dispatch },
  { nextActions, errorActions }
) {
  return await axios({
    url: `${process.env.BASE_API}/category/list`,
    method: "GET"
  })
    .then(res => {
      const data = res.data;
      if (data.status >= 200 && data.status <= 299) {
        nextActions(data);
      } else {
        errorActions(data);
      }
    })
    .catch(e => {
      if (e.response) {
        if (e.response.status < 200 || e.response.status > 299) {
          errorActions(e.response.data);
        }
      }
    });
}

export async function getDetailCategory(
  { dispatch },
  { id, nextActions, errorActions }
) {
  return await axios({
    url: `${process.env.BASE_API}/category/${id}`,
    method: "GET"
  })
    .then(res => {
      const data = res.data;
      if (data.status >= 200 && data.status <= 299) {
        nextActions(data);
      } else {
        errorActions(data);
      }
    })
    .catch(e => {
      if (e.response) {
        if (e.response.status < 200 || e.response.status > 299) {
          errorActions(e.response.data);
        }
      }
    });
}

//------------------Article---------------------//
export async function getArticleListing(
  { dispatch },
  { skip, limit, data, nextActions, errorActions }
) {
  if (!data.sort) {
    data.sort = "publicationTime=desc";
  }
  const obj = { limit, skip, ...data };
  Object.keys(obj).forEach(key => obj[key] === "" && delete obj[key]);
  const params = obj;
  return await axios({
    url: `${process.env.BASE_API}/article/listing`,
    method: "GET",
    params: params ? params : false
  })
    .then(res => {
      const data = res.data;
      if (data.status >= 200 && data.status <= 299) {
        nextActions(data);
      } else {
        errorActions(data);
      }
    })
    .catch(e => {
      if (e.response) {
        if (e.response.status < 200 || e.response.status > 299) {
          errorActions(e.response.data);
        }
      }
    });
}

// export async function getTopHotNewsByCategory(
//   { dispatch },
//   { skip, limit, categoryId, nextActions, errorActions }
// ) {
//   const obj = { limit, skip, categoryId };
//   Object.keys(obj).forEach(key => obj[key] === "" && delete obj[key]);
//   const params = obj;
//   return await axios({
//     url: `${process.env.BASE_API}/article/hot`,
//     method: "GET",
//     params: params ? params : false
//   })
//     .then(res => {
//       const data = res.data;
//       if (data.status >= 200 && data.status <= 299) {
//         nextActions(data);
//       } else {
//         errorActions(data);
//       }
//     })
//     .catch(e => {
//       if (e.response) {
//         if (e.response.status < 200 || e.response.status > 299) {
//           errorActions(e.response.data);
//         }
//       }
//     });
// }

// export async function getNewsInCategoryPage(
//   { dispatch },
//   { skip, limit, categoryId, nextActions, errorActions }
// ) {
//   const obj = { limit, skip, categoryId };
//   Object.keys(obj).forEach(key => obj[key] === "" && delete obj[key]);
//   const params = obj;
//   return await axios({
//     url: `${process.env.BASE_API}/article/inCategory`,
//     method: "GET",
//     params: params ? params : false
//   })
//     .then(res => {
//       const data = res.data;
//       if (data.status >= 200 && data.status <= 299) {
//         nextActions(data);
//       } else {
//         errorActions(data);
//       }
//     })
//     .catch(e => {
//       if (e.response) {
//         if (e.response.status < 200 || e.response.status > 299) {
//           errorActions(e.response.data);
//         }
//       }
//     });
// }

export async function getDetailNew(
  { dispatch },
  { articleId, nextActions, errorActions }
) {
  return await axios({
    url: `${process.env.BASE_API}/article/${articleId}`,
    method: "GET"
  })
    .then(res => {
      const data = res.data;
      if (data.status >= 200 && data.status <= 299) {
        nextActions(data);
      } else {
        errorActions(data);
      }
    })
    .catch(e => {
      if (e.response) {
        if (e.response.status < 200 || e.response.status > 299) {
          errorActions(e.response.data);
        }
      }
    });
}

export async function getArticleHomePage(
  { dispatch },
  { nextActions, errorActions }
) {
  return await axios({
    url: `${process.env.BASE_API}/article/homepage`,
    method: "GET"
  })
    .then(res => {
      const data = res.data;
      if (data.status >= 200 && data.status <= 299) {
        nextActions(data);
      } else {
        errorActions(data);
      }
    })
    .catch(e => {
      if (e.response) {
        if (e.response.status < 200 || e.response.status > 299) {
          errorActions(e.response.data);
        }
      }
    });
}

//--------------Comon--------------------//
export async function searchPosts(
  { dispatch },
  { skip, limit, keyword, nextActions, errorActions }
) {
  const obj = { limit, skip, keyword };
  Object.keys(obj).forEach(key => obj[key] === "" && delete obj[key]);
  const params = obj;
  return await axios({
    url: `${process.env.BASE_API}/common/search`,
    method: "GET",
    params: params ? params : false
  })
    .then(res => {
      const data = res.data;
      if (data.status >= 200 && data.status <= 299) {
        nextActions(data);
      } else {
        errorActions(data);
      }
    })
    .catch(e => {
      if (e.response) {
        if (e.response.status < 200 || e.response.status > 299) {
          errorActions(e.response.data);
        }
      }
    });
}
export async function getCurrentWeather({ dispatch }, { id, appid }) {
  const obj = { id, appid };
  Object.keys(obj).forEach(key => obj[key] === "" && delete obj[key]);
  const params = obj;
  return await axios({
    url: "http://api.openweathermap.org/data/2.5/weather",
    method: "GET",
    params: params ? params : false
  });
}

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
  } catch (e) {}
}

//--------------Comment-----------------//

export async function getComments(
  { dispatch },
  { articleId, skip, limit, nextActions, errorActions }
) {
  const obj = { limit, skip };
  Object.keys(obj).forEach(key => obj[key] === "" && delete obj[key]);
  const params = obj;
  return await axios({
    url: `${process.env.BASE_API}/comment/list/${articleId}`,
    method: "GET",
    params: params ? params : false
  })
    .then(res => {
      const data = res.data;
      if (data.status >= 200 && data.status <= 299) {
        nextActions(data);
      } else {
        errorActions(data);
      }
    })
    .catch(e => {
      if (e.response) {
        if (e.response.status < 200 || e.response.status > 299) {
          errorActions(e.response.data);
        }
      }
    });
}

export async function getReplyComments(
  { dispatch },
  { commentId, skip, limit, nextActions, errorActions }
) {
  const obj = { limit, skip };
  Object.keys(obj).forEach(key => obj[key] === "" && delete obj[key]);
  const params = obj;
  return await axios({
    url: `${process.env.BASE_API}/comment/replies/${commentId}`,
    method: "GET",
    params: params ? params : false
  })
    .then(res => {
      const data = res.data;
      if (data.status >= 200 && data.status <= 299) {
        nextActions(data);
      } else {
        errorActions(data);
      }
    })
    .catch(e => {
      if (e.response) {
        if (e.response.status < 200 || e.response.status > 299) {
          errorActions(e.response.data);
        }
      }
    });
}

export async function postComment(
  { dispatch },
  { articleId, data, nextActions, errorActions }
) {
  return await axios({
    url: `${process.env.BASE_API}/comment/post/${articleId}`,
    method: "POST",
    data
  })
    .then(res => {
      const data = res.data;
      if (data.status >= 200 && data.status <= 299) {
        nextActions(data);
      } else {
        errorActions(data);
      }
    })
    .catch(e => {
      if (e.response) {
        if (e.response.status < 200 || e.response.status > 299) {
          errorActions(e.response.data);
        }
      }
    });
}

export async function replyComment(
  { dispatch },
  { commentId, data, nextActions, errorActions }
) {
  return await axios({
    url: `${process.env.BASE_API}/comment/postReply/${commentId}`,
    method: "POST",
    data
  })
    .then(res => {
      const data = res.data;
      if (data.status >= 200 && data.status <= 299) {
        nextActions(data);
      } else {
        errorActions(data);
      }
    })
    .catch(e => {
      if (e.response) {
        if (e.response.status < 200 || e.response.status > 299) {
          errorActions(e.response.data);
        }
      }
    });
}

//---------------------Layout-------------------//

export async function getLayout(
  { dispatch },
  { page, nextActions, errorActions }
) {
  return await axios({
    url: `${process.env.BASE_API}/layout/${page}`,
    method: "GET"
  })
    .then(res => {
      const data = res.data;
      if (data.status >= 200 && data.status <= 299) {
        nextActions(data);
      } else {
        errorActions(data);
      }
    })
    .catch(e => {
      if (e.response) {
        if (e.response.status < 200 || e.response.status > 299) {
          errorActions(e.response.data);
        }
      }
    });
}

//---------------------Ads----------------------//
export async function getAds(
  { dispatch },
  { creativeSlot, nextActions, errorActions }
) {
  return await axios({
    url: `${process.env.BASE_API}/ads/${creativeSlot}`,
    method: "GET"
  })
    .then(res => {
      const data = res.data;
      if (data.status >= 200 && data.status <= 299) {
        nextActions(data);
      } else {
        errorActions(data);
      }
    })
    .catch(e => {
      if (e.response) {
        if (e.response.status < 200 || e.response.status > 299) {
          //errorActions(e.response.data);
        }
      }
    });
}

//---------------------User---------------------//

export async function login({ commit, dispatch }, authData) {
  try {
    // fetch user
    const user = await this.$axios.post(`${process.env.BASE_API}/user/login`, {
      email: authData.email,
      password: authData.password
    });
    const { result } = user.data;
    // setlocal storage
    localStorage.setItem("token", result.loginToken);
    localStorage.setItem("userId", result.userId);
    // set user to store
    dispatch("getMe");

    // close modal
    commit("setActiveSignin", false);

    // success
    commit("SET_AUTH_ERROR", null);
  } catch (e) {
    // status 400
    if (e.response && e.response.status >= 400) {
      const mess = e.response.data.message;
      commit("SET_AUTH_ERROR", mess);
    } else {
    }
  }
}

export async function register(
  { dispatch, commit },
  { data, nextActions, errorActions }
) {
  return await axios({
    url: `${process.env.BASE_API}/user/register`,
    method: "POST",
    data
  })
    .then(res => {
      const data = res.data;
      if (data.status >= 200 && data.status <= 299) {
        nextActions(data);
      } else {
        errorActions(data);
      }
    })
    .catch(e => {
      if (e.response) {
        if (e.response.status < 200 || e.response.status > 299) {
          errorActions(e.response.data);
        }
      }
    });
}

export function logout({ commit }) {
  commit("SET_USER", null);
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  this.$router.push("/");
}

export async function forgetPassword(
  { commit },
  { data, nextActions, errorActions }
) {
  return await axios({
    url: `${process.env.BASE_API}/user/forgotPassword`,
    method: "POST",
    data
  })
    .then(res => {
      const data = res.data;
      if (data.status >= 200 && data.status <= 299) {
        nextActions(data);
      } else {
        errorActions(data);
      }
    })
    .catch(e => {
      if (e.response) {
        if (e.response.status < 200 || e.response.status > 299) {
          errorActions(e.response.data);
        }
      }
    });
}

export async function getMe({ commit }) {
  const token = localStorage.getItem("token");
  let params = { token };
  return await axios({
    url: `${process.env.BASE_API}/user/me`,
    method: "GET",
    params: params ? params : false
  })
    .then(res => {
      const data = res.data;
      if (data.status >= 200 && data.status <= 299) {
        commit("SET_USER", {
          ...data.result
        });
      } else {
      }
    })
    .catch(e => {
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
    });
}

export async function updateUserInfo(
  { dispatch },
  { data, nextActions, errorActions }
) {
  const token = localStorage.getItem("token");
  let params = { token };
  return await axios({
    url: `${process.env.BASE_API}/user/updateMe`,
    method: "POST",
    data,
    params: params ? params : false
  })
    .then(res => {
      const data = res.data;
      if (data.status >= 200 && data.status <= 299) {
        dispatch("getMe");
        nextActions(data);
      } else {
        errorActions(data);
      }
    })
    .catch(e => {
      if (e.response) {
        if (e.response.status < 200 || e.response.status > 299) {
          errorActions(e.response.data);
        }
      }
    });
}

export async function changePassword(
  { dispatch },
  { data, nextActions, errorActions }
) {
  const token = localStorage.getItem("token");
  let params = { token };
  return await axios({
    url: `${process.env.BASE_API}/user/changePassword`,
    method: "PUT",
    data,
    params: params ? params : false
  })
    .then(res => {
      const data = res.data;
      if (data.status >= 200 && data.status <= 299) {
        nextActions(data);
      } else {
        errorActions(data);
      }
    })
    .catch(e => {
      if (e.response) {
        if (e.response.status < 200 || e.response.status > 299) {
          errorActions(e.response.data);
        }
      }
    });
}

export async function verifyUserAccount(
  { dispatch },
  { token, nextActions, errorActions }
) {
  let params = { token };
  return await axios({
    url: `${process.env.BASE_API}/user/registerVerification`,
    method: "PUT",
    params: params ? params : false
  })
    .then(res => {
      const data = res.data;
      if (data.status >= 200 && data.status <= 299) {
        nextActions(data);
        localStorage.setItem("token", data.result.loginToken);
        localStorage.setItem("userId", data.result.userId);
      } else {
        errorActions(data);
      }
    })
    .catch(e => {
      if (e.response) {
        if (e.response.status < 200 || e.response.status > 299) {
          errorActions(e.response.data);
        }
      }
    });
}
export async function getMeFromVerify(
  { commit },
  { loginToken, nextActions, errorActions }
) {
  let params = { token: loginToken };
  return await axios({
    url: `${process.env.BASE_API}/user/me`,
    method: "GET",
    params: params ? params : false
  })
    .then(res => {
      const data = res.data;
      if (data.status >= 200 && data.status <= 299) {
        nextActions(data);
        commit("SET_USER", {
          ...data.result
        });
      } else {
        errorActions(result);
      }
    })
    .catch(e => {
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      if (e.response) {
        if (e.response.status < 200 || e.response.status > 299) {
          errorActions(e.response.data);
        }
      }
    });
}
export async function refreshPass(
  { dispatch },
  { data, nextActions, errorActions }
) {
  return await axios({
    url: `${process.env.BASE_API}/user/changeForgotPassword`,
    method: "PUT",
    data
  })
    .then(res => {
      const data = res.data;
      if (data.status >= 200 && data.status <= 299) {
        nextActions(data);
        localStorage.setItem("token", data.result.loginToken);
        localStorage.setItem("userId", data.result.userId);
      } else {
        errorActions(data);
      }
    })
    .catch(e => {
      if (e.response) {
        if (e.response.status < 200 || e.response.status > 299) {
          errorActions(e.response.data);
        }
      }
    });
}

export async function subscribe(
  { dispatch },
  { data, nextActions, errorActions }
) {
  return await axios({
    url: `${process.env.BASE_API}/user/subscribe`,
    method: "POST",
    data
  })
    .then(res => {
      const data = res.data;
      if (data.status >= 200 && data.status <= 299) {
        nextActions(data);
      } else {
        errorActions(data);
      }
    })
    .catch(e => {
      if (e.response) {
        if (e.response.status < 200 || e.response.status > 299) {
          errorActions(e.response.data);
        }
      }
    });
}

//--------------Tag------------//
export async function getTagList(
  { dispatch },
  { data, nextActions, errorActions }
) {
  const obj = { ...data };
  Object.keys(obj).forEach(key => obj[key] === "" && delete obj[key]);
  const params = obj;
  return await axios({
    url: `${process.env.BASE_API}/tag/list`,
    method: "GET",
    params: params ? params : false
  })
    .then(res => {
      const data = res.data;
      if (data.status >= 200 && data.status <= 299) {
        nextActions(data);
      } else {
        errorActions(data);
      }
    })
    .catch(e => {
      if (e.response) {
        if (e.response.status < 200 || e.response.status > 299) {
          errorActions(e.response.data);
        }
      }
    });
}
