"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = void 0;
function generate() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = 6;
    let id = "";
    for (let i = 0; i < 10; i++) {
        id += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    console.log(id);
    return id;
}
exports.generate = generate;
