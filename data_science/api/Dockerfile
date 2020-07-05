FROM tiangolo/uvicorn-gunicorn

# Make directories suited to your application
RUN mkdir -p /app
WORKDIR /app

# Copy and install requirements
COPY requirements.txt /app
RUN pip install --no-cache-dir -r requirements.txt

# Copy contents from your local to your docker container
COPY . /app