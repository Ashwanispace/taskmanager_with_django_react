# Task Manager

## Overview

Task Manager is a full-stack application for managing tasks, built with Django for the backend and React (with Vite) for the frontend. The application supports user authentication via JWT, allowing users to create, update, delete, and sort tasks based on priority and due date.

## Features

- **JWT Authentication**: Secure user authentication using JSON Web Tokens.
- **CRUD Operations**: Create, Read, Update, and Delete tasks.
- **Task Sorting**: Sort tasks by due date and priority (Low, Medium, High).
- **Responsive Design**: Built with Tailwind CSS for a responsive and modern UI.
- **Context API**: Utilized for managing authentication and task states in React.
- **React Router**: For seamless navigation across different components.

## Project Structure

TASKMANAGER                        (parent folder)

  --backend                        (python venv)
     -- dproject                   (django project)
        -- dproject                (built in app)
           -- settings.py          (settings)
           -- urls.py              (urls for dproject)
        -- tasks                   (app for tasks)
           -- models.py            (models for tasks)
           -- urls.py              (urls for tasks)
           -- views.py             (containing the views and viewsets)
           -- serializers.py       (containing the corresponding serializers)
  --frontend                       (vite with react)
     --node modules
     --public
     --src
        --components
           --Login.jsx           (for login view)
           --Register.jsx        (for Register view)
           --TaskDetail.jsx      (for TaskDetail view)
           --TaskList.jsx        (for TaskList view)
           --TaskForm.jsx        (for TaskForm view)
           --Navbar.jsx          (for Navbar view)
        --components
           --AuthContext         (managing the authentication)
           --TasContext          (managing the CRUD operations from frontend)
        --App.jsx                (entry point)
       
     ...other tailwind files         


## Required Packages
 django, djangorestframework, django-rest-headers, djangorestframework-simplejwt

 configure according to the settings.py


## Design Choices

  Backend (Django)
              Models: The Task model encapsulates task attributes like title, description, priority, status, and due date, with relationships to the Django User model for ownership.

              Serializers: Custom serializers (e.g., TaskSerializer, RegisterSerializer) facilitate validation and transformation of model instances into JSON format, supporting API responses.

              ViewSets: The TaskViewSet class-based view enables organized handling of task-related HTTP methods, maintaining DRY principles in CRUD operations.

              JWT Authentication: Leveraging djangorestframework-simplejwt for token-based authentication ensures a stateless interaction model.
  Frontend (React)
              Context API: AuthContext and TaskContext provide global state management for user authentication and task data, promoting reusability and cleaner component code.

              React Router: Used for navigation between components, enhancing user experience with SPA-like behavior.
              
              Tailwind CSS: Employed for rapid styling, enabling a responsive design without writing custom CSS from scratch.