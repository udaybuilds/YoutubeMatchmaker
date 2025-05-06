FROM python:3.9-slim

WORKDIR /app

# Copy all of authentication_module into /app
COPY ./authentication_module ./authentication_module

# Set working directory to the backend folder
WORKDIR /app/authentication_module

# Install dependencies (assuming requirements.txt is in authentication_module/)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential gcc libffi-dev libssl-dev \
    && rm -rf /var/lib/apt/lists/* \
    && pip install --no-cache-dir -r requirements.txt

# Set environment
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0

EXPOSE 5000
CMD ["flask", "run"]