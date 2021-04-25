import axios from "axios";
import jwt from "jsonwebtoken";

async function getTokenByRefreshToken() {
    try {
        
    } catch (e) {

    }
}

function appendTokenPayload() {
    const token = localStorage.getItem("token");
    const payload = jwt.decode(token);
}

export { getTokenByRefreshToken };
