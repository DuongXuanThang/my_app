export const BASE_URL = import.meta.env.VITE_BASE_PATH

console.log(BASE_URL);


export const ROOTS = {
    AUTH: `/#login`,
    DASHBOARD: `${BASE_URL}/`,
  };
  
  export const paths = {
    // AUTH
    auth: ROOTS.AUTH,
    // DASHBOARD
    dashboard: {
      root: ROOTS.DASHBOARD,
      router_control: `${ROOTS.DASHBOARD}/router-control`,
      // two: `${ROOTS.DASHBOARD}/two`,
      // three: `${ROOTS.DASHBOARD}/three`,
      // group: {
      //   root: `${ROOTS.DASHBOARD}/group`,
      //   five: `${ROOTS.DASHBOARD}/group/five`,
      //   six: `${ROOTS.DASHBOARD}/group/six`,
      // },
    },
  };
  