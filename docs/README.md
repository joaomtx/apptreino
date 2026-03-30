# AppTreino

Um aplicativo web para registrar treinos de academia, com autenticação JWT, treinos pré-definidos e montagem autônoma de treinos.

![Badge](https://img.shields.io/badge/javascript-ES6%2B-yellow)
![Badge](https://img.shields.io/badge/css-Bootstrap%205-purple)
![Badge](https://img.shields.io/badge/license-MIT-blue)

---

## 🎯 Visão Geral

O AppTreino é uma aplicação com frontend e backend. O frontend é uma SPA que consome uma API REST com autenticação JWT. O backend usa Node.js, Express, Sequelize (ORM) e SQLite.

Funcionalidades incluem:
- Autenticação de usuários com JWT
- Treinos pré-definidos
- Montagem autônoma de treinos
- Registro e histórico de treinos
- Progressão de cargas com gráficos

---

## ✨ Funcionalidades

- **Autenticação JWT**: Login/logout seguro com tokens.
- **Treinos Pré-definidos**: Lista de treinos prontos (Peito, Pernas, Costas).
- **Montagem Autônoma**: Usuários podem usar treinos pré-definidos e personalizar.
- **Registro de Treinos**: Adicionar exercícios, séries, reps, peso.
- **Histórico e Progressão**: Ver histórico e gráficos de progresso.
- **Orientação a Objetos**: Código estruturado com classes (User, Workout, Exercise).

---

## 🚀 Como Usar

1. **Instalar dependências**:
   ```bash
   npm install
   ```

2. **Iniciar o backend**:
   ```bash
   npm start
   ```
   O servidor roda em http://localhost:3000.

3. **Abrir o frontend**:
   Abra `docs/index.html` no navegador. Use um servidor local se necessário (ex.: `python -m http.server` na pasta docs).

4. **Registrar usuário**:
   Use uma ferramenta como Postman para registrar: POST http://localhost:3000/register com { "email": "user@example.com", "password": "pass" }.

5. **Login e usar**:
   Faça login no app, acesse treinos pré-definidos, monte e registre treinos.

---

## 🛠️ Tecnologias

- **Frontend**: HTML, CSS (Bootstrap), JavaScript (ES6+)
- **Backend**: Node.js, Express, Sequelize (ORM), SQLite, JWT, bcrypt
- **Outros**: Chart.js para gráficos

---

## 📁 Estrutura do Projeto

```
apptreino/
├── server.js          # Backend com API
├── package.json       # Dependências
├── docs/
│   ├── index.html     # Frontend
│   ├── app.js         # Lógica frontend
│   ├── style.css      # Estilos
│   └── README.md      # Este arquivo
```

---

## 🤝 Contribuição

Sinta-se à vontade para contribuir!

*   **Registro de Treinos:** Adicione treinos com data, nome (ex: "Treino A") e múltiplos exercícios.
*   **Detalhes do Exercício:** Para cada exercício, registre séries, repetições e o peso (kg).
*   **Sugestão de Progressão:** Ao digitar o nome de um exercício que você já fez, o app mostra seu último desempenho para te incentivar a progredir.
*   **Histórico Completo:** Visualize todos os treinos passados em um formato de acordeão.
*   **Gráficos de Progresso:** Gere gráficos de linha para qualquer exercício para visualizar sua progressão de carga ao longo do tempo.
*   **Design Responsivo:** A interface se adapta para uso em desktops, tablets e celulares.
*   **100% Client-Side:** Não depende de servidores. Seus dados ficam com você, no seu navegador.

---

## 🚀 Como Usar

Nenhuma instalação é necessária!

1.  Clone ou baixe este repositório:
    ```sh
    git clone https://github.com/seu-usuario/apptreino.git
    ```
2.  Navegue até a pasta do projeto.
3.  Abra o arquivo `index.html` no seu navegador de preferência (Google Chrome, Firefox, etc.).

E pronto! Você já pode começar a registrar seus treinos.

**Atenção:** Como os dados são salvos no `localStorage` do navegador, eles serão perdidos se você limpar o cache do site ou os dados de navegação.

---

## 🛠️ Para Desenvolvedores

Este projeto foi construído com simplicidade em mente, utilizando JavaScript "vanilla" para ser acessível e fácil de modificar.

### Estrutura do Projeto

*   `index.html`: O ponto de entrada da aplicação. Contém toda a estrutura HTML e as "telas" que são exibidas ou ocultadas conforme a navegação.
*   `style.css`: Estilos personalizados que complementam o Bootstrap.
*   `app.js`: O coração da aplicação. Contém toda a lógica para:
    *   Manipulação do DOM.
    *   Gerenciamento de eventos.
    *   Funções para salvar e carregar dados do `localStorage`.
    *   Lógica de negócio (sugestão de progressão, renderização de histórico e gráficos).

### Como Contribuir

1.  Faça um **Fork** deste repositório.
2.  Crie uma nova branch para sua feature (`git checkout -b feature/nova-feature`).
3.  Faça o commit de suas mudanças (`git commit -m 'Adiciona nova feature'`).
4.  Faça o push para a branch (`git push origin feature/nova-feature`).
5.  Abra um **Pull Request**.

### Melhorias Futuras

*   **Refatorar `app.js`:** Dividir o código em módulos (UI, Storage, Logic) para melhor manutenibilidade.
*   **Gerenciar Rotinas:** Implementar um sistema para criar e reutilizar rotinas de treino.
*   **Editar/Excluir Treinos:** Permitir que o usuário edite ou apague um treino já salvo.
*   **Importar/Exportar Dados:** Adicionar funcionalidade para fazer backup dos dados em um arquivo JSON.
*   **Service Worker:** Adicionar um Service Worker para melhorar a capacidade offline.

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
