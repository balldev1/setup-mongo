const mongoose = require("mongoose");

const StoreSchema = new mongoose.Schema(
  {
    no: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    }, // รหัสสาขา ถ้ามี Update หรือ Delete ต้องแสดง Error

    name: { type: String, trim: true }, // ชื่อ Store
    address: { type: String, trim: true }, // ที่อยู่
    subDistrict: { type: String, trim: true }, // แขวง/ตำบล
    district: { type: String, trim: true }, // เขต/อำเภอ
    city: { type: mongoose.Schema.Types.ObjectId, ref: "City" }, //จังหวัด Dropdown relation
    country: { type: String, trim: true }, // รหัสประเทศ
    postCode: { type: Number, ref: "Postcode" }, // รหัสไปรษณีย์ Dropdown with auto-fill

    // Tax & Posting
    storeVATBusPostGr: { type: String, ref: "VATProductPostingGroups" }, // ประเภท Vat
    storeGenBusPostGr: { type: String, ref: "GenBusinessPostingGroups" }, // ค่าบริการ Vat ในประเภท
    fullTaxNos: { type: String }, // รหัส Running Fulltax
    returnFullTaxNos: { type: String }, // รหัส Running Fulltax
    postedStatemNos: { type: String }, // เก็บค่ารหัส Running Post Statement
    statementNos: { type: String }, // เก็บค่ารหัส Running Statement

    // Contact
    phoneNo: { type: Number }, // เก็บค่ารหัสไปรษณีย์

    // Store type & functionality
    storeType: { type: String, enum: ["Store", "Warehouse", "HQ"] }, // เก็บค่าประเภทของสาขา
    functionalityProfile: { type: String, ref: "FunctionalityProfile" }, // เลือกรูปแบบการตั้งค่าหน้า POS
    branchNo: { type: Number }, //เก็บเลขสาขา
    storeSalesTypeFilter: [{ type: String, ref: "SalesType" }], // Multi-select
    posPrintSlipOption: { type: String }, // รูปแบบการ Print Slip
    storeCustomer: { type: String }, // เก็บค่า Store Customer
    storeVendor: { type: String }, // เก็บค่า Store Vendor
    locationCode: [{ type: String }], // Multi-selection
    locationProfile: [{ type: String, ref: "RCPermission" }], // Multi-selection
    responsibilityCenter: [{ type: String, ref: "RCPermission" }], // Multi-selection

    // Geo
    latitude: { type: String },
    longitude: { type: String },

    // SAP & CRM
    sendMaster: { type: Boolean, default: false }, // ต้องการส่ง Master ให้ SAP หรือไม่
    areaManager: { type: String, ref: "UserSetup" }, //เลือกรหัส Area Manager
    privilegeBU: { type: String }, // เก็บค่า Privilege BU
    productCode: { type: String }, // เก็บค่า Product Code
    MID: { type: String }, // เก็บค่า Maxme ID
    token: { type: String }, // เก็บค่า Token ของ CRM
    shopID: { type: String }, // เก็บค่า Shop ID ของ True wallet
    merchantID: { type: String }, // เก็บค่า Merchant ID ของ True
    compID: { type: String }, // เก็บค่า Company ID
    plantID: { type: String }, // เก็บค่า Plant ID
    maxmeOrdering: { type: Boolean, default: false }, //  เก็บค่า Store นี้มี Maxme

    // VAT
    vatRegistrationNo: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Store", StoreSchema);

// function getStoreCredential(store) {
//   return {
//     MID: decrypt(store.MID),
//     token: decrypt(store.token),
//   };
// }

// รับ request
//   ↓
// validate
//   ↓
// encrypt (เฉพาะ field ที่จำเป็น)
//   ↓
// save → DBA

// Backend คือเจ้าของ business logic

// รู้ว่า field ไหนเป็น secret

// รู้ว่าใช้ตอนไหน

// รู้ว่าใครมีสิทธิ์

// Database / DBA ไม่ควรรู้ key

// DB ควรเป็นแค่ storage

// ถ้า DB โดนเจาะ → ข้อมูลยังอ่านไม่ออก

// {
//   "locationCode": ["LOC01", "LOC02", "LOC03"]
// }

// trim ลบหน้าหลังไม่ให้เป็นค่าว่าง
// ref: "City" → ชื่อ Model ใน Mongoose
// city → ชื่อ field ใน document ของ Store
// const store = await Store.findOne({ name: "Central Store" }).populate("city"); .populate("city") → Mongoose จะไปดึงข้อมูล document ของ City มาให้ เหมือนกับ join ใน SQL
// เมื่อใส่ ref → สามารถใช้ .populate() → ทำให้ join / รวมข้อมูลจาก collection อื่นได้เหมือน SQL

// const store = await Store.findOne({ name: "Central Store" }); จะได้แค่ ObjectId เช่น "64f1a2b..." ไม่สามารถ join / รวมข้อมูลจาก City ได้อัตโนมัติ

// เลือก field ของ Store + City พร้อมกัน (ใช้บ่อยมาก)
// const store = await Store.findOne(
//   { name: "Central Store" },
//   { name: 1, city: 1 } // เลือกเฉพาะ field ของ Store
// ).populate("city", "name"); // เลือกเฉพาะ field ของ City

// [
//   { "_id": "c1", "name": "Bangkok" },
//   { "_id": "c2", "name": "Chiang Mai" },
//   { "_id": "c3", "name": "Phuket" }
// ]

// [
//   {
//     no: "ST001",
//     name: "Central Store",
//     city: "c1",
//   },
//   {
//     no: "ST001",
//     name: "Central Store",
//     city: "c2",
//   },
//   {
//     no: "ST001",
//     name: "Big C",
//     city: "c1",
//   },
// ];
