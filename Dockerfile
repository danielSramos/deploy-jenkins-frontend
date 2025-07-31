# ==============================================================================
# Etapa 1: Build da aplicação React
# Usa uma imagem do Node.js para instalar dependências e construir o projeto.
# ==============================================================================
FROM node:20-alpine as builder

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos de configuração de dependências
# Isso permite que o Docker use o cache para as dependências se eles não mudarem
COPY package.json package-lock.json ./

# Instala as dependências do projeto
# O 'npm install' instalará todas as dependências, incluindo as de desenvolvimento
RUN npm install

# Copia o restante do código fonte do projeto para o contêiner
COPY . .

# Comando adicionado para garantir que os binários do npm estão no PATH e são executáveis
# Isso resolve o "Permission denied" em alguns ambientes
# O 'npm-cache clean --force' pode ser uma alternativa, mas o re-install do tsc é mais focado
RUN npm install typescript@4.9.5 --save-dev # Garante a instalação do TypeScript, ajusta a versão se necessário

# Executa o comando de build do Vite para criar a versão de produção
# O 'npm run build' cria os arquivos estáticos na pasta 'dist'
RUN npm run build


# ==============================================================================
# Etapa 2: Servir a aplicação com Nginx
# Usa uma imagem leve do Nginx para servir os arquivos estáticos do build.
# ==============================================================================
FROM nginx:stable-alpine as final-nginx

# Remove a página de boas-vindas padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia uma configuração Nginx para Single-Page Applications (SPAs)
# Isso é crucial para o roteamento no React, garantindo que todas as requisições
# sejam direcionadas para o index.html
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos de build da aplicação (do estágio 'builder') para o Nginx
# A pasta 'dist' é o local de saída padrão para projetos Vite
COPY --from=builder /app/dist /usr/share/nginx/html

# Expõe a porta 80, que é a porta padrão do Nginx
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]