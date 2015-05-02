import csv
#NOTE: Used this command in PowerShell after organized into folders to name them all in route-inbound.csv or router-outbound.csv format: 
	#Get-ChildItem -Recurse -Filter "116-outbound*.csv" | Rename-Item -newname { "116-outbound.csv"}

#filenameIn = raw_input('Enter INPUT file name: ')
#filenameOut = raw_input('Enter OUTPUT file name: ')

filenameIn = ["Headway201207.tsv","Headway201208.tsv", "Headway201209.tsv","Headway201210.tsv","Headway201211.tsv","Headway201212.tsv","Headway201301.tsv","Headway201302.tsv","Headway201303.tsv", "Headway201304.tsv", "Headway201305.tsv", "Headway201306.tsv","Headway201307.tsv","Headway201308.tsv","Headway201309.tsv","Headway201310.tsv","Headway201311.tsv", "Headway201312.tsv", "Headway201401.tsv","Headway201402.tsv","Headway201403.tsv","Headway201404.tsv","Headway201405.tsv","Headway201406.tsv"]
monthYear= ["July 2012", "August 2012", "September 2012", "October 2012", "November 2012","December 2012","January 2013","February 2013","March 2013", "April 2013", "May 2013", "June 2013","July 2013","August 2013","September 2013","October 2013","November 2013", "December 2013", "January 2014","February 2014","March 2014","April 2014","May 2014","June 2014"]

busroutes = [1, 15, 22, 23, 28, 32, 39, 57, 66, 71, 73, 77, 111, 116, 117]
busroutesStrings = ['1', '15', '22', '23', '28', '32', '39', '57', '66', '71', '73', '77', '111', '116', '117']

myroute = raw_input('Enter route: ')
mydirection = raw_input('Enter direction: ')

buscounter = 0
counter = 0
i = 0
fieldnames = ['RouteName','RouteDirection','AvgStartTime','AvgSch','AvgAct','AvgDiff']
while buscounter < 2:
	while i < 24:
		filenameOut = str(myroute) + "-" + mydirection.lower() + "-" + monthYear[i] +".csv"
		with open(filenameIn[i]) as tsvIn, open(filenameOut, "w+") as tsvOut:
			reader = csv.DictReader(tsvIn, delimiter='\t')
			writer = csv.DictWriter(tsvOut, delimiter=',', fieldnames=fieldnames)
			writer.writerow(dict((fn,fn) for fn in fieldnames))
			
			for row in reader:
					 timeColumn = row['AvgStartTime']
					 intTimeColumn = int(timeColumn)
					 row['AvgStartTime'] = intTimeColumn * 10; #convert to minutes from midnight
					 counter = counter + 1
					 if row['RouteName'] == myroute and row['RouteDirection'] == mydirection and row['AvgStartTime'] > 0 and row['AvgStartTime'] < 1439 : #Bound for end of this day (11:59pm = 1439 mins)
						writer.writerow(row)
		print('We just finished processing ' + monthYear[i] + ' and the output file is ' + filenameOut + "'")
		#if i != 23:
			#print('Please process ' + monthYear[i+1] + ' next')
		i = i + 1
	buscounter = buscounter + 1
	
