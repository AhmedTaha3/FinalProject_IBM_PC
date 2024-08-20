# Use an official Python runtime as a parent image
FROM python:3.12.0-slim-bookworm

# Set environment variables
ENV PYTHONBUFFERED=1
ENV PYTHONWRITEBYTECODE=1

# Define the working directory
ENV APP=/app
WORKDIR $APP

# Install dependencies
COPY requirements.txt $APP/
RUN pip3 install --no-cache-dir -r requirements.txt

# Copy the project files into the container
COPY . $APP/

# Expose the port your app runs on
EXPOSE 8000

# Make the entrypoint script executable
RUN chmod +x /app/entrypoint.sh

# Define the entrypoint
ENTRYPOINT ["/bin/bash", "/app/entrypoint.sh"]

# Command to run the application
CMD ["gunicorn", "--bind", ":8000", "--workers", "3", "djangoproj.wsgi"]
