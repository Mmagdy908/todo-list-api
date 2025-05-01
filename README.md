# 📝 Todo List App

A full-featured Todo List backend built using **Node.js**, **Express**, **TypeScript**, and **MongoDB**, implementing secure authentication, user-specific workspaces, and task management.

## 🛠️ Tech Stack

- **Backend Framework**: Node.js with Express
- **Language**: TypeScript
- **Database**: MongoDB
- **Cache Store**: Redis (for token revocation and OTP storage)

## 🚀 Features

### 🔐 Authentication & Security
- Access token and refresh token based authentication
- Refresh token rotation and revocation
- Refresh tokens stored in Redis for revocation
- Email verification upon registration
- Password reset via OTP (stored in Redis and sent via email)

### 📂 Workspaces & Tasks
- Users can create multiple **workspaces**
- Rename and delete workspaces
- Add **tasks** to specific workspaces
- Add **subtasks** to tasks
- Update tasks:
  - Change order
  - Mark as **Todo**, **In Progress**, **Completed**, or **Uncompleted**
- Remove tasks and subtasks

## 📬 API Documentation

🔗 [Postman Collection](https://your-postman-doc-link)

---

Feel free to clone the repository and try it out!
