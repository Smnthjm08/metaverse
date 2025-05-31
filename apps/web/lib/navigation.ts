export let navigation: any = () => {};

export const setNavigation = (fn: void) => {
  navigation = fn;
};

export const navigate = (path: string) => {
  if (navigation) {
    navigation(path);
  } else {
    console.error("Navigation function is not set");
  }
};
