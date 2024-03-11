# Use a imagem base do Java com JDK 17 para compilação
FROM maven:latest AS build

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o pom.xml para o contêiner
COPY pom.xml .

# Baixa as dependências do Maven
RUN mvn -B dependency:go-offline

# Copia o código-fonte para o contêiner
COPY src ./src

# Compila o aplicativo Spring Boot sem incluir o diretório target
RUN mvn -B package -DskipTests

# Use a imagem base do Java com JDK 17 para execução
FROM openjdk:17

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o jar do aplicativo compilado para o contêiner
COPY --from=build /app/target/*.jar ./app.jar

# Define o comando para executar o aplicativo Spring Boot
CMD ["java", "-jar", "app.jar"]
