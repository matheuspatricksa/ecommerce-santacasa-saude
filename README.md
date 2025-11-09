# Ecommerce Santa Casa Saúde

Este projeto é uma aplicação de e-commerce para planos de saúde, composta por duas partes principais:

## Frontend
- **Tecnologias:** Vue.js, Vite, Cypress (testes), Vitest
- **Localização:** pasta `front/`
- **Funcionalidades:**
	- Interface moderna para navegação e compra de planos
	- Componentes reutilizáveis (DataTable, ModalForm, Header, etc.)
	- Rotas e páginas organizadas
	- Testes end-to-end com Cypress

## Backend
- **Tecnologias:** Node.js, Express
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
node src/app.js
```

### 3. Rodar o Frontend
```powershell
cd ../front
npm run dev
```

O frontend estará disponível em `http://localhost:5173` (ou porta configurada pelo Vite).
O backend estará disponível em `https://localhost:3000` (ou porta configurada no app).

### 4. Rodar os testes

#### Testes do Frontend (Cypress)
```powershell
npx cypress open
```

#### Testes do Frontend (Vitest)
```powershell
npm run test
```

---

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

---

## Licença
Este projeto está sob a licença MIT.