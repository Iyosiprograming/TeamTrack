// rate limiting
import rateLimit from "express-rate-limit";

// Limit each IP to 100 requests per 15 minutes
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: {
        message: "Too many requests from this IP, please try again later"
    },
    standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
    legacyHeaders: false,  // Disable `X-RateLimit-*` headers
});
export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per window
    message: {
        message: "Too many login attempts. Try again after 15 minutes."
    },
    standardHeaders: true,
    legacyHeaders: false
});

export default limiter;
