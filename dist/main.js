"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    if (process.env.NODE_ENV !== 'production') {
        app.getHttpAdapter().getInstance().set('json spaces', 2);
    }
    app.enableCors({
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    });
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({
        exceptionFactory: (errors) => {
            return new common_1.BadRequestException({
                errorsMessages: errors.map((error) => ({
                    field: error.property,
                    message: Object.values(error.constraints ?? [])[0],
                })),
            });
        },
    }));
    const configService = app.get(config_1.ConfigService);
    await app.listen(configService.get('PORT') ?? 5000);
}
bootstrap();
//# sourceMappingURL=main.js.map