import requests
from bs4 import BeautifulSoup
import re
import json
import datetime

#NOTE: This file is not meant to be executed on the server.
#The output of this program is in use on the server.
#Including to show how our data is collected.

#Author: Abdul-B. A.
#Description: Movie Webscraper for Number Two Movies Webpage
#Version: 1.0

#dialog mainly for testing purposes, but will keep due to sentimental value
while True:
    try:
        numPages = int(input("How many pages would you like to scrape? (maximum: 34): "))
        if not numPages in range(1,35) :
            print("Please enter an integer between 1 and 34.")
            continue
        else :
            break;
    except ValueError:
        print("Enter a valid integer.")
        continue

#pages below 6.0 rating from 1972 to 2016
below6pages = []

#list of pages to scrape
for i in range(numPages):
    pageno = str(i+1)    
    below6pages.append('https://www.imdb.com/list/ls057823854/?sort=list_order,asc&st_dt=&mode=simple&page='+pageno+'&ref_=ttls_ref_rt_usr&user_rating=%2C6.0')

#list for capturing string output
pageTest = []

#scraping for title...
for elem in below6pages :
    print("Now processing next element...")
    page = requests.get(elem).text
    soup = BeautifulSoup(page, 'html.parser')
    divs = soup.findAll('div',{'class':'col-title'})
    for div in divs :
        spans = div.findAll('span',attrs={'title':True})
        for span in spans:
            aelems = span.findAll('a')
            for titles in aelems:
                pageTest.append(titles.getText())

#open filestream
f = open("lowRatedMovies1972to2016.txt", "w")

print("Done. Here are your results:\n")

#write to file
for index, elem in enumerate(pageTest):
    print(str(index+1)+".) "+elem)
    f.write(elem+"\n")

#exit application
print("Your results are written to a text file in the root directory of this application. Bye!")
f.close()