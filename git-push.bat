@echo off
echo Adicionando arquivos...
git add .

echo.
echo Criando commit...
set /p commit_msg="Digite a mensagem do commit: "
git commit -m "%commit_msg%"

echo.
echo Fazendo push para o GitHub...
git push origin main

echo.
echo Processo concluído!
pause 