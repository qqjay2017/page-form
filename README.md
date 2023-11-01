### .env 样例

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_ZG9taW5hbnQtY2hhbW9pcy0xLmNsZXJrLmFjY291bnRzLmRldiQ
CLERK_SECRET_KEY=sk_test_Y9kPE3Oql2IzqrBkECNtHpQHwNMDQOxjEASvapDoXj


NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
POSTGRES_PRISMA_URL=postgresql://postgres:mysecretpassword@localhost:5432/page_form

POSTGRES_URL_NON_POOLING=postgresql://postgres:mysecretpassword@localhost:5432/page_form
```

### 初始化数据库

```
npx prisma migrate dev
init db

```

### 打开可视化数据库

```
npx prisma studio
```

### dnd

```
yarn add @dnd-kit/core

```
