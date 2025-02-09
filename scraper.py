import requests
from bs4 import BeautifulSoup
import json

#finds titles, authors, and descriptions based on html tags
#returns a list of books
def scrape_nyt():
    url = "https://www.nytimes.com/books/best-sellers/"
    response = requests.get(url)

    if response.status_code == 200:
        parsed = BeautifulSoup(response.text, 'html.parser')

        authors, titles, descs, books, images = [], [], [], [], []
        find_titles = parsed.find_all('h3', itemprop='name')
        find_authors = parsed.find_all('p', itemprop='author')
        find_descs = parsed.find_all('p', itemprop='description')
        find_images = parsed.find_all('img', itemprop='image')
        for entry in find_titles:
            titles.append(entry.text)
        for entry in find_authors:
            authors.append((entry.text).replace('by ', ''))
        for entry in find_descs:
            descs.append(entry.text)
        for entry in find_images:
            images.append(entry['src'])
        for book in range(len(titles)):
            books.append({
                'title': titles[book],
                'author': authors[book],
                'description': descs[book],
                'images': images[book]
            })
        del books[10:30] # first 10 items are ebooks
        with open('books.json', 'w+') as f:
            f.write(json.dumps(books))
    else:
        print("Failed to retrieve data. Status code:", response.status_code)


bestsellers = []

if __name__ == '__main__':
    bestsellers = scrape_nyt()