# mbta-busses-website

### Deployment
This project contains two main components, one of which is data analysis with Apache Pig, another is an UI tool to display the analysis result. This file is to introduce how to deploy the website on an apache web server.

Install Apache2 Server on Ubuntu/Debian 
```
sudo apt-get -y install apache2
```
Install Apache Httpd Server on Centos
```
sudo yum -y install httpd
```
Clone source code from git repository
```
git clone https://github.com/BU-EC500-SP15/mbta-busses-website.git
```
Deploy the website by copying files to /var/www/html/
```
cp -r mbta-busses-website /var/www/html/
```
Once it's done, visit the address: http://127.0.0.1/mbta-busses-website. Then, you will be forwarded to the homepage of our website tool.
