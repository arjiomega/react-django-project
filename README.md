# react-django-project

## Virtual Environment Setup

```bash
conda create --no-default-packages -n <env_name>
conda activate <env_name>
conda install python=3.9
conda install -c conda-forge nodejs=18.15.0
```

## install requirements
```bash
pip install -r requirements.txt
```

## Project Setup
1. create project
```bash
django-admin startproject <project_name>
```
2. create app
```bash
cd <project_name>
django-admin startapp <app_name>
```

3. update database (run whenever there is a change in model or database)
```bash
python .\manage.py makemigrations
python .\manage.py migrate
```

4. run server
```bash
python .\manage.py runserver
```

## React Setup (Frontend)

5. Create frontend app
```bash
django-admin startapp frontend
```

> **Note**: Create templates,static,src folder inside frontend 

> css,frontend,images inside static folder

> components inside src folder

6. npm setup
```bash
npm init -y
npm i webpack webpack-cli --save-dev
npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev
npm i react react-dom --save-dev
npm install @mui/material
npm install @babel/plugin-proposal-class-properties
npm install react-router-dom
npm install @mui/icons-material
```

7. setup babel.config.json
8. setup webpack.config.js
9. edit package.json scripts
10. add index.js in frontend/src/
11. add frontend directory inside templates/
12. run django with react (inside music_controller/frontend)
```bash
npm run dev
```
