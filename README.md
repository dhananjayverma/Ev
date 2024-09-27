# Full Stack To-Do List Application

This is a full-stack to-do list application built using **Node.js**, **MQTT**, **Redis**, **MongoDB**, and **React.js**. The application allows users to add tasks via **MQTT** and retrieve all tasks through an HTTP API. Tasks are cached in Redis and then moved to MongoDB once the count exceeds 50. The frontend is built with **React.js**, featuring responsive design and reusable components.

## Features

- **Add tasks**: New tasks are added by sending a message to the `/add` topic of an MQTT Broker.
- **Caching with Redis**: Tasks are initially stored in a Redis cache as a stringified array.
- **MongoDB Storage**: When the task count exceeds 50, tasks are moved from Redis to a MongoDB collection, and Redis is flushed.
- **Retrieve tasks**: Fetch all tasks through the `/fetchAllTasks` HTTP endpoint.
- **Responsive Frontend**: A mobile-friendly UI built with React.js and styled using **CSS/SCSS** or **Tailwind CSS**.

## Getting Started

## Tech Stack

### Backend:
- **Node.js**: For building the server-side logic.
- **MQTT**: For message queuing to handle task submissions.
- **Redis**: For caching tasks in-memory.
- **MongoDB**: For persistent task storage after reaching the threshold in Redis.
- **Express.js**: For creating HTTP API endpoints.

### Frontend:
- **React.js**: For building the dynamic user interface.
- **CSS/SCSS** or **Tailwind CSS**: For responsive and clean styling.
- **Axios** or **Fetch API**: For making HTTP requests to the backend API.


## Requirements

- **Node.js**: Version >= 14.x
- **Redis**: A running Redis server for task caching.
- **MongoDB**: A MongoDB server must be available for persistent storage.
- **MQTT Broker**: Any MQTT broker (e.g., Mosquitto) should be set up and running to handle task messaging.

  ## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/fullstack-todo-app.git
cd fullstack-todo-app
```


## API Endpoints

### Add Task:
- **Topic:** `/add`
- **Description:** Send a message to this topic using an MQTT client. The message should contain the task text.

### Fetch All Tasks:
- **Endpoint:** `/fetchAllTasks`
- **Method:** `GET`
- **Description:** Fetches all tasks from Redis or MongoDB depending on the cache state.

## Frontend Design
The frontend is designed according to the Figma mockup provided [here](#). Ensure the design is responsive and mobile-friendly, adhering to best practices for a seamless user experience on all devices.

## Testing

### MQTT Client:
- Use an MQTT client such as **MQTT Explorer** to publish messages to the `/add` topic.

### Postman:
- Test the `/fetchAllTasks` endpoint using **Postman** or `cURL`.

## Additional Tools
- **Postman**: For testing API requests.
- **Docker**: For running Redis and MongoDB locally.
- **MQTT Explorer**: For interacting with the MQTT broker.

## Future Enhancements
- Add user authentication for task management.
- Implement task categories and filtering options.
- Enable real-time task updates using WebSockets or MQTT subscriptions.

## Frontend Design
The frontend is built using React.js and follows the Figma design provided. It is responsive and mobile-friendly to ensure a smooth user experience across all devices.

## Set up environment variables in a `.env` file. Example:
    ```plaintext
    MONGO_URL=your_mongo_url
    MQTT_BROKER_URL=your_mqtt_broker_url
    REDIS_HOST_NAME=your_redis_host_name
    REDIS_PORT=your_redis_port
    REDIS_PASSWORD=your_redis_password
    FIRST_NAME=your_first_name
    PORT=4000
    ```
    ## API Endpoints

### Add Task
- **URL:** `/addTask`
- **Method:** `POST`
- **Request Body:**
    ```json
    {
        "task": "Your task description here"
    }
    ```
- **Response:**
    - **200 OK:** Task added successfully
    - **400 Bad Request:** Invalid task input
    - **500 Internal Server Error:** Error adding task

### Fetch All Tasks
- **URL:** `/fetchAllTasks`
- **Method:** `GET`
- **Response:**
    - **200 OK:** Returns a list of tasks
    - **404 Not Found:** No tasks found
    - **500 Internal Server Error:** Error retrieving tasks

  


  
