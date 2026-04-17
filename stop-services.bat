@echo off
echo Deteniendo servicios MVP Carrito de Compras...
echo.

echo Deteniendo procesos Java...
taskkill /f /im java.exe >nul 2>&1

echo.
echo Servicios detenidos.
echo.
pause