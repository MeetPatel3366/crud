const User=require("../models/userModel.js")

exports.home=(req,res)=>{
    res.send("hello")
}

const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        msg: 'All input fields are required',
      });
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        msg: 'User already exists',
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(200).json({
      success: true,
      msg: 'User registered successfully',
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      msg: 'Server error',
    });
  }
};


exports.login=async (req,res)=>{
    try{
        const {email,password}=req.body

        const user=await User.findOne({email,password})

        if(!user)
        {
            res.status(400).json({
                "success":false,
                "msg":"invalid cradantial"
            })
        }
        else
        {
            res.status(200).json({
                "success":true,
                "msg":"User login successfully",
                user
            })
        }
       
    }
    catch(err)
    {
        // console.log(err)
        res.status(400).json({
            "success":false,
            "msg":"User login failed"
        })
    }
}