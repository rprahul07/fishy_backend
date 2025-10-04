# 🔐 OTP-Based Authentication Flow

## Overview

The Fishy API uses a **3-step OTP-based registration and authentication** process to ensure secure user verification before profile completion.

---

## 📋 Registration Flow

### Step 1: Request OTP (Phone Number Only)

**Endpoint:** `POST /api/auth/request-otp`

**Request Body:**
```json
{
  "phoneNumber": "9876543210"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "OTP sent successfully to your phone number.",
  "debug": {
    "code": "123456"
  }
}
```

**What Happens:**
- User provides only their phone number
- System generates a 6-digit OTP
- OTP is valid for 5 minutes
- OTP is logged to console (in production, send via SMS service like Twilio)
- No customer account is created yet

---

### Step 2: Verify OTP

**Endpoint:** `POST /api/auth/verify-otp`

**Request Body:**
```json
{
  "phoneNumber": "9876543210",
  "code": "123456"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Phone number verified successfully.",
  "data": {
    "customerId": 1,
    "phoneNumber": "9876543210",
    "isVerified": true,
    "profileCompleted": false
  }
}
```

**What Happens:**
- System validates the OTP code
- Checks if OTP is expired (5 minutes validity)
- Creates a new customer record with:
  - Phone number (verified)
  - `isVerified: true`
  - `profileCompleted: false`
  - `name` and `address` are NULL
- Marks OTP as used
- Returns customer ID for next step

**Error Responses:**
- `400` - Invalid OTP code
- `400` - OTP expired

---

### Step 3: Complete Profile

**Endpoint:** `POST /api/auth/complete-profile`

**Request Body:**
```json
{
  "phoneNumber": "9876543210",
  "name": "John Doe",
  "address": "123 Main Street, City"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Profile completed successfully.",
  "data": {
    "id": 1,
    "name": "John Doe",
    "phoneNumber": "9876543210",
    "address": "123 Main Street, City",
    "isVerified": true,
    "profileCompleted": true
  }
}
```

**What Happens:**
- System finds customer by phone number
- Verifies that phone is already verified (from Step 2)
- Updates customer record with name and address
- Sets `profileCompleted: true`
- Returns complete customer profile

**Error Responses:**
- `404` - Customer not found (phone not registered)
- `403` - Phone number not verified (Step 2 not completed)
- `400` - Missing required fields

---

## 🔄 Additional Features

### Resend OTP

**Endpoint:** `POST /api/auth/resend-otp`

**Request Body:**
```json
{
  "phoneNumber": "9876543210"
}
```

**What Happens:**
- Marks all previous OTPs for this phone as used
- Generates a new OTP
- Sends new OTP (logged to console)

---

## 🔒 Security Features

1. **OTP Expiration**: All OTPs expire after 5 minutes
2. **One-Time Use**: OTPs are marked as used after verification
3. **Phone Validation**: Basic 10-digit phone number validation
4. **Verification Required**: Profile completion requires verified phone
5. **Unique Phone Numbers**: Each phone number can only be registered once

---

## 📊 Database Schema Changes

### Customer Model
```javascript
{
  id: INTEGER (Primary Key),
  phoneNumber: STRING (Unique, Required),
  name: STRING (Nullable until profile completion),
  address: STRING (Nullable until profile completion),
  isVerified: BOOLEAN (Default: false),
  profileCompleted: BOOLEAN (Default: false),
  createdAt: TIMESTAMP,
  updatedAt: TIMESTAMP
}
```

### OTP Model
```javascript
{
  id: INTEGER (Primary Key),
  phoneNumber: STRING (Required),
  code: STRING(6) (Required),
  expiresAt: DATE (Required),
  used: BOOLEAN (Default: false),
  CustomerId: INTEGER (Nullable - customer may not exist yet),
  createdAt: TIMESTAMP,
  updatedAt: TIMESTAMP
}
```

---

## 🎯 Use Cases

### New User Registration
1. User enters phone number → Request OTP
2. User receives OTP → Verify OTP
3. User enters name & address → Complete Profile
4. User can now place orders

### Returning User Login
1. User enters phone number → Request OTP
2. User receives OTP → Verify OTP
3. If profile already completed, user is logged in
4. If profile not completed, redirect to Step 3

---

## 🚀 Testing the Flow

```bash
# Step 1: Request OTP
curl -X POST http://localhost:3000/api/auth/request-otp \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber": "9876543210"}'

# Copy the OTP code from the response

# Step 2: Verify OTP
curl -X POST http://localhost:3000/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber": "9876543210", "code": "PASTE_OTP_HERE"}'

# Step 3: Complete Profile
curl -X POST http://localhost:3000/api/auth/complete-profile \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber": "9876543210", "name": "John Doe", "address": "123 Main St"}'
```

---

## 📝 Production Considerations

### SMS Integration
Replace the console.log with actual SMS service:

```javascript
// In authController.js - requestOTP function
// Replace:
console.log(`📱 OTP for ${phoneNumber}: ${code}`);

// With SMS service (example with Twilio):
await twilioClient.messages.create({
  body: `Your Fishy verification code is: ${code}`,
  from: process.env.TWILIO_PHONE_NUMBER,
  to: phoneNumber
});
```

### Environment Variables
```env
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=your_twilio_number
```

### Security Enhancements
1. **Rate Limiting**: Limit OTP requests per phone number (e.g., 3 per hour)
2. **IP Tracking**: Track and limit requests from same IP
3. **Remove Debug Info**: Remove `debug.code` from production responses
4. **HTTPS Only**: Ensure all requests use HTTPS in production
5. **Session Management**: Implement JWT tokens after successful verification

---

## ❓ FAQ

**Q: What if user doesn't receive OTP?**
A: Use the `/api/auth/resend-otp` endpoint to send a new OTP.

**Q: Can a user register with the same phone number twice?**
A: No, phone numbers are unique. If already registered, the verify step will update the existing customer.

**Q: How long is the OTP valid?**
A: 5 minutes from generation time.

**Q: Can I skip the profile completion step?**
A: No, the profile must be completed to place orders or access protected features.

**Q: What happens if OTP verification fails?**
A: User can request a new OTP and try again. Failed attempts don't lock the account.
