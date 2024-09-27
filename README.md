# SwadSeva - Bringing Taste To Your Doorstep 🍽️

SwadSeva is a responsive food delivery platform built using **React** and **TypeScript**. It features restaurant data based on geolocation, user-friendly search and sorting, real-time cart updates, and much more! 

This project integrates **Swiggy's live API** to fetch restaurant data and provides a smooth, optimized experience for users.

## 🚀 Live Demo

Check out the live version here: [SwadSeva](https://swadseva.vercel.app)

## 📂 Features

- **Geolocation-Based Restaurant Data**: Uses Swiggy's live API to display nearby restaurants.
- **CORS Handling**: Overcame previous CORS issues with an efficient CORS proxy.
- **Shimmer UI**: Improves user experience by displaying a loading animation while fetching restaurant data.
- **Dynamic Search**: Search restaurants by name.
- **Sorting Functionality**: Sort restaurants by ratings or distance.
- **Add to Cart**: Automatically calculates total amount and items in the cart.
- **Cart Animation**: The floating cart bounces when an item is added.
- **Order History**: Displays order history (frontend only for now).
- **Performance Optimization**: Improved performance using the `useCallback` hook.
- **Pure Veg Label**: Higher-Order Components (HOCs) used to label pure-veg restaurants.
- **Responsive Design**: Fully responsive and works smoothly across all devices.

## 🔧 Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Context API
- **API**: Swiggy's Live API
- **UI Enhancements**: Shimmer UI, react-hot-toast for notifications
- **Hosting**: Deployed on Vercel

## 🛠️ Installation

To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/parshurambagade/swadseva.git
   ```

2. Navigate to the project directory:
   ```bash
   cd swadseva
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

<!-- 4. Create an `.env` file in the root directory and add your Swiggy API key:
   ```bash
   
   ``` -->

4. Start the development server:
   ```bash
   npm run start
   ```

6. Open [http://localhost:5173](http://localhost:5173) to view the app in the browser.

## 🚀 Deployment

This project is deployed on **Vercel**. You can deploy it by connecting your GitHub repository to Vercel or following Vercel's deployment guide for React projects.

## 🌟 Future Improvements

- **Backend Integration**: Plan to add backend support for storing order history.
- **Improved Performance**: Continuously working on optimizing data fetching and reducing load times.

## 💡 Inspiration and Acknowledgment

A special thanks to **Akshay Saini**, the instructor of the **Namaste React** course, whose teachings helped build my confidence in React development.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check out the [issues page](https://github.com/parshurambagade/swadseva/issues) or submit a pull request.


## Connect

If you have any questions or feedback, feel free to reach out or open an issue! 😊

