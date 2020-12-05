FROM node:alpine

WORKDIR /home/giovanni/Documentos/projetos

COPY package*.json ./
RUN npm install 
COPY . . 
RUN npm run knex:migrate
COPY . . 


EXPOSE 3336

CMD ["npm", "start"] 