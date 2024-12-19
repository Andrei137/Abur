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
##### Windows
```sh
pnpm run db:win
```

##### Linux
```sh
pnpm run db:linux
```

6. Start the server
```sh
pnpm run start
```
