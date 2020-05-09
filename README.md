# Bookmates

## What is Bookmates?

Bookmates is a React Native application that connects people through the books they read.

---

### Functionality

1. **Add books** that you are willing to share with other people near you
2. Browse and **discover** books near you
3. **Favorite** books you would like to read
4. Send a **borrow request** to borrow books from other users

---

### Screens

![](assets/sample_screens.png)

---

### Tools

- React Native
- JavaScript
- Firebase
- Redux

---

### Use Cases

#### ADD BOOK PROCESS

- User1 adds book, and the book is added to **/users/U1/lending_books/available_books**, **/users/U1/lending_books/all_books** and under **/books**

#### STAR PROCESS

- User2 stars a book and the book is added in **/users/U2/borrowing_books/starred_books**
- User2 removes star and the book is removed from **/users/U2/borrowing_books/starred_books**

#### BORROW PROCESS

- User2 requests to borrow book. Book is added to **/users/U2/borrowing_books/request_to_borrow_books** and to **/users/U1/lending_books/borrow_request_recieved**

  - Lender options (User1) - accept request, reject request
  - Borrower options (User2) - cancel request

- User1 accepts borrow request. Books is added to **/users/U1/lending_books/borrow_request_accepted**, to **/users/U2/borrowing_books/pickup_books** and change status to **/books/b_id/available:false**. Notification is sent with lender contact information

  - Lender options (User1) - cancel pickup
  - Borrower options (User2) - cancel pickup, mark picked up

- User2 picks up the book and book is changed to **/users/U1/lending_books/lent_books** and to **/users/U2/borrowing_books/borrowed_books**

  - Lender options (User1) - mark returned
  - Borrower options (User2) - mark returned

- Any user can mark return and book is moved to **/users/U1/lending_books/available_books** removed from User2

---

### Contributor setup

**1. Fork this repository and cd into it**

```
git clone https://github.com/Coral-Tech/bookmates
cd bookmates/`
```

**2. Create and activate a virtual environment**

- MacOS/Linux

```
virtualenv --no-site-packages env
source env/bin/activate
```

- Windows

```
virtualenv env
.\env\Scripts\activate
```

**3. Install npm**

[Download link](https://nodejs.org/en/)

**4. Install Expo**

```
npm install -g expo-cli
```

**5. Install required JS packages from packages.json**

```
npm install
```

**6. Run Expo**

```
expo start
```
