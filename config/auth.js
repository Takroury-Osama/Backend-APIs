module.exports = {
    secret: process.env.AUTH_SECRET || "sdfghjkldfgdfgfgddoyuwexvnku",
    expires: process.env.AUTH_EXPIRE || "24h",
    rounds: process.env.AUTH_ROUNDS || 5
}