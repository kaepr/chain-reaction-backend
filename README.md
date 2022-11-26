# Chain Reaction Online Backend

Backend implementation of the chain reaction game. 

[Frontend implementation](https://github.com/standmarsh/chain-reaction-frontend)

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

6. Env file ( sets NODE_ENV to development initially)

   ```
   MONGO_URI_STRING_TEST =
   MONGO_URI_STRING_DEV =
   PORT = 
   NODE_ENV = development
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

![image](https://user-images.githubusercontent.com/51134776/204082361-b609c0d8-ada1-4769-a8d0-23d5daf9fb60.png)

![image](https://user-images.githubusercontent.com/51134776/204082384-cfa0a0aa-d26e-4835-816f-93116f1455d9.png)

![image](https://user-images.githubusercontent.com/51134776/204082402-e0f4dc28-609c-4f66-83c3-1fcdce49f9ee.png)

![image](https://user-images.githubusercontent.com/51134776/204082437-a5d9d39a-b49c-4647-a819-4ba4f30bd012.png)


## References

[Original Game Play Store Link](https://play.google.com/store/apps/details?id=com.BuddyMattEnt.ChainReaction&hl=en_IN&gl=US)

Help in implementing game logic from [Sarthak Mittal's Repo](https://github.com/Sarthak-Mittal/chain-reaction)

Help in implementing authentication logic from [
yoursTRULY  Youtube Channel](https://www.youtube.com/playlist?list=PLdHg5T0SNpN0ygjV4yGXNct25jY_ue70U)
