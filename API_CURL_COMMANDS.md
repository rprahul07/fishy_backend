# Fishy API - Complete cURL Commands

Base URL: `http://localhost:3000`

---

## 🏥 Health Check

```bash
curl -X GET http://localhost:3000/
```

---

## 🔐 Authentication Flow (OTP-Based Registration)

### STEP 1: Request OTP (Phone Number Only)
```bash
curl -X POST http://localhost:3000/api/auth/request-otp \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "9876543210"
  }'
```

### STEP 2: Verify OTP
```bash
curl -X POST http://localhost:3000/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "9876543210",
    "code": "123456"
  }'
```

### STEP 3: Complete Profile (After OTP Verification)
```bash
curl -X POST http://localhost:3000/api/auth/complete-profile \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "9876543210",
    "name": "John Doe",
    "address": "123 Main Street, City"
  }'
```

### Resend OTP
```bash
curl -X POST http://localhost:3000/api/auth/resend-otp \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "9876543210"
  }'
```

---

## 🌐 Public Routes

### Get All Fish (Public)
```bash
curl -X GET http://localhost:3000/api/public/fish
```

### Get Fish By ID (Public)
```bash
curl -X GET http://localhost:3000/api/public/fish/1
```

### Create Customer (Public)
```bash
curl -X POST http://localhost:3000/api/public/customer \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "phoneNumber": "9876543210",
    "address": "123 Main Street, City"
  }'
```

---

## 🔒 Private/Admin Routes (Requires Authentication)

### Add Fish (Admin)
```bash
curl -X POST http://localhost:3000/api/private/admin/fish \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "name": "Salmon",
    "imageURL": "https://example.com/salmon.jpg",
    "price": 500,
    "weight": 2.5
  }'
```

### Delete Fish (Admin)
```bash
curl -X DELETE http://localhost:3000/api/private/admin/fish/1 \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

### Get All Customers (Admin)
```bash
curl -X GET http://localhost:3000/api/private/admin/customers \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

### Delete Customer (Admin)
```bash
curl -X DELETE http://localhost:3000/api/private/admin/customer/1 \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

---

## 👤 Customer Routes

### Create Customer
```bash
curl -X POST http://localhost:3000/api/customers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "phoneNumber": "9123456789",
    "address": "456 Park Avenue, Town"
  }'
```

### Get All Customers
```bash
curl -X GET http://localhost:3000/api/customers
```

### Get Customer By ID
```bash
curl -X GET http://localhost:3000/api/customers/1
```

### Update Customer
```bash
curl -X PUT http://localhost:3000/api/customers/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith Updated",
    "phoneNumber": "9123456789",
    "address": "789 New Street, City"
  }'
```

### Delete Customer
```bash
curl -X DELETE http://localhost:3000/api/customers/1
```

---

## 🐟 Fish Routes

### Create Fish
```bash
curl -X POST http://localhost:3000/api/fish \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Tuna",
    "imageURL": "https://example.com/tuna.jpg",
    "price": 600,
    "weight": 3.0
  }'
```

### Get All Fish
```bash
curl -X GET http://localhost:3000/api/fish
```

### Get Fish By ID
```bash
curl -X GET http://localhost:3000/api/fish/1
```

### Update Fish
```bash
curl -X PUT http://localhost:3000/api/fish/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Tuna Premium",
    "imageURL": "https://example.com/tuna-premium.jpg",
    "price": 700,
    "weight": 3.5
  }'
```

### Delete Fish
```bash
curl -X DELETE http://localhost:3000/api/fish/1
```

---

## 📦 Order Routes

### Create Order
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerId": 1,
    "fishId": 1,
    "quantity": 2
  }'
```

### Get All Orders
```bash
curl -X GET http://localhost:3000/api/orders
```

### Get Orders By Customer ID
```bash
curl -X GET http://localhost:3000/api/orders/customer/1
```

### Get Orders By Phone Number
```bash
curl -X GET http://localhost:3000/api/orders/phone/9876543210
```

### Get Order By ID
```bash
curl -X GET http://localhost:3000/api/orders/1
```

### Update Order
```bash
curl -X PUT http://localhost:3000/api/orders/1 \
  -H "Content-Type: application/json" \
  -d '{
    "customerId": 1,
    "fishId": 1,
    "quantity": 5
  }'
```

### Delete Order
```bash
curl -X DELETE http://localhost:3000/api/orders/1
```

---

## 🔐 OTP Routes

### Generate OTP
```bash
curl -X POST http://localhost:3000/api/otp/generate \
  -H "Content-Type: application/json" \
  -d '{
    "customerId": 1
  }'
```

### Verify OTP
```bash
curl -X POST http://localhost:3000/api/otp/verify \
  -H "Content-Type: application/json" \
  -d '{
    "customerId": 1,
    "code": "123456"
  }'
```

### Get All OTPs
```bash
curl -X GET http://localhost:3000/api/otp
```

### Get OTP By ID
```bash
curl -X GET http://localhost:3000/api/otp/1
```

### Delete OTP
```bash
curl -X DELETE http://localhost:3000/api/otp/1
```

---

## 📝 Notes

1. **Replace IDs**: Change `1` in URLs to actual resource IDs
2. **Admin Token**: Replace `YOUR_ADMIN_TOKEN` with actual admin authentication token
3. **Base URL**: Change `http://localhost:3000` if your server runs on a different port
4. **Request Bodies**: Modify JSON data according to your needs

## 🚀 Quick Test Sequence (Complete Registration Flow)

```bash
# 1. Check API health
curl -X GET http://localhost:3000/

# 2. STEP 1: Request OTP with phone number
curl -X POST http://localhost:3000/api/auth/request-otp \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber": "9999999999"}'

# 3. STEP 2: Verify OTP (use the code from step 2 response)
curl -X POST http://localhost:3000/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber": "9999999999", "code": "123456"}'

# 4. STEP 3: Complete profile after verification
curl -X POST http://localhost:3000/api/auth/complete-profile \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber": "9999999999", "name": "Test User", "address": "Test Address"}'

# 5. Create a fish
curl -X POST http://localhost:3000/api/fish \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Fish", "imageURL": "http://example.com/fish.jpg", "price": 100, "weight": 1.5}'

# 6. Create an order (use customerId from step 4 response)
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"customerId": 1, "fishId": 1, "quantity": 2}'
```
