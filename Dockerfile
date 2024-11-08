FROM node:18-alpine

# Cria e define o diretório de trabalho
WORKDIR /home/app

# Copia apenas os arquivos de dependências primeiro
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos
COPY . .

# Expõe a porta que a aplicação usa
EXPOSE 3333

# Define o comando para rodar a aplicação
CMD ["npm", "run", "dev"]
