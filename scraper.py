import requests
from bs4 import BeautifulSoup
import json
# from flask import Flask, jsonify
# from flask_cors import CORS

#finds titles, authors, and descriptions based on html tags
#returns a list of books
def scrape_nyt():
    url = "https://www.nytimes.com/books/best-sellers/"
    # headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'}
    response = requests.get(url)

    # print(response.status_code)
    # print(response.headers)
    # print(response.text[:1000])  # Print the first 1000 characters of the response body

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
        del books[10:30]
        with open('books.json', 'w+') as f:
            f.write(json.dumps(books))
    else:
        print("Failed to retrieve data. Status code:", response.status_code)

# app = Flask(__name__)
# CORS(app)
bestsellers = []


# @app.route('/update_bestsellers')
# def update_bestsellers():
#     global bestsellers
#     bestsellers = scrape_nyt()
#     return jsonify({'message': "Data updated"})

# @app.route('/bestsellers')
# def get_bestsellers():
#     return jsonify(bestsellers)

if __name__ == '__main__':
    bestsellers = scrape_nyt()
    # app.run(debug=True)

    