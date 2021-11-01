import readlineSync = require('readline-sync');

class PaymentInfo { }

export class PaymentSystemContext {
    public getExecutor(name:string): PaymentSystemExecutor {
        if (name == "credit"){
            let builder = new CreditCardBuilder();
            builder.build();
            return builder.getExecutor();
        }
        if (name == "bank"){
            let builder = new BankBuilder();
            builder.build();
            return builder.getExecutor();
        }
        if (name == "online"){
            let builder = new OnlineBuilder();
            builder.build();
            return builder.getExecutor();
        }
            let builder = new OfflineBuilder();
            builder.build();
            return builder.getExecutor();
    
    }
}

export class PaymentSystemExecutor{
    private getInformation: () => PaymentInfo;
    private isValid: (PaymentInfo: any) => boolean;
    
    public constructor(getInformation:() => PaymentInfo, isValid: (PaymentInfo: any) => boolean){
        this.getInformation = getInformation;
        this.isValid = isValid;
    }

    public execute() {
        let paymentInformation = this.getInformation();
        if (this.isValid(paymentInformation)){
            console.log("Your payment information is being encrypted.");
            console.log("The payment is being processed");
        }
        else{
            console.log("The payment is invalid.");
        }
    }
}

class CreditCardInformation extends PaymentInfo{
    name!: string;
    creditCardNumber!: string;
    creditCardExpirationDate!: string;

}
class CreditCardBuilder{
    private getInfo: () => CreditCardInformation;
    private isValid: (CreditCardInformation: any) => boolean;
    private executor!: PaymentSystemExecutor;

    public constructor(){
        function getInfo(): CreditCardInformation{
            console.log("Enter Credit Card Payment Details.");
            let payInfo = new CreditCardInformation();
            payInfo.name = readlineSync.question("Name: ");
            payInfo.creditCardNumber = readlineSync.question("Credit Card Number: ");
            payInfo.creditCardExpirationDate = readlineSync.question("Credit Card Expiration Date (MM/DD): ");
            return payInfo;
        }
        function isValid(payInfo: CreditCardInformation): boolean {
            return /^[\w.' ]+$/.test(payInfo.name) && /\d{15,16}/.test(payInfo.creditCardNumber) && /\d\d\/\d\d/.test(payInfo.creditCardExpirationDate)
        }
        this.getInfo = getInfo;
        this.isValid = isValid;
    }
    public build() {
        this.executor = new PaymentSystemExecutor(this.getInfo, this.isValid);
    }

    public getExecutor(): PaymentSystemExecutor {
        return this.executor;
    }
}

class BankInformation extends PaymentInfo{
    name!: string;
    bankRoutingNumber!: string;
    bankAccountNumber!: string;
}

class BankBuilder {
    private getInfo: () => BankInformation;
    private isValid:  (BankInformation: any) => boolean;
    private executor!: PaymentSystemExecutor;

    public constructor(){
        function getInfo(): BankInformation{
            console.log("Enter Bank Account Details.");
            let payInfo = new BankInformation();
            payInfo.name = readlineSync.question("Name: ");
            payInfo.bankRoutingNumber = readlineSync.question("Bank Routing Number: ");
            payInfo.bankAccountNumber = readlineSync.question("Bank Account Number: ");
            return payInfo;
        }
        function isValid(payInfo: BankInformation): boolean{
            return /^[\w.' ]+$/.test(payInfo.name) && /\d{9}/.test(payInfo.bankRoutingNumber) && /\d{6,12}/.test(payInfo.bankAccountNumber);

        }
        this.getInfo = getInfo;
        this.isValid = isValid;
    }
    public build(){
        this.executor = new PaymentSystemExecutor(this.getInfo, this.isValid);
    }

    public getExecutor(): PaymentSystemExecutor{
        return this.executor;
    }
}

class OnlineInformation extends PaymentInfo{
    email!: string;
    paymentPassword!: string;
}

class OnlineBuilder{
    private getInfo: () => OnlineInformation;
    private isValid: (OnlineInformation: any) => boolean;
    private executor!: PaymentSystemExecutor;

    public constructor(){
        function getInfo(): OnlineInformation{
            console.log("Enter Online Payment Information");
            let payInfo = new OnlineInformation();
            payInfo.email = readlineSync.question("Email: ");
            payInfo.paymentPassword = readlineSync.question("Enter Your Payment Password: ");
            return payInfo;
    }
        function isValid(payInfo: OnlineInformation): boolean{
            return /^[\w@.]+$/.test(payInfo.email) && /\w+/.test(payInfo.paymentPassword);
    }
        this.getInfo = getInfo;
        this.isValid = isValid;
    }
    public build(){
        this.executor = new PaymentSystemExecutor(this.getInfo, this.isValid);
    }

    public getExecutor(): PaymentSystemExecutor {
        return this.executor;
    }
}

class OfflineInformation extends PaymentInfo{
    name!: string;
    billingAddress!: string;
}

class OfflineBuilder{
    private getInfo: () => OfflineInformation;
    private isValid: (OfflineInformation: any) => boolean;
    private executor!: PaymentSystemExecutor;

    public constructor(){
        function getInfo(): OfflineInformation{
            console.log("Enter Offline Payment Information");
            let payInfo = new OfflineInformation();
            payInfo.name = readlineSync.question("Name: ");
            payInfo.billingAddress = readlineSync.question("Billing Address: ");
            return payInfo;
    }
        function isValid(payInfo: OfflineInformation): boolean{
            return /^[\w.' ]+$/.test(payInfo.name) && /^[\w.' ]+$/.test(payInfo.billingAddress);
    }
        this.getInfo = getInfo;
        this.isValid = isValid;
    }
    public build(){
        this.executor = new PaymentSystemExecutor(this.getInfo, this.isValid);
    }

    public getExecutor(): PaymentSystemExecutor {
        return this.executor;
    }
}