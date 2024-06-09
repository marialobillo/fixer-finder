"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./infrastructure/express/app");
const PORT = process.env.PORT || 3000;
app_1.app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
