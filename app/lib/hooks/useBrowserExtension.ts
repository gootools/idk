import { useLayoutEffect } from "react";
import { Platform } from "react-native";

const useBrowserExtension = () => {
  useLayoutEffect(() => {
    if (Platform.OS !== "web") return;
    const body = document?.querySelector("body");
    if (body) {
      body.style.width = "320px";
      body.style.height = "568px";
      body.style.backgroundColor = "black";
    }
  }, [Platform.OS]);

  return null;
};

export default useBrowserExtension;
