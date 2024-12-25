# YouTube Clone

This project is a YouTube clone built using React, Redux, and Vite for the frontend, and Node.js, Express, and MongoDB for the backend. It includes features such as user authentication, video upload, video playback, comments, likes, dislikes, subscriptions, and more.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- User Authentication (Signup, Login, Logout)
- Video Upload and Playback
- Commenting on Videos
- Liking and Disliking Videos
- Subscribing to Channels
- Viewing User Profiles
<copilot-edited-file>```markdown
# YouTube Clone

This project is a YouTube clone built using React, Redux, and Vite for the frontend, and Node.js, Express, and MongoDB for the backend. It includes features such as user authentication, video upload, video playback, comments, likes, dislikes, subscriptions, and more.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- User Authentication (Signup, Login, Logout)
- Video Upload and Playback
- Commenting on Videos
- Liking and Disliking Videos
- Subscribing to Channels
- Viewing User Profiles
- Dark and Light Theme Toggle

## Tech Stack

**Frontend:**
- React
- Redux
- Vite
- Tailwind CSS

**Backend:**
- Node.js
- Express
- MongoDB
- Mongoose

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Deepak-Varshney/myYoutube.git
2. Install dependencies for the frontend:
npm install

Environment Variables
Create a .env file in the server directory and add the following environment variables:

MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret

##  Running the Project
1. Start the backend server:
cd server
npm install
npm start
2. Start the frontend development server:

cd ../
npm run dev

3. Open your browser and navigate to http://localhost:3000 to see the application backend running.
4. Open your browser and navigate to http://localhost:5173 to see the application frontend running.


Project Structure
.
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── public/
├── README.md
├── server/
│   ├── .env
│   ├── connection/
│   │   └── dbConnect.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── comment.controller.js
│   │   ├── user.controller.js
│   │   └── video.controller.js
│   ├── index.js
│   ├── middleware/
│   │   └── token.js
│   ├── models/
│   │   ├── comment.model.js
│   │   ├── user.model.js
│   │   └── video.model.js
│   ├── package.json
│   └── routes/
│       ├── auth.routes.js
│       ├── comment.routes.js
│       ├── user.routes.js
│       └── video.routes.js
├── src/
│   ├── App.jsx
│   ├── assets/
│   ├── components/
│   │   ├── Auth.jsx
│   │   ├── ChannelInfo.jsx
│   │   ├── CommentSection.jsx
│   │   ├── ListItems.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProfileHeader.jsx
│   │   ├── ProfileVideos.jsx
│   │   ├── SearchResults.jsx
│   │   ├── Sidebar.jsx
│   │   ├── SuggestedVideo.jsx
│   │   ├── Upload.jsx
│   │   ├── VideoInfo.jsx
│   │   ├── VideoPlayer.jsx
│   │   └── Video.jsx
│   ├── context/
│   │   └── ThemeContext.jsx
│   ├── index.css
│   ├── loader/
│   │   └── Time.jsx
│   ├── main.jsx
│   ├── pages/
│   │   ├── Error.jsx
│   │   ├── Home.jsx
│   │   ├── PlayingVideo.jsx
│   │   └── Profile.jsx
│   ├── redux/
│   │   ├── store.js
│   │   └── userSlice.js
│   └── vite.config.js
└── tailwind.config.js

Contributing
Contributions are welcome! Please open an issue or submit a pull request for any changes.

License
This project is licensed under the MIT License.