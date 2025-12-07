# UBL Backend Services - API Reference

**Base URL**: `http://localhost:8081`  
**Last Updated**: December 7, 2025

---

## 📊 Quick Overview

**Total Endpoints**: 23

| Module                       | Endpoints | Authentication Required |
| ---------------------------- | --------- | ----------------------- |
| Health Check                 | 2         | Partial (1/2)           |
| Authentication               | 2         | No                      |
| User Management              | 11        | Yes                     |
| Role & Permission Management | 4         | Yes                     |
| Permissions Meta Management  | 4         | Yes                     |

---

## 🏥 Health Check (2 endpoints)

### 1. Service Status

| Property           | Value                       |
| ------------------ | --------------------------- |
| **Endpoint**       | `/`                         |
| **Method**         | `GET`                       |
| **Authentication** | Not Required                |
| **Permission**     | None                        |
| **Description**    | Check if service is running |

**Response Example**:

```json
{
  "message": "U-Lens Backend Service is running"
}
```

---

### 2. Token Validation

| Property           | Value                                      |
| ------------------ | ------------------------------------------ |
| **Endpoint**       | `/validation`                              |
| **Method**         | `GET`                                      |
| **Authentication** | Required (Bearer Token)                    |
| **Permission**     | None (Token validation only)               |
| **Description**    | Test JWT token validity, returns user data |

**Response Example**:

```json
{
  "user_id": "admin-001",
  "email": "admin@example.com",
  "role_name": "Admin"
}
```

---

## 🔐 Authentication (2 endpoints)

### 3. User Login

| Property           | Value                                     |
| ------------------ | ----------------------------------------- |
| **Endpoint**       | `/login`                                  |
| **Method**         | `POST`                                    |
| **Authentication** | Not Required                              |
| **Permission**     | None                                      |
| **Description**    | Authenticate user with email and password |

**Request Body**:

```json
{
  "secret_key": "your_secret_key_here_change_in_production",
  "email": "john.doe@example.com",
  "password": "TestPassword123",
  "app_version": "1.2.0"
}
```

> `app_version` is optional - used to track user's app version

**Response Example**:

```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user_id": "user-123",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "role_name": "Manager"
}
```

**Validations**:

- Checks account status (deleted, blocked, approved, verified)
- Returns `is_password_changed: false` if password change required

---

### 4. Generate JWT Token

| Property           | Value                                       |
| ------------------ | ------------------------------------------- |
| **Endpoint**       | `/generate-token`                           |
| **Method**         | `POST`                                      |
| **Authentication** | Not Required (secret_key required)          |
| **Permission**     | None                                        |
| **Description**    | Generate JWT tokens for testing/development |

**Request Body**:

```json
{
  "secret_key": "your_secret_key_here_change_in_production",
  "user_id": "admin-001",
  "email": "admin@example.com",
  "role_name": "Admin"
}
```

**Response Example**:

