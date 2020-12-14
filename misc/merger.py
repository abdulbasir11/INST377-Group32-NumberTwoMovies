import json


def merge_JsonFiles(filename):
    result = list()
    for f1 in filename:
        with open(f1, 'r') as infile:
            result.extend(json.load(infile))

    with open('lowRatedMoviesAll.json', 'w') as output_file:
        json.dump(result, output_file)

files = [];
for x in range(34):
    files.append('lowRatedMovies1972to2016_page_'+str(x+1)+".json")

merge_JsonFiles(files)