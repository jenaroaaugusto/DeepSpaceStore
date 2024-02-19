# Deep Space Store

Small project with Vue 3 and Vite, using Vue Single-File Components (SFCs).

# Problemas e desafios
Encontrado um problema de compatibilidade entre a MWS e a versão do node v20.10.0 e npm 10.2.5, que a função de formatData não realiza a serialização do dados que vem do body, sendo optado buscar uma solução atraves de outras lib para mock a Mirage Js, que realiza as mesmas função, entranto gera empercilhos, para requisição externas, gerando coonflito com a Axios, mas resolvido utilizando a Fatch API. 


## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```


### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
