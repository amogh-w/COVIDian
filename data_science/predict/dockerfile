FROM tiangolo/uvicorn-gunicorn
RUN mkdir -p /app
COPY requirements.txt /app
RUN pip install --no-cache-dir -r requirements.txt
COPY . /app