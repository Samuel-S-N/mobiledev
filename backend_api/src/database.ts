import fs from "fs";

const caminho = "./src/accounts.json";

export function loadAccounts() {
    try{
        const data = fs.readFileSync(caminho, "utf8");
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
        return [];
    }
}

export function saveAccount(account: any) {
    
    fs.writeFileSync(caminho, JSON.stringify(account, null, 2));

}