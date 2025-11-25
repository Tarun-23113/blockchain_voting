# Quick Setup Guide for Blockchain Voting System

## ✅ Already Completed
- ✅ Repository cloned
- ✅ Truffle installed globally
- ✅ Node.js dependencies installed
- ✅ Python dependencies installed

## 🔧 What You Need to Do Now

### 1. Install Ganache (5 minutes)
Download and install Ganache from: https://trufflesuite.com/ganache/
- After installation, create a workspace named **developement**
- In the truffle projects section, click **ADD PROJECT** and select `truffle-config.js` from this project folder

### 2. Install MetaMask (2 minutes)
- Install MetaMask browser extension: https://metamask.io/download/
- Create a wallet if you don't have one
- Import accounts from Ganache (copy private keys from Ganache)
- Add custom network in MetaMask:
  - Network name: **Localhost 7575**
  - RPC URL: **http://localhost:7545**
  - Chain ID: **1337**
  - Currency symbol: **ETH**

### 3. Setup MySQL Database (10 minutes)
**IMPORTANT: Don't use XAMPP**

Install MySQL from: https://dev.mysql.com/downloads/installer/

After installation:
1. Open MySQL Command Line or MySQL Workbench
2. Create database:
```sql
CREATE DATABASE voter_db;
USE voter_db;
```

3. Create voters table:
```sql
CREATE TABLE voters (
    voter_id VARCHAR(36) PRIMARY KEY NOT NULL,
    role ENUM('admin', 'user') NOT NULL,
    password VARCHAR(255) NOT NULL
);
```

4. Add sample data (example):
```sql
INSERT INTO voters (voter_id, role, password) VALUES 
('admin123', 'admin', 'admin123'),
('user001', 'user', 'password123'),
('user002', 'user', 'password456');
```

### 4. Configure Database Connection
Edit the file: `Database_API/.env`

Update with your MySQL credentials:
```
MYSQL_USER="root"
MYSQL_PASSWORD="your_mysql_password"
MYSQL_HOST="localhost"
MYSQL_DB="voter_db"
SECRET_KEY="d2b861a623b1d0e89f7c91c313bce1db34fbce8356ca80cf38b72e4c5a832ed5f0fa7136ef0ed5c32641308daa88c29c108d85835afcf37e5385c8e2c4cacee6"
```

## 🚀 Running the Application

### Step 1: Start Ganache
- Open Ganache application
- Open the **developement** workspace

### Step 2: Compile Smart Contracts
Open terminal in project root:
```bash
truffle console
compile
exit
```

### Step 3: Bundle JavaScript
```bash
browserify ./src/js/app.js -o ./src/dist/app.bundle.js
```

### Step 4: Start Node Server (Terminal 1)
```bash
node index.js
```

### Step 5: Start Database API (Terminal 2)
```bash
cd Database_API
uvicorn main:app --reload --host 127.0.0.1
```

### Step 6: Deploy Smart Contracts (Terminal 3)
```bash
truffle migrate
```

### Step 7: Access Application
Open browser and go to: **http://localhost:8080/**

## 📝 Quick Checklist
- [ ] Ganache installed and workspace created
- [ ] MetaMask installed and configured
- [ ] MySQL installed and database created
- [ ] Database credentials updated in .env file
- [ ] Ganache running
- [ ] Smart contracts compiled
- [ ] JavaScript bundled
- [ ] Node server running
- [ ] Database API running
- [ ] Smart contracts migrated
- [ ] Application accessible at localhost:8080

## ⚠️ Common Issues
1. **Port already in use**: Make sure ports 8080, 7545, and 8000 are free
2. **MySQL connection error**: Double-check credentials in .env file
3. **MetaMask not connecting**: Ensure network settings match Ganache (Chain ID: 1337)
4. **Truffle migrate fails**: Make sure Ganache is running first

## 🎓 For Your Submission
Make sure to:
- Test the voting functionality
- Take screenshots of the working application
- Document any changes you made
- Prepare a brief demo of the features

Good luck with your submission! 🚀
