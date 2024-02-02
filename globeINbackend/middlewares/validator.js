const { check ,validationResult} = require('express-validator');
exports.validateUser =[check('name').
trim().not().isEmpty().withMessage('Name is required').isLength({min:3,max:20}).
withMessage('invalid name, name must be 3 to 20 characters '),
check('email').normalizeEmail().isEmail().withMessage('email is invalid'),
check('password')
.trim().not().isEmpty().withMessage('password is missing')
.isLength({min:8,max:20}).withMessage('password must be more than 8 characters and less than 20')
];
exports.validate = (req,res,next)=>{
    const error = validationResult(req).array();
    if(!error.length) return next();
    res.status(400).json({success:false,error:error[0].msg});
};