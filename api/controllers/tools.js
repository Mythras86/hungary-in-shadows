const Equipment = require("../models/tool");

exports.createEquipment = (req, res, next) => {
  const equipment = new Equipment ({
    equipmentName:req.body.equipmentName,
    equipmentCategory:req.body.equipmentCategory,
    equipmentMaxLevel:req.body.equipmentMaxLevel,
    equipmentWeight:req.body.equipmentWeight,
    equipmentPrice:req.body.equipmentPrice,
    equipmentDesc:req.body.equipmentDesc
  });
  equipment
    .save()
    .then(createdEquipment => {
      res.status(201).json({
        message: "Equipment added successfully",
        equipment: {
          ...createdEquipment,
          _id: createdEquipment._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating an Equipment failed!"
      });
    });
};

exports.updateEquipment = (req, res, next) => {
  const equipment = new Equipment({
    _id: req.body._id,
    equipmentName:req.body.equipmentName,
    equipmentCategory:req.body.equipmentCategory,
    equipmentMaxLevel:req.body.equipmentMaxLevel,
    equipmentWeight:req.body.equipmentWeight,
    equipmentPrice:req.body.equipmentPrice,
    equipmentDesc:req.body.equipmentDesc
  });
  Equipment.updateOne({_id: req.params._id}, equipment)
    .then(result => {
      console.log (result);
      if (result.modifiedCount > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized, no kidding!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't udpate Equipment!"
      });
    });
  };

exports.getEquipments = (req, res, next) => {
  const equipmentQuery = Equipment.find();
  let fetchedTools;
  equipmentQuery
  .then(documents => {
    fetchedTools = documents;
    return Equipment.count();
  })
  .then(count => {
    res.status(200).json({
      message: "Equipments fetched successfully!",
      tools: fetchedTools,
      maxTools: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching Equipments failed!"
      });
    });
};

exports.getOneEquipment = (req, res, next) => {
  Tools.findById(req.params._id)
    .then(tool => {
      if (tool) {
        res.status(200).json(tool);
      } else {
        res.status(404).json({ message: "Equipment not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching Equipment failed!"
      });
    });
};

exports.deleteEquipment = (req, res, next) => {
  Tools.deleteOne({ _id: req.params._id})
    .then(result => {
      console.log(result);
      if (result.deletedCount > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Deletion failed" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting failed!"
      });
    });
};
