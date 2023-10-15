## Structure

- X Landing Page 
- X Navbar
- Login Component
- Registration Component
- Trader Module
  - Dashboard Component
  - Portfolio Component
    - Table
    - Chart
    - Cash 
  - Trading History Component
  - Trading Modal Component
  - Preferences Component
  - Wallet Component
    - Top Up Cash
    - Withdraw Cash
    - Mock Payment Gateway
  - Robo Advisor Component
  - Reports Component
  - Profile Component
    - Top Up Cash

  - Pipes and Utilities
    - Search Pipe
    - Portfolio Filter Pipe
    - Table Filter Pipe

- Services
  - Auth Service (Register, Login, Logout, checkLoginStatus)
  - User Service (Fetch and Save User Data, Update User Data, Preferences)
  - FMTS Service (Fetch Market Data, Execute Trades, Client Verification)
  - Portfolio Service (Fetch Portfolio Data, Trade History, Cash)
  - 

- Guards
  - X Auth Guard (Protects Trader Module)

## Flow

1. Landing Page
2. Default Navigation has Login and Register
3. User Clicks Register
   1. User Enters Data
   2. User Service
      1. Check if user is already registered?
         1. If yes, redirect to login
         2. If no, continue
      2. Use FMTS to get Client ID and Token
      3. User Service stores Client ID and Token in Local Storage
      4. User is told to use identification as their password
   3. Redirect user to login page (not necessary just log them in)
   4. On first login, redirect to preferences page
   5. Allow them to connect their bank account
4. User logs in
   1. User enters email and identification
   2. If preferences are not set, redirect to preferences
   3. If preferences are set, redirect to dashboard
