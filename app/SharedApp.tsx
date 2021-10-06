import { observer } from "mobx-react-lite";
import React from "react";
import store from "./models";
import Entry from "./screens/Entry";
import Inside from "./screens/inside";

const SharedApp = observer(() => (store.isInside ? <Inside /> : <Entry />));

export default SharedApp;
