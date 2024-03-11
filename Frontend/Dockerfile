# Use a imagem base do Node.js
FROM node:21-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos do aplicativo para o contêiner
COPY . /app

# Instala as dependências do Node.js
RUN npm install

# Expõe a porta do aplicativo
EXPOSE 3000

# Define o comando para iniciar o aplicativo Node.js
CMD ["npm", "start"]
