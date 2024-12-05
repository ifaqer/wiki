# JavaScript Async/Await

JavaScript Async/Await - это способ написания асинхронного кода, который позволяет избежать использования коллбэков и promise.

## Основные концепции

*   Async функции
*   Await выражения
*   Promise

## Async функции

Async функции - это функции, которые возвращают promise. Они позволяют написать асинхронный код, который выглядит как синхронный.

### Пример async функции
```javascript
async function example() {
  const data = await fetch('https://example.com/api/data');
  console.log(data);
}