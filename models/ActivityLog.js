const LogSchema = new mongoose.Schema(
  {
    // ใครทำ
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    userName: String, // snapshot เผื่อ user ถูกแก้/ลบ

    // ทำกับอะไร
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
    },
    storeNo: String, // snapshot

    // ทำอะไร
    action: {
      type: String,
      enum: ["CREATE", "UPDATE", "DELETE", "LOGIN", "LOGOUT", "VIEW", "ERROR"],
      required: true,
    },

    module: {
      type: String,
      enum: ["STORE", "USER", "PRODUCT", "ORDER", "POS", "AUTH"],
      required: true,
    },

    // รายละเอียด
    description: String,

    // ก่อน-หลัง (เฉพาะ update)
    before: Object,
    after: Object,

    // ผลลัพธ์
    status: {
      type: String,
      enum: ["SUCCESS", "FAILED"],
      default: "SUCCESS",
    },
    errorMessage: String,

    // technical
    ip: String,
    userAgent: String,

    // เวลา
    createdAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Log", LogSchema);

// ข้อมูลที่ได้
// {
//   "_id": "661a9c1e9b8d12a0f01a1111",

//   "userId": "660fabc1234567890abc0001",
//   "userName": "Somchai Jaidee",

//   "store": "660fabcd9999999999990002",
//   "storeNo": "ST001",

//   "action": "UPDATE",
//   "module": "STORE",

//   "description": "แก้ไขที่อยู่ร้าน",

//   "before": {
//     "address": "ถนนพระราม 9",
//     "city": "Bangkok"
//   },
//   "after": {
//     "address": "ถนนสุขุมวิท",
//     "city": "Bangkok"
//   },

//   "status": "SUCCESS",

//   "ip": "203.150.10.5",
//   "userAgent": "Chrome / macOS",

//   "createdAt": "2026-01-13T02:15:30.000Z"
// }
