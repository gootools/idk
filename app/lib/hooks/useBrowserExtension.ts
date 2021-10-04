import { useLayoutEffect } from "react";
import store from "../../models";

const useBrowserExtension = () => {
  useLayoutEffect(() => {
    if (!store.isBrowserExtension) return;
    const body = document?.querySelector("body");
    if (body) {
      body.style.width = "320px";
      body.style.height = "568px";
      body.style.backgroundColor = "black";
    }
  }, [store.isBrowserExtension]);

  return null;
};

export default useBrowserExtension;
