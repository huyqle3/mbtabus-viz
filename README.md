# mbta-busses-website

### Deployment
This project contains two main components, one of which is data analysis with Apache Pig , another is an UI tool to display the analysis result. This file is to introduce how to deploy the website in an Apache Httpd Server in Centro Linux.

Install Apache Httpd Server
```
$ yum -y install httpd
```
Clone source code from git repository
```
$ https://github.com/BU-EC500-SP15/mbta-busses-website.git
```
Verify the repsitory
```
$ cd mbta-busses-website
```
Deploy the website by copying files to /var/www/html/
```
cp -r mbta-busses-website /var/www/html/
```
Once it's done, visit the address: http://127.0.0.1/mbta-busses-website. Then you will be forward to the homepage of our website tool.
