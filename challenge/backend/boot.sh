#!/bin/sh
echo "Waiting for postgres..."
while ! nc -z $DB_HOST 5432; do
  sleep 0.1
done
echo "Run migrations"
python manage.py migrate
echo "Starting backend..."
python manage.py runserver 0.0.0.0:8000