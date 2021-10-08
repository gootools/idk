import { observer } from "mobx-react-lite";
import React from "react";
import store from "./models";
import Inside from "./screens/inside";
import Entry from "./screens/outside/Entry";

const SharedApp = observer(() => (store.isInside ? <Inside /> : <Entry />));

export default SharedApp;
