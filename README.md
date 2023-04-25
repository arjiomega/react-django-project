# react-django-project

## Virtual Environment Setup

```bash
conda create --no-default-packages -n <env_name>
conda activate <env_name>
conda install python=3.9
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