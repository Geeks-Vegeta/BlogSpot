<h1><center><u> BlogSpot</u> 📖 </center></h1>
<hr>


 💁 This is an fullstack web application which is build is top of mern stack (Mongdb, Express, Reactjs, Nodejs).Which will help students to create there own public blogs and to share there knowledge.

<br>

### Installation
First Clone repository.
```bash
git clone https://github.com/Geeks-Vegeta/BlogSpot.git
```
After Cloning repository change directory and install npm packages for our Expressjs

```bash
cd BlogSpot
npm install  
```
<br>

After Installing all packages for express js change the directory and install packages for Reactjs
```bash
cd all-blog
npm install
```

<br>

In this repository .env file is not added so make sure to add .env file after you cloning this repo.

If you want to run express server and react-app server at same time then install concurrently and add this commands **in** package.json of **main** folder which you will get after installing packages, **not** of reactjs package.json.

```bash
"client": "cd all-blog && npm start",
"dev": "concurrently \"nodemon app.js \" \"npm run client\""
```
<br/>
If you Like/Love this project 👍  💓 please give a star

<br>
<br>

<img width="900" height="150" src="../college-project-sem-1/all-blog/public/goku-cardano.gif"/>


