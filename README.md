# AppTreino

Um aplicativo web simples e de lado do cliente para registrar seus treinos de academia, acompanhar seu progresso e ajudar na progressão de cargas.

![Badge](https://img.shields.io/badge/javascript-ES6%2B-yellow)
![Badge](https://img.shields.io/badge/css-Bootstrap%205-purple)
![Badge](https://img.shields.io/badge/license-MIT-blue)

---

## 🎯 Visão Geral

O AppTreino é uma Single Page Application (SPA) que funciona inteiramente no seu navegador, sem a necessidade de um back-end ou conexão com a internet após o primeiro carregamento. Ele foi projetado para ser uma ferramenta rápida e eficiente para quem quer registrar seus treinos e visualizar a evolução de força e volume ao longo do tempo.

Todos os dados são armazenados localmente no seu navegador usando a API de `localStorage`.

---

## ✨ Funcionalidades

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
