FROM node:14

# Criar diretório de trabalho
WORKDIR /app

# Copiar arquivos package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código
COPY . .

# Expor a porta da aplicação
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "start"]
