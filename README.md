# Envio de email com filas sendo execitadas em outro processo dentro do NestJS

## Using queue to send emails in another process

- O envio dos dados necessário para o envio dos email são salvos no banco de dados do Redis
- O mesmo banco é usado tanto pela aplicação principal como pela aplicação da fila
- A comunicação com o banco de dados é realizada por meio de websockets

## As dependências necessárias:

- websockets no [NestJs](https://docs.nestjs.com/websockets/gateways)

```
$ npm i --save @nestjs/websockets @nestjs/platform-socket.io
$ npm i --save-dev @types/socket.io
$ npm i --save socket.io-redis
$ npm i --save-dev @types/socket.io-redis
```

- nodemailer com handlebars

```
$ yarn add @nestjs-modules/mailer nodemailer handlebars
```

- config com arquivo .env com validação do hapi
  (renomear o arquivo .env.example para .env)

```
$ yarn add @hapi/joi @nestjs/config
yarn add @types/hapi__joi -D
```

- Para que a pasta views fique disponível dentro da pasta dist deve alterar o arquivo nest-cli.json:

```json
{
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "assets": ["views/**/*"]
  }
}
```

- Nota: dentro do arquivo queue.module.ts a importação do consumer deve vir antes da conecção com o redis:
  (EmailConsumer before RedisReusableConnection on queue.module.ts)

```js
// queue.module.ts
import { EmailConsumer } from './email.consumer';
import { RedisReusableConnection } from './redis-reusable-connection';
```
