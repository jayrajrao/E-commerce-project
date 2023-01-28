
const categorymodel = require("../Model/category")
//const AdminModel = require("../Model/admin");
const AboutModel = require("../Model/about");
const BlogModel = require("../Model/blog")

class FrontController {
  static home = async(req, res) => {
    const data = await BlogModel.find()
    //res.send('helo about')
    //console.log(data)
    res.render("home", {d:data});
  };
  static about = async(req, res) => {
    const aboutdata =await AboutModel.find()
    //res.send('helo about')
    res.render("about", {ab:aboutdata});
  };
  static contact = (req, res) => {
    //res.send('helo about')
    res.render("contact");
  };

  static blog = (req, res) => {
   // const bloglist = await BlogModel.find()
    res.render("blog", );
  };
  static login = (req, res) => {
    res.render("login");
  };
  static adminregister = async (req, res) => {
    res.render("register", { message: req.flash("error") });
  };
  static admininsert = async (req, res) => {
    try {
      //console.log(req.body)
      const { name, email, password, cpassword } = req.body;
      const admin = await AdminModel.findOne({ email: email });
      //console.log(admin)
      if (admin) {
        req.flash("error", "email already exists");
        res.redirect("/register");
      } else {
        if (name && email && password && cpassword) {
          if (password == cpassword) {
            try {
              const hashpassword = await bcrypt.hash(password,10)
              const result = new AdminModel({
                name: name,
                email: email,
                password: hashpassword,
              });
              await result.save();
              req.flash("success", "registration sucessuful  Please login ");
              res.redirect("/login");
            } catch (err) {
              console.log(err);
            }
          } else {
            req.flash("error", "Password and confirm password doesnot match");
            res.redirect("/register");
          }
        } else {
          req.flash("error", "All Field are required");
          res.redirect("/register");
        }
      }

      //
    } catch (err) {
      console.log(err);
    }
  };

  static blogdetail= async(req,res)=>{
    try {
      const category = await categorymodel.find()
      const recentblog = await BlogModel.find()
      const result = await BlogModel.findById(req.params.id)
      //console.log(result)
      res.render("blogdetail", {r:result, recentblog:recentblog, cat:category})
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = FrontController;
