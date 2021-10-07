import React from "react";
import "./app.css";
import useBrowserExtension from "./lib/hooks/useBrowserExtension";
import SharedApp from "./SharedApp";

const WebApp: React.FC = () => {
  useBrowserExtension();
  return <SharedApp />;
};

export default WebApp;
