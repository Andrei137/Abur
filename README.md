# Abur

## Deployed server
- https://abur.fly.dev

## Setup
1. Clone the repository
```sh
git clone https://github.com/Andrei137/Abur
```

2. Change the current working directory
```sh
cd Abur
```

3. Install the dependencies
```sh
pnpm install
```

4. Rename <kbd>.env.example</kbd> to <kbd>.env</kbd> and add your secret (for jwt)

5. Create the database
```sh
pnpm run db:win     # For Windows
pnpm run db:linux   # For Linux
```

6. Start the server
```sh
pnpm run start
```
