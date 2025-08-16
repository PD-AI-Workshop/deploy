# AI-Workshop Deploy

## Описание проекта

### Используемые технологии:

<img src="https://github.com/user-attachments/assets/53a8a11b-a9d7-440b-965d-04720aa0ce6b" title="Docker" alt="docker" width="75" height="75" />
<img src="https://github.com/user-attachments/assets/ecf924a1-4476-4e60-aa40-525966a89b4e" title="Docker-compose" alt="dockercompose" width="75" height="75" />
<img src="https://github.com/user-attachments/assets/0b1bb9c6-a527-4b58-b642-19b45981e1e9" title="Git" alt="git" width="75" height="75" />
<img src="https://github.com/user-attachments/assets/9d48629f-b3a4-4396-a1b3-34627d17dcc8" title="Nginx" alt="nginx" width="75" height="75" />
<img src="https://github.com/user-attachments/assets/2faf68db-8b09-41e9-bd21-51759ed2fb5a" title="Grafana" alt="grafana" width="75" height="75" />
<img src="https://github.com/user-attachments/assets/d9a303b4-d1cc-4878-900e-27871c54c1db" title="Prometheus" alt="prometheus" width="75" height="75" />
<img src="https://github.com/user-attachments/assets/516ce205-bafc-46c6-81bd-edcfa26a71b2" title="Promtail" alt="promtail" width="75" height="75" />
<img src="https://github.com/user-attachments/assets/01b46fa6-1bb5-4e8f-abcb-d2d3d4d465be" title="Loki" alt="loki" width="150" height="150" />

### Предварительные требования
- Docker v27.5.1

## Запуск
1. Склонируйте репозиторий:
```
git clone https://github.com/PD-AI-Workshop/deploy --recursive
cd deploy
```
2. Создайте в корне проекта .env файл и заполните значения:
```
# Переменные окружения для postgres контейнера (замените значения на свои!)
POSTGRES_USER=your_postgres_user
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_DB=your_postgres_db
POSTGRES_PORT=your_postgres_port

# Переменные окружения для minio контейнера (замените значения на свои!)
MINIO_ROOT_USER=your_minio_user
MINIO_ROOT_PASSWORD=your_minio_password

# Переменные окружения для grafana контейнера (замените значения на свои!)
GF_SECURITY_ADMIN_USER=your_grafana_user
GF_SECURITY_ADMIN_PASSWORD=your_grafana_password
GF_SERVER_HTTP_PORT=your_grafana_port
```
3. В папке backend и frontend создайте .env файлы и поместите в них следующее:
```
# Backend:
# База данных в Docker (замените значения на свои!)
DB_HOST=postgres (название сервиса в Docker-compose)
DB_PORT=your_db_port
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASS=your_db_password

# S3-хранилище в Docker (замените значения на свои!)
MINIO_HOST=minio (название сервиса в Docker-compose)
MINIO_PORT=your_minio_port
MINIO_ACCESS_KEY=your_minio_access_key
MINIO_SECRET_KEY=your_minio_secret_key

# Шифрование (придумайте свой секретный ключ)
SECRET_KEY=your_secret_key

# База данных Redis в Docker (замените значения на свои!)
REDIS_HOST=redis (название сервиса в Docker-compose)
REDIS_PORT=your_redis_port

# Локальный хост (замените значение на свое!)
HOST=your_host
```

```
# Frontend:
# Пример URL для отправки backend (замените значение на свое!)
NEXT_PUBLIC_API_BASE_URL=/api
```
4. В папке backend выполнить команды для создания виртуального окружения, его активации и установке зависимостей:
```
python -m venv .venv

# MacOS и Linux
source .venv/bin/activate
# Windows
.venv/Scripts/activate

pip install poetry
poetry install
```
5. В папке frontend выполнить команду для установки библиотек:
```
pnpm install
```
6. В папке deploy запустить команду:
```
docker compose up
```
Откройте браузер по ссылке http://localhost или http://<Ваш хост>

## Основные скрипты
- ```docker compose up``` - запуск проекта
- ```docker compose down``` - остановка проекта

## Структура проекта
```
/deploy
├── README.md                    # Основная документация проекта
├── backend                      # Серверная часть приложения
├── docker-compose.yml           # Конфигурация для развёртывания многоконтейнерного приложения
├── frontend                     # Клиентская часть приложения
├── grafana                      # Конфигурация Grafana для визуализации метрик и логов
│   ├── config_dashboard.json    # Настройки дашбордов
│   └── datasources.yaml         # Источники данных (Prometheus, Loki)
├── loki-config.yaml             # Настройки Loki (система агрегации логов)
├── nginx                        # Конфигурация Nginx (обратный прокси)
│   ├── Dockerfile               # Инструкции для сборки кастомного образа Nginx
│   └── nginx.conf               # Основной конфигурационный файл
├── prometheus.yml               # Конфигурация Prometheus для сбора метрик
└── promtail-config.yaml         # Конфигурация Promtail (агент для сбора и отправки логов в Loki)
```
