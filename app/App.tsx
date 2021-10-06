import React from "react";
import useBrowserExtension from "./lib/hooks/useBrowserExtension";
import SharedApp from "./SharedApp";

const WebApp: React.FC = () => {
  useBrowserExtension();
  return <SharedApp />;
};

export default WebApp;