```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

---

## 👥 User Management (11 endpoints)

### 5. List All Users (Paginated)

| Property           | Value                                               |
| ------------------ | --------------------------------------------------- |
| **Endpoint**       | `/users`                                            |
| **Method**         | `GET`                                               |
| **Authentication** | Required                                            |
| **Permission**     | `users.read`                                        |
| **Description**    | Get paginated list of users with filters and search |

**Query Parameters**:

| Parameter     | Type    | Default    | Description                                                |
| ------------- | ------- | ---------- | ---------------------------------------------------------- |
| `page`        | integer | 1          | Page number (1-indexed)                                    |
| `page_size`   | integer | 10         | Records per page (1-100)                                   |
| `sort_by`     | string  | created_at | Sort field: created_at, name, email, role_name, last_login |
| `sort_order`  | string  | desc       | Sort order: asc or desc                                    |
| `search`      | string  | -          | Search in name or email                                    |
| `role_name`   | string  | -          | Filter by role                                             |
| `is_blocked`  | boolean | -          | Filter by blocked status                                   |
| `is_verified` | boolean | -          | Filter by verified status                                  |

**Response Example**:

```json
{
  "status_code": 200,
  "message": "Users retrieved successfully",
  "data": {
    "users": [...],
    "pagination": {
      "total_records": 150,
      "total_pages": 15,
      "current_page": 1,
      "page_size": 10,
      "has_next": true,
      "has_previous": false
    }
  }
}
```

---

### 6. Get User by Email

| Property           | Value                                |
| ------------------ | ------------------------------------ |
| **Endpoint**       | `/users/by-email/{email}`            |
| **Method**         | `GET`                                |
| **Authentication** | Required                             |
| **Permission**     | `users.read`                         |
| **Description**    | Fetch specific user by email address |

**Example**: `/users/by-email/john.doe@example.com`

---

### 7. Create New User by Admin

| Property           | Value                             |
| ------------------ | --------------------------------- |
| **Endpoint**       | `/users/create/new_user_by_admin` |
| **Method**         | `POST`                            |
| **Authentication** | Required                          |
| **Permission**     | `users.write`                     |
| **Description**    | Admin creates new user account    |
| **Content-Type**   | `multipart/form-data`             |

**Form Fields**:

| Field              | Type | Required | Description          |
| ------------------ | ---- | -------- | -------------------- |
| `email`            | text | ✅       | User email           |
| `password`         | text | ✅       | User password        |
| `fullName`         | text | ❌       | Full name            |
| `gender`           | text | ❌       | Gender               |
| `fatherName`       | text | ❌       | Father's name        |
| `motherName`       | text | ❌       | Mother's name        |
| `maritalStatus`    | text | ❌       | Marital status       |
| `phone`            | text | ❌       | Phone number         |
| `presentAddress`   | text | ❌       | Present address      |
| `permanentAddress` | text | ❌       | Permanent address    |
| `supervisor_id`    | text | ❌       | Supervisor user ID   |
| `photo`            | file | ❌       | Profile photo        |
| `nid`              | file | ❌       | National ID document |
| `tin`              | file | ❌       | Tax ID document      |

---

### 8. Update User

| Property           | Value                     |
| ------------------ | ------------------------- |
| **Endpoint**       | `/users/update/{user_id}` |
| **Method**         | `PUT`                     |
| **Authentication** | Required                  |
| **Permission**     | `users.update`            |
| **Description**    | Update user information   |

**Request Body** (all fields optional):

```json
{
  "name": "John Doe Updated",
  "phone_number": "+9876543210",
  "address": "456 New Street",
  "is_approved": true
}
```

**Cannot Update**: `user_id`, `password`, `created_at`

---

### 9. Assign User Role

| Property           | Value                        |
| ------------------ | ---------------------------- |
| **Endpoint**       | `/assign-user-role`          |
| **Method**         | `PUT`                        |
| **Authentication** | Required                     |
| **Permission**     | `users.update`               |
| **Description**    | Assign or update user's role |

**Request Body**:

```json
{
  "update_user_email": "john.doe@example.com",
  "update_user_role": "Manager"
}
```

---

### 10. Block/Unblock User

| Property           | Value                           |
| ------------------ | ------------------------------- |
| **Endpoint**       | `/users/block-unblock`          |
| **Method**         | `PUT`                           |
| **Authentication** | Required                        |
| **Permission**     | `users.update`                  |
| **Description**    | Block or unblock a user account |

**Request Body**:

```json
{
  "email": "john.doe@example.com",
  "is_blocked": true
}
```

> Set `is_blocked` to `true` to block, `false` to unblock

---

### 11. Verify User

| Property           | Value                                       |
| ------------------ | ------------------------------------------- |
| **Endpoint**       | `/users/verify`                             |
| **Method**         | `PUT`                                       |
| **Authentication** | Required                                    |
| **Permission**     | `users.verify` (if configured)              |
| **Description**    | Verify user account (sets is_verified=true) |

**Request Body**:

```json
{
  "email": "john.doe@example.com"
}
```

---

### 12. Delete User (Soft Delete)

| Property           | Value                                   |
| ------------------ | --------------------------------------- |
| **Endpoint**       | `/users/delete-restore`                 |
| **Method**         | `PUT`                                   |
| **Authentication** | Required                                |
| **Permission**     | `users.delete`                          |
| **Description**    | Soft delete user (sets is_deleted=true) |

**Request Body**:

```json
{
  "email": "john.doe@example.com",
  "is_deleted": true
}
```

> Set `is_deleted` to `true` to delete, `false` to restore

---

### 13. Restore User

| Property           | Value                     |
| ------------------ | ------------------------- |
| **Endpoint**       | `/users/delete-restore`   |
| **Method**         | `PUT`                     |
| **Authentication** | Required                  |
| **Permission**     | `users.delete`            |
| **Description**    | Restore soft-deleted user |

**Request Body**:

```json
{
  "email": "john.doe@example.com",
  "is_deleted": false
}
```

---

### 14. Change User Password

| Property           | Value                                  |
| ------------------ | -------------------------------------- |
| **Endpoint**       | `/users/change-password/{user_id}`     |
| **Method**         | `POST`                                 |
| **Authentication** | Required                               |
| **Permission**     | `users.update`                         |
| **Description**    | Change user password with verification |

**Request Body**:

```json
{
  "current_password": "CurrentPassword123!",
  "new_password": "NewSecurePassword456!"
}
```

---

### 15. Get User by Email

| Property           | Value                           |
| ------------------ | ------------------------------- |
| **Endpoint**       | `/users/by-email/{email}`       |
| **Method**         | `GET`                           |
| **Authentication** | Required                        |
| **Permission**     | `users.read`                    |
| **Description**    | Fetch user information by email |

---

## 🔑 Role & Permission Management (4 endpoints)

### 16. Get All Role Permissions (Paginated)

| Property           | Value                                                 |
| ------------------ | ----------------------------------------------------- |
| **Endpoint**       | `/role-permissions`                                   |
| **Method**         | `GET`                                                 |
| **Authentication** | Required                                              |
| **Permission**     | `role_permissions.read`                               |
| **Description**    | Get paginated list of roles with permissions metadata |

**Query Parameters**:

| Parameter      | Type    | Default   | Description                  |
| -------------- | ------- | --------- | ---------------------------- |
| `page`         | integer | 1         | Page number (1-indexed)      |
| `page_size`    | integer | 10        | Records per page (1-100)     |
| `sort_by`      | string  | role_name | Sort field: role_name        |
| `sort_order`   | string  | asc       | Sort order: asc or desc      |
| `search`       | string  | -         | Search in role name          |
| `include_meta` | boolean | true      | Include permissions metadata |

**Response Example**:

```json
{
  "status_code": 200,
  "message": "Role permissions retrieved successfully",
  "data": {
    "roles": [
      {
        "role_name": "Admin",
        "permissions": {
          "users": ["read", "write", "update", "delete"],
          "role_permissions": ["read", "write", "update", "delete"]
        }
      }
    ],
    "permissions_meta": [
      {
        "collection": "users",
        "actions": ["read", "write", "update", "delete"]
      }
    ],
    "pagination": {...}
  }
}
```

---

### 17. Create New Role

| Property           | Value                            |
| ------------------ | -------------------------------- |
| **Endpoint**       | `/create-role`                   |
| **Method**         | `POST`                           |
| **Authentication** | Required                         |
| **Permission**     | `role_permissions.write`         |
| **Description**    | Create new role with permissions |

**Request Body**:

```json
{
  "role_name": "Project Manager",
  "permissions": {
    "users": ["read", "write"],
    "report": ["read", "write"],
    "project": ["read", "write", "update", "delete"]
  }
}
```

---

### 18. Edit Role Permissions

| Property           | Value                     |
| ------------------ | ------------------------- |
| **Endpoint**       | `/edit-role`              |
| **Method**         | `PUT`                     |
| **Authentication** | Required                  |
| **Permission**     | `role_permissions.update` |
| **Description**    | Update role permissions   |

**Request Body**:

```json
{
  "role_name": "Manager",
  "permissions": {
    "users": ["read", "write", "update"],
    "report": ["read", "write"],
    "analytics": ["read"]
  }
}
```

---

### 19. Delete Role

| Property           | Value                     |
| ------------------ | ------------------------- |
| **Endpoint**       | `/delete-role`            |
| **Method**         | `DELETE`                  |
| **Authentication** | Required                  |
| **Permission**     | `role_permissions.delete` |
| **Description**    | Delete a role by name     |

**Request Body**:

```json
{
  "role_name": "Supervisor"
}
```

---

## 🎯 Permissions Meta Management (4 endpoints)

### 20. Get All Permissions Meta

| Property           | Value                                        |
| ------------------ | -------------------------------------------- |
| **Endpoint**       | `/permissions-meta`                          |
| **Method**         | `GET`                                        |
| **Authentication** | Required                                     |
| **Permission**     | `permissions_meta.read`                      |
| **Description**    | Get all permissions metadata (no pagination) |

**Response Example**:

```json
{
  "status_code": 200,
  "message": "Permissions metadata fetched successfully",
  "data": [
    {
      "collection": "users",
      "actions": ["read", "write", "update", "delete"]
    },
    {
      "collection": "role_permissions",
      "actions": ["read", "write", "update", "delete"]
    }
  ]
}
```

---

### 21. Create Permissions Meta

| Property           | Value                                            |
| ------------------ | ------------------------------------------------ |
| **Endpoint**       | `/create-permissions-meta`                       |
| **Method**         | `POST`                                           |
| **Authentication** | Required                                         |
| **Permission**     | `permissions_meta.write`                         |
| **Description**    | Create permissions metadata for a new collection |

**Request Body**:

```json
{
  "collection": "report",
  "actions": ["read", "write", "update", "delete"]
}
```

**Validations**:

- Collection must not already exist
- Actions must be an array of strings

---

### 22. Update Permissions Meta

| Property           | Value                                                |
| ------------------ | ---------------------------------------------------- |
| **Endpoint**       | `/update-permissions-meta`                           |
| **Method**         | `PUT`                                                |
| **Authentication** | Required                                             |
| **Permission**     | `permissions_meta.update`                            |
| **Description**    | Update permissions metadata (replaces actions array) |

**Request Body**:

```json
{
  "collection": "users",
  "actions": ["read", "write", "update", "delete", "verify"]
}
```

> **Important**: The `actions` array **replaces** the existing actions completely. Include all actions you want to keep.

---

### 23. Delete Permissions Meta

| Property           | Value                                        |
| ------------------ | -------------------------------------------- |
| **Endpoint**       | `/delete-permissions-meta`                   |
| **Method**         | `DELETE`                                     |
| **Authentication** | Required                                     |
| **Permission**     | `permissions_meta.delete`                    |
| **Description**    | Delete permissions metadata for a collection |

**Request Body**:

```json
{
  "collection": "report"
}
```

---

## 📋 Summary Table - All 23 Endpoints

| #   | Endpoint                           | Method | Permission                | Description                  |
| --- | ---------------------------------- | ------ | ------------------------- | ---------------------------- |
| 1   | `/`                                | GET    | None                      | Service health check         |
| 2   | `/validation`                      | GET    | None (auth check)         | Token validation             |
| 3   | `/login`                           | POST   | None                      | User login                   |
| 4   | `/generate-token`                  | POST   | None (secret required)    | Generate JWT tokens          |
| 5   | `/users`                           | GET    | `users.read`              | List users (paginated)       |
| 6   | `/users/by-email/{email}`          | GET    | `users.read`              | Get user by email            |
| 7   | `/users/create/new_user_by_admin`  | POST   | `users.write`             | Create new user              |
| 8   | `/users/update/{user_id}`          | PUT    | `users.update`            | Update user info             |
| 9   | `/assign-user-role`                | PUT    | `users.update`            | Assign user role             |
| 10  | `/users/block-unblock`             | PUT    | `users.update`            | Block/unblock user           |
| 11  | `/users/verify`                    | PUT    | `users.verify`            | Verify user                  |
| 12  | `/users/delete-restore`            | PUT    | `users.delete`            | Delete user (soft delete)    |
| 13  | `/users/delete-restore`            | PUT    | `users.delete`            | Restore user                 |
| 14  | `/users/change-password/{user_id}` | POST   | `users.update`            | Change user password         |
| 15  | `/users/by-email/{email}`          | GET    | `users.read`              | Get user by email            |
| 16  | `/role-permissions`                | GET    | `role_permissions.read`   | List roles (paginated)       |
| 17  | `/create-role`                     | POST   | `role_permissions.write`  | Create new role              |
| 18  | `/edit-role`                       | PUT    | `role_permissions.update` | Update role permissions      |
| 19  | `/delete-role`                     | DELETE | `role_permissions.delete` | Delete role                  |
| 20  | `/permissions-meta`                | GET    | `permissions_meta.read`   | Get all permissions metadata |
| 21  | `/create-permissions-meta`         | POST   | `permissions_meta.write`  | Create permissions metadata  |
| 22  | `/update-permissions-meta`         | PUT    | `permissions_meta.update` | Update permissions metadata  |
| 23  | `/delete-permissions-meta`         | DELETE | `permissions_meta.delete` | Delete permissions metadata  |

---

## 🔒 Permission System

### Permission Format

Permissions follow the pattern: `collection.action`

**Examples**: `users.read`, `role_permissions.write`, `permissions_meta.update`

### Common Actions

- `read` - View/list resources
- `write` - Create new resources
- `update` - Modify existing resources
- `delete` - Remove resources
- `verify` - Custom action (e.g., user verification)

### Role Configuration Example

```json
{
  "role_name": "Admin",
  "permissions": {
    "users": ["read", "write", "update", "delete", "verify"],
    "role_permissions": ["read", "write", "update", "delete"],
    "permissions_meta": ["read", "write", "update", "delete"]
  }
}
```

---

## 🚀 Quick Start Guide

### 1. Check Service Status

```bash
curl http://localhost:8081/
```

### 2. Generate Token

```bash
curl -X POST http://localhost:8081/generate-token \
  -H "Content-Type: application/json" \
  -d '{
    "secret_key": "your_secret_key_here_change_in_production",
    "user_id": "admin-001",
    "email": "admin@example.com",
    "role_name": "Admin"
  }'
