@echo off
echo Iniciando servicios MVP Carrito de Compras...
echo.

echo Iniciando PostgreSQL (asegúrate de que esté corriendo)...
echo.

echo Iniciando users-service...
start cmd /k "cd /d C:\Users\demoo\Desktop\mvp-carrito-microservices\Backend\users-service && .\mvnw spring-boot:run"

timeout /t 10 /nobreak > nul

echo Iniciando products-service...
start cmd /k "cd /d C:\Users\demoo\Desktop\mvp-carrito-microservices\Backend\products-service && .\mvnw spring-boot:run"

timeout /t 10 /nobreak > nul

echo Iniciando sales-service...
start cmd /k "cd /d C:\Users\demoo\Desktop\mvp-carrito-microservices\Backend\sales-service && .\mvnw spring-boot:run"

timeout /t 10 /nobreak > nul

echo Iniciando api-gateway...
start cmd /k "cd /d C:\Users\demoo\Desktop\mvp-carrito-microservices\Backend\api-gateway && .\mvnw spring-boot:run"

echo.
echo Todos los servicios están iniciándose...
echo Espera unos segundos para que se inicien completamente.
echo.
echo Una vez iniciados, puedes abrir el frontend con:
echo cd frontend-mvp ^&^& npm run dev
echo.
pause