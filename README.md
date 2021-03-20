# SMT Marketplace Server

## 1. On the root project folder install the dependencies:

### Yarn
```
yarn
```

### NPM
```
npm install
```

## 2. Create a database on postgreSQL for the project;

## 3. Create an .env file and add the environment variables following the [example file;](.env.example)

## 4. Perform the migrations with the command below:

### Yarn
```
yarn sequelize db:migrate
```

### NPM
```
npx sequelize-cli db:migrate
```

## 5. Run the development server:

### Yarn
```
yarn dev
```

### NPM
```
npm run dev
```
