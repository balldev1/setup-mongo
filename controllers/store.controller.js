const Store = require("../models/Store");
const { decrypt, encrypt } = require("../utils/crypto");

const SECRET_KEY = process.env.SECRET_KEY;

exports.createStore = async (req, res) => {
  try {
    let storeData;
    console.log(req.body.data);

    if (req.body.iv && req.body.data) {
      // ถ้าเข้ารหัส
      const decryptedStoreJson = decrypt(
        { iv: req.body.iv, data: req.body.data },
        SECRET_KEY
      );
      storeData = JSON.parse(decryptedStoreJson);
    } else {
      // ถ้า JSON ธรรมดา
      storeData = req.body;
    }

    const newStore = new Store(storeData);
    await newStore.save();

    return res
      .status(201)
      .json({ message: "Store created successfully", store: newStore });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Error creating store", error: err.message });
  }
};

exports.getLocation = async (req, res) => {
  try {
    const { masterDataName } = req.body;

    if (!masterDataName) {
      return res.status(400).json({ message: "masterDataName is required" });
    }

    const response = await fetch(
      "https://crm-microservice-uat.maxme.online/common/api/master/getMasterData",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ masterDataName }),
      }
    );

    const data = await response.json();

    return res.status(200).json({
      message: "Data fetched successfully",
      data,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Error fetching master data",
      error: err.message,
    });
  }
};
