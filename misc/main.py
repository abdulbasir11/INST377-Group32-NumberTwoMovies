import bs4
import requests
from bs4 import BeautifulSoup
import re
import json
import datetime

# Author: Abdul-B. A.
# Description: Movie Webscraper for Number Two Movies Webpage
# Version: 2.0
# Version 1.0 got title only and returned a text file.
# We thought this was okay because we didn't know the API could only search by title.
# Hence, this (admittedly haphazard) Version 2.0 scrapes an entries title, mpaa rating,
# runtime, and language, and returns it as a JSON object.

# dialog mainly for testing purposes, but will keep due to sentimental value

while True:
    try:
        numPages = int(input("Which page would you like to scrape? (maximum: 34): "))
        if not numPages in range(1, 35):
            print("Please enter an integer between 1 and 34.")
            continue
        else:
            break;
    except ValueError:
        print("Enter a valid integer.")
        continue

# pages below 6.0 rating from 1972 to 2016
below6pages = []
pageno = numPages
# list of pages to scrape
below6pages.append('https://www.imdb.com/list/ls057823854/?sort=list_order,asc&st_dt=&mode=simple&page=' + str(pageno) + '&ref_=ttls_ref_rt_usr&user_rating=%2C6.0')

# list for capturing string output
pageTest = []
perpage = ""
baseLink = 'https://www.imdb.com'
ratings = ['G','PG','PG-13','R']

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
                mpaa = ""
                stopCapture = 0

                #get title
                perpage = titles.getText()

                #get mpaa rating, runtime, genres, and languages
                detailPage = requests.get(baseLink+titles['href']).text
                detailSoup = BeautifulSoup(detailPage,'html.parser')
                detailDivs = detailSoup.find('div', {'class': 'subtext'}).children
                detailDivs2 = detailSoup.find('div', {'class': 'subtext'})
                detailDiv3 = detailSoup.select('div#titleDetails.article a[href*=primary_language]')
                try:
                    runtime = detailDivs2.find('time').get('datetime').strip()
                except:
                    print("ouch!")
                    print(perpage)
                    pass
                genres = detailDivs2.select("a[href*=genre]")
                acap = []
                gcap = []
                for a in detailDiv3:
                    acap.append(a.getText().strip())

                for genre in genres:
                    gcap.append(genre.getText().strip())

                for ddivs in detailDivs:
                    if type(ddivs) is bs4.element.NavigableString and stopCapture != 1:
                        for s in ratings:
                            if s.lower() == ddivs.strip().lower():
                                mpaa = ddivs.strip()
                                stopCapture = 1

                #perpage += (mpaa + " Runtime: " + runtime + "; Genres: " + gcap[:-2] + "; Languages: " + acap[:-2])

                #append
                pageTest.append({
                    'title' : perpage,
                    'mpaarating' : mpaa,
                    'runtime' : re.findall('\d+', runtime)[0],
                    'genre' : gcap,
                    'language' : acap
                })


print("Done. Here are your results:\n")

with open('lowRatedMovies1972to2016_page_'+str(pageno)+'.json', 'w') as outfile:
    json.dump(pageTest,outfile)

print("Your results are written to a text file in the root directory of this application. Bye!")
outfile.close()
