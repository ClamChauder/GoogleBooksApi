import requests
from bs4 import BeautifulSoup
from flask import Flask, jsonify

url = 'https://www.nytimes.com/books/best-sellers/2024/11/24/'
response = requests.get(url)

# <div class="css-1le66x"><p class="css-t7cods">New this week</p><h3 class="css-i1z3c1" itemprop="name">HEXED</h3><p class="css-1nxjbfc" 
#  itemprop="author">by Emily McIntire</p><p class="css-5yxv3r" itemprop="description">The sixth book in the Never After series. 
#  A forbidden love develops between the underboss to a mafia syndicate and his fiancée's cousin.</p></div>
if response.status_code == 200:
    parsed = BeautifulSoup(response.text, 'html.parser')
    
    info = parsed.find_all(class_='css-1le66x')
    
    title_list = parsed.find_all('h3', itemprop='name')
    for entry in title_list:
        print(entry.text)
    # for book in books:
    #     print(book.text)


    # books = []
    # for entry in list(info):
    #     # type(entry) = <class 'bs4.element.Tag'> ------> need to convert to string to use split function
    #     title = str(entry).split('name')
    #     author = str(entry).split('author')
    #     desc = 0

    #     print(str(entry).find())

    #     # type(string) = list ------> need to convert to string again, then find title
    #     title = (((str(title[1]).split('>'))[1]).split('<')[0])
    #     author = ((((str(author[1]).split('by'))[1]).split('<')[0]).replace(' ', '', 1))
    #     books.append({
    #         'title': title,
    #         'author': author,
    #         'desc': desc
    #     })
# else:
#     print("failed to get text.")



# titles = titles[10:]
# authors = authors[10:]
# print(authors)