"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
async function main() {
    const prisma = new client_1.PrismaClient();
    console.log('Keys on instance:', Object.keys(prisma));
    console.log('Has $connect:', '$connect' in prisma);
    console.log('Type of $connect:', typeof prisma.$connect);
    try {
        if (prisma.$connect) {
            console.log('Calling $connect...');
            console.log('Call successful (mock)');
        }
        else {
            console.error('$connect is missing!');
        }
    }
    catch (e) {
        console.error(e);
    }
}
main();
//# sourceMappingURL=test-connect.js.map