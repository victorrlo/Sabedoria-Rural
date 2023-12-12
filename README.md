# Blog de Música
 Projeto para Programação Web de um blog de compartilhamento de conhecimento musicais ou músicas feitas por compositores independentes.

## Instalação do Desenvolvimento



1 - Criar a pasta temporária para o banco SQLite

```console

mkdir tmp
```

2 - Configurar o banco

```console
node ace migration:run
```

3 - Criar o `.env`

```console
cp .env.example .env
```

4 - Instalar as dependências

```console
npm install
```

## Execução

```console
node ace serve --watch
```
