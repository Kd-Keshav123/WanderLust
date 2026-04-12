# 🏨 KAVD Hotels

## 📌 Description

KAVD Hotels is a full-stack web application that allows users to explore, review, and list hotels through a secure and user-friendly platform. Users can register, log in, add their own hotel listings, and share reviews with others.

The application ensures that only authenticated users can create listings, and only the respective owners can edit or delete their own hotels, maintaining strong authorization and data integrity.

---

## 🚀 Features

* 🔐 User Authentication (Register/Login/Logout)
* 🛡️ Authorization (Only owners can edit/delete listings)
* 🏨 Add, edit, and delete hotel listings
* 📝 User reviews and ratings
* 📍 Hotel details: description, price, location, and image
* ✅ Server-side validation
* ⚠️ Error handling for better user experience

---

## 🛠️ Tech Stack

### Backend:

* Node.js
* Express.js
* MongoDB (Mongoose)

### Frontend:

* EJS (Templating Engine)
* HTML, CSS, JavaScript
* Bootstrap

---

## 📂 Project Structure (Simplified)

```
KAVD-Hotels/
│-- models/
│-- routes/
│-- controllers/
│-- views/
│-- public/
│-- app.js
│-- package.json
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory and add the following:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
```

---

## ▶️ Installation & Setup

1. Clone the repository:

```
git clone https://github.com/your-username/kavd-hotels.git
```

2. Navigate to project folder:

```
cd kavd-hotels
```

3. Install dependencies:

```
npm install
```

4. Add your `.env` file

5. Run the app:

```
npm start
```

6. Open in browser:

```
http://localhost:3000
```

---

## 📌 Future Improvements

* 🌐 Add maps integration (location view)
* 🤖 AI-based hotel recommendations
* 📸 Multiple image uploads
* ⭐ Rating system with analytics

---

## 👨‍💻 Author

Keshav Anand

---

## 📄 License

This project is for educational purposes.
