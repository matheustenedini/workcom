# Workcom

![Print](https://i.imgur.com/8TCv6nZ.png)

## Sobre o projeto 

A ideia do projeto é auxiliar o usuário na busca por profissionais numa determinada área e impulsionar a visibilidade desses através de um perfil público.

Assim como empresas de transporte (Uber, Cabify), conectam motoristas a passageiros, ou empresas de hospedagem (Airbnb, Booking), conectam acomodações a hóspedes, a Workcom surgiu para conectar o usuário a qualquer profissional atuante na área da saúde, como médicos, dentistas, nutricionistas, etc. E esses, através da plataforma, são possibilitados a atingir um maior engajamento, utilizando a plataforma também como uma forma de propaganda.

[Acesse o site do projeto](https://workcom.vercel.app)

## Por quê?

Esse projeto é parte do meu portfólio pessoal, foi desenvolvido durante um mês com o objetivo de colocar meus conhecimentos em prática na **criação de uma aplicação completa do zero** (sem utilizar como base cursos ou outros projetos).

O desenvolvimento desse projeto foi feito em parceria com um amigo, responsável pelo back-end, enquanto fui o responsável pela elaboração do design (UI  e UX) e pelo código front-end.

## Algumas observações sobre este App


1 - Selecione “Porto Alegre” no campo _Cidade_ para testar a pesquisa de profissionais.

2 - O aplicativo é 100% responsivo (compatível com dispositivos móveis).

3 - Não é possível utilizar a função “Esqueceu a senha”.

## Funcionalidades

_Como cliente:_

  - Crie uma conta com email e senha ou utilize o login do Google.

  - Busque por um profissional filtrando por cidade, profissão, especialização e plano de saúde.

  - Obtenha acesso a um perfil detalhado do profissional com foto, telefone, endereços, convênios aceitos, descrição e formação.

  - Envie mensagens de ajuda ou sugestões.

_Como profissional:_

  - Crie uma conta para ter um perfil público divulgado na plataforma.

  - Envie mensagens de ajuda ou sugestões (também disponível dentro de _Selects_ para sugerir a adição de novas profissões ou convênios).

## Getting Started  

### Pré-requisitos

Para executar este projeto no modo de desenvolvimento, você precisará ter um ambiente básico para executar um React App, que pode ser encontrado [aqui](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/react-on-windows#prerequisites).

### Instalando 

**Clonando o respositório**

```
$ git clone https://github.com/matheustenedini/workcom

$ cd workcom
```

**Instalando dependências**

```bash
$ yarn # ou npm install
```

**Executando**

```bash
$ yarn dev # ou npm run dev
```

## Desenvolvido com

- [React](https://pt-br.reactjs.org) - Biblioteca JavaScript para criar interfaces de usuário
- [Next.js](https://nextjs.org/) - Framework para React
- [Tailwind](https://tailwindcss.com/) - Framework CSS
- [Typescript](https://typescriptlang.org/) - Tipagem estática
- [React-Query](https://tanstack.com/query/v4) - Gerenciador de estado para requisições
- [Axios](https://axios-http.com/) - Cliente HTTP para fazer requisições
- [Zustand](https://github.com/pmndrs/zustand) - Gerenciador de estado
- [React-Hook-Form](https://react-hook-form.com/) - Criação de formulários
- [React-Icons](https://react-icons.github.io/react-icons/) - Ícones
- [Nookies](https://github.com/maticzav/nookies) - Gerenciar cookies
- [React-Hot-Toast](https://react-hot-toast.com/) - Notificações popup
- [React-Spring](https://react-spring.dev/) - Animações
- [Reat-Textarea-Autosize](https://github.com/Andarist/react-textarea-autosize) - Redimensionar componentes “textarea” automaticamente

## Outras ferramentas

- [Amazon S3](https://aws.amazon.com/pt/s3/) - Armazenamento de imagens
- [Vercel](https://vercel.com/) - Hospedagem front-end
- [Heroku](https://www.heroku.com/) - Hospedagem back-end

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/matheustenedini/workcom/blob/master/LICENSE.md) file for details
