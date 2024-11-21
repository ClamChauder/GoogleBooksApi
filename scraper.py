import requests
from bs4 import BeautifulSoup
from flask import Flask, jsonify

#finds titles, authors, and descriptions based on html tags
#returns a list of books
def scrape_nyt():
    url = 'https://www.nytimes.com/books/best-sellers/2024/11/24/'
    response = requests.get(url)
    if response.status_code == 200:
        parsed = BeautifulSoup(response.text, 'html.parser')

        authors, titles, descs, books = [], [], [], []
        find_titles = parsed.find_all('h3', itemprop='name')
        find_authors = parsed.find_all('p', itemprop='author')
        find_descs = parsed.find_all('p', itemprop='description')
        for entry in find_titles:
            titles.append(entry.text)
        for entry in find_authors:
            authors.append((entry.text).replace('by ', ''))
        for entry in find_descs:
            descs.append(entry.text)
        for book in range(len(titles)):
            books.append({
                'title': titles[book],
                'author': authors[book],
                'description': descs[book]
            })
        return books
    else:
        print("failed to get text.")