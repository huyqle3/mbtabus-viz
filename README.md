# mbta-busses-website

### MBTA Bus Performance website
The MBTA implemented 15 key bus route changes during the spring and summer of 2013. The big question is whether those changes benefited or hurt the on-time bus performance. To better understand how the Key Bus Route Program affected the buses, we produced visualizations on four key metrics: run time, actual vs scheduled times, headway, and wait times.

### URL
http://huyle.me:8080

### Deployment
The website runs on a Node.js server on MongoDB. The site uses jQuery, AJAX, d3.js, a bit of PHP, etc.

Install Node and Mongodb
```
sudo apt-get -y install nodejs npm install nodejs-legacy mongodb
```
Clone source code from git repository anywhere
```
git clone https://github.com/ataturk/mbta-busses-website.git
```
Change directory into mbta-busses-website folder
```
cd mbta-busses-website
```
Install node modules
```
npm install
```
Make database folder and run mongodb on 1 terminal
```
mkdir database
mongodb --dbpath database
```
On a 2nd terminal, start node
```
npm start
```
Since we have the site private, you'll have to use mongodb to create a user and password. You can visit the site at http://localhost:3000.
