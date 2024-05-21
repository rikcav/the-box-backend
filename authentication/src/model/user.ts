interface User {
    id: string;
    email: string;
    password: string;
    role: RoleEnum;
}

type RoleEnum = "ADMIN" | "PROFESSOR" | "CA" | "ALUNO"