```

### 3. Use Token in Requests

```bash
curl -H "Authorization: Bearer {your_token}" \
  http://localhost:8081/users?page=1&page_size=10
```

### 4. Test Pagination

```bash
# Get users with filters
curl -H "Authorization: Bearer {your_token}" \
  "http://localhost:8081/users?page=1&page_size=20&sort_by=name&sort_order=asc&search=john"
```

---

## 📚 Additional Resources

- **Postman Collection**: `UBL_Backend_Postman_Collection.json` - Import this for all 23 endpoints
- **Postman Guide**: `POSTMAN_GUIDE.md` - Complete testing guide
- **Interactive API Docs**: http://localhost:8081/docs - FastAPI Swagger UI
- **MongoDB Express**: http://localhost:8083 - Database web UI

---

## 💡 Key Features

✅ **Modern Pagination** - Page-based with filtering, sorting, and search  
✅ **Role-Based Access Control** - Granular permission system  
✅ **JWT Authentication** - Secure token-based auth  
✅ **Soft Delete** - Users can be restored after deletion  
✅ **Account Status Management** - Block/unblock, verify, approve users  
✅ **Dynamic Permissions** - Add custom actions via permissions_meta  
✅ **App Version Tracking** - Track user's app version on login  
✅ **Multipart File Upload** - Support for profile photos and documents

---

**Last Updated**: December 7, 2025  
**API Version**: 1.0  
**Status**: ✅ All endpoints tested and working
