import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Cafetea Perú API')
    .setDescription('API para la aplicación web de Cafetea Perú')
    .setVersion('1.0')
    .addTag('productos', 'Operaciones relacionadas con productos')
    .addTag('ordenes', 'Operaciones relacionadas con órdenes')
    .addTag('usuarios', 'Operaciones relacionadas con usuarios y autenticación')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  // Enable CORS for all origins
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  await app.listen(process.env.PORT || 3001);
  console.log(`La aplicación está ejecutándose en: ${await app.getUrl()}`);
  console.log(`Documentación Swagger disponible en: ${await app.getUrl()}/api`);
}
bootstrap();
