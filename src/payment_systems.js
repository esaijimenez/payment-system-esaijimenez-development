"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentSystemExecutor = exports.PaymentSystemContext = void 0;
var readlineSync = require("readline-sync");
var PaymentInfo = /** @class */ (function () {
    function PaymentInfo() {
    }
    return PaymentInfo;
}());
var PaymentSystemContext = /** @class */ (function () {
    function PaymentSystemContext() {
    }
    PaymentSystemContext.prototype.getExecutor = function (name) {
        if (name == "credit") {
            var builder_1 = new CreditCardBuilder();
            builder_1.build();
            return builder_1.getExecutor();
        }
        if (name == "bank") {
            var builder_2 = new BankBuilder();
            builder_2.build();
            return builder_2.getExecutor();
        }
        if (name == "online") {
            var builder_3 = new OnlineBuilder();
            builder_3.build();
            return builder_3.getExecutor();
        }
        var builder = new OfflineBuilder();
        builder.build();
        return builder.getExecutor();
    };
    return PaymentSystemContext;
}());
exports.PaymentSystemContext = PaymentSystemContext;
var PaymentSystemExecutor = /** @class */ (function () {
    function PaymentSystemExecutor(getInformation, isValid) {
        this.getInformation = getInformation;
        this.isValid = isValid;
    }
    PaymentSystemExecutor.prototype.execute = function () {
        var paymentInformation = this.getInformation();
        if (this.isValid(paymentInformation)) {
            console.log("Your payment information is being encrypted.");
            console.log("The payment is being processed");
        }
        else {
            console.log("The payment is invalid.");
        }
    };
    return PaymentSystemExecutor;
}());
exports.PaymentSystemExecutor = PaymentSystemExecutor;
var CreditCardInformation = /** @class */ (function (_super) {
    __extends(CreditCardInformation, _super);
    function CreditCardInformation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CreditCardInformation;
}(PaymentInfo));
var CreditCardBuilder = /** @class */ (function () {
    function CreditCardBuilder() {
        function getInfo() {
            console.log("Enter Credit Card Payment Details.");
            var payInfo = new CreditCardInformation();
            payInfo.name = readlineSync.question("Name: ");
            payInfo.creditCardNumber = readlineSync.question("Credit Card Number: ");
            payInfo.creditCardExpirationDate = readlineSync.question("Credit Card Expiration Date (MM/DD): ");
            return payInfo;
        }
        function isValid(payInfo) {
            return /^[\w.' ]+$/.test(payInfo.name) && /\d{15,16}/.test(payInfo.creditCardNumber) && /\d\d\/\d\d/.test(payInfo.creditCardExpirationDate);
        }
        this.getInfo = getInfo;
        this.isValid = isValid;
    }
    CreditCardBuilder.prototype.build = function () {
        this.executor = new PaymentSystemExecutor(this.getInfo, this.isValid);
    };
    CreditCardBuilder.prototype.getExecutor = function () {
        return this.executor;
    };
    return CreditCardBuilder;
}());
var BankInformation = /** @class */ (function (_super) {
    __extends(BankInformation, _super);
    function BankInformation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BankInformation;
}(PaymentInfo));
var BankBuilder = /** @class */ (function () {
    function BankBuilder() {
        function getInfo() {
            console.log("Enter Bank Account Details.");
            var payInfo = new BankInformation();
            payInfo.name = readlineSync.question("Name: ");
            payInfo.bankRoutingNumber = readlineSync.question("Bank Routing Number: ");
            payInfo.bankAccountNumber = readlineSync.question("Bank Account Number: ");
            return payInfo;
        }
        function isValid(payInfo) {
            return /^[\w.' ]+$/.test(payInfo.name) && /\d{9}/.test(payInfo.bankRoutingNumber) && /\d{6,12}/.test(payInfo.bankAccountNumber);
        }
        this.getInfo = getInfo;
        this.isValid = isValid;
    }
    BankBuilder.prototype.build = function () {
        this.executor = new PaymentSystemExecutor(this.getInfo, this.isValid);
    };
    BankBuilder.prototype.getExecutor = function () {
        return this.executor;
    };
    return BankBuilder;
}());
var OnlineInformation = /** @class */ (function (_super) {
    __extends(OnlineInformation, _super);
    function OnlineInformation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return OnlineInformation;
}(PaymentInfo));
var OnlineBuilder = /** @class */ (function () {
    function OnlineBuilder() {
        function getInfo() {
            console.log("Enter Online Payment Information");
            var payInfo = new OnlineInformation();
            payInfo.email = readlineSync.question("Email: ");
            payInfo.paymentPassword = readlineSync.question("Enter Your Payment Password: ");
            return payInfo;
        }
        function isValid(payInfo) {
            return /^[\w@.]+$/.test(payInfo.email) && /\w+/.test(payInfo.paymentPassword);
        }
        this.getInfo = getInfo;
        this.isValid = isValid;
    }
    OnlineBuilder.prototype.build = function () {
        this.executor = new PaymentSystemExecutor(this.getInfo, this.isValid);
    };
    OnlineBuilder.prototype.getExecutor = function () {
        return this.executor;
    };
    return OnlineBuilder;
}());
var OfflineInformation = /** @class */ (function (_super) {
    __extends(OfflineInformation, _super);
    function OfflineInformation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return OfflineInformation;
}(PaymentInfo));
var OfflineBuilder = /** @class */ (function () {
    function OfflineBuilder() {
        function getInfo() {
            console.log("Enter Offline Payment Information");
            var payInfo = new OfflineInformation();
            payInfo.name = readlineSync.question("Name: ");
            payInfo.billingAddress = readlineSync.question("Billing Address: ");
            return payInfo;
        }
        function isValid(payInfo) {
            return /^[\w.' ]+$/.test(payInfo.name) && /^[\w.' ]+$/.test(payInfo.billingAddress);
        }
        this.getInfo = getInfo;
        this.isValid = isValid;
    }
    OfflineBuilder.prototype.build = function () {
        this.executor = new PaymentSystemExecutor(this.getInfo, this.isValid);
    };
    OfflineBuilder.prototype.getExecutor = function () {
        return this.executor;
    };
    return OfflineBuilder;
}());
