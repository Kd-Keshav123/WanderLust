
// calling middleware .. avoiding code redundancy (Function to catch error and hadle it to default handler)
module.exports= (fn) => {
    return (req,res,next) => {
        fn(req,res,next).catch(next);
    }
}