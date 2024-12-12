FROM mongo:latest

# Создаем папку для данных
RUN mkdir -p /data/db

# Указываем порт, на котором будет слушать MongoDB
EXPOSE 27017

# Запуск MongoDB
CMD ["mongod", "--bind_ip_all"]