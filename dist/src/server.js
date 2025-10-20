"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = require("./app.js");
const index_js_1 = require("./env/index.js");
const port = index_js_1.env.PORT;
app_js_1.app.listen(port, () => {
    console.log(`🚀 HTTP server running on http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map