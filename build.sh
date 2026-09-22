#!/usr/bin/env bash
# exit on error
set -o errexit

echo "Install dependencies..."
pip install -r requirements.txt

echo "Running collectstatic..."
python backend/manage.py collectstatic --no-input

echo "Running migrations..."
python backend/manage.py migrate
