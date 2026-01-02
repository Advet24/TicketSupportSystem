import jwt from 'jsonwebtoken';


export const auth = (roles = []) => {
    return (req, res, next) => {
        try {
            const header = req.headers.authorization;
            if (!header?.startsWith("Bearer "))
                return res.status(401).json({ msg: "Unauthorized" });

            const token = header.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if (roles.length && !roles.includes(decoded.role))
                return res.status(403).json({ msg: "Forbidden" });

            req.user = decoded;
            next();
        } catch (err) {
            res.status(401).json({ msg: "Invalid token" });
        }
    };
};