@echo off
echo ========================================
echo Blockchain Voting System Startup
echo ========================================
echo.

echo Step 1: Checking if Ganache is running...
echo Please make sure Ganache is running with 'developement' workspace!
echo Press any key once Ganache is running...
pause > nul

echo.
echo Step 2: Starting Node.js Server...
start "Node Server" cmd /k "node index.js"
timeout /t 3 > nul

echo.
echo Step 3: Starting Database API...
start "Database API" cmd /k "cd Database_API && uvicorn main:app --reload --host 127.0.0.1"
timeout /t 5 > nul

echo.
echo Step 4: Deploying Smart Contracts...
echo This will deploy contracts to Ganache...
start "Deploy Contracts" cmd /k "truffle migrate"

echo.
echo ========================================
echo All services are starting!
echo ========================================
echo.
echo Node Server: http://localhost:8080
echo Database API: http://127.0.0.1:8000
echo.
echo Wait for all terminals to finish loading, then open:
echo http://localhost:8080
echo.
echo Press any key to exit this window...
pause > nul
