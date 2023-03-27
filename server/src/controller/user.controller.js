const { Token } = require("../model/token.model");
// const { User } = require("../model/User.model");
const { User } = require("../model2/User.model");

exports.register = async (req, res, next) => {
  try {
    const { email, password, repeatPassword } = req.body;
    const response = await User.regist(email, password, repeatPassword);
    res.status(201).json("Register successfully you can login now");
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await User.login(email, password);
    res.status(200).json({ email, token });
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
};

exports.protect = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) throw new Error("Not Authorized");
    const token = auth.split(" ")[1];
    req.user = await User.checkToken(token);
    next();
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
};

exports.isAuthencated = async (req, res, next) => {
  try {
    const user = req.user;
    res.status(201).json({ isAuthenticated: true });
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
};

// exports.changePassword = async (req, res, next) => {
//   try {
//     const { oldPassword, newPassword, repeatNewPassword } = req.body;
//     const repsonse = await User.changePassword(
//       req.user,
//       oldPassword,
//       newPassword,
//       repeatNewPassword
//     );
//     res.status(200).json(repsonse);
//   } catch (e) {
//     res.status(401).json({ error: e.message });
//   }
// };

// exports.uploadPic = (req, res) => {
//   let sampleFile;
//   let uploadPath;

//   if (!req.files || Object.keys(req.files).length === 0) {
//     return res.status(400).send("No files were upload.");
//   }

//   sampleFile = req.files.photo;
//   uploadPath = process.cwd() + "/public/img/" + sampleFile.name;

//   sampleFile.mv(uploadPath, function (err) {
//     if (err) return res.status(500).send(err);
//     res.send(process.env.LOCAL_HOST_PORT + "public/img/" + sampleFile.name);
//   });
// };

// exports.getUser = async (req, res, next) => {
//   try {
//     const me = req.user;
//     const { email } = req.params;
//     var status = 203;
//     const user = await User.findOne({ email: email });
//     if (!user) {
//       throw new Error("User not Found");
//     }
//     if (me.email == user.email) {
//       status = 200;
//     }
//     res.status(200).json({
//       status: status,
//       user: {
//         name: user.name,
//         photo: user.photo,
//         bio: user.bio,
//         email: user.email,
//       },
//     });
//   } catch (e) {
//     res.status(400).json({ error: e.message });
//   }
// };

// exports.getAllUsers = async (req, res, next) => {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (e) {
//     res.status(400).json({ error: e.message });
//   }
// };

// exports.editUser = async (req, res, next) => {
//   try {
//     const user = req.user;
//     const { name, photo, bio } = req.body;
//     res.send(req.body);
//     user.name = name ? name : user.name;
//     user.photo = photo ? photo : user.photo;
//     user.bio = bio ? bio : user.bio;
//     user.save();
//     res.status(200).json({
//       name: user.name,
//       photo: user.photo,
//       bio: user.bio,
//     });
//   } catch (e) {
//     res.status(400).json({ error: e.message });
//   }
// };
