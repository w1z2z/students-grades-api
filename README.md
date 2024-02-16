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
    "date": "2024-02-16T00:46:48.199Z",
    "subject": "biology",
    "grade": 5,
    "student": {
      "personalCode": "000",
      "name": "Vitaliy",
      "lastName": "Kochergin"
    }
  },
  {
    "date": "2024-02-16T00:49:17.483Z",
    "subject": "biology",
    "grade": 4,
    "student": {
      "personalCode": "000",
      "name": "Vitaliy",
      "lastName": "Kochergin"
    }
  },
  {
    "date": "2024-02-16T00:49:23.728Z",
    "subject": "biology",
    "grade": 4,
    "student": {
      "personalCode": "000",
      "name": "Vitaliy",
      "lastName": "Kochergin"
    }
  },
  {
    "date": "2024-02-16T01:08:52.120Z",
    "subject": "biology",
    "grade": 3,
    "student": {
      "personalCode": "000",
      "name": "Vitaliy",
      "lastName": "Kochergin"
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
    "personalCode": "000",
    "name": "Vitaliy",
    "lastName": "Kochergin"
  },
  "statistic": [
    {
      "subject": "biology",
      "maxGrade": 5,
      "minGrade": 3,
      "avgGrade": 4,
      "totalGrades": 4
    }
  ]
}
```