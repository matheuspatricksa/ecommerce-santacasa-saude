# Ecommerce Santa Casa Saúde

Este projeto é uma aplicação de e-commerce para planos de saúde, composta por duas partes principais:

## Frontend
- **Tecnologias:** Javascript, Vue.js
- **Localização:** pasta `front/`
- **Funcionalidades:**
	- Interface moderna para navegação e compra de planos
	- Componentes reutilizáveis (DataTable, ModalForm, Header, etc.)
	- Rotas e páginas organizadas

## Backend
- **Tecnologias:** Javascript, Node.js, Express, SQLite
- **Localização:** pasta `back/`
- **Funcionalidades:**
	- API REST para gerenciamento de clientes, planos e compras
	- Conexão com banco de dados (configuração em `configDB.js`)
	- Rotas protegidas e integração com certificados SSL

---

## Como rodar o projeto localmente

### Pré-requisitos
- Node.js instalado
- npm instalado

### 1. Instalar dependências

#### Backend
```powershell
cd back
npm install
```

#### Frontend
```powershell
cd ../front
npm install
```

### 2. Rodar o Backend
```powershell
cd ../back
npm run dev
```

### 3. Rodar o Frontend
```powershell
cd ../front
npm run dev
```

O frontend estará disponível em `http://localhost:5173` (ou porta configurada pelo Vite).
O backend estará disponível em `https://localhost:3000` (ou porta configurada no app).

## Estrutura de Pastas

```
back/
	src/
		app.js
		configDB.js
		routes.js
		controller/
			clients.js
			plans.js
			purchases.js
		SSL/
			code.crt
			code.csr
			code.key
front/
	src/
		App.vue
		main.js
		components/
		pages/
		router/
		services/
		stores/
		views/
	cypress/
	public/
```

## Documentação da API

Esta seção descreve a API REST do backend localizada na pasta `back/`.

Visão geral:
- Base URL (modo local): `https://localhost:3000`
- Conteúdo: endpoints para gerenciamento de planos, clientes e compras

Formato padrão:
- Requisições: JSON
- Respostas: JSON

Endpoints principais (exemplos):

- Plans
	- GET /plans
		- Descrição: lista todos os planos

	- GET /plan/:id
		- Descrição: obtém um plano pelo ID

	- POST /plan
		- Descrição: cria um novo plano
		- Corpo (exemplo):
			```powershell
			{
				"name": "Plano Essencial",
				"price": 199.90,
				"description": "Hospitalar"
			}
			```
	- PUT /plan/:id
		- Descrição: atualiza um plano pelo ID
		- Corpo (exemplo):
			```powershell
			{
				"name": "Plano Essencial Plus",
				"price": 249.90,
				"description": "Hospitalar e Odontológico"
			}
			```
	- DELETE /plan/:id
		- Descrição: exclui um plano pelo ID

- Clients
	- GET /clients
		- Descrição: lista todos os clientes
		- Resposta (200): Array de objetos cliente

	- GET /client/:id
		- Descrição: obtém um cliente pelo ID
		- Resposta (200): objeto cliente

	- POST /client
		- Descrição: cria um novo cliente
		- Corpo (exemplo):
			```powershell
			{
				"name": "João Silva",
				"email": "joao@example.com",
			}
			```
		- Resposta (201): objeto cliente criado

	- PUT /client/:id
		- Descrição: atualiza dados de um cliente
		- Corpo (exemplo):
			```powershell
			{
				"name": "João Silva Santos",
				"email": "joao.santos@example.com"
			}
			```

	- DELETE /client/:id
		- Descrição: remove um cliente


- Purchases
	- GET /purchases
		- Descrição: lista todas as compras

	- POST /purchase
		- Descrição: registra uma compra
		- Corpo (exemplo):
			```powershell
			{
				"clientId": "<id-do-cliente>",
				"planId": "<id-do-plano>",
				"quantity": 1,
			}
			```

## Licença
Este projeto está sob a licença MIT.