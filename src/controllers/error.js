
exports.client = (req, res)=>{
	res.status(404).render('error', {
		layout:'error',
		statusCode:404,
		errorMessage:'Not Found'
	});
}


exports.server = (err,req, res,next)=>{
	console.error(err.stack);
	res.status(500).render('error', {
		layout:'error',
		statusCode:500,
		errorMessage:'Internal server error'
	});
}