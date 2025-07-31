# ==============================================================================
# Etapa 1: Build da aplicação React
# Usa uma imagem do Node.js para instalar dependências e construir o projeto.
# ==============================================================================
FROM node:20-alpine AS builder

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos de configuração de dependências
# Isso permite que o Docker use o cache para as dependências se eles não mudarem
COPY package.json package-lock.json ./

# Instala as dependências do projeto
# O comando npm install irá instalar a versão do TypeScript (~5.6.2)
# e outras dependências de desenvolvimento listadas em package.json
RUN npm install

# Copia o restante do código fonte do projeto para o contêiner
COPY . .

RUN chmod +x ./node_modules/.bin/tsc
RUN chmod +x ./node_modules/.bin/vite

# Executa o comando de build do Vite para criar a versão de produção
# Este comando usa o 'tsc' e o 'vite' instalados na etapa anterior
RUN npm run build


# ==============================================================================
# Etapa 2: Servir a aplicação com Nginx
# Usa uma imagem leve do Nginx para servir os arquivos estáticos do build.
# ==============================================================================
FROM nginx:stable-alpine AS final-nginx

# Remove a página de boas-vindas padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia a configuração Nginx para Single-Page Applications (SPAs)
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos de build da aplicação (do estágio 'builder') para o Nginx
# A pasta 'dist' é o local de saída padrão para projetos Vite
COPY --from=builder /app/dist /usr/share/nginx/html

# Expõe a porta 80, que é a porta padrão do Nginx
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]