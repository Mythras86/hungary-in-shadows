const Char = require("../models/char");

exports.createChar = (req, res, next) => {
  const char = new Char ({
    creatorName: req.userData.userName,
    creatorId: req.userData.userId,
    teljesnev: req.body.teljesnev,
    becenev: req.body.becenev,
    alnev: req.body.alnev,
    testalkat: req.body.testalkat,
    hajstilus: req.body.hajstilus,
    megjelenes: req.body.megjelenes,
    nem: req.body.nem,
    dns: req.body.dns,
    anyanyelv: req.body.anyanyelv,
    eletkor: req.body.eletkor,
    magassag: req.body.magassag,
    testsuly: req.body.testsuly,
    szemszin: req.body.szemszin,
    hajszin: req.body.hajszin,
    szorszin: req.body.szorszin,
    borszin: req.body.borszin,
    felelem: req.body.felelem,
    osztonzo: req.body.osztonzo,
    gyulolet: req.body.gyulolet,
    kedvenc: req.body.kedvenc,
    irtozat: req.body.irtozat,
    vonzalom: req.body.vonzalom,
});
  char
  .save()
  .then(createdChar => {
    res.status(201).json({
      message: "Character added successfully",
      char: {
        ...createdChar,
       _id: createdChar._id
      }
    });
  })
  .catch(error => {
    res.status(500).json({
      message: "Creating a Character failed!"
    });
  });
};

exports.updateChar = (req, res, next) => {
  const char = new Char({
    _id: req.body._id,
    creatorName: req.body.creatorName,
    creatorId: req.userData.userId,
    teljesnev: req.body.teljesnev,
    becenev: req.body.becenev,
    alnev: req.body.alnev,
    testalkat: req.body.testalkat,
    hajstilus: req.body.hajstilus,
    megjelenes: req.body.megjelenes,
    nem: req.body.nem,
    dns: req.body.dns,
    anyanyelv: req.body.anyanyelv,
    eletkor: req.body.eletkor,
    magassag: req.body.magassag,
    testsuly: req.body.testsuly,
    szemszin: req.body.szemszin,
    hajszin: req.body.hajszin,
    szorszin: req.body.szorszin,
    borszin: req.body.borszin,
    felelem: req.body.felelem,
    osztonzo: req.body.osztonzo,
    gyulolet: req.body.gyulolet,
    kedvenc: req.body.kedvenc,
    irtozat: req.body.irtozat,
    vonzalom: req.body.vonzalom,
  });
  Char.updateOne({_id: req.params._id, creatorId: req.userData.userId }, char)
  .then(result => {
    console.log (result);
    if (result.modifiedCount > 0) {
      res.status(200).json({ message: "Update successful!" });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
  })
  .catch(error => {
    res.status(500).json({
        message: "Couldn't udpate Character!"
      });
    });
};

exports.getChars = (req, res, next) => {
  const charQuery = Char.find();
  charQuery
  .then(chars => {
    res.status(200).json({
      message: "Chars fetched successfully!",
      chars: chars,
    });
  })
  .catch(error => {
    res.status(500).json({
      message: "Fetching chars failed!"
    });
  });
};

exports.getOneChar = (req, res, next) => {
  Char.findById(req.params._id)
    .then(char => {
      if (char) {
        res.status(200).json(char);
      } else {
        res.status(404).json({ message: "Character not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching Character failed!"
      });
    });
};

exports.deleteChar = (req, res, next) => {
  Char.deleteOne({_id: req.params._id, creatorId: req.userData.userId })
    .then(result => {
      console.log(result);
      if (result.deletedCount > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting Character failed!"
      });
    });
};
