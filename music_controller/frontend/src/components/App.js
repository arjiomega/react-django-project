import React, { Component } from "react";
import HomePage from "./HomePage";
import { createRoot } from 'react-dom/client';

const appDiv = document.getElementById("app");
const root = createRoot(appDiv);

root.render(<div>
                <HomePage />
            </div>);