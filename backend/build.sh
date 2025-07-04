#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

python manage.py collectstatic --no-input
python manage.py migrate

# --- ADD THIS BLOCK TO CREATE A SUPERUSER ---
# The DJANGO_SUPERUSER_... variables will be set in Render's Environment
if [[ $CREATE_SUPERUSER ]];
then
  python manage.py createsuperuser --no-input
fi