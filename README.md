# Chain Reaction Online Backend

Backend implemention of the chain reaction game. 

## About
Chain reaction is a multiplayer game, in which players are assigned colors and take turns placing cells on the board. As soon as a cell reaches its limit, the cell explodes and spreads into the adjacent cells, changing the cell's color. As soon as the whole board is covered in a single color, the respective player wins.

The project uses Express, Socket.io and MongoDB. It uses JsonWebToken and redis for handling user authentication. Tests for the user and auth routes written using Jest.

## Project Setup 
1. Clone the backend repository

   ```
   git clone https://github.com/standmarsh/chain-reaction-backend.git
   ```

2. Install the dependencies

   ```
   npm install
   ```

3. Install redis

   ```
   sudo apt-get install redis-server
   ```

   **Above instructions are for linux only, for other system's refer [Redis website](https://redis.io/)**

4. Run redis server

   ```
   redis-server
   ```

5. Database setup

   Either install and run MongoDB, or set up a cloud database such as MongoDB Atlas.

6. Env file ( set NODE_ENV to development initially)

   ```
   MONGO_URI_STRING_TEST =
   MONGO_URI_STRING_DEV =
   PORT =
   NODE_ENV =
   ACCESS_TOKEN_SECRET =
   REFRESH_TOKEN_SECRET =
   ```

   Add the following fields to .env file in the project root

7. Start server

   ```javascript

   npm run dev // development
   npm run start // starts server after transpililing
   npm test // runs jest

   ```

## References

[Original Game Play Store Link](https://play.google.com/store/apps/details?id=com.BuddyMattEnt.ChainReaction&hl=en_IN&gl=US)

Help in implementing game logic from [Sarthak Mittal's Repo](https://github.com/Sarthak-Mittal/chain-reaction)
