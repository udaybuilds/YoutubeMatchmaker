FROM python:3.9-slim

# Set working directory inside container
WORKDIR /app

# Copy only the backend code
COPY authentication_module/ .  # copy contents of the Flask folder into /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential gcc libffi-dev libssl-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Set environment variables for Flask
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0

# Expose Flask port
EXPOSE 5000

# Run the Flask app
CMD ["flask", "run"]