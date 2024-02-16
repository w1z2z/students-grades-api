# Тестовое задание "Студенты и оценки"

Стэк проекта: Nest.js, Prisma, Postgres, NATS, Swagger

## Установка

1. Создать файл .env и внести в него следующие данные (пример)
```yaml
PORT=8080

DATABASE_URL="postgresql://<user>:<password>@postgres:5432/students_grades"
NATS_URL=nats://<adress>:<port>

POSTGRES_USER=<user>
POSTGRES_PASSWORD=<password>
POSTGRES_DB=students_grades
```
2. Запустить докер контейнеры
```bash
docker-compose up --build
```
3. Докуменация swagger доступна по адресу [http://localhost:8080/](http://localhost:8080/)

## Пример использования:

### 1) Запрос на получение журнала оценок (логов)

```http
GET http://localhost:8080/api/log?page=1&limit=10
```

Пример ответа:
```json
[
  {
    "date": "2024-02-16T14:39:45.215Z",
    "subject": "music",
    "grade": 4,
    "student": {
      "personalCode": "0425AB018373",
      "name": "Jackie",
      "lastName": "Thompson"
    }
  },
  {
    "date": "2024-02-16T14:40:00.220Z",
    "subject": "geography",
    "grade": 4,
    "student": {
      "personalCode": "9201CE420779",
      "name": "Aaren",
      "lastName": "Elliott"
    }
  },
  {
    "date": "2024-02-16T14:40:15.252Z",
    "subject": "science",
    "grade": 4,
    "student": {
      "personalCode": "9201CE420779",
      "name": "Aaren",
      "lastName": "Elliott"
    }
  }
]
```

### 2) Запрос на получение статистики студента по id

```http
GET http://localhost:8080/api/statistic/:personalCode
```

Пример ответа:
```json
{
  "student": {
    "personalCode": "9201CE420779",
    "name": "Aaren",
    "lastName": "Elliott"
  },
  "statistic": [
    {
      "subject": "geography",
      "maxGrade": 4,
      "minGrade": 4,
      "avgGrade": 4,
      "totalGrades": 1
    },
    {
      "subject": "science",
      "maxGrade": 4,
      "minGrade": 4,
      "avgGrade": 4,
      "totalGrades": 1
    }
  ]
}
```