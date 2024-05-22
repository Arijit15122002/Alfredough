const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
        .catch((err) => next(err));
    }
}

export { asyncHandler } 

// const asyncHandler = (fn) => async(req, res, next) => {
//     try{
//         return await fn(req, res, next);
//     } catch (error) {
//         res.status(err.code || 500).json({
//             succeess: false,
//             message: error.message, 
//         })
//     }
// }