// axios config

export default function ({ $axios, redirect, store, app }) {
  $axios.defaults.baseURL = "https://backend.saramh.co/client-api/v1/";

  $axios.onRequest((config) => {
    $axios.setHeader("Content-Type", "application/json");
    $axios.setHeader("Access-Control-Allow-Origin", "*");
    $axios.setHeader("Accept", "application/json");
    $axios.setHeader("Accept-Language", app.i18n.locale);
    $axios.setHeader(
      "Api-Key",
      "eyJpdiI6IjJOd3k1b2d4V2ZpL3ROT3k4YzdVcmc9PSIsInZhbHVlIjoic1g1ZVE0Z1BsS0lMWjlHUmVkMTJ2UW1wSGJtUXFKYmNSRzhVN1RyMnVuTWFRbmF2QTMrZ1hHd3ppOXhIS0pQciIsIm1hYyI6ImUzNmUzYjU5YWQ5YmNmMGUyYjUxM2IxNjNiMDA2MTZkMmVjZDY0MzA1YzI0YWJkNWE5ZGJiYjIzOTZhOGIwZWYiLCJ0YWciOiIifQ=="
    );
    // ? add token to each request
    // console.log(store.state);
    // if (store.state.user?.access_token) {
    //   config.headers.common.Authorization = `Bearer ${store.state.user.access_token}`;
    // }
  });

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status);
    // code === 400 || this refer when api failed
    // code === 403 when api not found
    // code === 500 when param in api is undefined
    // code === 400 bad request

    if (code === 401) {
      app.$auth.logout();
      redirect("/login");
    } else if (code === 404) {
      // redirect("/");
    } else if (code === 403) {
      redirect("/");
    }
  });
}
